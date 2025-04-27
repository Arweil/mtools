import React from 'react';
import type { Theme } from '../ConfigProviderExt/context';
import ThemeWrapper from '../theme/ThemeWrapper';
import useMapTheme from '../utils/useMapTheme';
import type { CardListExtProps } from './cardList';
import CardListExt from './cardList';
import { customStyle } from './ThemeHerme';

export interface CardListExtMixinProps extends CardListExtProps {
  theme?: Theme;
}

const Mix: React.FC<CardListExtMixinProps> = props => {
  const { className, theme, ...restProps } = props;
  const { classes, themeConfig } = useMapTheme({
    className,
    theme,
    emotioncss: {
      hermes: customStyle,
      zeus: customStyle,
    },
  });

  return (
    <ThemeWrapper theme={themeConfig} type="List">
      <CardListExt className={classes} {...restProps} />
    </ThemeWrapper>
  );
};

export default Mix;
