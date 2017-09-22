let app = require('express')(),
	http = require('http').Server(app),
	io = require('socket.io')(http);

app.get('/', (req, res) => {
    res.send('<h1>welcome</h1>');
});


let LOGIN_USER = {},
	USER_ID_LIST = [],
	ROOM_NAME = '',
	USER_LIST = [];

io.on('connection', socket => {
	socket.on('login', userInfo => {
		LOGIN_USER = userInfo;
		ROOM_NAME = userInfo.roomName;
        if(USER_ID_LIST.indexOf(LOGIN_USER.userId) == -1) {
    		USER_ID_LIST.push(LOGIN_USER.userId);
    		USER_LIST.push(userInfo);
        }
		console.log(USER_ID_LIST);
        let msg = '“' + userInfo.name + '”'+ '加入了群聊',
            userMsg = {
	        	name: userInfo.name,
                userId: userInfo.userId,
	        	type: 'system',
	        	msg: msg
	        };
        io.emit('login', userMsg);
        io.emit('updateUserCount', {
        	userCount: USER_ID_LIST.length
        });
    });

	socket.on('chat', chatMsg => {
		chatMsg.type = (chatMsg.userId == LOGIN_USER.userId ? 'self' : 'other');
		io.emit('chat', chatMsg);
	});

	socket.on('logout', (userInfo) => {
        USER_ID_LIST.splice(USER_ID_LIST.indexOf(userInfo.userId), 1);
        USER_LIST.splice(USER_ID_LIST.indexOf(userInfo.userId), 1);
        io.emit('updateUserCount', {
        	userCount: USER_ID_LIST.length
        });
        console.log(USER_ID_LIST);
        let msg = '“' + userInfo.name + '”'+ '退出了群聊',
            userMsg = {
                name: userInfo.name,
                userId: userInfo.userId,
                type: 'system',
                msg: msg
            };
        io.emit('logout', userMsg);
	});

	socket.on('getRoomInfo', () => {
		io.emit('getRoomInfo', {
			roomName: ROOM_NAME,
			userList: USER_LIST
		});
	});

	socket.on('editRoomName', data => {
		ROOM_NAME = data.roomName;
		let msg = data.name + '修改了群名为' + '“' + data.roomName + '"',
            userMsg = {
                name: data.name,
                userId: data.userId,
                type: 'system',
                roomName: data.roomName,
                msg: msg
            };
        console.log(msg);
		io.emit('editRoomName', userMsg);
	});
});

http.listen(7000, () => {
    console.log('listening on : 7000');
});