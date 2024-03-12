import { css } from '@emotion/css';
import type { GlobalToken } from 'antd';
import { Col, Row } from 'antd';
import classNames from 'classnames';
import React, { useContext, useMemo } from 'react';
import type { Theme } from '../ConfigProviderExt/context';
import { AntdExtGlobalContext } from '../ConfigProviderExt/context';
import type { ThemeColor } from '../theme/type';
import { usePrefixCls } from '../utils';
import useTokenExt from '../utils/useTokenExt';

export interface OutLineWrapperProps {
  label: string;
  disabled?: boolean | [boolean, boolean];
  children?: React.ReactNode;
  isRequired?: boolean;
  theme?: Theme;
  ref?: React.MutableRefObject<HTMLDivElement>;
  injectStyle?: (prefixCls: string, mtPrefixCls: string, token: GlobalToken) => string;
}

const style = (
  prefixCls: string,
  mtPrefixCls: string,
  token: GlobalToken,
  tokenExt: ThemeColor,
  injectStyle?: (prefixCls: string, mtPrefixCls: string, token: GlobalToken) => string,
) => css`
  border: 1px solid ${token.colorBorder};
  border-radius: 4px;
  padding-left: 13px;

  .${prefixCls}-form-item-label {
    min-width: 70px;
    height: 30px;
    text-align: right;
    > label {
      height: 30px;
      color: #8f959e;
      line-height: 30px;
      &::after {
        position: relative;
        content: ':';
        margin-block: 0;
        margin-inline-start: 2px;
        margin-inline-end: 8px;
      }
    }
  }

  .${prefixCls}-${mtPrefixCls}-outline-control {
    flex: 1 1 0;
  }

  &:focus-within:not(.${prefixCls}-${mtPrefixCls}-outline-disabled) {
    border: 1px solid ${token.colorPrimaryActive};
  }

  &:hover:not(.${prefixCls}-${mtPrefixCls}-outline-disabled) {
    border: 1px solid ${token.colorPrimaryHover};
  }

  &.${prefixCls}-${mtPrefixCls}-outline-disabled {
    background-color: ${token.colorBgContainerDisabled};
  }

  ${injectStyle ? injectStyle(prefixCls, mtPrefixCls, token) : ''}
`;

const OutLineWrapper = React.forwardRef(
  (props: OutLineWrapperProps, ref: React.RefObject<HTMLDivElement>) => {
    const { label, children, disabled, injectStyle, isRequired, theme } = props;
    const { token, prefixCls, mtPrefixCls } = usePrefixCls();
    const { themeExt } = useContext(AntdExtGlobalContext);
    const tokenExt = useTokenExt(theme || themeExt);
    const customClassName = useMemo(
      () => style(prefixCls, mtPrefixCls, token, tokenExt, injectStyle),
      [prefixCls, mtPrefixCls, token, injectStyle, tokenExt],
    );

    return (
      <Row
        className={classNames([
          customClassName,
          disabled ? `${prefixCls}-${mtPrefixCls}-outline-disabled` : undefined,
        ])}
        ref={ref}
      >
        <Col className={`${prefixCls}-form-item-label`}>
          <label
            className={classNames([isRequired ? `${prefixCls}-form-item-required` : undefined])}
          >
            {label}
          </label>
        </Col>
        <Col
          className={classNames([
            `${prefixCls}-form-item-control`,
            `${prefixCls}-${mtPrefixCls}-outline-control`,
          ])}
        >
          {children}
        </Col>
      </Row>
    );
  },
);

export default OutLineWrapper;
