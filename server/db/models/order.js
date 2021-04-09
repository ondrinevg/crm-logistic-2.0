const { Schema, model } = require('mongoose');

const orderSchema = new Schema({
  title: {
    type: String,
    required: true,
  },
  number: {
    type: String,
  },
  contractNumber: {
    type: String,
  },
  status: {
    type: String,
    required: true,
    default: 'в работе',
  },
  client: {
    type: Schema.Types.ObjectId,
    ref: 'Client',
  },
  deliveryAddress: {
    type: String,
    required: true,
  },
  deliveryDate: {
    type: Date,
    required: true,
  },
  assemblyDate: {
    type: Date,
    required: true,
  },
  orderPrice: {
    type: Number,
    required: true,
  },
  payment: {
    type: Number,
    required: true,
  },
  deliveryPrice: {
    type: Number,
    required: true,
  },
  assemblyPrice: {
    type: Number,
    required: true,
  },
  comments: [{
    type: Schema.Types.ObjectId,
    ref: 'Comment',
  }],
  createdAt: Date,
},
{ timestamps: true }
);

module.exports = model('Order', orderSchema);
