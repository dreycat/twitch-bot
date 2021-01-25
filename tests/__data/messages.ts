import config from '../../src/config';

const { channel } = config.twitch;

const joinAndPartMessage =
  `:anotherttvviewer!anotherttvviewer@anotherttvviewer.tmi.twitch.tv JOIN #${channel}\r\n` +
  `:violets_tv!violets_tv@violets_tv.tmi.twitch.tv JOIN #${channel}\r\n` +
  `:nuclearpigeons!nuclearpigeons@nuclearpigeons.tmi.twitch.tv PART #${channel}`;

const privateMessage =
  `@badge-info=;badges=;client-nonce=1e37ce7108fafd9d1fe2c42824cd3bf5;color=#2E8B57;` +
  `display-name=username;emotes=;flags=;id=cdb3792e-53d5-4dda-be1e-90cda575cdbe;mod=0;room-id=513890973;` +
  `subscriber=0;tmi-sent-ts=1691188220732;turbo=0;user-id=187778766;` +
  `user-type= :username!username@username.tmi.twitch.tv PRIVMSG #${channel} :test`;

const pingMessage = 'PING :tmi.twitch.tv';

export { joinAndPartMessage, privateMessage };
