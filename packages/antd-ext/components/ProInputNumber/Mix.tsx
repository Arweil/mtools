import React from 'react';
import { useMapTheme } from '../utils';
import type { ProInputNumberProps } from './ProInputNumber';
import ProInputNumber from './ProInputNumber';
import type { Theme } from '../ConfigProviderExt/context';
import { ThemeHermesWithProInputNumber } from './ThemeHermes';

export interface ProInputNumberMixinProps extends ProInputNumberProps {
  theme?: Theme;
}

export function MixinProInputNumber(props: ProInputNumberMixinProps) {
  const { className, theme, ...restProps } = props;
  const { classes, ThemeWrapper } = useMapTheme({
    className,
    theme,
    themeWrap: {
      hermes: ThemeHermesWithProInputNumber,
    },
    emotioncss: {},
  });

  return (
    <ThemeWrapper>
      <ProInputNumber className={classes} {...restProps} />
    </ThemeWrapper>
  );
}
