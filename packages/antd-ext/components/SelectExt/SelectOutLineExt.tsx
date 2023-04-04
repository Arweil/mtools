import React, { useCallback, useMemo, useRef, useState } from 'react';
import { Row, Col } from 'antd';
import { css } from '@emotion/css';
import SelectExt from './SelectExt';
import type { SelectExtProps } from './SelectExt';
import { usePrefixCls } from '../utils';

const style = (prefixCls: string) => css`
  border: 1px solid #D0D3D6;
  border-radius: 4px;
  padding-left: 13px;

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

  .${prefixCls}-select-borderless {
    .${prefixCls}-select-selector {
      border: 0px !important;
      height: 30px !important;
      padding: 0;
      .${prefixCls}-select-selection-search {
        inset-inline-start: 0;
      }
    }
  }

  &:focus-within {
    border: 1px solid #2D64E5;
  }

  &:hover {
    border: 1px solid #477EFF;
  }
`;

export interface SelectOutLineExtProps extends SelectExtProps {
  label: string;
}

export default function SelectOutLineExt(props: SelectOutLineExtProps) {
  const { label, bordered, ...restProps } = props;
  const refSelectOutLine = useRef<HTMLDivElement>(null);
  const [width, setWidth] = useState<number>(0);
  const { prefixCls } = usePrefixCls();
  const customClassName = useMemo(() => style(prefixCls), [prefixCls]);

  const onDropdownVisibleChange = useCallback((open: boolean) => {
    if (open) {
      setWidth(refSelectOutLine.current?.offsetWidth || 0);
    }
  }, []);

  return (
    <Row className={customClassName} ref={refSelectOutLine}>
      <Col className={`${prefixCls}-form-item-label`}>
        <label htmlFor={restProps.id}>{label}</label>
      </Col>
      <Col className={`${prefixCls}-form-item-control`}>
        <SelectExt
          {...restProps}
          bordered={false}
          onDropdownVisibleChange={onDropdownVisibleChange}
          dropdownMatchSelectWidth={width}
          placement="bottomRight"
        />
      </Col>
    </Row>
  );
}
