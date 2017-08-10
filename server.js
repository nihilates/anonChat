const express = require('express'); //call in express
const path = require('path'); //path for static serving
const config = require('./config.js');

//configure app
const app = express();
app.use(express.static(path.join(__dirname, './client')));
const http = require('http').Server(app);
const io = require('socket.io')(http); //configure socket.io with http

//socket io configuration
io.on('connection', (socket) => {
  console.log('anonymous has joined the server');

  socket.on('chat message', (msg) => {
    console.log('message:', msg);
  });

  socket.on('disconnect', () => {
    console.log('anonymous has disconnected')
  });
});

//run the server
http.listen(config.port, () => {
  console.log('sage port:', config.port);
});