const WebSocket = require('ws');
const express = require('express');
const app = express();
const server = require('http').createServer(app);
const wss = new WebSocket.Server({ server });

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

const PORT = process.env.PORT || 8081;
server.listen(PORT, () => console.log(`WebSocket server is running on port ${PORT}`));
