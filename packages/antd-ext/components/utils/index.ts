import useMapTheme from './useMapTheme';
import usePrefixCls from './usePrefixCls';
import type { ThemeColor } from '../theme/type';

function mergeColor(d: Partial<ThemeColor>, c: Partial<ThemeColor>) {
  return { ...d, ...c };
}

export {
  useMapTheme,
  usePrefixCls,
  mergeColor,
}
