var app = require('express')(),
	http = require('http').Server(app),
	io = require('socket.io')(http);

app.get('/',function (req, res) {
    res.send('<h1>welcome</h1>');
});

io.on('connection', function (socket) {
	socket.on('login', function (user) {
		console.log(user);
        
        io.emit('login',{id:12345});
        console.log(user.name + "加入了群聊");
    })
})

http.listen(7000, function(res) {
    console.log('listening on : 7000');
});