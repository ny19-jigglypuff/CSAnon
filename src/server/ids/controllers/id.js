const redis = require("../../redis/redis");
const db = require("../../models/elephantsql");
const e = require("express");

const idsController = {};

const NUM_OF_POKEMON = 964; // change to fit the number of available pokemon we have
// const NUM_OF_POKEMON = 100;

const pickRandomPokemonNumber = () => {
  return Math.floor(Math.random() * NUM_OF_POKEMON);
};

const userIDIsTaken = (number) => {
  redis.get(number, (err, reply) => {
    if (err) return console.error("redis lookup error:", err);
    return Boolean(reply);
  });
};

// finds the pokemon name and pictureURL attached to the random user_id
const getNameAndPicture = async (id) => {
  const queryString = `SELECT username, pic_url FROM users WHERE user_id = ${id}`;
  const result = await db.query(queryString);
  if (result.rows.length) {
    const { username, pic_url } = result.rows[0];
    // TEST !!!
    // res.cookie('username', username);
    return { username, userURL: pic_url };
  } else {
    console.error("no name and picture results found");
  }
};

// TEST!!!
const getPic = async (username) => {
  const queryString = `SELECT pic_url FROM users WHERE username = '${username}'`;
  const result = await db.query(queryString);
  console.log("Result from getPic query ", result);
  if (result.rows.length) {
    return result.rows[0].pic_url;
  } else {
    console.log("no picture found in DB");
  }
};

// Query doesn't work for some reason !!!
const matchUsernameToID = async (username) => {
  const queryString = `SELECT user_id FROM users WHERE username = "${username}"`;
  const response = await db.query(queryString);
  if (response.rows.length) {
    const { userID } = response.rows[0];
    return userID; 
  } else {
    console.error("user id not found when searched by name");
  }
};

idsController.getNewID = async (req, res, next) => {
  // console.log('Req.session: ', req.session);
  let userObject;
  let pic;
  // const saved = req.session.cookies.username;
  const saved = req.session._ctx.cookies.username;
  // const saved = req.session._ctx.IncomingMessage.cookies.username;
  console.log("Username cookie was saved ", saved);
  // console.log('Token in cookies ', req.session.cookies.token);
  console.log("Token in cookies ", req.session._ctx.cookies.token);
  if (saved) {
    // userID = matchUsernameToID(req.session._ctx.cookies.username);
    pic = await getPic(saved);
  } else {
    userID = pickRandomPokemonNumber();
    while (userIDIsTaken(userID)) {
      const userID = pickRandomPokemonNumber();
    }
    userObject = await getNameAndPicture(userID);
  }
  if (!saved) {
    const { username } = userObject;
    res.cookie("username", username);
  }
  userObject = { username: saved, userURL: pic};
  console.log(userObject);
  res.locals.availableID = userObject;
  return next();

  // ***** BEFORE WAS:
  // let randomUserID = pickRandomPokemonNumber();
  // while (userIDIsTaken(randomUserID)) {
  //   randomUserID = pickRandomPokemonNumber();
  // }
  // const userObject = await getNameAndPicture(randomUserID);
  // res.locals.availableID = userObject;
  // // TEST !!!
  // const { username } = userObject;
  // // TEST !
  // console.log('Cookie is set ', username);
  // res.cookie('username', username);
  // return next();
};

// TEST !!!
// idsController.getSavedId = async (req, res, next) => {
//   const userID = matchUsernameToID(req.session.cookies.username);
//   const userObject = await getNameAndPicture(userID);
//   res.locals.availableID = userObject;
//   return next();
// };

module.exports = idsController;
