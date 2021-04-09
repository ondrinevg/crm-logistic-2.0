/* eslint-disable max-len */
const clientsRouter = require('express').Router();
const { checkAdmin } = require('../middlewares/checkAdmin');
const { checkAuth } = require('../middlewares/checkAuth');
const {
  findAll, renderClient, renderAllClients, findClients, postAddClient, addComment, renderEditClient, postEditClient, deliteClient,
} = require('../controllers/clientController');

clientsRouter.route('/')
  .get(renderAllClients);

clientsRouter.route('/new')
  .post(postAddClient);

clientsRouter.route('/:id')
  .get(renderEditClient)
  .patch(postEditClient)
  .delete(deliteClient);

clientsRouter.route('/all/')
  .post(findAll)
  .get(findClients);

clientsRouter.route('/:id')
  .get(renderClient);

clientsRouter.route('/:id/comments')
  .post(addComment);

module.exports = clientsRouter;
