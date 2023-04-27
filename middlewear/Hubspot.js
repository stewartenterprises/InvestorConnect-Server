// Import Packages
const hubspot = require('@hubspot/api-client');
// Import Schemas
const User = require('../schemas/UserSchema');
// Import Config
const environment = process.env.ENVIRONMENT;

// Configure Hubspot Client
const hubspotClient = new hubspot.Client({
  accessToken: process.env.HUBSPOT_TOKEN,
});

// Functions

const createContact = async (e) => {
  if (environment !== 'PRODUCTION') {
    return;
  }

  let userId = e;
  if (!userId) {
    return;
  }

  const findUser = await User.findById(userId).catch((err) => console.log(err));

  if (!findUser) {
    return;
  }

  let valid = false;
  let contactId = findUser.account.hubspotId;

  if (contactId) {
    updateContact(userId);
    return;
  }

  let contactObject = {
    properties: {
      email: findUser.account.email || '',
      firstname: findUser.account.firstName || '',
      lastname: findUser.account.lastName || '',
      phone: findUser.account.phoneNumber || '',
      uuid: findUser.account.uuid || '',
      location: findUser.locations.currentLocationDisplayName || '',
      onboarded: findUser.account.onboarded?.toString() || 'false',
      gender: findUser.personal.gender || '',
      looking_for: findUser.filters.gender || '',
      email_verified: findUser.verification.email?.toString() || 'false',
      id_verified: findUser.verification.id?.toString() || 'false',
      premium: findUser.account.premium?.toString() || 'false',
    },
  };

  let contactExists = false;

  const createContactResponse = await hubspotClient.crm.contacts.basicApi
    .create(contactObject)
    .catch((err) => {
      console.log(err);
      console.log('Inside Hubspot Create Contact Error');
      let errorCategory = err?.body?.category;
      if (errorCategory === 'CONFLICT') {
        // Contact Already Exists - Update Contact
        contactExists = true;
        updateContact(userId);
      }
    });

  if (contactExists) {
    return;
  }

  let response = createContactResponse;

  // Update User With Hubspot Contact ID
  let hubspotId = response?.id?.toString();
  if (hubspotId) {
    await User.findByIdAndUpdate(userId, {
      'account.hubspotId': hubspotId,
      'activity.lastActive': Date.now(),
    }).catch((err) => console.log(err));

    valid = true;
  }

  return valid;
};

const updateContact = async (e) => {
  if (environment !== 'PRODUCTION') {
    return;
  }

  let userId = e;
  if (!userId) {
    return;
  }

  const findUser = await User.findById(userId).catch((err) => console.log(err));

  if (!findUser) {
    return;
  }

  let contactId = findUser.account.hubspotId;
  let valid = false;

  if (!contactId) {
    createContact(userId);
    return;
  }

  let birthday = findUser.personal.birthday;
  if (birthday) {
    birthday = birthday.toDateString();
    birthday = new Date(birthday).toISOString().substring(0, 10);
  }

  let contactObject = {
    properties: {
      email: findUser.account.email || '',
      firstname: findUser.account.firstName || '',
      lastname: findUser.account.lastName || '',
      phone: findUser.account.phoneNumber || '',
      uuid: findUser.account.uuid || '',
      location: findUser.locations.currentLocationDisplayName || '',
      onboarded: findUser.account.onboarded?.toString() || 'false',
      gender: findUser.personal.gender || '',
      looking_for: findUser.filters.gender || '',
      email_verified: findUser.verification.email?.toString() || 'false',
      id_verified: findUser.verification.id?.toString() || 'false',
      birthday: birthday || '',
      premium: findUser.account.premium?.toString() || 'false',
    },
  };

  const updateContactResponse = await hubspotClient.crm.contacts.basicApi
    .update(contactId, contactObject)
    .catch((err) => {
      console.log(err);
      console.log('Inside Hubspot Update Contact Error');
      let errorCategory = err?.body?.category;
      console.log('Error Category', errorCategory);
      if (errorCategory === 'CONFLICT') {
        // Contact Already Exists - Update Contact
        createContact(userId);
      }
    });

  return valid;
};

module.exports = {
  createContact,
  updateContact,
};
