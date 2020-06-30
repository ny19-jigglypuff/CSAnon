const { getIDAndPictureByUsername, saveMessageToDB } = require('../utils/dbUtils');
const moment = require('moment');
const redis = require('../redis/redis');
moment().format();

module.exports = (http) => {
  const io = require('socket.io')(http);

  io.on('connect', (socket) => {
    console.log('a user connected');

    socket.on('message', async ({ message, username }) => {
      const { user_id, userURL } = await getIDAndPictureByUsername(username);
      const timestamp = moment();
      // creates a message for broadcast to all open sockets
      const newMessage = { message: message, username, userURL, timestamp };
      // creates a message formatted for database storage
      const dbMessage = { user_id, message };
      try {
        //
        await saveMessageToDB(dbMessage);
        // send the message to all open sockets
        io.emit('newMessage', newMessage);
      } catch (err) {
        console.error(err);
      }
    });

    socket.on('signin', ({ username }) => {
      // assigns the anon username to the socketID
      redis.set(socket.id.toString(), username);
      // claims the anon username as in-use
      redis.set(username, 'true');
    });

    socket.on('disconnect', () => {
      console.log('a user disconnected');

      // retrieves the username attached to the socketID on disconnect
      redis.get(socket.id.toString(), (err, username) => {
        if (err) return console.error(err);
        console.log(username, 'disconnected');
        if (!username) return;
        //frees the username and socketID from the in-use storage
        redis.del(socket.id.toString());
        redis.del(username);
      });
    });
  });
  return io;
};

/* messageObject = {
message: String,
username:  String,
userURL:  String,
timestamp: String
}
*/

/*
  sendMessage = {
  username: String,
  message: String,
  }
 */