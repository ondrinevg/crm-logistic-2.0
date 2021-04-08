const { Schema, model } = require('mongoose');

const adress = new Schema({
  index: {
    type: Number,
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
  },
  room: {
    type: String,
    required: true,
  }
);

module.exports = model('Adress', adress);
