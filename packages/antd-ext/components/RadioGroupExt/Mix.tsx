import React, { useMemo } from 'react';
import { Radio } from 'antd';
import type { RadioGroupProps } from 'antd';
import { customStyle as customStyleHermes } from './ThemeHermes';
import type { Theme } from '../ConfigProviderExt/context';
import useMapTheme from '../utils/useMapTheme';
import ThemeWrapper from '../theme/ThemeWrapper';

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
    <ThemeWrapper theme={themeConfig} type="Radio">
      <Radio.Group className={classes} {...restProps} {...p} />
    </ThemeWrapper>
  );
}
