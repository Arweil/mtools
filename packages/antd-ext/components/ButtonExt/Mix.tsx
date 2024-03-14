import React from 'react';
import type { Theme } from '../ConfigProviderExt/context';
import ThemeWrapper from '../theme/ThemeWrapper';
import useMapTheme from '../utils/useMapTheme';
import type { ButtonExtProps } from './ButtonExt';
import ButtonExt from './ButtonExt';
import { customStyle as customStyleHermes } from './ThemeHermes';

export interface ButtonExtMixinProps extends ButtonExtProps {
  theme?: Theme;
}

export default function Mixin(props: ButtonExtMixinProps) {
  const { className, theme, ...restProps } = props;
  const { classes, themeConfig } = useMapTheme({
    className,
    theme,
    emotioncss: {
      hermes: customStyleHermes,
      zeus: customStyleHermes,
    },
  });

  return (
    <ThemeWrapper autoInsertSpaceInButton={theme !== 'hermes'} theme={themeConfig} type="Button">
      <ButtonExt className={classes} {...restProps} />
    </ThemeWrapper>
  );
}
