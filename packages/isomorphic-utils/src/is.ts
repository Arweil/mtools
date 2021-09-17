export function isArray<T = any>(params: any): params is Array<T> {
  return is(params) === 'Array';
}

export function isSet<T = any>(params: any): params is Set<T> {
  return is(params) === 'Set';
}

export function isObject<T = {}>(params: any): params is T {
  return is(params) === 'Object';
}

export function is(params: any): 'Object' | 'Array' | 'Map' | 'Set' | 'Null' | 'Undefined' {
  const type = Object.prototype.toString.call(params);
  return type.replace(/(\[object|\]|\s)/g, '');
}
