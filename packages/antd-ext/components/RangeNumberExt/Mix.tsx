import React from 'react';
import { Theme } from '../ConfigProviderExt/context';
import useMapTheme from '../utils/useMapTheme';
import type { RangeNumberExtProps } from './RangeNumberExt';
import RangeNumberExt from './RangeNumberExt';
import RangeNumberOutLineExt, { RangeNumberOutLineExtProps } from './RangeNumberOutLineExt';
import {
  ThemeHermesWithRangeNumberExt,
  customStyleWithRangeNumberExt,
  ThemeHermesWithRangeNumberOutLineExt,
  customStyleWithRangeNumberOutLineExt,
} from './ThemeHermes';

export interface RangeNumberExtMixProps extends RangeNumberExtProps {
  theme?: Theme;
}

export function MixinRangeNumberExt(props: RangeNumberExtMixProps) {
  const {
    className,
    theme,
    ...restProps
  } = props;
  const { classes, ThemeWrapper } = useMapTheme({
    className,
    theme,
    themeWrap: {
      hermes: ThemeHermesWithRangeNumberExt,
    },
    emotioncss: {
      hermes: customStyleWithRangeNumberExt,
    }
  });

  return (
    <ThemeWrapper>
      <RangeNumberExt {...restProps} className={classes} />
    </ThemeWrapper>
  );
}

export interface RangeNumberOutLineExtMixProps extends RangeNumberOutLineExtProps {
  theme?: Theme;
}

export function MixinRangeNumberOutLineExt(props: RangeNumberOutLineExtMixProps) {
  const {
    className,
    theme,
    ...restProps
  } = props;
  const { classes, ThemeWrapper } = useMapTheme({
    className,
    theme,
    themeWrap: {
      hermes: ThemeHermesWithRangeNumberOutLineExt,
    },
    emotioncss: {
      hermes: customStyleWithRangeNumberOutLineExt,
    }
  });

  return (
    <ThemeWrapper>
      <RangeNumberOutLineExt {...restProps} className={classes} />
    </ThemeWrapper>
  );
}
