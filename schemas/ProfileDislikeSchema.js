const mongoose = require('mongoose');
const profileDislikeSchema = new mongoose.Schema(
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

module.exports = mongoose.model('ProfileDislike', profileDislikeSchema);
