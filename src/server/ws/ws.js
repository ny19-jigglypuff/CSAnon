module.exports = (http) => {
  const io = require('socket.io')(http);

  io.on('connect', (socket) => {
    console.log('a user connected');

    // TODO: on message should do the following:
    //       1. save the message to database
    //       2. forward the message to all connected users
    socket.on('message', console.log);

    // TODO: on disconnect, should free the user id from the redis database
    socket.on('disconnect', () => console.log('user disconnected'));
  });
  return io;
};
