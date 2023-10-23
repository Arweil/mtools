import { is, isArray, isImage, isObject, isSet } from '../src/is';

describe('is', () => {
  test('is', () => {
    expect(is(undefined)).toEqual('Undefined');
    expect(is(null)).toEqual('Null');
    expect(is({})).toEqual('Object');
    expect(is([])).toEqual('Array');
    expect(is(new Set([]))).toEqual('Set');
    expect(is(new Map([]))).toEqual('Map');
  });

  test('isArray', () => {
    expect(isArray([])).toEqual(true);
    expect(isArray({})).toEqual(false);
  });

  test('isSet', () => {
    expect(isSet(new Set([]))).toEqual(true);
    expect(isSet({})).toEqual(false);
  });

  test('isObject', () => {
    expect(isObject({})).toEqual(true);
    expect(isObject(undefined)).toEqual(false);
  });

  test('isImage', () => {
    expect(isImage('a.jpg')).toEqual(true);
    expect(isImage('a.JPG')).toEqual(true);
    expect(isImage('b.txt')).toEqual(false);
  });
});
