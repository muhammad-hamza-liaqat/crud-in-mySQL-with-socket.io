// utils/socket.js
const socketIO = require('socket.io');

function configureSocket(server) {
  const io = socketIO(server);

  io.on('connection', (socket) => {
    console.log('A user connected');

    // Handle events or send messages here
    socket.on('chat message', (msg) => {
      io.emit('chat message', msg); 
    });

    socket.on('disconnect', () => {
      console.log('User disconnected');
    });
  });
}

module.exports = configureSocket;
