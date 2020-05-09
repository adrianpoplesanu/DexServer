const WebSocket = require('ws');
var port = 8092;
console.log("started Dexiciul v0.2...");

var wss = new WebSocket.Server({port: port})
console.log("listening on port: " + port);

var connections = [];

wss.on('connection', ws => {
    ws.on('message', message => {
        if (message == "check connection still active...") {
            // do nothing, it's just an echo from the client to test the connection is still up
            return
        }
        var data = JSON.parse(message);
        if (data['operation'] == 'connect') {
            var username = data['data'].username;
            var password = data['data'].password;
            if (username == 'adrianus' && password == "dexiciul") {
                var packet = {'operation': 'login-success', 'username': 'adrianus'}
                ws.chat_settings['username'] = 'adrianus';
                ws.send(JSON.stringify(packet));
                console.log('adrianus connected');
                return;
            }
            if (username = 'ramonix' && password == "dexiciut") {
                var packet = {'operation': 'login-success', 'username': 'ramonix'}
                ws.chat_settings['username'] = 'ramonix';
                ws.send(JSON.stringify(packet));
                console.log('ramonix connected');
                return;
            }
            ws.send('wrong username or passowrd');
        }
    });

    ws.on('close', ws => {
        console.log("websocket onclose");
    });

    // this is the so called "onConnect" handler
    ws.chat_settings = {};
    connections.push(ws);
});