const mongoose = require("mongoose");

const awardSchema = mongoose.Schema({
  _id: {
    type: mongoose.Schema.Types.ObjectId,
    default: () => new mongoose.Types.ObjectId(), // You can rely on default behavior without needing this line
  },
  text: {
    type: String,
    required: true,
  },
});

module.exports = mongoose.model("Award", awardSchema);

