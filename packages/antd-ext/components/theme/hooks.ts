import { theme } from 'antd';
import type { ThemeColor } from './type';

const { useToken } = theme;

export const useThemeExt = () => {
  const { token } = useToken();
  const tokenExt = {} as ThemeColor;

  return {
    token,
    tokenExt,
  };
};
