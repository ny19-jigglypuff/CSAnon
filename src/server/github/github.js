const router = require('express').Router();
const {
  redirect,
  callback,
  approveUser,
  createJWT,
  setCookie,
} = require('./controllers/githubController');

// we need two routes
// one that is going to handle redirecting the user to github
router.get('/user', redirect);

// one that is going to handle the user coming back from github
router.get(
  '/callback',
  callback,
  approveUser,
  createJWT,
  setCookie,
  (req, res) => {
    res.status(200).redirect('/');
  }
);

module.exports = router;
