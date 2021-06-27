/* eslint-disable no-dupe-keys */
const Order = require('../db/models/order');
const User = require('../db/models/user');
const Client = require('../db/models/client');
const Comment = require('../db/models/comment');
const { userLoginRender } = require('./userController');
// const { response } = require('express');

const renderAllOrders = async (req, res) => {
  try {
    const orders = await Order.find().populate('client').sort({ _id: -1 }).limit(15);
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
      const { city, street, building, room, client } = req.body;
      const address = { city, street, building, room };
      const obj = { ...req.body };
      const deliveryAddress = Object.values(address).join(', ');
      for (key in address) {
        delete obj[key];
      }
      const newOrder = await Order.create({ ...obj, deliveryAddress });
      await Client.findByIdAndUpdate(client, { $push: { orders: newOrder._id } });
      const order = await Order.findById(newOrder._id).populate('client');
      res.json(order);
    }
  } catch (err) {
    res.status(500).json(err.message);
  }
};

const addComment = async (req, res) => {
  try {
    const { id } = req.params;
    const { text } = req.body;
    const newComment = new Comment({ manager: req.user._id, text });
    await newComment.save();
    await Order.findByIdAndUpdate(id, { $push: { comments: newComment._id } });
    const order = await Order.findById(id).populate('client').populate({ path: 'comments', populate: { path: 'manager' } });
    res.json(order);
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
    const result = orders.filter((order) =>
      order.number?.toString().toLowerCase().includes(text.toString().toLowerCase())
      || order.contractNumber?.toString().toLowerCase().includes(text.toString().toLowerCase())
      || order.title?.toLowerCase().includes(text)
      || order.status?.toLowerCase().includes(text));
      if (result.length > 15) return res.json(result.slice(0, 15));
    return res.json(result);
  } catch (err) {
    return res.status(500).json(err.message);
  }
};

const editOrder = async (req, res) => {
  try {
    const { id } = req.params;
    const { status, url, fileName } = req.body;
    if (status) {
      await Order.findByIdAndUpdate(id, { ...req.body });
      const editorder = await Order.findById(req.params.id).populate('client').populate({ path: 'comments', populate: { path: 'manager' } });
      return res.json(editorder);
    }
    if (url) {
      const order = await Order.findByIdAndUpdate(id, { $push: { url: { url, fileName } } }, { new: true }).populate('client').populate({ path: 'comments', populate: { path: 'manager' } });
      return res.json(order);
    }


    delete req.body.client;
    if (Object.keys(req.body).every(key => req.body[key].trim())) {
      const { city, street, building, room } = req.body;
      const address = { city, street, building, room };
      const obj = { ...req.body };
      const deliveryAddress = Object.values(address).join(', ');
      for (key in address) {
        delete obj[key];
      }

      await Order.findByIdAndUpdate(req.params.id, { ...obj, deliveryAddress });
      const editorder = await Order.findById(id).populate('client').populate({ path: 'comments', populate: { path: 'manager' } });
      return res.json(editorder);
    }
  } catch (err) {
    res.status(500).json(err.message);
  }
};

const deliteOrder = async (req, res) => {
  try {
    const { id } = req.params;
    const order = Order.findById(id);
    await Client.findOneAndUpdate(order.client, { $pull: { orders: id } });
    await Order.findByIdAndDelete(req.params.id);
    res.sendStatus(200);
  } catch (err) {
    res.status(500).json(err.message);
  }
};

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
