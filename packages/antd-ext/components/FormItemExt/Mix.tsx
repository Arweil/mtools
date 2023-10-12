import React from 'react';
import FormItemExt from './FormItemExt';
import type { FormItemExtProps } from './FormItemExt';
import { default as ThemeHermes, customStyle as customStyleHermes } from './ThemeHermes';
import type { Theme } from '../ConfigProviderExt/context';
import useMapTheme from '../utils/useMapTheme';

export interface FormItemExtMixinProps extends FormItemExtProps {
  theme?: Theme;
}

export default function Mixin(props: FormItemExtMixinProps) {
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
      <FormItemExt className={classes} {...restProps} />
    </ThemeWrapper>
  );
}
