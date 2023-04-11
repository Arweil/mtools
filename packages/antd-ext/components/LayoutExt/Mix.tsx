import React from 'react';
import LayoutExt, { LayoutExtProps } from './LayoutExt';
import {
  customStyleWithLayoutExt,
  ThemeHermesWithLayoutExt,
} from './ThemeHermes';
import type { Theme } from '../ConfigProviderExt/context';
import { useMapTheme } from '../utils';

export interface LayoutExtMixinProps extends LayoutExtProps {
  theme?: Theme;
}

export default function Mixin(props: LayoutExtMixinProps) {
  const { theme, className, ...restProps } = props;
  const {
    ThemeWrapper,
    classes,
  } = useMapTheme({
    theme,
    className,
    emotioncss: {
      hermes: customStyleWithLayoutExt,
    },
    themeWrap: {
      hermes: ThemeHermesWithLayoutExt,
    }
  });

  return (
    <ThemeWrapper>
      <LayoutExt {...restProps} className={classes} />
    </ThemeWrapper>
  );
}
