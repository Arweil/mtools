import React, { useMemo } from 'react';
import type { Theme } from '../ConfigProviderExt/context';
import ThemeWrapper from '../theme/ThemeWrapper';
import useMapTheme from '../utils/useMapTheme';
import type { DrawerExtProps } from './DrawerExt';
import DrawerExt from './DrawerExt';
import { customStyle } from './ThemeHermes';

export interface DrawerExtMixinProps extends DrawerExtProps {
  theme?: Theme;
}

export default function Mixin(props: DrawerExtMixinProps) {
  const {
    className,
    theme,
    headerStyle,
    footerStyle,
    styles,
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
      zeus: customStyle,
    },
  });

  const formattedHeaderStyle = useMemo(() => {
    return {
      hermes: {
        background: tokenExt.colorGreyL6,
        ...headerStyle,
        ...styles?.header,
      },
      zeus: {
        background: tokenExt.colorGreyL6,
        ...headerStyle,
        ...styles?.header,
      },
      default: {},
    }[customTheme];
  }, [customTheme, headerStyle, tokenExt.colorGreyL6, styles]);

  const formattedFooterStyle = useMemo(() => {
    return {
      hermes: {
        height: 64,
        ...footerStyle,
        ...styles?.footer,
      },
      zeus: {
        height: 64,
        ...footerStyle,
        ...styles?.footer,
      },
      default: {},
    }[customTheme];
  }, [customTheme, footerStyle, styles]);

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
        styles={{
          ...styles,
          header: formattedHeaderStyle,
          footer: formattedFooterStyle,
        }}
        rootClassName={classes}
      />
    </ThemeWrapper>
  );
}
