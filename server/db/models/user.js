const { Schema, model } = require('mongoose');

const userSchema = new Schema({
  googleId: {
    type: String,
  },
  googleName: {
    type: String,
  },
  photo: {
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
    sparse: true,
  },
  canAccess: {
    type: Boolean,
    default: true,
  },
  accessToken: {
    type: String,
  },
  refreshToken: {
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
