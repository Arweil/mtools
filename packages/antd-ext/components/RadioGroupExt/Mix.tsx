import React, { useMemo } from 'react';
import { Radio } from 'antd';
import type { RadioGroupProps } from 'antd';
import { customStyle as customStyleHermes } from './ThemeHermes';
import type { Theme } from '../ConfigProviderExt/context';
import useMapTheme from '../utils/useMapTheme';

export interface RadioGroupExtMixinProps extends RadioGroupProps {
  theme?: Theme;
}

export default function Mixin(props: RadioGroupExtMixinProps) {
  const { className, theme, ...restProps } = props;
  const { classes, ThemeWrapper, tokenExt } = useMapTheme({
    className,
    theme,
    themeWrap: {},
    emotioncss: {
      hermes: customStyleHermes,
    },
  });

  const p: RadioGroupProps = useMemo(
    () =>
      ({
        hermes: {
          optionType: 'button',
          buttonStyle: 'solid',
        } as RadioGroupProps,
      }[theme]),
    [theme],
  );

  return (
    <ThemeWrapper tokenExt={tokenExt}>
      <Radio.Group className={classes} {...restProps} {...p} />
    </ThemeWrapper>
  );
}
