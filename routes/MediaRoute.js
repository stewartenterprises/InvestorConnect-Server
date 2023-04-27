const router = require('express').Router();
const validateToken = require('../middlewear/ValidateToken');
const jwt = require('jsonwebtoken');
const multer = require('multer');
const { uploadMedia } = require('../middlewear/UploadMedia');
const storage = multer.memoryStorage();
const upload = multer({ storage });
const User = require('../schemas/UserSchema');

router.post('/upload', upload.single('file'), async (req, res) => {
  const token = req.headers.auth;
  if (!token) return res.status(401).send('Access Denied');

  try {
    const verified = jwt.verify(token, process.env.TOKEN_SECRET);
    req.user = verified;
  } catch (err) {
    res.status(400).send('Invalid Token');
  }

  const media = await uploadMedia(req.file, req.user._id);

  const { valid } = media;
  const { location } = media;

  if (valid) {
    const findUser = await User.findById(req.user._id);
    const array = findUser.media.profileMedia.public;
    const prevFirstImage = array[0];
    array.push(location);
    const newFirstImage = array[0];
    const { length } = array;
    const dateNow = new Date();
    const updateUser = await User.findByIdAndUpdate(req.user._id, {
      'media.profileMedia.public': array,
      'media.profileMedia.publicLength': length,
      'media.mainImage': newFirstImage,
      'activity.lastMediaUpdate': dateNow,
      'admin.reviewed': false,
      'activity.lastActive': Date.now(),
    });

    // if (prevFirstImage !== newFirstImage) {
    //   updateConversations(findUser._id);

    //   // Update SendGrid
    //   if (updateUser?.account?.onboarded) {
    //     upsertContact(updateUser?._id);
    //   }
    // }

    // let uuid = findUser?.account?.uuid;
    // emitEvent(uuid, { type: 'update' });

    res.status(200).json({
      isValid: valid,
      media: array,
    });
  } else {
    res.status(200).json({ isValid: valid });
  }
});

router.post('/replace', upload.single('file'), async (req, res) => {
  const token = req.headers.auth;
  if (!token) return res.status(401).send('Access Denied');

  try {
    const verified = jwt.verify(token, process.env.TOKEN_SECRET);
    req.user = verified;
  } catch (err) {
    res.status(400).send('Invalid Token');
  }

  const media = await uploadMedia(req.file, req.user._id);

  const { valid } = media;
  const { location } = media;
  const { index } = req.headers;

  if (valid && index) {
    const findUser = await User.findById(req.user._id);
    const array = findUser.media.profileMedia.public;
    const prevFirstImage = array[0];
    array[index] = location;
    const newFirstImage = array[0];
    const { length } = array;
    const dateNow = new Date();

    const updateUser = await User.findByIdAndUpdate(req.user._id, {
      'media.profileMedia.public': array,
      'activity.lastMediaUpdate': dateNow,
      'media.profileMedia.publicLength': length,
      'media.mainImage': newFirstImage,
      'admin.reviewed': false,
      'activity.lastActive': Date.now(),
    });

    //   if (prevFirstImage !== newFirstImage) {
    //     updateConversations(findUser._id);

    //     // Update SendGrid
    //     if (updateUser?.account?.onboarded) {
    //       upsertContact(updateUser?._id);
    //     }
    //   }
    //   let uuid = findUser?.account?.uuid;
    //   emitEvent(uuid, { type: 'update' });
    res.status(200).json({
      isValid: valid,
      media: array,
    });
  } else {
    res.status(200).json({ isValid: valid });
  }
});

module.exports = router;
