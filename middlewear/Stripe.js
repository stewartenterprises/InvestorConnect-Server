const stripe = require('stripe')(process.env.STRIPE_SECRET_KEY);
const User = require('../schemas/UserSchema');

const createStripeCustomer = async (e) => {
  let userId = e;
  if (!userId) {
    return;
  }

  const findUser = await User.findById(userId).catch((err) => console.log);

  let customerId = findUser?.payments?.customerId;

  if (findUser && !findUser?.payments?.customerId) {
    // User
    let email = findUser?.account?.email;
    let uuid = findUser?.account?.uuid;
    let phoneNumber = findUser?.account?.phoneNumber;
    let firstName = findUser?.account?.firstName;
    let lastName = findUser?.account.lastName;
    let fullName = firstName;
    if (lastName && lastName?.length > 0) {
      fullName = firstName + ' ' + lastName;
    }

    let customerObject = {
      email: email,
      name: fullName,
      phone: phoneNumber,
      metadata: {
        uuid: uuid,
      },
    };
    const customer = await stripe.customers
      .create(customerObject)
      .catch((err) => {
        console.log(err);
        console.log('Customer Stripe Error');
      });

    if (customer && customer?.id) {
      customerId = customer?.id;

      await User.findByIdAndUpdate(userId, {
        'payments.customerId': customerId,
      }).catch((err) => console.log(err));
    }
  }

  return customerId;
};

module.exports = {
  createStripeCustomer,
};
