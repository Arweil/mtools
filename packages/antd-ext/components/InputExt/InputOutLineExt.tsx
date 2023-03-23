import React, { useMemo } from 'react';
import { Row, Col, ConfigProvider } from 'antd';
import { InputExt } from './InputExt';
import { css } from '@emotion/css';
import type { InputProps } from 'antd';

const style = (prefixCls: string) => css`
  border: 1px solid #D0D3D6;
  border-radius: 4px;
  padding: 0 13px;

  .${prefixCls}-form-item-label {
    height: 30px;
    min-width: 70px;
    text-align: right;
    > label {
      height: 30px;
      line-height: 30px;
      color: #8F959E;
      &::after {
        content: ":";
        position: relative;
        margin-block: 0;
        margin-inline-start: 2px;
        margin-inline-end: 8px;
      }
    }
  }

  .${prefixCls}-input {
    padding: 4px 0;
    color: #333;
    width: 100%;
  }

  &:focus-within {
    border: 1px solid #2D64E5;
  }

  &:hover {
    border: 1px solid #477EFF;
  }
`;

export interface InputOutLineExtProps extends InputProps {
  label: string;
}

export default function InputOutLineExt(props: InputOutLineExtProps) {
  const { label, bordered, ...restProps } = props;
  const { getPrefixCls } = React.useContext(ConfigProvider.ConfigContext);

  const prefixCls = useMemo(() => getPrefixCls(), []);
  const customClassName = useMemo(() => style(prefixCls), [prefixCls]);

  return (
    <Row className={customClassName}>
      <Col className={`${prefixCls}-form-item-label`}>
        <label htmlFor={restProps.id}>{label}</label>
      </Col>
      <Col className={`${prefixCls}-form-item-control`}>
        <InputExt bordered={false} {...restProps} />
      </Col>
    </Row>
  );
}
