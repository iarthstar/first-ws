const WebSocket = require('ws');

const wss = new WebSocket.Server({ port: 8080 });

wss.on("connection", (ws) => {
    console.log(new Date().toISOString(), "Connected to Client");
    
    ws.onmessage = (message) => {
        console.log(new Date().toISOString(), 'Received from Client:', message.data);
    };

    ws.onclose = (event) => {
        console.log(new Date().toISOString(), "Disconnected from Client:", event.code, event.reason);
    };

    ws.send('Hello World!');
});