const githubController = {};
const dotenv = require('dotenv').config();
const request = require('superagent');
const jwt = require('jsonwebtoken');

const { requestToken, requestUser } = require('./requests');

// TODO: Get the database connection
const db = {}; //require('./somthing/something')

const CLIENT_ID = process.env.CLIENT_ID;
const CLIENT_SECRET = process.env.CLIENT_SECRET;
const JWT_SECRET = process.env.JWT_SECRET;

// href="https://github.com/login/oauth/authorize?client_id=5845de717f61e35fed8b"
githubController.redirect = (req, res, next) => {
  const baseURL = 'https://github.com/login/oauth/authorize';

  res.redirect(`${baseURL}?client_id=${CLIENT_ID}`);
};

githubController.callback = (req, res, next) => {
  const { query } = req;
  const { code } = query;
  if (!code) {
    return next({
      error: { code: 403, message: 'User Not Authorized By Github' },
    });
  }
  requestToken(code).then((response) =>
    requestUser(response)
      .then(function (result) {
        console.log(result.body.login);
        res.locals.login = result.body.login;
        return next();
      })
      .catch((err) => {
        console.log(err);
        console.log(err.message);
        return next(err);
      })
  );
};

githubController.approveUser = (req, req, next) => {
  const githubHandle = res.locals.login;
  const queryString = `SELECT login FROM whitelist WHERE login=${githubHandle}`;
  db.query(queryString)
    .then((result) => {
      if (!result.rows.length) {
        res.status(403).json({ error: { message: 'User is not authorized' } });
      } else {
        res.locals.user = githubHandle;
      }
      next();
    })
    .catch((err) => next(err));
};

githubController.createJWT = (req, res, next) => {
  const githubHandle = res.locals.user;
  jwt.sign({ username: githubHandle }, JWT_SECRET, (err, token) => {
    if (err) return next(err);
    res.locals.token = token;
    next();
  });
};

githubController.setCookie = (req, res, next) => {
  const token = res.locals.token;
  res.cookie('token', token);
  next();
};

module.exports = githubController;
