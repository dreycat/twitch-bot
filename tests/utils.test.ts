import { isJoinMessage } from '../src/lib/utils';
import { joinAndPartMessage } from './__data/messages';
import config from '../src/config';
const { channel } = config.twitch;

describe('utils', () => {
  test('isJoinMessage confirms the JOIN message', () => {
    expect(isJoinMessage(channel, joinAndPartMessage)).toBeTruthy();
  });
});
