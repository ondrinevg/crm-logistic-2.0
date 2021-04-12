const { Schema, model } = require('mongoose');

const commentSchema = new Schema({
  manager: {
    type: Schema.Types.ObjectId,
    ref: 'User',
  },
  createdAt: {
    type: Date,
    // required: true,
  },
  text: {
    type: String,
    // required: true,
  },
},
  { timestamps: true }
);

module.exports = model('Comment', commentSchema);
