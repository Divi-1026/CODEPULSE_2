const mongoose = require('mongoose');

const TheorySchema = new mongoose.Schema({
  user: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: true
  },
  markedProblems: [
    {
      type: String,
      unique: true // or mongoose.Schema.Types.ObjectId if referring to an Algorithm model
    }
  ]
});

module.exports = mongoose.model('Theory', TheorySchema);
