// Import Modules
const { v4: uuidv4 } = require('uuid');
const router = require('express').Router();
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');

// Import MiddleWear
const validateToken = require('../middlewear/ValidateToken');

// Import Models
const User = require('../schemas/UserSchema');
const ProfileLike = require('../schemas/ProfileLikeSchema');
const ProfileDislike = require('../schemas/ProfileDislikeSchema');

// Import Functions
const { sendMessage, blockUser } = require('../middlewear/StreamChat');

router.post('/sendMessage', validateToken, async (req, res) => {
  const { data } = req.body;
  const { receiverId, message } = data;

  if (!receiverId || !message) {
    return res.status(400).send('No Card or Message');
  }

  let payload = {
    senderId: req.user._id?.toString(),
    receiverId: receiverId?.toString(),
    message: message,
  };

  sendMessage(payload);

  // Count Pre Messages Sent

  const findUser = await User.findById(req.user._id).catch((err) => {
    console.log(err);
  });

  let freeMessagesSent = findUser?.storage?.freeMessagesSent;
  let newFreeMessagesSent = freeMessagesSent + 1;
  await User.findByIdAndUpdate(req.user._id, {
    'storage.freeMessagesSent': newFreeMessagesSent,
    'activity.lastActive': Date.now(),
  }).catch((err) => console.log(err));

  return res.status(200).send('Message Sent');
});

router.post('/sendLike', validateToken, async (req, res) => {
  const { data } = req.body;
  const { cardId } = data;

  const user = await User.findById(req.user._id).catch((err) => {
    console.log(err);
  });
  if (!user) return res.status(400).send('User Found');

  let receiverCard = await User.findById(cardId).catch((err) => {});

  // Find Profile Like
  let findLike = await ProfileLike.findOne({
    'users.sender': req.user._id,
    'users.receiver': cardId,
  }).catch((err) => {});

  if (findLike) {
    // If Like Exists, Update
    await ProfileLike.findByIdAndUpdate(findLike._id, {
      lastUpdated: Date.now(),
      card: receiverCard,
    }).catch((err) => {
      console.log(err);
    });
  }

  if (!findLike) {
    // If Like Does Not Exist, Create
    // Create Profile Like
    let newLike = new ProfileLike({
      'users.sender': req.user._id,
      'users.receiver': cardId,
      createdAt: Date.now(),
      lastUpdated: Date.now(),
      card: receiverCard,
    });
    await newLike.save().catch((err) => {
      console.log(err);
    });
  }

  // TODO - Check if MATCH

  // Update User Storage - Sender

  let likedUsers = user.storage.liked;

  if (!likedUsers.includes(cardId?.toString())) {
    likedUsers.push(cardId);
  }

  await User.findByIdAndUpdate(req.user._id, {
    'storage.liked': likedUsers,
    'activity.lastActive': Date.now(),
  }).catch((err) => console.log(err));

  // Update User Storage - Receiver
  let likedByUsers = receiverCard.storage.likedBy;
  if (!likedByUsers.includes(user._id?.toString())) {
    likedByUsers.push(user._id);
  }

  await User.findByIdAndUpdate(receiverCard._id, {
    'storage.likedBy': likedByUsers,
  }).catch((err) => console.log(err));

  return res.status(200).send('User Liked');
});

router.post('/sendDislike', validateToken, async (req, res) => {
  const { data } = req.body;
  const { cardId } = data;

  const user = await User.findById(req.user._id).catch((err) => {
    console.log(err);
  });
  if (!user) return res.status(400).send('User Found');

  let receiverCard = await User.findById(cardId).catch((err) => {});

  // Find Profile Dislike
  let findDislike = await ProfileDislike.findOne({
    'users.sender': req.user._id,
    'users.receiver': cardId,
  }).catch((err) => {});

  if (findDislike) {
    // If Dislike Exists, Update
    await ProfileDislike.findByIdAndUpdate(findDislike._id, {
      lastUpdated: Date.now(),
      card: receiverCard,
    }).catch((err) => {
      console.log(err);
    });
  }

  if (!findDislike) {
    // If Dislike Does Not Exist, Create
    // Create Profile Dislike
    let newDislike = new ProfileDislike({
      'users.sender': req.user._id,
      'users.receiver': cardId,
      createdAt: Date.now(),
      lastUpdated: Date.now(),
      card: receiverCard,
    });
    await newDislike.save().catch((err) => {
      console.log(err);
    });
  }

  // Update User Storage - Sender

  let dislikedUsers = user.storage.disliked;

  if (!dislikedUsers.includes(cardId?.toString())) {
    dislikedUsers.push(cardId);
  }

  await User.findByIdAndUpdate(req.user._id, {
    'storage.disliked': dislikedUsers,
    'activity.lastActive': Date.now(),
  }).catch((err) => console.log(err));

  // Update User Storage - Receiver
  let dislikedByUsers = receiverCard.storage.dislikedBy;
  if (!dislikedByUsers.includes(user._id?.toString())) {
    dislikedByUsers.push(user._id);
  }

  await User.findByIdAndUpdate(receiverCard._id, {
    'storage.dislikedBy': dislikedByUsers,
  }).catch((err) => console.log(err));

  return res.status(200).send('User Disliked');
});

router.post('/removeLike', validateToken, async (req, res) => {
  const { data } = req.body;
  const { cardId } = data;

  return res.status(200).send('Removed Like');
});
router.post('/viewUser', validateToken, async (req, res) => {});
router.post('/blockUser', validateToken, async (req, res) => {
  const { data } = req.body;
  const { cardId, cardUuid, reason } = data;

  const user = await User.findById(req.user._id).catch((err) =>
    console.log(err)
  );

  if (!user) return res.status(400).send('User Not Found');

  let receiver = null;

  if (cardId) {
    receiver = await User.findById(cardId).catch((err) => console.log(err));
  } else if (cardUuid) {
    receiver = await User.findOne({
      'account.uuid': cardUuid,
    }).catch((err) => console.log(err));
  }

  // Update Sender
  let blockedUsers = user.storage.blocked || [];
  if (!blockedUsers?.includes(receiver?._id?.toString())) {
    blockedUsers.push(receiver?._id?.toString());
  }
  // Update Receiver
  let blockedBy = receiver?.storage?.blockedBy || [];
  if (!blockedBy?.includes(user?._id?.toString())) {
    blockedBy.push(user?._id?.toString());
  }

  // Stream Chat
  let payload = {
    sender: user,
    receiver: receiver,
  };
  blockUser(payload);

  return res.status(200).send('User Blocked');
});
router.post('/unblockUser', validateToken, async (req, res) => {});

module.exports = router;
