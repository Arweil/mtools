import type { RadioGroupProps } from 'antd';
import { Radio } from 'antd';
import React, { useMemo } from 'react';
import type { Theme } from '../ConfigProviderExt/context';
import ThemeWrapper from '../theme/ThemeWrapper';
import useMapTheme from '../utils/useMapTheme';
import { customStyle as customStyleHermes } from './ThemeHermes';

export interface RadioGroupExtMixinProps extends RadioGroupProps {
  theme?: Theme;
}

export default function Mixin(props: RadioGroupExtMixinProps) {
  const { className, theme, ...restProps } = props;
  const { classes, themeConfig } = useMapTheme({
    className,
    theme,
    themeWrap: {},
    emotioncss: {
      hermes: customStyleHermes,
      zeus: customStyleHermes,
    },
  });

  const p: RadioGroupProps = useMemo(
    () =>
      ({
        hermes: {
          optionType: 'button',
          buttonStyle: 'solid',
        } as RadioGroupProps,
        zeus: {
          optionType: 'button',
          buttonStyle: 'solid',
        } as RadioGroupProps,
      }[theme]),
    [theme],
  );

  return (
    <ThemeWrapper theme={themeConfig} type="Radio">
      <Radio.Group className={classes} {...restProps} {...p} />
    </ThemeWrapper>
  );
}
