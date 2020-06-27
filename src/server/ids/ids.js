const idsRouter = require('express').Router();
const idsController = require('./controllers/id');

idsRouter.get('/', idsController.getNewID, (req, res) => {
  res.status(200).json(res.locals.availableID);
});

module.exports = idsRouter;

// keep a list of signed in user hashes
// clear the list on signout
// do we have to attach the socket-id to the user hash?
