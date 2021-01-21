import config from '../../src/config';

const { channel } = config.twitch;

const joinAndPartMessage =
  `:anotherttvviewer!anotherttvviewer@anotherttvviewer.tmi.twitch.tv JOIN #${channel}\r\n` +
  `:violets_tv!violets_tv@violets_tv.tmi.twitch.tv JOIN #${channel}\r\n` +
  `:nuclearpigeons!nuclearpigeons@nuclearpigeons.tmi.twitch.tv PART #${channel}`;

export { joinAndPartMessage };
