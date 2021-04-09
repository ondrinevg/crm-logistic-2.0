const Client = require('../db/models/client');
const Comment = require('../db/models/comment');

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

      const newClient = await Client.create({ ...obj, registrationAddress, homeAddress });
      return res.json(newClient);
    }
  } catch (err) {
    return res.status(418).json(err.message);
  }
};

const renderAllClients = async (req, res) => {
  try {
    const clients = await Client.find();
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
    const newComment = new Comment({ /*manager: res.locals.id,*/ text });
    await newComment.save();
    await Client.findByIdAndUpdate(id, { $push: { comments: newComment._id } });
    const client = await Client.findById(id).populate({ path: 'comments', populate: { path: 'manager' } });
    res.json(client);
      // isAdmin: res.locals.admin,
      // text: newComment.text,
      // name: res.locals.name,
      // lastname: res.locals.lastname,
      // middlname: res.locals.middlname,
    // });
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
    res.status(200).json(result);
  } catch (err) {
    res.status(500).json(err.message);
  }
};

const postEditClient = async (req, res) => {
  try {
    console.log(req.params.id);
    await Client.findByIdAndUpdate(req.params.id, { ...req.body });
    const client = await Client.findById(req.params.id).populate({ path: 'comments', populate: { path: 'manager' } });
    res.json(client);
  } catch (err) {
    res.status(500).json(err.message);
  }
};

const deliteClient = async (req, res) => {
  try {
    const clientsOrders = (await Client.findById(req.params.id)).orders;
    for (id of clientsOrders) {
      await Order.findByIdAndDelete(id);
    }

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
  postEditClient,
  deliteClient,
};
