/* eslint-disable max-len */
const orderRouter = require('express').Router();
const { checkAuth } = require('../middlewares/checkAuth');
const {
  renderAllOrders, renderOrder, addComment, addNewOrder, editOrder,
  deliteOrder,
  findAll,
  renderNewOrderFormForClient,
} = require('../controllers/orderController');

orderRouter.route('/')
  .get(checkAuth, renderAllOrders);

orderRouter.route('/all')
  .post(checkAuth, findAll);

orderRouter.route('/new')
  .post(checkAuth, addNewOrder);

orderRouter.route('/new/:id')
  .get(checkAuth, renderNewOrderFormForClient);

orderRouter.route('/:id')
  .patch(checkAuth, editOrder)
  .delete(checkAuth, deliteOrder)
  .get(checkAuth, renderOrder);

orderRouter.route('/:id/comments')
  .post(checkAuth, addComment);

module.exports = orderRouter;
