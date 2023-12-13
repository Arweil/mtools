import React from 'react';
import { useMapTheme } from '../utils';
import type { ProInputNumberProps } from './ProInputNumber';
import ProInputNumber from './ProInputNumber';
import type { Theme } from '../ConfigProviderExt/context';
import ThemeWrapper from '../theme/ThemeWrapper';
import type { ProInputNumberOutLineProps } from './ProInputNumberOutLine';
import ProInputNumberOutLine from './ProInputNumberOutLine';

export interface ProInputNumberMixinProps extends ProInputNumberProps {
  theme?: Theme;
}

export function MixinProInputNumber(props: ProInputNumberMixinProps) {
  const { className, theme, ...restProps } = props;
  const { classes, themeConfig } = useMapTheme({
    className,
    theme,
    emotioncss: {},
  });

  return (
    <ThemeWrapper theme={themeConfig} type="Input">
      <ProInputNumber className={classes} {...restProps} />
    </ThemeWrapper>
  );
}

export interface ProInputNumberOutLineMixinProps extends ProInputNumberOutLineProps {
  theme?: Theme;
}

export function MixinProInputNumberOutLine(props: ProInputNumberOutLineMixinProps) {
  const { className, theme, ...restProps } = props;
  const { classes, themeConfig } = useMapTheme({
    className,
    theme,
    emotioncss: {},
  });

  return (
    <ThemeWrapper theme={themeConfig} type="Input">
      <ProInputNumberOutLine className={classes} {...restProps} />
    </ThemeWrapper>
  );
}
