// Import Modules
const { v4: uuidv4 } = require('uuid');
const router = require('express').Router();
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');

// Import MiddleWear
const validateToken = require('../middlewear/ValidateToken');

// Import Models
const User = require('../schemas/UserSchema');
const { getLocationDataFromCoordinates } = require('../middlewear/LocationIQ');
const { updateContact, createContact } = require('../middlewear/Hubspot');

router.post('/update', validateToken, async (req, res) => {
  const { option, data } = req.body.data;

  if (!option || !data) {
    return res.status(400).send('No Option or Data');
  }

  const findUser = await User.findById(req.user._id).catch((err) => {
    console.log(err);
  });

  if (!findUser) {
    return res.status(400).send('User Not Found');
  }

  let user = null;

  //   Update User

  //   Full Name
  if (option === 'fullName') {
    user = await User.findByIdAndUpdate(req.user._id, {
      'account.firstName': data?.firstName || findUser.account.firstName,
      'account.lastName': data?.lastName || findUser.account.lastName,
      'activity.lastActive': Date.now(),
    }).catch((err) => console.log(err));
  }

  //   Birthday
  if (option === 'birthday') {
    user = await User.findByIdAndUpdate(req.user._id, {
      'personal.birthday': data?.birthday || findUser.personal.birthday,
      'activity.lastActive': Date.now(),
    }).catch((err) => console.log(err));
  }

  //   Location
  if (option === 'location') {
    let coordinates = data?.coordinates;
    let locationString = data?.locationString;
    const res = await getLocationDataFromCoordinates(coordinates);

    if (res.valid && res.data) {
      const coordinatesArray = [coordinates?.longitude, coordinates?.latitude];
      await User.findByIdAndUpdate(req.user._id, {
        'locations.currentLocation.coordinates': coordinatesArray,
        'locations.currentLocationDisplayName':
          locationString || findUser.locations.currentLocationDisplayName,
        'locations.currentLocationObject':
          res.data || findUser.locations.currentLocationObject,
        'activity.lastActive': Date.now(),
      }).catch((err) => console.log(err));
    }
  }

  user = await User.findById(req.user._id).catch((err) => {
    console.log(err);
  });

  // Update Hubspot Contact
  updateContact(user._id);

  return res.status(200).json({ user });
});

router.post('/updateCaption', validateToken, async (req, res) => {
  const { data } = req.body;
  const { caption } = data;
  const { index } = data;

  if (index === 0) {
    await User.findByIdAndUpdate(req.user._id, {
      'captions.captionOne': caption,
      'activity.lastActive': Date.now(),
    }).catch((err) => console.log(err));
  } else if (index === 1) {
    await User.findByIdAndUpdate(req.user._id, {
      'captions.captionTwo': caption,
      'activity.lastActive': Date.now(),
    }).catch((err) => console.log(err));
  } else if (index === 2) {
    await User.findByIdAndUpdate(req.user._id, {
      'captions.captionThree': caption,
      'activity.lastActive': Date.now(),
    }).catch((err) => console.log(err));
  } else if (index === 3) {
    await User.findByIdAndUpdate(req.user._id, {
      'captions.captionFour': caption,
      'activity.lastActive': Date.now(),
    }).catch((err) => console.log(err));
  } else if (index === 4) {
    await User.findByIdAndUpdate(req.user._id, {
      'captions.captionFive': caption,
      'activity.lastActive': Date.now(),
    }).catch((err) => console.log(err));
  } else if (index === 5) {
    await User.findByIdAndUpdate(req.user._id, {
      'captions.captionSix': caption,
      'activity.lastActive': Date.now(),
    }).catch((err) => console.log(err));
  }

  const findUser = await User.findById(req.user._id).catch((err) => {
    console.log(err);
  });

  const { captions } = findUser;

  res.status(200).send({ captions });
});

router.post('/completeOnboarding', validateToken, async (req, res) => {
  const findUser = await User.findById(req.user._id).catch((err) =>
    console.log(err)
  );

  if (!findUser) {
    return res.status(400).send('User Not Found');
  }

  await User.findByIdAndUpdate(req.user._id, {
    'account.onboarded': true,
    'activity.lastActive': Date.now(),
  }).catch((err) => console.log(err));

  const user = await User.findById(req.user._id).catch((err) => {
    console.log(err);
  });

  // Handle Onboarded Tasks Here
  // Send Verification Email
  // Update Hubspot Contact
  updateContact(user._id);

  return res.status(200).json({ user });
});

router.post('/savePersonalInfo', validateToken, async (req, res) => {
  const { data } = req.body;
  const { coordinates, locationString } = data;

  if (!coordinates || !locationString) {
    return res.status(400).send('No Coordinates or Location String');
  }

  const findUser = await User.findById(req.user._id).catch((err) =>
    console.log(err)
  );

  if (!findUser) {
    return res.status(400).send('User Not Found');
  }

  let payload = {
    latitude: coordinates[1],
    longitude: coordinates[0],
  };

  const response = await getLocationDataFromCoordinates(payload);

  if (response.valid && response.data) {
    const coordinatesArray = [payload?.longitude, payload?.latitude];
    await User.findByIdAndUpdate(req.user._id, {
      'locations.currentLocation.coordinates': coordinatesArray,
      'locations.currentLocationDisplayName':
        locationString || findUser.locations.currentLocationDisplayName,
      'locations.currentLocationObject':
        response.data || findUser.locations.currentLocationObject,
      'activity.lastActive': Date.now(),
    }).catch((err) => console.log(err));
  }

  const user = await User.findById(req.user._id).catch((err) => {
    console.log(err);
  });

  updateContact(user._id);

  return res.status(200).json({ user });
});

router.post('/saveProfileDescription', validateToken, async (req, res) => {
  const { data } = req.body;
  const { lookingFor, headline, aboutMe } = data;

  await User.findByIdAndUpdate(req.user._id, {
    'descriptions.headline': headline,
    'descriptions.aboutMe': aboutMe,
    'descriptions.lookingFor': lookingFor,
    'activity.lastActive': Date.now(),
  }).catch((err) => console.log(err));

  res.status(200).send({});
});

router.post('/saveEssentialInfo', validateToken, async (req, res) => {
  const { data } = req.body;
  const { height, ethnicity, religion, politics, children, familyPlans } = data;

  await User.findByIdAndUpdate(req.user._id, {
    'physicals.ethnicity': ethnicity,
    'physicals.height': height,
    'lifestyle.religion': religion,
    'lifestyle.politics': politics,
    'family.children': children,
    'family.familyPlans': familyPlans,
    'activity.lastActive': Date.now(),
  }).catch((err) => console.log(err));

  res.status(200).send({});
});

router.post('/saveLifestyleInfo', validateToken, async (req, res) => {
  const { data } = req.body;
  const { drinking, smoking, cannabis, drugs } = data;

  await User.findByIdAndUpdate(req.user._id, {
    'lifestyle.drinking': drinking,
    'lifestyle.smoking': smoking,
    'lifestyle.cannabis': cannabis,
    'lifestyle.drugs': drugs,
  }).catch((err) => console.log(err));

  res.status(200).send({});
});

module.exports = router;
