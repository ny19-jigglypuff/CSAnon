const router = require('express').Router();
const {
  redirect,
  callback,
  approveUser,
  createJWT,
  setCookie,
} = require('./controllers/githubController');
 
// handles initial redirect of the user to github for authorization
router.get('/user', redirect);

// handles the user coming back from github
// router.get('/callback', callback, approveUser, createJWT, setCookie, (req, res) => {
//   res.status(200).redirect('/');
// });
router.get('/callback', callback, approveUser, createJWT, setCookie, (req, res) => {
  res.status(200).redirect('/');
});

module.exports = router;
