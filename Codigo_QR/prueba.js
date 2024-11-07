const WebSocket = require('ws');
const wss = new WebSocket.Server({ port: 8081 });

wss.on('connection', function connection(ws) {
  console.log('Client connected');
  ws.send('Conexión establecida'); // Mensaje de prueba

  ws.on('message', function incoming(message) {
    console.log('received: %s', message);
    // Broadcast the message to all connected clients
    wss.clients.forEach(function each(client) {
      if (client.readyState === WebSocket.OPEN) {
        client.send(message);
      }
    });
  });
});

console.log('WebSocket server is running on ws://localhost:8081');

