const idsRouter = require('express').Router();
const idsController = require('./controllers/id');
const { cookieVerifier } = require('../github/controllers/githubController');

idsRouter.get('/', cookieVerifier, idsController.getNewID, (req, res) => {
  res.status(200).json(res.locals.availableID);
});

module.exports = idsRouter;
