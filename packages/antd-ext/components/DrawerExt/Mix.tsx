import React, { useMemo } from 'react';
import type { Theme } from '../ConfigProviderExt/context';
import useMapTheme from '../utils/useMapTheme';
import type { DrawerExtProps } from './DrawerExt';
import { ThemeHermesWithDrawerExt, customStyle } from './ThemeHermes';
import DrawerExt from './DrawerExt';
import {
  colorGreyL6
} from '../theme/hermes';

export interface DrawerExtMinixProps extends DrawerExtProps {
  theme?: Theme;
}

export default function Minix(props: DrawerExtMinixProps) {
  const { className, theme: customTheme, headerStyle, footerStyle, ...restProps } = props;
  const { classes, ThemeWrapper, globalTheme } = useMapTheme({
    className,
    theme: customTheme,
    themeWrap: {
      hermes: ThemeHermesWithDrawerExt,
    },
    emotioncss: {
      hermes: customStyle,
    }
  });

  const formattedHeaderStyle = useMemo(() => {
    return {
      hermes: {
        background: colorGreyL6,
        height: 64,
        ...headerStyle,
      },
      zeus: {},
      default: {},
    }[customTheme || globalTheme]
  }, [customTheme, globalTheme, headerStyle]);

  const formattedFooterStyle = useMemo(() => {
    return {
      hermes: {
        height: 78,
        borderTop: 0,
        ...footerStyle,
      },
      zeus: {},
      default: {},
    }[customTheme || globalTheme]
  }, [customTheme, globalTheme, headerStyle]);

  return (
    <ThemeWrapper>
      <DrawerExt {...restProps} headerStyle={formattedHeaderStyle} footerStyle={formattedFooterStyle} rootClassName={classes} />
    </ThemeWrapper>
  )
}
