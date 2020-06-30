const db = require('../../models/elephantsql');

const messagesController = {};

const getAllMessages = async () => {
  // selects the 100 most recent message and created at keys from the database,
  // along with the username and pic_url of that message
  const queryString = `SELECT messages.message, messages.timestamp, users.username, users.pic_url FROM messages INNER JOIN users ON messages.user_id = users.user_id ORDER BY messages.timestamp DESC LIMIT 100;`;
  const results = await db.query(queryString);
  if (results.rows.length) {
    const messages = results.rows
      // provides the oldest messages first
      .reverse()
      // front end needs the pic_url provided as userURL
      // TODO: get the database in line with the needs of the front end
      .map((message) => ({ ...message, userURL: message.pic_url }));
    return messages;
  } else {
    console.error('could not get messages from database');
  }
};

messagesController.getAll = async (req, res, next) => {
  const allMessages = await getAllMessages();
  res.locals.messages = allMessages;
  next();
};

module.exports = messagesController;
