import React, { useMemo } from 'react';
import type { Theme } from '../ConfigProviderExt/context';
import useMapTheme from '../utils/useMapTheme';
import type { DrawerExtProps } from './DrawerExt';
import { customStyle } from './ThemeHermes';
import DrawerExt from './DrawerExt';
import ThemeWrapper from '../theme/ThemeWrapper';

export interface DrawerExtMixinProps extends DrawerExtProps {
  theme?: Theme;
}

export default function Mixin(props: DrawerExtMixinProps) {
  const {
    className,
    theme,
    headerStyle,
    footerStyle,
    okButtonProps,
    cancelButtonProps,
    ...restProps
  } = props;

  const {
    classes,
    themeConfig,
    tokenExt,
    theme: customTheme,
  } = useMapTheme({
    className,
    theme,
    emotioncss: {
      hermes: customStyle,
    },
  });

  const formattedHeaderStyle = useMemo(() => {
    return {
      hermes: {
        background: tokenExt.colorGreyL6,
        ...headerStyle,
      },
      zeus: {},
      default: {},
    }[customTheme];
  }, [customTheme, headerStyle, tokenExt.colorGreyL6]);

  const formattedFooterStyle = useMemo(() => {
    return {
      hermes: {
        height: 64,
        ...footerStyle,
      },
      zeus: {},
      default: {},
    }[customTheme];
  }, [customTheme, footerStyle]);

  const buttonProps = useMemo(() => {
    return {
      okButtonProps: {
        ...okButtonProps,
        theme: (okButtonProps && okButtonProps.theme) || customTheme,
      },
      cancelButtonProps: {
        ...cancelButtonProps,
        theme: (cancelButtonProps && cancelButtonProps?.theme) || customTheme,
      },
    };
  }, [okButtonProps, cancelButtonProps, customTheme]);

  return (
    <ThemeWrapper theme={themeConfig} type="Drawer">
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
