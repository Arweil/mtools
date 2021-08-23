export function cloneInDeep<T = any>(data: T): T {
  return JSON.parse(JSON.stringify(data));
}
