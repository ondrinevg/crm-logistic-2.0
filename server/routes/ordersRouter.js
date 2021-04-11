/* eslint-disable max-len */
const orderRouter = require('express').Router();
const { checkAuth } = require('../middlewares/checkAuth');
const { checkAdmin } = require('../middlewares/checkAdmin');
const {
  renderAllOrders, renderOrder, addComment, addNewOrder, editOrder,
  deliteOrder,
  findAll,
  renderNewOrderFormForClient,
} = require('../controllers/orderController');

orderRouter.route('/')
  .get(renderAllOrders);

orderRouter.route('/all')
  .post(findAll);

orderRouter.route('/new')
  .post(addNewOrder);

orderRouter.route('/new/:id')
  .get(renderNewOrderFormForClient);

orderRouter.route('/:id')
  .patch(editOrder)
  .delete(deliteOrder)
  .get(renderOrder);

orderRouter.route('/:id/comments')
  .post(addComment);

// orderRouter.route('/:id/status')
//   .patch(changeStatus);
module.exports = orderRouter;
