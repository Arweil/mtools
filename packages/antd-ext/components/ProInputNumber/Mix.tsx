import { css } from '@emotion/css';
import type { GlobalToken } from 'antd';
import React from 'react';
import type { Theme } from '../ConfigProviderExt/context';
import ThemeWrapper from '../theme/ThemeWrapper';
import type { ThemeColor } from '../theme/type';
import { useMapTheme } from '../utils';
import type { ProInputNumberProps } from './ProInputNumber';
import ProInputNumber from './ProInputNumber';
import type { ProInputNumberOutLineProps } from './ProInputNumberOutLine';
import ProInputNumberOutLine from './ProInputNumberOutLine';

export interface ProInputNumberMixinProps extends ProInputNumberProps {
  theme?: Theme;
}

const customStyle = (token: GlobalToken, prefixCls: string, tokenExt: Partial<ThemeColor>) => css`
  .${prefixCls}-input {
    color: ${tokenExt.colorBlackL1};
  }
`;

export function MixinProInputNumber(props: ProInputNumberMixinProps) {
  const { className, theme, ...restProps } = props;
  const { classes, themeConfig } = useMapTheme({
    className,
    theme,
    emotioncss: {},
  });

  return (
    <ThemeWrapper theme={themeConfig} type="Input">
      <ProInputNumber className={classes} {...restProps} />
    </ThemeWrapper>
  );
}

export interface ProInputNumberOutLineMixinProps extends ProInputNumberOutLineProps {
  theme?: Theme;
}

export function MixinProInputNumberOutLine(props: ProInputNumberOutLineMixinProps) {
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
    <ThemeWrapper theme={themeConfig} type="Input">
      <ProInputNumberOutLine className={classes} {...restProps} />
    </ThemeWrapper>
  );
}
