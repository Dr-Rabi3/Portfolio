const mongoose = require('mongoose');

const skillsSchema = mongoose.Schema({
  _id: {
    type: mongoose.Schema.Types.ObjectId,
    default: () => new mongoose.Types.ObjectId(), // You can rely on default behavior without needing this line
  },
  title: {
    type: String,
    required: true,
  },
  list: {
    type: [String],
    required: true,
  },
});

module.exports = mongoose.model("Skills", skillsSchema);