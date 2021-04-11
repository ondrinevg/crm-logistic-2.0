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
  .post(postAddClient);

  
  clientsRouter.route('/all/')
  .post(findAll)
  .get(findClients);
  
  clientsRouter.route('/:id')
    .get(renderClient)
    .patch(postEditClient)
    .delete(deliteClient);

clientsRouter.route('/:id/comments')
  .post(addComment);

module.exports = clientsRouter;
