const idsRouter = require('express').Router();
const idsController = require('./controllers/id');

idsRouter.get('/', idsController.getNewID, (req, res) => {
  res.status(200).json(res.locals.availableID);
});

module.exports = idsRouter;
