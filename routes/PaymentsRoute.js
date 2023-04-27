// Import Modules
const { v4: uuidv4 } = require('uuid');
const router = require('express').Router();
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const stripe = require('stripe')(process.env.STRIPE_SECRET_KEY);

// Import MiddleWear
const validateToken = require('../middlewear/ValidateToken');

// Import Models
const User = require('../schemas/UserSchema');
const { sendMessage, blockUser } = require('../middlewear/StreamChat');
const { createStripeCustomer } = require('../middlewear/Stripe');

const environment = process.env.ENVIRONMENT;

// Stripe Price Ids
let priceIds = {
  annual: 'price_1MuRvHFER3ilgbu5lgPcjp4n',
};

if (environment === 'PRODUCTION') {
  priceIds = {
    annual: 'price_1MiyUVFER3ilgbu5yn1RDkqi',
  };
}

router.post('/createCheckout', validateToken, async (req, res) => {
  const { data } = req.body;

  const { item, email } = data;

  let priceId = '';
  let url = '';
  let successUrl = 'https://www.vowsly.com/member-welcome';
  let cancelUrl = 'https://www.vowsly.com/';

  if (item === 'annual') {
    priceId = priceIds.annual;
  }

  if (!priceId) {
    return res.status(400).send('Invalid Item');
  }

  let user = await User.findById(req.user._id).catch((err) => {});
  let customerId = user?.payments?.customerId;

  if (!customerId) {
    customerId = await createStripeCustomer(user._id);
  }

  const session = await stripe.checkout.sessions.create({
    line_items: [
      {
        price: priceId,
        quantity: 1,
      },
    ],
    mode: 'subscription',
    success_url: successUrl,
    cancel_url: cancelUrl,
    customer_email: email,
    // TRYING OUT
    subscription_data: {
      metadata: {
        type: 'subscription',
        option: item,
        customerId: customerId,
      },
    },
  });

  url = session.url;
  let id = session.id;

  if (id) {
    await User.findByIdAndUpdate(req.user._id, {
      'payments.checkoutId': id,
    }).catch((err) => console.log(err));
  }

  return res.status(200).json({ url: url });
});

module.exports = router;
