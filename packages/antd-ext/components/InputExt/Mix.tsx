import { Input } from 'antd';
import type { PasswordProps, SearchProps, TextAreaProps } from 'antd/es/input';
import React from 'react';
import type { Theme } from '../ConfigProviderExt/context';
import ThemeWrapper from '../theme/ThemeWrapper';
import useMapTheme from '../utils/useMapTheme';
import type { InputExtProps } from './InputExt';
import { InputExt } from './InputExt';
import type { InputOutLineExtProps } from './InputOutLineExt';
import InputOutLineExt from './InputOutLineExt';
import { customStyleWithInputExt, customStyleWithInputOutLineExt } from './ThemeHermes';

export interface InputExtMixinProps extends InputExtProps {
  theme?: Theme;
}

export interface InputExtHOCProps {
  children: (classes: string) => JSX.Element;
}

function InputExtHOC(
  props: (
    | Omit<InputExtMixinProps, 'children'>
    | SearchExtMixinProps
    | Omit<TextAreaExtMixinProps, 'children'>
  ) &
    InputExtHOCProps,
) {
  const { className, theme, children } = props;
  const { classes, themeConfig } = useMapTheme({
    className,
    theme,
    emotioncss: {
      hermes: customStyleWithInputExt,
      zeus: customStyleWithInputExt,
    },
  });

  return (
    <ThemeWrapper theme={themeConfig} type="Input">
      {children(classes)}
    </ThemeWrapper>
  );
}

export function MixinInputExt(props: InputExtMixinProps) {
  return (
    <InputExtHOC {...props}>{classes => <InputExt {...props} className={classes} />}</InputExtHOC>
  );
}

export interface SearchExtMixinProps extends SearchProps {
  theme?: Theme;
}

MixinInputExt.Search = (props: SearchExtMixinProps) => {
  return (
    <InputExtHOC {...props}>
      {classes => <Input.Search {...props} className={classes} />}
    </InputExtHOC>
  );
};

export interface TextAreaExtMixinProps extends TextAreaProps {
  theme?: Theme;
}

MixinInputExt.TextArea = (props: TextAreaExtMixinProps) => {
  return (
    <InputExtHOC {...props}>
      {classes => <Input.TextArea {...props} className={classes} />}
    </InputExtHOC>
  );
};

export interface PasswordExtMixinProps extends PasswordProps {
  theme?: Theme;
}

MixinInputExt.Password = (props: PasswordExtMixinProps) => {
  return (
    <InputExtHOC {...props}>
      {classes => <Input.Password {...props} className={classes} />}
    </InputExtHOC>
  );
};

export interface InputOutLineExtMixinProps extends InputOutLineExtProps {
  theme?: Theme;
}

export function MixinInputOutLineExt(props: InputOutLineExtMixinProps) {
  const { className, theme, ...restProps } = props;
  const { classes, themeConfig } = useMapTheme({
    className,
    theme,
    emotioncss: {
      hermes: customStyleWithInputOutLineExt,
      zeus: customStyleWithInputOutLineExt,
    },
  });

  return (
    <ThemeWrapper theme={themeConfig} type="Input">
      <InputOutLineExt className={classes} {...restProps} />
    </ThemeWrapper>
  );
}
