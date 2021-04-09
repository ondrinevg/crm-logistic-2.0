/* eslint-disable no-dupe-keys */
const Order = require('../db/models/order');
const Counter = require('../db/models/counter');
const User = require('../db/models/user');
const Client = require('../db/models/client');
const Comment = require('../db/models/comment');
// const { response } = require('express');

const renderAllOrders = async (req, res) => {
  try {
    const orders = await Order.find().populate('client');
    res.json(orders);
  } catch (err) {
    res.status(500).json(err.message);
  }
};

const renderOrder = async (req, res) => {
  try {
    const order = await Order.findById(req.params.id).populate('client').populate({ path: 'comments', populate: { path: 'manager' } });
    res.json(order);
  } catch (err) {
    res.status(500).json(err.message);
  }
};


const addNewOrder = async (req, res) => {
  try {
    if (Object.keys(req.body).every(key => req.body[key].trim())) {
      const { city, street, building, room } = req.body;
      const address = { city, street, building, room };
      const obj = { ...req.body };
      const deliveryAddress = Object.values(address).join(', ');
      for (key in address) {
        delete obj[key];
      }
      delete obj.client; //!!!!!!!!!!!!!
      const newOrder = await Order.create({ ...obj, deliveryAddress });
      // await Client.findByIdAndUpdate(client, { $push: { orders: newOrder._id } });
      // await User.findByIdAndUpdate(res.locals.id, { $push: { orders: newOrder._id } });

      res.json(newOrder);
    }
  } catch (err) {
    res.status(500).json(err.message);
  }
};

const addComment = async (req, res) => {
  try {
    const { id } = req.params;
    const { text } = req.body;
    const newComment = new Comment({ /*manager: res.locals.id,*/ text });
    await newComment.save();
    await Order.findByIdAndUpdate(id, { $push: { comments: newComment._id } });
    const order = await Order.findById(id).populate({ path: 'comments', populate: { path: 'manager' } });
    res.json(order);
    //   isAdmin: res.locals.admin,
    //   text: newComment.text,
    //   name: res.locals.name,
    //   lastname: res.locals.lastname,
    //   middlname: res.locals.middlname,
    // });
  } catch (err) {
    res.status(500).json(err.message);
  }
};

const renderNewOrderFormForClient = async (req, res) => {
  try {
    const client = await Client.findById(req.params.id);
    res.json(client);
  } catch (err) {
    res.status(500).json(err.message);
  }
};

const findAll = async (req, res) => {
  try {
    let { text } = req.body;
    text = text.toLowerCase();
    const orders = await Order.find();
    const result = orders.filter((order) => order.number === text
      || order.title?.toLowerCase().includes(text)
      || order.status?.toLowerCase().includes(text));
    res.json(result);
  } catch (err) {
    res.status(500).json(err.message);
  }
};

const editOrder = async (req, res) => {
  try {
    await Order.findByIdAndUpdate(req.params.id, { ...req.body });
    const editorder = await Order.findById(req.params.id).populate('client').populate({ path: 'comments', populate: { path: 'manager' } });
    res.json(editorder);
  } catch (err) {
    res.status(500).json(err.message);
  }

};

const deliteOrder = async (req, res) => {
  try {
    await Order.findByIdAndDelete(req.params.id);
    res.sendStatus(200);
  } catch (err) {
    res.status(500).json(err.message);
  }
};

// const changeStatus = async (req, res) => {
//   try {
//     const order = await Order.findById(req.params.id);
//     order.status = req.body.status;
//     await order.save();
//     res.sendStatus(200);
//   } catch (err) {
//     res.status(500).json(err.message);
//   }

// };

module.exports = {
  renderAllOrders,
  renderOrder,
  addNewOrder,
  addComment,
  findAll,
  addNewOrder,
  renderNewOrderFormForClient,
  editOrder,
  deliteOrder,
};
