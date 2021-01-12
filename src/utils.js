const { cars } = require('./cars');
const { botList } = require('./botList');
const { config } = require('./config');

const getRandomIntInclusive = (min, max) => {
  min = Math.ceil(min);
  max = Math.floor(max);
  return Math.floor(Math.random() * (max - min + 1)) + min;
};

const getRandomItem = (items) => items[getRandomIntInclusive(0, items.length - 1)];

exports.makeMessage = (channel, username) => {
  const message = `К нам подъехал @${username} на ${getRandomItem(cars)}`;
  return `PRIVMSG #${channel} :${message}`;
};

exports.partial = (fn, ...args) => (...rest) => fn(...args.concat(rest));

exports.parseUsername = (message) => message.trim().substring(1, message.indexOf('!'));

exports.isJoinMessage = (channel, message) => message.includes(`JOIN #${channel}`);

exports.isNotSelf = (username) => username !== config.twitch.username;

exports.isRealUser = (username) => !botList.includes(username);
