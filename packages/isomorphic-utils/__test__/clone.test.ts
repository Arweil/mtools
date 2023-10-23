import { cloneInDeep } from '../src/clone';

const obj: { [key: string]: any } = {
  key1: 'string data',
  key2: 0,
  key3: null,
  key4: undefined,
  key5: true,
  key6: {
    key1: {},
  },
  key7: [{ key: 1 }],
};

obj.key8 = obj;

const arr = [obj];

describe('clone', () => {
  test('cloneInDeep', () => {
    expect(cloneInDeep(arr)).toEqual(arr);
  });
});
