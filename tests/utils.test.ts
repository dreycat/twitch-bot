import { isJoinMessage } from '../src/parser';
import { joinAndPartMessage } from './__data/messages';

describe('utils', () => {
  test('isJoinMessage confirms the JOIN message', () => {
    expect(isJoinMessage(joinAndPartMessage)).toBeTruthy();
  });
});
