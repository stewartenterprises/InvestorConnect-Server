// Import Modules
const { v4: uuidv4 } = require('uuid');
const router = require('express').Router();
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');

// Import MiddleWear
const validateToken = require('../middlewear/ValidateToken');

// Import Models
const User = require('../schemas/UserSchema');
const { updateContact, createContact } = require('../middlewear/Hubspot');
const { getStreamToken } = require('../middlewear/StreamChat');
const { updateUsers } = require('../middlewear/Scripts');
const { sendResetPasswordEmail } = require('../middlewear/Sendgrid');

// Setup Stream Chat

// Create Routes

// Signup Route
router.post('/signup', async (req, res) => {
  const { data } = req.body;
  const { email, password, gender, lookingFor } = data;

  if (!email || !password) {
    return res.status(400).send('No Email or Password');
  }

  let emailExists = false;
  let emailBanned = false;
  let valid = false;
  let token = null;
  let user = null;

  // Check If Email is Banned
  const findBanned = await User.find({
    'account.email': email,
    'account.isBanned': true,
  }).catch((err) => console.log(err));

  if (findBanned && findBanned.length > 0) {
    emailBanned = true;
  }

  // Check If Email Already Exists If Not Banned
  if (!emailBanned) {
    const findEmailExists = await User.find({
      'account.email': email,
      'settings.accountDeleted': false,
    }).catch((err) => console.log(err));

    if (findEmailExists && findEmailExists.length > 0) {
      emailExists = true;
    }
  }

  // If Email is Not Banned and Does Not Exist, Create New User
  if (!emailExists && !emailBanned) {
    // Hash Password
    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(password, salt);
    // Create UUID
    const uuid = uuidv4();

    const newUser = new User({
      'account.email': email,
      'account.password': hashedPassword,
      'account.uuid': uuid,
      'personal.gender': gender,
      'filters.gender': lookingFor,
    });

    await newUser.save();
    valid = true;
    user = newUser;

    // Create Token
    token = jwt.sign({ _id: newUser._id }, process.env.TOKEN_SECRET);

    // Create Hubspot Contact
    createContact(newUser._id);
  }

  return res.status(200).json({ emailExists, emailBanned, valid, token, user });
});

// Login Route
router.post('/login', async (req, res) => {
  const { data } = req.body;
  const { email, password } = data;

  if (!email || !password) {
    return res.status(400).send('No Email or Password');
  }

  let emailBanned = false;
  let passwordError = false;
  let noAccount = false;
  let valid = false;
  let token = null;
  let user = null;

  // Check If Email is Banned
  const findBanned = await User.find({
    'account.email': email,
    'account.isBanned': true,
  }).catch((err) => console.log(err));

  if (findBanned && findBanned.length > 0) {
    emailBanned = true;
  }

  // If email is not banned, find User and Check Password
  if (!emailBanned) {
    const findUser = await User.findOne({
      'account.email': email,
      'settings.accountDeleted': false,
    }).catch((err) => {
      console.log(err);
    });

    if (findUser) {
      let userPassword = findUser.account.password;

      const validPassword = await bcrypt.compare(password, userPassword);
      if (validPassword) {
        valid = true;
        user = findUser;
        token = jwt.sign({ _id: findUser._id }, process.env.TOKEN_SECRET);
      } else {
        passwordError = true;
      }
    } else {
      noAccount = true;
    }
  }

  return res
    .status(200)
    .json({ emailBanned, valid, token, passwordError, noAccount, user });
});

// Update Password Route
router.post('/updatePassword', validateToken, async (req, res) => {
  const { data } = req.body;
  const { newPassword, currentPassword } = data;

  const user = await User.findOne({ _id: req.user._id }).catch((err) =>
    res.status(400).send('Error Finding User')
  );

  if (!user) {
    return res.status(400).send('User Not Found');
  }

  let passwordValid = false;

  let currentPasswordSaved = user.account.password;

  const validPassword = await bcrypt.compare(
    currentPassword,
    currentPasswordSaved
  );

  if (validPassword) {
    passwordValid = true;
    // Hash Password
    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(newPassword, salt);

    await User.findByIdAndUpdate(user._id, {
      'account.password': hashedPassword,
      'activity.lastActive': Date.now(),
    }).catch((err) => {
      console.log(err);
    });
  }

  return res.status(200).json({ passwordValid });
});

// Reset Password Route
router.post('/resetPassword', async (req, res) => {
  const { data } = req.body;
  const { email } = data;

  let valid = false;
  let message = '';

  const user = await User.findOne({
    'account.email': email,
    'settings.accountDeleted': false,
    'account.isBanned': false,
  }).catch((err) => console.log(err));

  if (user) {
    valid = true;
    // Create token
    let token = jwt.sign(
      { _id: user._id },
      process.env.RESET_PASSWORD_TOKEN_SECRET
    );

    // User
    await User.findByIdAndUpdate(user._id, {
      'storage.resetPasswordToken': token,
    }).catch((err) => {
      console.log(err);
    });

    // Send Reset Email Here
    sendResetPasswordEmail(user, token);
  } else {
    message = 'No Account Found With That Email';
  }

  return res.status(200).json({ valid, message });
});

// Fetch User Route / Protected Route
router.post('/user', validateToken, async (req, res) => {
  const user = await User.findById(req.user._id).catch((err) => {
    console.log(err);
    return res.status(400).send('User Not Found');
  });

  if (!user) {
    return res.status(400).send('User Not Found');
  }

  // Fetch Stream Token
  const streamToken = await getStreamToken(user);

  // Run Dev Scripts
  // updateUsers();

  return res.status(200).json({ user, streamToken });
});

// Stream Token Route
router.post('/streamToken', validateToken, async (req, res) => {
  const user = await User.findOne({ _id: req.user._id }).catch((err) =>
    res.status(400).send('Error Finding User')
  );

  if (!user) {
    return res.status(400).send('User Not Found');
  }

  // Fetch Stream Token
  const streamToken = await getStreamToken(user);

  res.status(200).json({ streamToken });
});

module.exports = router;
