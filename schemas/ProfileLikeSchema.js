const mongoose = require('mongoose');
const profileLikeSchema = new mongoose.Schema(
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
    isMatch: {
      type: Boolean,
      default: false,
    },
    message: {
      type: String,
      default: '',
    },
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
    rejected: {
      type: Boolean,
      default: false,
    },
    archived: {
      type: Boolean,
      default: false,
    },
    createdAt: {
      type: Date,
      default: null,
    },
    lastUpdated: {
      type: Date,
      default: null,
    },
    card: {},
  },
  { timestamps: true }
);

module.exports = mongoose.model('ProfileLike', profileLikeSchema);
