// Import Modules
const { v4: uuidv4 } = require('uuid');
const router = require('express').Router();
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const moment = require('moment/moment');

// Import MiddleWear
const validateToken = require('../middlewear/ValidateToken');

// Import Models
const User = require('../schemas/UserSchema');
const ProfileLike = require('../schemas/ProfileLikeSchema');

const {
  getQueueFilters,
  getTopPicksFilters,
  getMatchesFilters,
  getFavoritesFilters,
  getFavoritedByFilters,
  getViewsFilters,
  getViewedByFilters,
  getRecentlyActiveFilters,
} = require('../middlewear/SearchFilters');

router.post('/recentlyActive', validateToken, async (req, res) => {
  const user = await User.findById(req.user._id).catch((err) => {
    console.log(err);
  });
  if (!user) return res.status(400).send('User Found');
  let filters = await getRecentlyActiveFilters(user, false);
  let outOfCards = false;

  //   Fetch Cards
  let cards = await User.find(filters)
    .sort({
      'activity.lastActive': -1,
    })
    .limit(28)
    .catch((err) => {
      console.log(err);
    });
  return res.status(200).json({ cards });
});

router.post('/queue', validateToken, async (req, res) => {
  const user = await User.findById(req.user._id).catch((err) => {
    console.log(err);
  });
  if (!user) return res.status(400).send('User Found');

  let filters = await getQueueFilters(user, false);
  let outOfCards = false;

  //   Fetch Cards
  let cards = await User.find(filters)
    .sort({
      'analytics.adminScore': -1,
    })
    .limit(25)
    .catch((err) => {
      console.log(err);
    });

  if (!cards || cards.length === 0) {
    filters = await getQueueFilters(user, true);
    cards = await User.find(filters)
      .sort({
        'analytics.adminScore': -1,
      })
      .limit(25)
      .catch((err) => {
        console.log(err);
      });

    if (!cards || cards.length === 0) {
      outOfCards = true;
    }
  }

  return res.status(200).json({ cards, outOfCards });
});

router.post('/topPicks', validateToken, async (req, res) => {
  const user = await User.findById(req.user._id).catch((err) => {
    console.log(err);
  });
  if (!user) return res.status(400).send('User Found');

  // Check if Need to refresh Most Compatible
  const premium = user?.account?.premium;
  const lastRefreshDate = user?.activity.lastMostCompatibleRefresh;
  const mostCompatibleIds = user?.storage?.mostCompatibleIds;
  // If its been over 24 hours since last refresh, need to refresh most compatible users
  let fetch = false;
  if (lastRefreshDate) {
    const startOfToday = moment().startOf('d');
    const refreshDate = moment(lastRefreshDate);

    const isBefore = moment(refreshDate).isBefore(startOfToday);
    if (isBefore) {
      fetch = true;
    }
  } else {
    fetch = true;
  }

  // If Current Most Compatible IDs isn't long enough, need to refresh
  // Premium Users get 20 per day, Free users get 10
  let numToFetch = 16;
  // if (premium) {
  //   numToFetch = 16;
  // }
  if (mostCompatibleIds?.length < numToFetch) {
    fetch = true;
  }

  let cards = [];

  //   Fetch Cards
  if (fetch) {
    let filters = await getTopPicksFilters(user, false);

    cards = await User.find(filters)
      .sort({ 'analytics.adminScore': -1 })
      .limit(numToFetch)
      .catch((err) => console.log(err));

    if (cards?.length < numToFetch) {
      let filters = await getTopPicksFilters(user, true);

      cards = await User.find(filters)
        .sort({ 'analytics.adminScore': -1 })
        .limit(numToFetch)
        .catch((err) => console.log(err));
    }

    // Update User Storage
    let newMostCompatibleIds = [];
    const dateNow = new Date();
    for (let i = 0; i < cards.length; i++) {
      const tempId = cards[i]._id.toString();
      if (!newMostCompatibleIds.includes(tempId)) {
        newMostCompatibleIds.push(tempId);
      }
    }
    await User.findByIdAndUpdate(req.user._id, {
      'storage.mostCompatibleIds': newMostCompatibleIds,
      'activity.lastMostCompatibleRefresh': dateNow,
    }).catch((err) => {
      console.log(err);
    });
  } else {
    // Fetch Based on Most Compatible Ids in Storage
    // Filter Out any Blocked Users;
    // Filter Out any Disliked Users;
    // Filter Out any Matched Users;
    // Filters Out Any Liked users;
    let blockedIds = user.storage.blocked;
    let blockedByIds = user.storage.blockedBy;
    let dislikedIds = user.storage.disliked;
    let likedIds = user.storage.liked;
    let matchedIds = user.storage.matched;

    let mostCompatibleIdsFiltered = [];

    for (let i = 0; i < mostCompatibleIds.length; i++) {
      let id = mostCompatibleIds[i].toString();

      if (!blockedIds?.includes(id) && !blockedByIds?.includes(id)) {
        mostCompatibleIdsFiltered.push(id);
      }
    }

    cards = await User.find({
      _id: { $in: mostCompatibleIdsFiltered },
    })
      .limit(numToFetch)
      .sort({ 'activity.lastActive': -1 })
      .catch((err) => {
        console.log(err);
      });

    cards.reverse();
  }

  return res.status(200).json({ cards });
});

