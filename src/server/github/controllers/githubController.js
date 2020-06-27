const githubController = {};
const dotenv = require('dotenv').config();
const request = require('superagent');
const jwt = require('jsonwebtoken');
const bcrypt = require('bcrypt');

const cookieParser = require('cookie-parser'); // npm install cookie-parser

const { requestToken, requestUser } = require('./requests');

// TODO: Get the database connection
const db = require('../../models/elephantsql'); //require('./somthing/something')

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

// brurua - $2a$10$OrheWaTptswHFmGZK5AK4OgJRGTIrNX2LRnaAfOB7w.GkjCTQyECy
// vika - $2a$10$OrheWaTptswHFmGZK5AK4OgJRGTIrNX2LRnaAfOB7w.GkjCTQyECy
// stiv - $2a$10$OrheWaTptswHFmGZK5AK4OgJRGTIrNX2LRnaAfOB7w.GkjCTQyECy
// midori - $2a$10$OrheWaTptswHFmGZK5AK4OgJRGTIrNX2LRnaAfOB7w.GkjCTQyECy
// res.locals.user - vika
// vika bcrypt 8 - $2a$10$OrheWaTptswHFmGZK5AK4OgJRGTIrNX2LRnaAfOB7w.GkjCTQyECy
githubController.approveUser = async (req, res, next) => {
  const githubHandle = res.locals.login; // brurua $2a$10$OrheWaTptswHFmGZK5AK4OgJRGTIrNX2LRnaAfOB7w.GkjCTQyECy
  const queryString = `SELECT bcrypt_hash FROM hash_table`;
  db.query(queryString)
    .then((result) => {
      if (!result.rows.length) {
        res.status(403).json({ error: { message: 'Hash table error' } });
      } else {
        for (let i = 0; i < result.rows.length; i++) {
          let match = bcrypt.compare(githubHandle, result.rows[i].bcrypt_hash);
          if (match) {
            res.locals.user = result.rows[i].bcrypt_hash;
            return next();
          }
        }
      }
      next();
    })
    .catch((err) => next(err));
};

githubController.createJWT = async (req, res, next) => {
  const SALT_ROUNDS = 10;
  const githubHandle = res.locals.user;
  const hashedHandle = await bcrypt.hash(githubHandle, SALT_ROUNDS);

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

// one more middleware wich will check back result from JWT and imidiatle will run query strin to chek sdfsvmwrlf

githubController.cookieVerifier = (req, res, next) => {
  if (!req.cookies.token) return res.redirect('/');
  const token = req.cookies.token;
  let decoded = jwt.decode(token);
  const queryString = `SELECT bcrypt_hash FROM hash_table WHERE bcrypt_hash = '${decoded.username}'`;
  db.query(queryString)
    .then((result) => {
      if (!result.rows.length) {
        // res.status(403).json({ error: { message: 'User is not authorized' } });
        res.redirect('/');
      } else {
        return next();
      }
    })
    .catch((err) => next(err));
};

// if fails, delete the cookie and send to root route (for GitHub Oauth) I will wait you for this all I just pushin black stuff

module.exports = githubController;
