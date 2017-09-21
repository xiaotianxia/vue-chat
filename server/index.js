let app = require('express')(),
	http = require('http').Server(app),
	io = require('socket.io')(http);

app.get('/', (req, res) => {
    res.send('<h1>welcome</h1>');
});


let USER_INFO = {},
	USER_LIST = [];

io.on('connection', socket => {
	socket.on('login', userInfo => {
		USER_INFO = userInfo;
		USER_LIST.push(userInfo.userId);
		console.log(userInfo.userId);
		console.log(USER_LIST);
        let msg = '“' + userInfo.name + '”' + '加入了群聊',
        	userMsg = {
	        	...userInfo,
	        	type: 'system',
	        	msg: msg
	        };
        console.log(userMsg);
        io.emit('login', userMsg);
    });

	socket.on('chat', chatMsg => {
		chatMsg.type = (chatMsg.userId == USER_INFO.userId ? 'self' : 'other');
		io.emit('chat', chatMsg);
	});

	socket.on('disconnect', () => {
		console.log('退出了群聊');
	})
});

http.listen(7000, () => {
    console.log('listening on : 7000');
});