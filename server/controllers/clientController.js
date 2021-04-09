const Client = require('../db/models/client');
const Comment = require('../db/models/comment');

const postAddClient = async (req, res) => {
  // const manager = res.locals.id;
  const {
    name, lastname, middlename, phone, email,
  } = req.body;
  try {
    if (name && lastname && middlename && phone && email) {
      const newClient = await Client.create({
        name, lastname, middlename, phone, email,
      });
      return res.sendStatus(200).json(newClient);
    }
  } catch (err) {
    return res.status(418).json(err.message);
  }
};

const renderAllClients = async (req, res) => {
  try {
    const clients = await Client.find();
    res.status(200).json(clients);
  } catch (error) {
    res.status(500).json(error.message);
  }
};

const renderClient = async (req, res) => {
  try {
    const client = await Client.findById(req.params.id).populate('orders').populate({ path: 'comments', populate: { path: 'manager' } });
    res.status(200).json(client);
  } catch (err) {
    res.status(500).json(err.message);
  }

};

const findClients = async (req, res) => {
  try {
    const { lastName } = req.query;
    let allClients = []
    if (lastName) allClients = await Client.find({ lastname: new RegExp(`^${lastName}.*`, 'ig') });
    res.status(200).json(allClients);
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
    await Client.findByIdAndUpdate(id, { $push: { comments: newComment._id } });
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

const findAll = async (req, res) => {
  try {
    let { text } = req.body;
    text = text.toLowerCase();
    const clients = await Client.find();
    const result = clients.filter((client) => client.name.toLowerCase()?.includes(text)
      || client.lastname?.toLowerCase().includes(text)
      || client.middlename?.toLowerCase().includes(text));
    res.status(200).json(result);
  } catch (err) {
    res.status(500).json(err.message);
  }
};

const renderEditClient = async (req, res) => {
  try {
    const client = await Client.findById(req.params.id);
    res.status(200).json(client);
  } catch (err) {
    res.status(500).json(err.message);
  }
};

const postEditClient = async (req, res) => {
  try {
    const client = await Client.findByIdAndUpdate(req.params.id, { ...req.body });
    res.sendStatus(200);
  } catch (err) {
    res.status(500).json(err.message);
  }
};

const deliteClient = async (req, res) => {
  try {
    await Client.findByIdAndDelete(req.params.id);
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
  renderEditClient,
  postEditClient,
  deliteClient,
};
