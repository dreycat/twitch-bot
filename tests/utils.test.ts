import { isJoinMessage } from '../src/utils';
import { joinAndPartMessage, channel } from './__data/messages';

describe('utils', () => {
  test('isJoinMessage confirms the JOIN message', () => {
    expect(isJoinMessage(channel, joinAndPartMessage)).toBeTruthy();
  });
});
