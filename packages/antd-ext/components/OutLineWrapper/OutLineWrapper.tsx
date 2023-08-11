import React, { useMemo } from 'react';
import { Row, Col } from 'antd';
import { css } from '@emotion/css';
import { usePrefixCls } from '../utils';
import type { GlobalToken } from 'antd';

export interface OutLineWrapperProps {
  label: string;
  children?: JSX.Element;
  injectStyle?: (prefixCls: string, mtPrefixCls: string, token: GlobalToken) => string;
}

const style = (
  prefixCls: string,
  mtPrefixCls: string,
  token: GlobalToken,
  injectStyle?: (prefixCls: string, mtPrefixCls: string, token: GlobalToken) => string,
) => css`
  border: 1px solid #d0d3d6;
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

  &:focus-within {
    border: 1px solid #2d64e5;
  }

  &:hover {
    border: 1px solid #477eff;
  }

  ${injectStyle ? injectStyle(prefixCls, mtPrefixCls, token) : ''}
`;

export default function OutLineWrapper<T extends OutLineWrapperProps>(props: T) {
  const { label, children, injectStyle } = props;
  const { token, prefixCls, mtPrefixCls } = usePrefixCls();
  const customClassName = useMemo(
    () => style(prefixCls, mtPrefixCls, token, injectStyle),
    [prefixCls, mtPrefixCls, token, injectStyle],
  );

  return (
    <Row className={customClassName}>
      <Col className={`${prefixCls}-form-item-label`}>
        <label>{label}</label>
      </Col>
      <Col className={`${prefixCls}-form-item-control`}>{children}</Col>
    </Row>
  );
}
