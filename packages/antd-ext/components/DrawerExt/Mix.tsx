import React, { useMemo } from 'react';
import type { Theme } from '../ConfigProviderExt/context';
import useMapTheme from '../utils/useMapTheme';
import type { DrawerExtProps } from './DrawerExt';
import { customStyle } from './ThemeHermes';
import DrawerExt from './DrawerExt';
import { colorGreyL6 } from '../theme/hermes';

export interface DrawerExtMixinProps extends DrawerExtProps {
  theme?: Theme;
}

export default function Mixin(props: DrawerExtMixinProps) {
  const {
    className,
    theme: customTheme,
    headerStyle,
    footerStyle,
    okButtonProps,
    cancelButtonProps,
    ...restProps
  } = props;
  const { classes, ThemeWrapper, globalTheme } = useMapTheme({
    className,
    theme: customTheme,
    themeWrap: {},
    emotioncss: {
      hermes: customStyle,
    },
  });

  const formattedHeaderStyle = useMemo(() => {
    return {
      hermes: {
        background: colorGreyL6,
        ...headerStyle,
      },
      zeus: {},
      default: {},
    }[customTheme || globalTheme];
  }, [customTheme, globalTheme, headerStyle]);

  const formattedFooterStyle = useMemo(() => {
    return {
      hermes: {
        height: 64,
        ...footerStyle,
      },
      zeus: {},
      default: {},
    }[customTheme || globalTheme];
  }, [customTheme, globalTheme, footerStyle]);

  const buttonProps = useMemo(() => {
    return {
      okButtonProps: {
        ...okButtonProps,
        theme: (okButtonProps && okButtonProps.theme) || customTheme || globalTheme,
      },
      cancelButtonProps: {
        ...cancelButtonProps,
        theme: (cancelButtonProps && cancelButtonProps?.theme) || customTheme || globalTheme,
      },
    };
  }, [okButtonProps, cancelButtonProps, customTheme, globalTheme]);

  return (
    <ThemeWrapper>
      <DrawerExt
        {...buttonProps}
        {...restProps}
        headerStyle={formattedHeaderStyle}
        footerStyle={formattedFooterStyle}
        rootClassName={classes}
      />
    </ThemeWrapper>
  );
}
