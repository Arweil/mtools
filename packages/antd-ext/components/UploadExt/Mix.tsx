import React from 'react';
import type { Theme } from '../ConfigProviderExt/context';
import ThemeWrapper from '../theme/ThemeWrapper';
import useMapTheme from '../utils/useMapTheme';
import { customStyle as customStyleHermes } from './ThemeHermes';
import type { UploadExtProps } from './UploadExt';
import UploadExt from './UploadExt';

export interface UploadExtMixinProps extends UploadExtProps {
  theme?: Theme;
}

export default function Mixin(props: UploadExtMixinProps) {
  const { className, theme, ...restProps } = props;

  const { classes, themeConfig } = useMapTheme({
    className,
    theme,
    emotioncss: {
      hermes: customStyleHermes,
      zeus: customStyleHermes,
      default: customStyleHermes,
    },
  });

  return (
    <ThemeWrapper theme={themeConfig} type={['Upload']}>
      <UploadExt className={classes} {...restProps} />
    </ThemeWrapper>
  );
}
