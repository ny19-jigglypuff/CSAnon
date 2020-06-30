const dotenv = require("dotenv").config(); // loads the .env file onto the process.env object
const jwt = require("jsonwebtoken");
const bcrypt = require("bcrypt");

const githubController = {};

const { requestToken, requestUser, checkMembership } = require("./requests");

const db = require("../../models/elephantsql");

// loads the information from the .env file
const CLIENT_ID = process.env.CLIENT_ID;
const JWT_SECRET = process.env.JWT_SECRET;

githubController.redirect = (req, res, next) => {
  const baseURL = "https://github.com/login/oauth/authorize";
  // VERY IMPORTANT TO DEFINE SCOPES!!!!!!!!!
  // https://developer.github.com/apps/building-oauth-apps/understanding-scopes-for-oauth-apps/
  // const scope = 'user';
  const scope = "read:org";
  res.redirect(`${baseURL}?client_id=${CLIENT_ID}&scope=${scope}`);
}; 

githubController.callback = (req, res, next) => {
  // github returns a code in a query param
  const { code } = req.query;
  console.log("code", code);
  if (!code) {
    return next({
      error: { code: 403, message: "User Not Authorized By Github" },
    });
  }

  requestToken(code).then((result) =>
    requestUser(result, res)
      .then(({ body }) => {
        // console.log(body);
        res.locals.login = body.login;
        // console.log(res.locals)
        return next();
      })
      .catch((err) => {
        console.log(err.status);
        console.log(err.message);
        return next(err);
      })
  );
};

githubController.approveUser = async (req, res, next) => {
  const githubHandle = res.locals.login;
  checkMembership(githubHandle, res.locals.access_token)
    .then((res) => {
      console.log("approveUser res body", res.body);
      // should give 204 status in response
      // if yes - good to go, allowed to access chat (member of the organization)
      console.log(res.status);
    })
    .catch((err) => {
      console.log(err.status);
      console.log(err.message);
      return next(err);
    });

  // get all rows of the hash table
  // const queryString = `SELECT bcrypt_hash FROM hash_table`;
  // db.query(queryString)
  //   .then((result) => {
  //     if (!result.rows.length) {
  //       res.status(403).json({ error: { message: 'Hash table error' } });
  //     } else {
  //       // for each item in the hash_table
  //       for (let i = 0; i < result.rows.length; i++) {
  //         // check if the plaintext github handle matches the hashed_handle
  //         let match = bcrypt.compare(githubHandle, result.rows[i].bcrypt_hash);
  //         if (match) {
  //           // res.locals.user = result.rows[i].bcrypt_hash;
  //           return next();
  //         }
  //       }
  //     }
  //     //TODO: Redirect to /signin route if no match
  //     next();
  //   })
  //   .catch((err) => next(err));
  res.locals.user = githubHandle;
  next();
};

githubController.createJWT = async (req, res, next) => {
  const hashedHandle = res.locals.user;
  jwt.sign({ username: hashedHandle }, JWT_SECRET, (err, token) => {
    if (err) return next(err);
    res.locals.token = token;
    next();
  });
};

githubController.setCookie = (req, res, next) => {
  const token = res.locals.token;
  res.cookie("token", token);
  next();
};

// logic to guard all protected routes
githubController.cookieVerifier = (req, res, next) => {
  if (!req.cookies.token) return res.redirect("/");
  const { token } = req.cookies;
  jwt.verify(token, JWT_SECRET, (err, decoded) => {
    if (err) return console.error("JWT could not be verified");
    const queryString = `SELECT bcrypt_hash FROM hash_table WHERE bcrypt_hash = '${decoded.username}'`;
    db.query(queryString)
      .then((result) => {
        // if no match, redirect the user to the main page
        if (!result.rows.length) {
          res.redirect("/");
        } else {
          // if match, pass them to next middleware
          return next();
        }
      })
      .catch((err) => next(err));
  });
};

module.exports = githubController;
