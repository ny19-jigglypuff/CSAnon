const idsRouter = require('express').Router();
const idsController = require('./controllers/id');

idsRouter.get('/new', idsController.newID, (req, res) => {
  res.status(200).json(res.locals.availableIDs);
});

module.exports = idsRouter;
