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
		USER_LIST.push(userInfo.userId);
		console.log(USER_LIST);
        let msg = (userInfo.userId == LOGIN_USER.userId ? '你' :  '“' + userInfo.name + '”') + '加入了群聊',
        	userMsg = {
	        	...userInfo,
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

	socket.on('disconnect', () => {
		USER_LIST.splice(USER_LIST.indexOf(LOGIN_USER.userId), 1);
		io.emit('updateUserCount', {userCount: USER_LIST.length});
		console.log(USER_LIST);
		console.log('退出了群聊');
	})
});

http.listen(7000, () => {
    console.log('listening on : 7000');
});