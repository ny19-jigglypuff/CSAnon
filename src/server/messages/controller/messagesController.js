const db = require('../../models/elephantsql');

const messagesController = {};

const getAllMessages = async () => {
  const queryString = `SELECT messages.message, messages.created_at, users.username, users.pic_url FROM messages INNER JOIN users ON messages.user_id = users.user_id ORDER BY messages.created_at DESC LIMIT 100;`;
  const results = await db.query(queryString);
  if (results.rows.length) {
    const messages = results.rows.reverse();
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
