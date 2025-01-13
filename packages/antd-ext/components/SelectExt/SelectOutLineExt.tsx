import { css } from '@emotion/css';
import React, { useCallback, useRef, useState } from 'react';
import type { OutLineWrapperProps } from '../OutLineWrapper';
import OutLineWrapper from '../OutLineWrapper';
import type { SelectExtProps } from './SelectExt';
import SelectExt from './SelectExt';

const style = (prefixCls: string) => css`
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

    &.${prefixCls}-select-single {
      height: 30px;
    }
  }

  .${prefixCls}-select {
    width: 100%;
  }
`;

export interface SelectOutLineExtProps
  extends Omit<OutLineWrapperProps, 'disabled'>,
    SelectExtProps {
  label: string;
}

export default function SelectOutLineExt(props: SelectOutLineExtProps) {
  const { label, disabled, ...restProps } = props;
  const refSelectOutLine = useRef<HTMLDivElement>(null);
  const [width, setWidth] = useState<number>(refSelectOutLine.current?.offsetWidth);
  const onDropdownVisibleChange = useCallback((open: boolean) => {
    if (open) {
      setWidth(refSelectOutLine?.current?.offsetWidth || 0);
    }
  }, []);
  console.log(refSelectOutLine?.current?.offsetWidth);

  return (
    <OutLineWrapper
      label={label}
      injectStyle={style}
      ref={refSelectOutLine}
      disabled={disabled}
      isRequired={restProps['aria-required'] === 'true'}
    >
      <SelectExt
        {...restProps}
        disabled={disabled as boolean}
        variant="borderless"
        onDropdownVisibleChange={onDropdownVisibleChange}
        popupMatchSelectWidth={width}
        placement="bottomRight"
      />
    </OutLineWrapper>
  );
}
