import React from 'react';
import {
  customStyleWithInputOutLineExt,
  ThemeHermesWithInputOutLineExt,
  customStyleWithInputExt,
  ThemeHermesWithInputExt,
} from './ThemeHermes';
import { Input } from 'antd';
import { InputExt } from './InputExt';
import InputOutLineExt from './InputOutLineExt';
import type { InputExtProps } from './InputExt';
import type { Theme } from '../ConfigProviderExt/context';
import type { InputOutLineExtProps } from './InputOutLineExt';
import type { PasswordProps, SearchProps, TextAreaProps } from 'antd/es/input';
import useMapTheme from '../utils/useMapTheme';

export interface InputExtMixinProps extends InputExtProps {
  theme?: Theme;
}

export interface InputExtHOCProps {
  children: (classes: string) => JSX.Element;
}

function InputExtHOC(props: (
  Omit<InputExtMixinProps, 'children'>
  | SearchExtMixinProps
  | Omit<TextAreaExtMixinProps, 'children'>
  ) & InputExtHOCProps) {
  const { className, theme, children } = props;
  const { classes, ThemeWrapper } = useMapTheme({
    className,
    theme,
    themeWrap: {
      hermes: ThemeHermesWithInputExt,
    },
    emotioncss: {
      hermes: customStyleWithInputExt,
    }
  });

  return (
    <ThemeWrapper>
      {children(classes)}
    </ThemeWrapper>
  );
}

export function MixinInputExt(props: InputExtMixinProps) {
  return (
    <InputExtHOC {...props}>
      {
        (classes) => <InputExt {...props} className={classes} />
      }
    </InputExtHOC>
  )
}

export interface SearchExtMixinProps extends SearchProps {
  theme?: Theme;
}

MixinInputExt.Search = (props: SearchExtMixinProps) => {
  return (
    <InputExtHOC {...props}>
      {
        (classes) => <Input.Search {...props} className={classes} />
      }
    </InputExtHOC>
  )
}

export interface TextAreaExtMixinProps extends TextAreaProps {
  theme?: Theme;
}

MixinInputExt.TextArea = (props: TextAreaExtMixinProps) => {
  return (
    <InputExtHOC {...props}>
      {
        (classes) => <Input.TextArea {...props} className={classes} />
      }
    </InputExtHOC>
  )
}

export interface PasswordExtMixinProps extends PasswordProps {
  theme?: Theme;
}

MixinInputExt.Password = (props: PasswordExtMixinProps) => {
  return (
    <InputExtHOC {...props}>
      {
        (classes) => <Input.Password {...props} className={classes} />
      }
    </InputExtHOC>
  )
}

export interface InputOutLineExtMixinProps extends InputOutLineExtProps {
  theme?: Theme;
}

export function MixinInputOutLineExt(props: InputOutLineExtMixinProps) {
  const { className, theme, ...restProps } = props;
  const { classes, ThemeWrapper } = useMapTheme({
    className,
    theme,
    themeWrap: {
      hermes: ThemeHermesWithInputOutLineExt,
    },
    emotioncss: {
      hermes: customStyleWithInputOutLineExt,
    }
  });

  return (
    <ThemeWrapper>
      <InputOutLineExt className={classes} {...restProps} />
    </ThemeWrapper>
  );
}
