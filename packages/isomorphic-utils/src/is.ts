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

/**
 * 根据文件后缀判断是否是一个图片
 * @param {string} imageName /path/a.jpg
 * @returns {boolean}
 */
export function isImage(imageName: string): boolean {
  const suffix = imageName.split('.').pop()!.toUpperCase();
  return ['BMP', 'PNG', 'GIF', 'JPG', 'JPEG', 'SVG', 'WEBP'].includes(suffix);
}
