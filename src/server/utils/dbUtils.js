const db = require('../models/elephantsql');

const dbUtils = {};
 
dbUtils.matchUsernameToID = async (username) => {
  const queryString = `SELECT user_id FROM users WHERE username = '${username}'`;
  const response = await db.query(queryString);
  if (response.rows.length) {
    const { userID } = response.rows[0];
    return userID;
  } else {
    console.error('user id not found when searched by name');
  }
};

dbUtils.getIDAndPictureByUsername = async (username) => {
  const queryString = `SELECT pic_url, user_id FROM users WHERE username = '${username}'`;
  const result = await db.query(queryString);
  if (result.rows.length) {
    const { user_id, pic_url } = result.rows[0];
    return { user_id, userURL: pic_url };
  } else {
    console.error('no name and picture results found');
  }
};

dbUtils.saveMessageToDB = async ({ message, user_id }) => {
  message = message.replace("'", '');
  const queryString = `INSERT INTO messages (user_id, message) VALUES ('${user_id}', '${message}') `;
  return await db.query(queryString);
};

module.exports = dbUtils;
