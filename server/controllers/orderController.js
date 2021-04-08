/* eslint-disable no-dupe-keys */
const Order = require('../db/models/order');
const Counter = require('../db/models/counter');
const User = require('../db/models/user');
const Client = require('../db/models/client');
const Comment = require('../db/models/comment');
const Address = require('../db/models/adress')
// const { response } = require('express');

const renderAllOrders = async (req, res) => {
  try {
    const orders = await Order.find().populate('client');
    res.status(200).json(orders);
  } catch (err) {
    res.status(500).json(err.message);
  }
};

const renderOrder = async (req, res) => {
  try {
    const order = await Order.findById(req.params.id).populate('client').populate({ path: 'comments', populate: { path: 'manager' } });
    res.status(200).json(order);
  } catch (err) {
    res.status(500).json(err.message);
  }
};

/// 
const addNewOrder = async (req, res) => {
  try { 
    const address = { index,  city, street, building, room} = req.body;
    const obj = {...req.body};

const newAddress = await Address.create({...address})
    for (key in address) {
      delete obj[key];
    }
    const newOrder = await Order.create({ ...obj, deliveryAddress: newAddress._id });
    // await Client.findByIdAndUpdate(client, { $push: { orders: newOrder._id } });
    // await User.findByIdAndUpdate(res.locals.id, { $push: { orders: newOrder._id } });

    res.status(200).json(newOrder);
  } catch (err) {
    res.status(500).json(err.message);
  }
};

const addComment = async (req, res) => {
  try {
    const { id } = req.params;
    const { text } = req.body;
    const newComment = new Comment({ manager: res.locals.id, text });
    await newComment.save();
    await Order.findByIdAndUpdate(id, { $push: { comments: newComment._id } });
    res.status(200).json({
      isAdmin: res.locals.admin,
      text: newComment.text,
      name: res.locals.name,
      lastname: res.locals.lastname,
      middlname: res.locals.middlname,
    });
  } catch (err) {
    res.status(500).json(err.message);
  }

};

const renderNewOrderFormForClient = async (req, res) => {
  try {
    const client = await Client.findById(req.params.id);
    res.status(200).json(client);
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
    res.status(200).json(result);
  } catch (err) {
    res.status(500).json(err.message);
  }
};

const renderOrderEdit = async (req, res) => {
  try {
    const order = await Order.findById(req.params.id).populate('client');
    res.status(200).json(order);
  } catch (err) {
    res.status(500).json(err.message);
  }

};

const editOrder = async (req, res) => {
  try {
    await Order.findByIdAndUpdate(req.params.id, { ...req.body });
    res.sendStatus(200);
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

const changeStatus = async (req, res) => {
  try {
    const order = await Order.findById(req.params.id);
    order.status = req.body.status;
    await order.save();
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
  renderOrderEdit,
  editOrder,
  deliteOrder,
  changeStatus,
};
