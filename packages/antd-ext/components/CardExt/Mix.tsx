import React from 'react';
import type { Theme } from '../ConfigProviderExt/context';
import ThemeWrapper from '../theme/ThemeWrapper';
import useMapTheme from '../utils/useMapTheme';
import type { CardExtProps } from './CardExt';
import CardExt from './CardExt';
import { customStyle as customStyleHermes } from './ThemeHermes';

export interface CardExtMixinProps extends CardExtProps {
  theme?: Theme;
}

export default function Mixin(props: CardExtMixinProps) {
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
    <ThemeWrapper theme={themeConfig} type="Card">
      <CardExt className={classes} {...restProps} />
    </ThemeWrapper>
  );
}