router.post('/matches', validateToken, async (req, res) => {
  const user = await User.findById(req.user._id).catch((err) => {
    console.log(err);
  });
  if (!user) return res.status(400).send('User Found');

  let filters = await getMatchesFilters(user);

  //   Fetch Cards
  const cards = await User.find(filters)
    .limit(100)
    .catch((err) => {
      console.log(err);
    });
  return res.status(200).json({ cards });
});

router.post('/likesSent', validateToken, async (req, res) => {
  const user = await User.findById(req.user._id).catch((err) => {
    console.log(err);
  });
  if (!user) return res.status(400).send('User Found');

  let likesSent = await ProfileLike.find({
    'users.sender': req.user._id,
    archived: false,
  })
    .sort({
      lastUpdated: -1,
    })
    .limit(100)
    .catch((err) => console.log(err));

  return res.status(200).json({ likesSent });
});

router.post('/likesReceived', validateToken, async (req, res) => {
  const user = await User.findById(req.user._id).catch((err) => {
    console.log(err);
  });
  if (!user) return res.status(400).send('User Found');

  let likesReceived = await ProfileLike.find({
    'users.receiver': req.user._id,
    rejected: false,
    archived: false,
  })
    .sort({
      createdAt: -1,
    })
    .limit(100)
    .catch((err) => console.log(err));

  return res.status(200).json({ likesReceived });
});

router.post('/views', validateToken, async (req, res) => {
  const user = await User.findById(req.user._id).catch((err) => {
    console.log(err);
  });
  if (!user) return res.status(400).send('User Found');

  let filters = await getViewsFilters(user);

  //   Fetch Cards
  const cards = await User.find(filters)
    .limit(100)
    .catch((err) => {
      console.log(err);
    });
  return res.status(200).json({ cards });
});

router.post('/viewedMe', validateToken, async (req, res) => {
  const user = await User.findById(req.user._id).catch((err) => {
    console.log(err);
  });
  if (!user) return res.status(400).send('User Found');

  let filters = await getViewedByFilters(user);

  //   Fetch Cards
  const cards = await User.find(filters)
    .limit(100)
    .catch((err) => {
      console.log(err);
    });
  return res.status(200).json({ cards });
});

router.post('/profile', validateToken, async (req, res) => {
  const { data } = req.body;
  const { cardUuid } = data;

  if (!cardUuid) return res.status(400).send('No card uuid provided');

  //   Fetch Cards
  const card = await User.findOne({
    'account.uuid': cardUuid,
    'account.isBanned': false,
    'settings.profilePaused': false,
  }).catch((err) => {
    console.log(err);
  });

  if (!card) return res.status(400).send('No card found');

  return res.status(200).json({ card });
});

module.exports = router;
