import React from 'react';
import FormItemExt from './FormItemExt';
import type { FormItemExtProps } from './FormItemExt';
import { customStyle as customStyleHermes } from './ThemeHermes';
import type { Theme } from '../ConfigProviderExt/context';
import useMapTheme from '../utils/useMapTheme';
import ThemeWrapper from '../theme/ThemeWrapper';

export interface FormItemExtMixinProps extends FormItemExtProps {
  theme?: Theme;
}

export default function Mixin(props: FormItemExtMixinProps) {
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
      <FormItemExt className={classes} {...restProps} />
    </ThemeWrapper>
  );
}
