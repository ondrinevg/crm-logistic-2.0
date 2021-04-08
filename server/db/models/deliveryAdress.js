const { Schema, model } = require('mongoose');

const deliveryAdress = new Schema({
  index: {
    type: String,
    required: true,
  },
  city: {
    type: String,
    required: true,
  },
  street: {
    type: String,
    required: true,
  },
  building: {
    type: String,
    required: true,
  }
);

module.exports = model('DeliveryAdress', deliveryAdress);
