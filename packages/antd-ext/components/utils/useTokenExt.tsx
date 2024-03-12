import { useContext, useMemo } from 'react';
import type { Theme } from '../ConfigProviderExt/context';
import { AntdExtGlobalContext } from '../ConfigProviderExt/context';
import * as hermesToken from '../theme/hermes';
import * as zeusToken from '../theme/zeus';

export default function useTokenExt(customTheme: Theme) {
  // 自定义主题 'zeus' | 'hermes' | 'default'，以及对应主题合并后的自定义token
  // 没有用 ConfigProvider 时，mergedTokenExt 为 {}
  const { themeExt, mergedTokenExt } = useContext(AntdExtGlobalContext);
  const tokenExt = useMemo(() => {
    return {
      hermes: { ...hermesToken, ...mergedTokenExt },
      zeus: { ...zeusToken, ...mergedTokenExt },
      default: { ...hermesToken, ...mergedTokenExt },
    }[customTheme || themeExt];
  }, [mergedTokenExt, customTheme, themeExt]);

  return tokenExt;
}
