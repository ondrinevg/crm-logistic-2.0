/* eslint-disable max-len */
const clientsRouter = require('express').Router();
const { checkAdmin } = require('../middlewares/checkAdmin');
const { checkAuth } = require('../middlewares/checkAuth');
const {
  findAll, renderClient, renderAllClients, findClients, postAddClient, addComment, renderEditClient, postEditClient, deliteClient,
} = require('../controllers/clientController');

clientsRouter.route('/')
  .get(checkAuth, renderAllClients);

clientsRouter.route('/new')
  .post(checkAuth, postAddClient);

clientsRouter.route('/:id')
  .get(checkAuth, renderEditClient)
  .patch(checkAuth, postEditClient)
  .delete(checkAdmin, deliteClient);

clientsRouter.route('/all/')
  .post(checkAuth, findAll)
  .get(findClients);

clientsRouter.route('/:id')
  .get(checkAuth, renderClient);

clientsRouter.route('/:id/comments')
  .post(checkAuth, addComment);

module.exports = clientsRouter;
