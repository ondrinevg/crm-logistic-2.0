const { Schema, model } = require('mongoose');

const addressSchema = new Schema({
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
  },
  room: {
    type: String,
    required: true,
  }
);

// addressSchema.statics.finalAddress = async function (id) {
//   return this.findById().({}).exec();
// }

module.exports = model('Address', addressSchema);
