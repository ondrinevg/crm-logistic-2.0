const { Schema, model } = require('mongoose');

const userSchema = new Schema({
  googleId: {
    type: String,
  },
  googleName: {
    type: String,
  },
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
    unique: true,
  },
  password: {
    type: String,
  },
  role: {
    type: String,
    default: 'Manager',
  },
  clients: [{
    type: Schema.Types.ObjectId,
    ref: 'Client',
  }],
});

module.exports = model('User', userSchema);
