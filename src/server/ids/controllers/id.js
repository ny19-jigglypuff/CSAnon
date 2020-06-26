const redis = require('../../redis/redis');

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

const getNameAndPicture = (id) => {
  // TODO: search postgresQL for the id
  // return the name and url of the picture from db
};

idsController.getNewID = (req, res, next) => {
  // TODO: pick a random number
  // TODO: check if number is in use
  // TODO: attach the name and url to the available id
  // TODO: attach the id object to res.locals.availableIDs
};
