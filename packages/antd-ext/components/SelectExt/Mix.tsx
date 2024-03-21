import type { GlobalToken, TooltipProps } from 'antd';
import c from 'classnames';
import React, { useMemo } from 'react';
import type { Theme } from '../ConfigProviderExt/context';
import ThemeWrapper from '../theme/ThemeWrapper';
import useMapTheme from '../utils/useMapTheme';
import useTokenExt from '../utils/useTokenExt';
import type { SelectExtProps } from './SelectExt';
import SelectExt from './SelectExt';
import type { SelectOutLineExtProps } from './SelectOutLineExt';
import SelectOutLineExt from './SelectOutLineExt';

export function useSelectTooltipStyle(data: { theme?: Theme; tooltip?: TooltipProps }) {
  const { theme, tooltip } = data;
  const tokenExt = useTokenExt(theme);

  // tooltip 默认样式
  const tooltipStyle = useMemo(
    () =>
      ({
        hermes: {
          color: tokenExt.colorWhite,
          overlayStyle: { maxWidth: 280 },
          overlayInnerStyle: { color: tokenExt.colorBlackL1 },
          ...tooltip,
        },
        zeus: {
          color: tokenExt.colorWhite,
          overlayStyle: { maxWidth: 280 },
          overlayInnerStyle: { color: tokenExt.colorBlackL1 },
          ...tooltip,
        },
        default: {},
      }[theme]),
    [theme, tooltip, tokenExt],
  );

  return tooltipStyle;
}

export function useSelectExtPopupStyle(data: {
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

export interface SelectExtMixinProps extends SelectExtProps {
  theme?: Theme;
}

export function MixinSelectExt(props: SelectExtMixinProps) {
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

  const tooltipStyle = useSelectTooltipStyle({
    theme: customTheme,
    tooltip,
  });

  const popupStyle = useSelectExtPopupStyle({
    token,
    prefix,
    popupClassName,
    theme: customTheme,
  });

  return (
    <ThemeWrapper theme={themeConfig} type="Select">
      <SelectExt
        tooltip={tooltipStyle}
        {...restProps}
        popupClassName={popupStyle}
        className={classes}
        multipleCheckbox={customTheme === 'hermes'}
      />
    </ThemeWrapper>
  );
}

export interface MixinSelectOutLineExtProps extends SelectOutLineExtProps {
  theme?: Theme;
}

export function MixinSelectOutLineExt(props: MixinSelectOutLineExtProps) {
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
    emotioncss: {
      // hermes: customStyleWithSelectExt,
    },
  });

  const tooltipStyle = useSelectTooltipStyle({
    theme: customTheme,
    tooltip,
  });

  const popupStyle = useSelectExtPopupStyle({
    token,
    prefix,
    popupClassName,
    theme: customTheme,
  });

  return (
    <ThemeWrapper theme={themeConfig} type="Select">
      <SelectOutLineExt
        tooltip={tooltipStyle}
        {...restProps}
        popupClassName={popupStyle}
        className={classes}
        multipleCheckbox={customTheme === 'hermes'}
      />
    </ThemeWrapper>
  );
}
