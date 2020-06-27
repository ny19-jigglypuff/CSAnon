const redis = require('../../redis/redis');
const db = require('../../models/elephantsql');

const idsController = {};

const NUM_OF_POKEMON = 1000; // change to fit the number of available pokemon we have

const pickRandomNumber = () => {
  return Math.floor(Math.random() * NUM_OF_POKEMON);
};

const checkAgainstSignedInUsers = (number) => {
  redis.get(number, (err, reply) => {
    if (err) return console.error('redis lookup error:', err);
    return Boolean(reply);
  });
};

const getNameAndPicture = async (id) => {
  // TODO: search postgresQL for the id
  // return the name and url of the picture from db
  const queryString = `SELECT username, pic_url FROM users WHERE user_id = ${id}`;
  const result = await db.query(queryString);
  if (result.rows.length) {
    const [username, pic_url] = result.rows[0];
    return { username, userURL: pic_url };
  } else {
    console.log('no results found');
  }
};

idsController.getNewID = async (req, res, next) => {
  // TODO: pick a random number
  const randomUserID = pickRandomNumber();
  // TODO: check if number is in use
  while (checkAgainstSignedInUsers(randomUserID)) {
    randomUserID = pickRandomNumber();
  }
  // TODO: attach the name and url to the available id
  const userObject = await getNameAndPicture(randomUserID);
  // TODO: attach the id object to res.locals.availableID
  res.locals.availableID = userObject;
  next();
};
