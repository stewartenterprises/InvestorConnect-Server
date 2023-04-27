const sendResetPasswordEmail = async (user, token) => {
  if (!user || !token) {
    return;
  }
  // Pass User Object
  const email = user?.account?.email;
  if (!email) {
    return;
  }
};

module.exports = {
  sendResetPasswordEmail,
};
