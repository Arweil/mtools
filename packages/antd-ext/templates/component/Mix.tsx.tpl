import React from 'react';
import {{{compName}}} from './{{{compName}}}';
import type { {{{compName}}}Props } from './{{{compName}}}';
import { default as ThemeHermes, customStyle as customStyleHermes } from './ThemeHermes';
import type { Theme } from '../ConfigProviderExt/context';
import useMapTheme from '../utils/useMapTheme';

export interface {{{compName}}}MixinProps extends {{{compName}}}Props {
  theme?: Theme;
}

export default function Mixin(props: {{{compName}}}MixinProps) {
  const { className, theme, ...restProps } = props;
  const { classes, ThemeWrapper, tokenExt } = useMapTheme({
    className,
    theme,
    themeWrap: {
      hermes: ThemeHermes,
    },
    emotioncss: {
      hermes: customStyleHermes,
    },
  });

  return (
    <ThemeWrapper tokenExt={tokenExt}>
      <{{{compName}}} className={classes} {...restProps} />
    </ThemeWrapper>
  );
}
