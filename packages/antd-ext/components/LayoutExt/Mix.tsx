import React from 'react';
import type { Theme } from '../ConfigProviderExt/context';
import { useMapTheme } from '../utils';
import type { LayoutExtProps } from './LayoutHermesExt';
import LayoutHermesExt from './LayoutHermesExt';
import LayoutZeusExt from './LayoutZeusExt';
import { customStyleWithLayoutExt as customStyleWithHermesLayoutExt } from './ThemeHermes';
import { customStyleWithLayoutExt as customStyleWithZeusLayoutExt } from './ThemeZeus';

export interface LayoutExtMixinProps extends LayoutExtProps {
  theme?: Theme;
}

export default function Mixin(props: LayoutExtMixinProps) {
  const { theme: customTheme, className, ...restProps } = props;
  const { ThemeWrapper, classes, theme } = useMapTheme({
    theme: customTheme,
    className,
    emotioncss: {
      hermes: customStyleWithHermesLayoutExt,
      zeus: customStyleWithZeusLayoutExt,
    },
    themeWrap: {},
  });

  return (
    <ThemeWrapper>
      {theme === 'zeus' ? (
        <LayoutZeusExt {...restProps} className={classes} />
      ) : (
        <LayoutHermesExt {...restProps} className={classes} />
      )}
    </ThemeWrapper>
  );
}
