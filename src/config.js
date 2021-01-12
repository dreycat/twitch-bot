exports.config = {
  twitch: {
    username: process.env.TWITCH_USERNAME,
    password: process.env.TWITCH_PASSWORD,
    channel: process.env.TWITCH_CHANNEL,
    URL: process.env.TWITCH_URL,
  },
  isProduction: process.env.NODE_ENV === 'production',
};
