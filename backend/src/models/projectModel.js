const mongoose = require("mongoose");

const projectSchema = new mongoose.Schema({
  _id: {
    type: mongoose.Schema.Types.ObjectId,
    default: () => new mongoose.Types.ObjectId(), // You can rely on default behavior without needing this line
  },
  title: {
    type: String,
    required: true,
  },
  image: {
    type: String,
    required: true,
  },
  description: {
    type: String,
    required: true,
  },
  technics: {
    type: [String],
    required: true,
  },
  type: {
    type: String,
    required: true,
  },
  classification: {
    type: String,
    required: true,
  },
  details: {
    type: [
      {
        "sub-title": {
          type: String,
          required: true,
        },
        image: {
          type: mongoose.Schema.Types.Mixed,
        },
        description: {
          type: String,
          required: true,
        },
        link: {
          type: String,
        },
      },
    ],
    required: true,
  },
  likes: {
    type: Number,
  },
  comments: {
    type: [String],
  },
  dome: {
    type: String,
  },
});


module.exports = mongoose.model("Project", projectSchema);