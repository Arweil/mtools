import React, { useMemo } from 'react';
import useMapTheme from '../utils/useMapTheme';
import // customStyleWithSelectExt,
// customStyleWithPopup,
'./ThemeHermes';
import type { Theme } from '../ConfigProviderExt/context';
import type { SelectExtProps } from './SelectExt';
import type { TooltipProps, GlobalToken } from 'antd';
import type { SelectOutLineExtProps } from './SelectOutLineExt';
import SelectOutLineExt from './SelectOutLineExt';
import SelectExt from './SelectExt';
import c from 'classnames';
import ThemeWrapper from '../theme/ThemeWrapper';

export function useSelectTooltipStyle(data: { theme?: Theme; tooltip?: TooltipProps }) {
  const { theme, tooltip } = data;

  // tooltip 默认样式
  const tooltipStyle = useMemo(
    () =>
      ({
        hermes: {
          color: '#ffffff',
          overlayStyle: { maxWidth: 280 },
          overlayInnerStyle: { color: '#333' },
          ...tooltip,
        },
        zeus: {},
        default: {},
      }[theme]),
    [theme, tooltip],
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
        zeus: '',
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
