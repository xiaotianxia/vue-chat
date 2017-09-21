let app = require('express')(),
	http = require('http').Server(app),
	io = require('socket.io')(http);

app.get('/', (req, res) => {
    res.send('<h1>welcome</h1>');
});


let LOGIN_USER = {},
	USER_LIST = [];

io.on('connection', socket => {
	socket.on('login', userInfo => {
		LOGIN_USER = userInfo;
        if(USER_LIST.indexOf(LOGIN_USER.userId) == -1) {
    		USER_LIST.push(LOGIN_USER.userId);
        }
		console.log(USER_LIST);
        let msg = '“' + userInfo.name + '”'+ '加入了群聊',
            userMsg = {
	        	name: userInfo.name,
                userId: userInfo.userId,
	        	type: 'system',
	        	msg: msg
	        };
        io.emit('login', userMsg);
        io.emit('updateUserCount', {userCount: USER_LIST.length});
    });

	socket.on('chat', chatMsg => {
		chatMsg.type = (chatMsg.userId == LOGIN_USER.userId ? 'self' : 'other');
		io.emit('chat', chatMsg);
	});

	socket.on('logout', (userInfo) => {
        USER_LIST.splice(USER_LIST.indexOf(userInfo.userId), 1);
        io.emit('updateUserCount', {userCount: USER_LIST.length});
        console.log(USER_LIST);
        let msg = '“' + userInfo.name + '”'+ '退出了群聊',
            userMsg = {
                name: userInfo.name,
                userId: userInfo.userId,
                type: 'system',
                msg: msg
            };
        io.emit('logout', userMsg);
	})
});

http.listen(7000, () => {
    console.log('listening on : 7000');
});