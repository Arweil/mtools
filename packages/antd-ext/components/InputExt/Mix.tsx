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

export interface InputExtMinixProps extends InputExtProps {
  theme?: Theme;
}

export interface InputExtHOCProps {
  children: (classes: string) => JSX.Element;
}

function InputExtHOC(props: (InputExtMinixProps | SearchExtMinixProps | TextAreaExtMinixProps) & InputExtHOCProps) {
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

export function MixinInputExt(props: InputExtMinixProps) {
  return (
    <InputExtHOC {...props}>
      {
        (classes) => <InputExt {...props} className={classes} />
      }
    </InputExtHOC>
  )
}

export interface SearchExtMinixProps extends SearchProps {
  theme?: Theme;
}

MixinInputExt.Search = (props: SearchExtMinixProps) => {
  return (
    <InputExtHOC {...props}>
      {
        (classes) => <Input.Search {...props} className={classes} />
      }
    </InputExtHOC>
  )
}

export interface TextAreaExtMinixProps extends TextAreaProps {
  theme?: Theme;
}

MixinInputExt.TextArea = (props: TextAreaExtMinixProps) => {
  return (
    <InputExtHOC {...props}>
      {
        (classes) => <Input.TextArea {...props} className={classes} />
      }
    </InputExtHOC>
  )
}

export interface PasswordExtMinixProps extends PasswordProps {
  theme?: Theme;
}

MixinInputExt.Password = (props: PasswordExtMinixProps) => {
  return (
    <InputExtHOC {...props}>
      {
        (classes) => <Input.Password {...props} className={classes} />
      }
    </InputExtHOC>
  )
}

export interface InputOutLineExtMinixProps extends InputOutLineExtProps {
  theme?: Theme;
}

export function MixinInputOutLineExt(props: InputOutLineExtMinixProps) {
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
