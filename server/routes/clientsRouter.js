/* eslint-disable max-len */
const clientsRouter = require('express').Router();
const { checkAdmin } = require('../middlewares/checkAdmin');
const { checkAuth } = require('../middlewares/checkAuth');
const {
  findAll, renderClient, renderAllClients, findClients, postAddClient, addComment, postEditClient, deliteClient,
} = require('../controllers/clientController');

clientsRouter.route('/')
  .get(checkAuth, renderAllClients);

clientsRouter.route('/new')
  .post(checkAuth, postAddClient);

  
  clientsRouter.route('/all/')
  .post(checkAuth, findAll)
  .get(checkAuth, findClients);
  
  clientsRouter.route('/:id')
    .get(checkAuth, renderClient)
    .patch(checkAuth, postEditClient)
    .delete(checkAuth, deliteClient);

clientsRouter.route('/:id/comments')
  .post(checkAuth, addComment);

module.exports = clientsRouter;
