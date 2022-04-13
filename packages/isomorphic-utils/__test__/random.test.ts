import { getRandomStr } from "../src/random";

describe('random', () => {
  test('getRandomStr', () => {
    expect(getRandomStr()).toMatch(/r[0-9]*/);
  });
});
