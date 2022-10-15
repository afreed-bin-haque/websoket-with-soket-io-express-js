const express = require('express');
const http = require('http');
const WebSocket = require('ws');

const port = 1997;
const server = http.createServer(express);
const WebSocketServer = new WebSocket.Server({ server });

WebSocketServer.on('connection', function connection(ws){
  ws.on('message', function incoming(data){
    WebSocketServer.clients.forEach(function each(client){
      if (client !== ws && client.readyState === WebSocket.OPEN){
        client.send(data);
      }
    });
  });
});

server.listen(port, function(){
  console.log(`Server is listening on port:${port}`);
});