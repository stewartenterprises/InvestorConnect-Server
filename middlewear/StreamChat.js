const { StreamChat } = require('stream-chat');
const User = require('../schemas/UserSchema');
const { v4: uuidv4 } = require('uuid');
const moment = require('moment/moment');

const streamChatClient = StreamChat.getInstance(
  process.env.STREAM_API_KEY,
  process.env.STREAM_API_SECRET
);

const getStreamToken = async (user) => {
  // Pass User Object
  if (!user) {
    return null;
  }
  let streamToken = null;
  let uuid = user?.account?.uuid || null;

  //   Create UUID if not found
  if (!uuid || uuid.length < 1) {
    const newUuid = uuidv4();
    await User.findByIdAndUpdate(user._id, {
      'account.uuid': newUuid,
    }).catch((err) => console.log(err));
    uuid = newUuid;
  }

  streamToken = streamChatClient.createToken(uuid);

  return streamToken;
};

const sendMessage = async (e) => {
  const { senderId, receiverId, message } = e;
  if (!senderId || !receiverId || !message) {
    return;
  }

  let sender = await User.findById(senderId).catch((err) => console.log(err));
  let receiver = await User.findById(receiverId).catch((err) =>
    console.log(err)
  );

  if (!sender || !receiver) {
    return;
  }

  let senderUuid = sender.account.uuid;
  let receiverUuid = receiver.account.uuid;

  let senderBirthday = sender.personal.birthday;
  let senderAge = moment().diff(senderBirthday, 'years');

  let receiverBirthday = receiver.personal.birthday;
  let receiverAge = moment().diff(receiverBirthday, 'years');

  //  Upsert Users to Ensure they Exist in Stream Chat
  const upsert = await streamChatClient.upsertUsers([
    {
      id: receiverUuid,
      role: 'user',
      name: receiver.account.firstName,
      image: receiver.media.mainImage,
      premium: receiver.account.premium,
      demo: receiver.account.isDemo,
      locationString: receiver.locations.currentLocationDisplayName,
      age: receiverAge,
    },
    {
      id: senderUuid,
      role: 'user',
      name: sender.account.firstName,
      image: sender.media.mainImage,
      premium: sender.account.premium,
      demo: sender.account.isDemo,
      locationString: receiver.locations.currentLocationDisplayName,
      age: senderAge,
    },
  ]);

  // Create Channel to Ensure Channel Between Members Exists
  let channel = streamChatClient.channel('messaging', {
    members: [senderUuid, receiverUuid],
    created_by_id: senderUuid,
  });

  await channel.create();

  // Send Message
  if (message && message.length > 0) {
    await channel
      .sendMessage({
        text: message,
        user_id: senderUuid,
      })
      .catch((err) => console.log(err));
  }
};

const blockUser = async (e) => {
  const { sender, receiver } = e;

  if (!sender || !receiver) {
    return;
  }

  let senderUuid = sender.account.uuid;
  let receiverUuid = receiver.account.uuid;

  let senderBirthday = sender.personal.birthday;
  let senderAge = moment().diff(senderBirthday, 'years');

  let receiverBirthday = receiver.personal.birthday;
  let receiverAge = moment().diff(receiverBirthday, 'years');

  //  Upsert Users to Ensure they Exist in Stream Chat
  const upsert = await streamChatClient.upsertUsers([
    {
      id: receiverUuid,
      role: 'user',
      name: receiver.account.firstName,
      image: receiver.media.mainImage,
      premium: receiver.account.premium,
      demo: receiver.account.isDemo,
      locationString: receiver.locations.currentLocationDisplayName,
      age: receiverAge,
    },
    {
      id: senderUuid,
      role: 'user',
      name: sender.account.firstName,
      image: sender.media.mainImage,
      premium: sender.account.premium,
      demo: sender.account.isDemo,
      locationString: receiver.locations.currentLocationDisplayName,
      age: senderAge,
    },
  ]);

  // Create Channel to Ensure Channel Between Members Exists
  let channel = streamChatClient.channel('messaging', {
    members: [senderUuid, receiverUuid],
    created_by_id: senderUuid,
  });

  await channel.create();

  // Mute Channel For Sender User
  await channel.mute({ user_id: senderUuid });
};

module.exports = {
  getStreamToken,
  sendMessage,
  blockUser,
};
