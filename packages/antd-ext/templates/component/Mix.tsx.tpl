import React from 'react';
import {{{compName}}} from './{{{compName}}}';
import type { {{{compName}}}Props } from './{{{compName}}}';
import { customStyle as customStyleHermes } from './ThemeHermes';
import type { Theme } from '../ConfigProviderExt/context';
import useMapTheme from '../utils/useMapTheme';
import ThemeWrapper from '../theme/ThemeWrapper';


export interface {{{compName}}}MixinProps extends {{{compName}}}Props {
  theme?: Theme;
}

export default function Mixin(props: {{{compName}}}MixinProps) {
  const { className, theme, ...restProps } = props;
  const { classes, themeConfig } = useMapTheme({
    className,
    theme,
    emotioncss: {
      hermes: customStyleHermes,
    },
  });

  return (
    <ThemeWrapper theme={themeConfig} type="Form">
      <{{{compName}}} className={classes} {...restProps} />
    </ThemeWrapper>
  );
}
