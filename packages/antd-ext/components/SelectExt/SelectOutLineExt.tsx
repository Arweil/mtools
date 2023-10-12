import React, { useCallback, useRef, useState } from 'react';
import { css } from '@emotion/css';
import SelectExt from './SelectExt';
import OutLineWrapper from '../OutLineWrapper';
import type { SelectExtProps } from './SelectExt';
import type { OutLineWrapperProps } from '../OutLineWrapper';

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
        margin-inline-start: 0;
      }
      .${prefixCls}-select-selection-placeholder{
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

export interface SelectOutLineExtProps extends OutLineWrapperProps, SelectExtProps {
  label: string;
}

export default function SelectOutLineExt(props: SelectOutLineExtProps) {
  const { label, ...restProps } = props;
  const refSelectOutLine = useRef<HTMLDivElement>(null);
  const [width, setWidth] = useState<number>(refSelectOutLine.current?.offsetWidth);
  const onDropdownVisibleChange = useCallback((open: boolean) => {
    if (open) {
      setWidth(refSelectOutLine?.current?.offsetWidth || 0);
    }
  }, []);

  return (
    <OutLineWrapper label={label} injectStyle={style} ref={refSelectOutLine}>
      <SelectExt
        {...restProps}
        bordered={false}
        onDropdownVisibleChange={onDropdownVisibleChange}
        dropdownMatchSelectWidth={width}
        placement="bottomRight"
      />
    </OutLineWrapper>
  );
}
