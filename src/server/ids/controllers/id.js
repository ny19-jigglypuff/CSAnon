const redis = require('../../redis/redis');
const db = require('../../models/elephantsql');

const idsController = {};

const NUM_OF_POKEMON = 964; // change to fit the number of available pokemon we have

const pickRandomPokemonNumber = () => {
  return Math.floor(Math.random() * NUM_OF_POKEMON);
};

const userIDIsTaken = (number) => {
  redis.get(number, (err, reply) => {
    if (err) return console.error('redis lookup error:', err);
    return Boolean(reply);
  });
};

// finds the pokemon name and pictureURL attached to the random user_id
const getNameAndPicture = async (id) => {
  const queryString = `SELECT username, pic_url FROM users WHERE user_id = ${id}`;
  const result = await db.query(queryString);
  if (result.rows.length) {
    const { username, pic_url } = result.rows[0];
    return { username, userURL: pic_url };
  } else {
    console.error('no name and picture results found');
  }
};

const matchUsernameToID = async (username) => {
  const queryString = `SELECT user_id FROM users WHERE username = "${username}"`;
  const response = await db.query(queryString);
  if (response.rows.length) {
    const { userID } = response.rows[0];
    return userID;
  } else {
    console.error('user id not found when searched by name');
  }
};

idsController.getNewID = async (req, res, next) => {
  const randomUserID = pickRandomPokemonNumber();
  while (userIDIsTaken(randomUserID)) {
    randomUserID = pickRandomPokemonNumber();
  }
  const userObject = await getNameAndPicture(randomUserID);
  res.locals.availableID = userObject;
  next();
};

module.exports = idsController;
