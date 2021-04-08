const { Schema, model } = require('mongoose');

const adress = new Schema({
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

module.exports = model('Adress', adress);
