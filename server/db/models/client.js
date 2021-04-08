const { Schema, model } = require('mongoose');

const clientSchema = new Schema({
  name: {
    type: String,
    required: true,
  },
  lastName: {
    type: String,
  },
  middleName: {
    type: String,
  },
  phone: {
    type: Number,
    required: true,
  },
  email: {
    type: String,
    required: true,
  },
  registrationAddress: {
    type: String,
    required: true,
  },
  homeAddress: {
    type: String,
    required: true,
  },
  manager: {
    type: Schema.Types.ObjectId,
    ref: 'User',
  },
  orders: [{
    type: Schema.Types.ObjectId,
    ref: 'Order',
  }],
  comments: [{
    type: Schema.Types.ObjectId,
    ref: 'Comment',
  }],
});

module.exports = model('Client', clientSchema);
