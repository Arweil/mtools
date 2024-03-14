import React from 'react';
import type { Theme } from '../ConfigProviderExt/context';
import ThemeWrapper from '../theme/ThemeWrapper';
import useMapTheme from '../utils/useMapTheme';
import type { RangeNumberExtProps } from './RangeNumberExt';
import RangeNumberExt from './RangeNumberExt';
import type { RangeNumberOutLineExtProps } from './RangeNumberOutLineExt';
import RangeNumberOutLineExt from './RangeNumberOutLineExt';
import { customStyleWithRangeNumberExt, customStyleWithRangeNumberOutLineExt } from './ThemeHermes';

export interface RangeNumberExtMixProps extends RangeNumberExtProps {
  theme?: Theme;
}

export function MixinRangeNumberExt(props: RangeNumberExtMixProps) {
  const { className, theme, ...restProps } = props;
  const { classes, themeConfig } = useMapTheme({
    className,
    theme,
    emotioncss: {
      hermes: customStyleWithRangeNumberExt,
      zeus: customStyleWithRangeNumberExt,
    },
  });

  return (
    <ThemeWrapper theme={themeConfig} type="InputNumber">
      <RangeNumberExt {...restProps} className={classes} />
    </ThemeWrapper>
  );
}

export interface RangeNumberOutLineExtMixProps extends RangeNumberOutLineExtProps {
  theme?: Theme;
}

export function MixinRangeNumberOutLineExt(props: RangeNumberOutLineExtMixProps) {
  const { className, theme, ...restProps } = props;
  const { classes, themeConfig } = useMapTheme({
    className,
    theme,
    emotioncss: {
      hermes: customStyleWithRangeNumberOutLineExt,
      zeus: customStyleWithRangeNumberOutLineExt,
    },
  });

  return (
    <ThemeWrapper theme={themeConfig} type="InputNumber">
      <RangeNumberOutLineExt {...restProps} className={classes} />
    </ThemeWrapper>
  );
}
