const mongoose = require('mongoose');
const profileMatchSchema = new mongoose.Schema(
  {
    users: {
      sender: {
        type: mongoose.Schema.Types.ObjectId,
        default: null,
      },
      receiver: {
        type: mongoose.Schema.Types.ObjectId,
        default: null,
      },
    },
    message: {
      type: String,
      default: '',
    },
    attachment: mongoose.Schema.Types.Mixed,
    item: {
      type: {
        type: String,
        default: '',
      },
      answer: {
        question: {
          type: String,
          default: '',
        },
        answer: {
          type: String,
          default: '',
        },
      },
      media: {
        caption: {
          type: String,
          default: '',
        },
        url: {
          type: String,
          default: '',
        },
      },
    },
    card: {},
  },
  { timestamps: true }
);

module.exports = mongoose.model('ProfileMatch', profileMatchSchema);
