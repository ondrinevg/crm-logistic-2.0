const { Schema, model } = require('mongoose');

const userSchema = new Schema({
  name: {
    type: String,
  },
  lastName: {
    type: String,
  },
  middleName: {
    type: String,
  },
  phone: {
    type: Number,
  },
  email: {
    type: String,
    required: true,
    unique: true,
  },
  password: {
    type: String,
    required: true,
  },
  role: {
    type: String,
    required: true,
    default: 'Manager',
  },
  clients: [{
    type: Schema.Types.ObjectId,
    ref: 'Client',
  }],
});

module.exports = model('User', userSchema);
