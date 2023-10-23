import { Big } from '../src';

describe('Big', () => {
  test('Big is imported', () => {
    expect(new Big(0.1).plus(0.2).toNumber()).toEqual(0.3);
  });
});
