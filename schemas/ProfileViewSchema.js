const mongoose = require('mongoose');
const profileViewSchema = new mongoose.Schema(
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
    firstViewed: {
      type: Date,
      default: null,
    },
    lastViewed: {
      type: Date,
      default: null,
    },
    archived: {
      type: Boolean,
      default: false,
    },
    read: {
      type: Boolean,
      default: false,
    },
    card: {},
  },
  { timestamps: true }
);

module.exports = mongoose.model('ProfileView', profileViewSchema);
