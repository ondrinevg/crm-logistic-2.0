const Client = require('../db/models/client');
const Comment = require('../db/models/comment');
const User = require('../db/models/user')

const postAddClient = async (req, res) => {
  try {
    if (Object.keys(req.body).every(key => req.body[key].trim())) {
      const { cityReg, streetReg, buildingReg, roomReg, city, street, building, room } = req.body;
      const addressReg = { cityReg, streetReg, buildingReg, roomReg };
      const address = { city, street, building, room };
      const objForDeleting = { ...addressReg, ...address };
      const obj = { ...req.body };
      const registrationAddress = Object.values(addressReg).join(', ');
      const homeAddress = Object.values(address).join(', ');
      for (key in objForDeleting) {
        delete obj[key];
      }

      const newClient = await Client.create({ ...obj, registrationAddress, homeAddress, manager: req.user._id });
      await User.findByIdAndUpdate(req.user._id, { $push: { clients: newClient._id } });
      console.log(newClient);
      return res.json(newClient);
    }
  } catch (err) {
    return res.status(418).json(err.message);
  }
};

const renderAllClients = async (req, res) => {
  try {
    const clients = await Client.find().sort({ _id: -1 }).limit(15);
    res.json(clients);
  } catch (error) {
    res.status(500).json(error.message);
  }
};

const renderClient = async (req, res) => {
  try {
    const client = await Client.findById(req.params.id).populate('orders').populate({ path: 'comments', populate: { path: 'manager' } });
    res.json(client);
  } catch (err) {
    res.status(500).json(err.message);
  }
};

const findClients = async (req, res) => {
  try {
    const { lastName } = req.query;
    let allClients = [];
    if (lastName) allClients = await Client.find({ lastName: new RegExp(`^${lastName}.*`, 'ig') });
    res.status(200).json(allClients);
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
    await Client.findByIdAndUpdate(id, { $push: { comments: newComment._id } });
    const client = await Client.findById(id).populate('orders').populate({ path: 'comments', populate: { path: 'manager' } });
    res.json(client);
  } catch (err) {
    res.status(500).json(err.message);
  }
};

const findAll = async (req, res) => {
  try {
    let { text } = req.body;
    text = text.toLowerCase();
    const clients = await Client.find();
    const result = clients.filter((client) => client.name.toLowerCase()?.includes(text)
      || client.lastName?.toLowerCase().includes(text)
      || client.middleName?.toLowerCase().includes(text));
    if (result.length > 15) return res.json(result.slice(0, 15));
    return res.json(result);
  } catch (err) {
    return res.status(500).json(err.message);
  }
};

const postEditClient = async (req, res) => {
  try {
    if (Object.keys(req.body).every(key => req.body[key].trim())) {
      const { cityReg, streetReg, buildingReg, roomReg, city, street, building, room } = req.body;
      const addressReg = { cityReg, streetReg, buildingReg, roomReg };
      const address = { city, street, building, room };
      const objForDeleting = { ...addressReg, ...address };
      const obj = { ...req.body };
      const registrationAddress = Object.values(addressReg).join(', ');
      const homeAddress = Object.values(address).join(', ');
      for (key in objForDeleting) {
        delete obj[key];
      }
      await Client.findByIdAndUpdate(req.params.id, { ...obj, registrationAddress, homeAddress });
      const client = await Client.findById(req.params.id).populate({ path: 'comments', populate: { path: 'manager' } });
      res.json(client);
    }
  } catch (err) {
    res.status(500).json(err.message);
  }
};

const deliteClient = async (req, res) => {
  try {
    const { id } = req.params;
    const client = await Client.findById(id);
    const clientsOrders = client.orders;
    for (orderid of clientsOrders) {
      await Order.findByIdAndDelete(orderid);
    }

    await User.findOneAndUpdate(client.manager, { $pull: { clients: id } });
    await Client.findByIdAndDelete(id);
    res.sendStatus(200);
  } catch (err) {
    res.status(500).json(err.message);
  }
};

module.exports = {
  renderAllClients,
  renderClient,
  findClients,
  addComment,
  postAddClient,
  findAll,
  postEditClient,
  deliteClient,
};
