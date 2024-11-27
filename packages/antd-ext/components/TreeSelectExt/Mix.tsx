import type { GlobalToken, TooltipProps } from 'antd';
import c from 'classnames';
import React, { useMemo } from 'react';
import type { Theme } from '../ConfigProviderExt/context';
import ThemeWrapper from '../theme/ThemeWrapper';
import useMapTheme from '../utils/useMapTheme';
import useTokenExt from '../utils/useTokenExt';
import type { TreeSelectExtProps } from './TreeSelectExt';
import TreeSelectExt from './TreeSelectExt';
import type { TreeSelectOutLineExtProps } from './TreeSelectOutLineExt';
import TreeSelectOutLineExt from './TreeSelectOutLineExt';

export function useTreeSelectTooltipStyle(data: { theme?: Theme; tooltip?: TooltipProps }) {
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

export function useTreeSelectItemStyle(data: { theme?: Theme; tooltip?: TooltipProps }) {
  const { theme, tooltip } = data;
  const tokenExt = useTokenExt(theme);

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
    [theme, tooltip, tokenExt],
  );

  return tooltipStyle;
}

export function useTreeSelectRenderStyle(option) {
  return (
    <div style={{ color: 'blue' }}>
      {option.label} {option.value === 'hangzhou' && <span>(推荐)</span>}
    </div>
  );
}

export function useTreeSelectExtPopupStyle(data: {
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

export interface TreeSelectExtMixinProps extends TreeSelectExtProps {
  theme?: Theme;
}

export function MixinTreeSelectExt(props: TreeSelectExtMixinProps) {
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

  const tooltipStyle = useTreeSelectTooltipStyle({
    // 提示样式
    theme: customTheme,
    tooltip,
  });

  const itemStyle = useTreeSelectItemStyle({
    // 提示样式
    theme: customTheme,
  });

  const popupStyle = useTreeSelectExtPopupStyle({
    token,
    prefix,
    popupClassName,
    theme: customTheme,
  });

  return (
    <ThemeWrapper theme={themeConfig} type="TreeSelect">
      <TreeSelectExt
        tokenExt={tokenExt}
        tooltip={tooltipStyle}
        itemStyle={itemStyle}
        customTheme={customTheme}
        {...restProps}
        popupClassName={popupStyle}
        className={classes}
      />
    </ThemeWrapper>
  );
}

export interface MixinTreeSelectOutLineExtProps extends TreeSelectOutLineExtProps {
  theme?: Theme;
}

export function MixinTreeSelectOutLineExt(props: MixinTreeSelectOutLineExtProps) {
  const { className, theme, tooltip, popupClassName, ...restProps } = props;
  const {
    classes, // 类名
    theme: customTheme, // 主题
    themeConfig, // 主题
    token,
    prefix,
  } = useMapTheme({
    className,
    theme,
    emotioncss: {
      // hermes: customStyleWithSelectExt,
    },
  });

  const tokenExt = useTokenExt(theme);

  const tooltipStyle = useTreeSelectTooltipStyle({
    // 提示样式
    theme: customTheme,
    tooltip,
  });

  const popupStyle = useTreeSelectExtPopupStyle({
    // 弹出阿框样式
    token,
    prefix,
    popupClassName,
    theme: customTheme,
  });

  return (
    <ThemeWrapper theme={themeConfig} type="TreeSelect">
      <TreeSelectOutLineExt
        tokenExt={tokenExt}
        customTheme={customTheme}
        tooltip={tooltipStyle}
        {...restProps}
        popupClassName={popupStyle}
        className={classes}
      />
    </ThemeWrapper>
  );
}
