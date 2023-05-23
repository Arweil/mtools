import React, { useMemo } from 'react';
import useMapTheme from '../utils/useMapTheme';
import {
  customStyleWithSelectExt,
  // customStyleWithPopup,
  ThemeHermes
} from './ThemeHermes';
import type { Theme } from '../ConfigProviderExt/context';
import type { SelectExtProps } from './SelectExt';
import type { TooltipProps, GlobalToken } from 'antd';
import SelectOutLineExt, { SelectOutLineExtProps } from './SelectOutLineExt';
import SelectExt from './SelectExt';
import c from 'classnames';

export function useSelectTooltipStyle(data: {
  theme?: Theme;
  globalTheme: Theme;
  tooltip?: TooltipProps;
}) {
  const { theme, globalTheme, tooltip } = data;

  // tooltip 默认样式
  const tooltipStyle = useMemo(() => (
    {
      hermes: {
        color: '#ffffff',
        overlayStyle: { maxWidth: 280 },
        overlayInnerStyle: { color: '#333' },
        ...tooltip,
      },
      zeus: {},
      default: {},
    }[theme || globalTheme]
  ), [theme, globalTheme]);

  return tooltipStyle;
}

export function useSelectExtPopupStyle(data: {
  token: GlobalToken;
  prefix: string;
  popupClassName?: string;
  theme?: Theme;
  globalTheme: Theme;
}) {
  const { token, prefix, popupClassName, theme, globalTheme } = data;
  const popupStyle = useMemo(() => (
    {
      hermes: c(
        popupClassName,
        // customStyleWithPopup(token, prefix)
      ),
      zeus: '',
      default: '',
    }[theme || globalTheme]
  ), [theme, globalTheme]);

  return popupStyle;
}

export interface SelectExtMixinProps extends SelectExtProps {
  theme?: Theme;
}

export function MixinSelectExt(props: SelectExtMixinProps) {
  const { className, theme, tooltip, popupClassName, ...restProps } = props;
  const { classes, ThemeWrapper, theme: customTheme, globalTheme, token, prefix } = useMapTheme({
    className,
    theme,
    themeWrap: {
      hermes: ThemeHermes,
    },
    emotioncss: {
      hermes: customStyleWithSelectExt,
    }
  });

  const tooltipStyle = useSelectTooltipStyle({
    theme: customTheme,
    globalTheme,
    tooltip,
  });

  const popupStyle = useSelectExtPopupStyle({
    token,
    prefix,
    popupClassName,
    theme: customTheme,
    globalTheme,
  });

  return (
    <ThemeWrapper>
      <SelectExt
        tooltip={tooltipStyle}
        {...restProps}
        popupClassName={popupStyle}
        className={classes}
      />
    </ThemeWrapper>
  )
}

export interface MixinSelectOutLineExtProps extends SelectOutLineExtProps {
  theme?: Theme;
}

export function MixinSelectOutLineExt(props: MixinSelectOutLineExtProps) {
  const { className, theme, tooltip, popupClassName, ...restProps } = props;
  const { classes, ThemeWrapper, theme: customTheme, globalTheme, token, prefix } = useMapTheme({
    className,
    theme,
    themeWrap: {
      hermes: ThemeHermes,
    },
    emotioncss: {
      hermes: customStyleWithSelectExt,
    }
  });

  const tooltipStyle = useSelectTooltipStyle({
    theme: customTheme,
    globalTheme,
    tooltip,
  });

  const popupStyle = useSelectExtPopupStyle({
    token,
    prefix,
    popupClassName,
    theme: customTheme,
    globalTheme,
  });

  return (
    <ThemeWrapper>
      <SelectOutLineExt
        tooltip={tooltipStyle}
        {...restProps}
        popupClassName={popupStyle}
        className={classes}
      />
    </ThemeWrapper>
  );
}
