import type { GlobalToken, TooltipProps } from 'antd';
import c from 'classnames';
import React, { useMemo } from 'react';
import type { Theme } from '../ConfigProviderExt/context';
import ThemeWrapper from '../theme/ThemeWrapper';
import useMapTheme from '../utils/useMapTheme';
import useTokenExt from '../utils/useTokenExt';
import type { CascaderExtProps } from './CascaderExt';
import CascaderExt from './CascaderExt';
import type { CascaderOutLineExtProps } from './CascaderOutLineExt';
import CascaderOutLineExt from './CascaderOutLineExt';

export function useCascaderTooltipStyle(data: { theme?: Theme; tooltip?: TooltipProps }) {
  const { theme, tooltip } = data;
  const tokenExt = useTokenExt(theme);

  // tooltip 默认样式
  const tooltipStyle = useMemo(
    () =>
      ({
        hermes: {
          color: tokenExt.colorWhite,
          overlayStyle: { maxWidth: 240 },
          overlayInnerStyle: { color: tokenExt.colorBlackL1 },
          ...tooltip,
        },
        zeus: {
          color: tokenExt.colorWhite,
          overlayStyle: { maxWidth: 240 },
          overlayInnerStyle: { color: tokenExt.colorBlackL1 },
          ...tooltip,
        },
        default: {},
      }[theme]),
    [theme, tooltip, tokenExt],
  );

  return tooltipStyle;
}

export function useCascaderItemStyle(data: { theme?: Theme; tooltip?: TooltipProps }) {
  const { theme, tooltip } = data;

  // tooltip 默认样式
  const tooltipStyle = useMemo(
    () =>
      ({
        hermes: {
          dropdownMenuColumnStyle: { padding: '5px 8px' },
          ...tooltip,
        },
        zeus: {
          dropdownMenuColumnStyle: { padding: '5px 8px' },
        },
        default: {},
      }[theme]),
    [theme, tooltip],
  );

  return tooltipStyle;
}

export function useCascaderExtPopupStyle(data: {
  token: GlobalToken;
  prefix: string;
  popupClassName?: string;
  theme?: Theme;
}) {
  const { popupClassName, theme } = data;
  const popupStyle = useMemo(
    () =>
      ({
        hermes: c(
          popupClassName,
          // customStyleWithPopup(token, prefix),
        ),
        zeus: c(
          popupClassName,
          // customStyleWithPopup(token, prefix),
        ),
        default: '',
      }[theme]),
    [theme, popupClassName],
  );

  return popupStyle;
}

export interface CascaderExtMixinProps extends CascaderExtProps {
  theme?: Theme;
}

export function MixinCascaderExt(props: CascaderExtMixinProps) {
  const { className, theme, tooltip, popupClassName, ...restProps } = props;
  const {
    classes,
    themeConfig,
    theme: customTheme,
    token,
    prefix,
  } = useMapTheme({
    className,
    theme,
    emotioncss: {},
  });

  const tokenExt = useTokenExt(theme);

  const tooltipStyle = useCascaderTooltipStyle({
    // 提示样式
    theme: customTheme,
    tooltip,
  });

  const itemStyle = useCascaderItemStyle({
    // 提示样式
    theme: customTheme,
  });

  const popupStyle = useCascaderExtPopupStyle({
    token,
    prefix,
    popupClassName,
    theme: customTheme,
  });

  return (
    <ThemeWrapper theme={themeConfig} type={['Cascader', 'Select']}>
      <CascaderExt
        tokenExt={tokenExt}
        tooltip={tooltipStyle}
        itemStyle={itemStyle}
        {...restProps}
        popupClassName={popupStyle}
        className={classes}
      />
    </ThemeWrapper>
  );
}

export interface MixinCascaderOutLineExtProps extends CascaderOutLineExtProps {
  theme?: Theme;
}

export function MixinCascaderOutLineExt(props: MixinCascaderOutLineExtProps) {
  const { className, theme, tooltip, popupClassName, ...restProps } = props;
  const {
    classes,
    theme: customTheme,
    themeConfig,
    token,
    prefix,
  } = useMapTheme({
    className,
    theme,
    emotioncss: {},
  });

  const tokenExt = useTokenExt(theme);

  const tooltipStyle = useCascaderTooltipStyle({
    // 提示样式
    theme: customTheme,
    tooltip,
  });

  const popupStyle = useCascaderExtPopupStyle({
    // 弹出框样式
    token,
    prefix,
    popupClassName,
    theme: customTheme,
  });

  return (
    <ThemeWrapper theme={themeConfig} type={['Cascader', 'Select']}>
      <CascaderOutLineExt
        tokenExt={tokenExt}
        tooltip={tooltipStyle}
        {...restProps}
        popupClassName={popupStyle}
        className={classes}
      />
    </ThemeWrapper>
  );
}
