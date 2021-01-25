export default {
  twitch: {
    username: process.env.TWITCH_USERNAME as string,
    password: process.env.TWITCH_PASSWORD as string,
    channel: process.env.TWITCH_CHANNEL as string,
    URL: process.env.TWITCH_URL as string,
  },
  isProduction: process.env.NODE_ENV === 'production',
  notificationLifetime: 4000,
  busDelay: 10000,
};
