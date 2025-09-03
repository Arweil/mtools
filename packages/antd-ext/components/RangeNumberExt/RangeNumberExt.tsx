import type { ValueType } from '@rc-component/mini-decimal';
import type { InputNumberProps } from 'antd';
import { InputNumber, Space } from 'antd';
import { FormItemInputContext } from 'antd/es/form/context';
import classNames from 'classnames';
import React, { useCallback, useContext, useEffect, useMemo, useState } from 'react';
import { SwapRightOutlined } from '../icon';
import { usePrefixCls } from '../utils';
import { getRangeNumberStyle } from './style';

export type RangeNumberVal = [number | null, number | null];

export interface RangeNumberExtProps {
  value?: RangeNumberVal;
  onChange?: (val: RangeNumberVal) => void;
  placeholder?: [string, string];
  disabled?: boolean;
  bordered?: boolean;
  className?: string;
  beforeInputNumberProps?: InputNumberProps;
  afterInputNumberProps?: InputNumberProps;
}

function isNoVal(val: number | null | undefined) {
  return val === undefined || val === null;
}

export default function RangeNumberExt(props: RangeNumberExtProps) {
  const [val, setVal] = useState<RangeNumberVal>([null, null]);

  const {
    value,
    placeholder,
    disabled,
    bordered = true,
    className,
    onChange,
    beforeInputNumberProps,
    afterInputNumberProps,
  } = props;
  const { prefixCls, mtPrefixCls, token } = usePrefixCls();

  const { status: contextStatus } = useContext(FormItemInputContext);

  // 同步外部value到内部状态
  useEffect(() => {
    if (value !== undefined) {
      setVal(value);
    }
  }, [value]);

  const classname = useMemo(
    () =>
      classNames(
        `${prefixCls}-${mtPrefixCls}-number-range`,
        getRangeNumberStyle(token, prefixCls),
        disabled ? `${prefixCls}-${mtPrefixCls}-number-range-disabled` : undefined,
        bordered ? undefined : `${prefixCls}-${mtPrefixCls}-number-range-borderless`,
        contextStatus ? `${prefixCls}-${mtPrefixCls}-number-range-${contextStatus}` : undefined,
        className,
      ),
    [token, prefixCls, disabled, bordered, contextStatus, className, mtPrefixCls],
  );

  const onBeforeInputNumberChange = useCallback(
    (_val: ValueType | null) => {
      const valCopy: RangeNumberVal = [...val];
      valCopy[0] = _val as number;
      setVal(valCopy);
      onChange && onChange(valCopy);
    },
    [val, onChange],
  );

  const onAfterInputNumberChange = useCallback(
    (_val: ValueType | null) => {
      const valCopy: RangeNumberVal = [...val];
      valCopy[1] = _val as number;
      setVal(valCopy);
      onChange && onChange(valCopy);
    },
    [val, onChange],
  );

  const onBlur = useCallback(() => {
    if (val === undefined || val.length < 2 || isNoVal(val[0]) || isNoVal(val[1])) {
      return;
    }

    const finVal: RangeNumberVal = [...val.sort((a, b) => (a || 0) - (b || 0))];
    setVal(finVal);
    onChange && onChange(finVal);
  }, [val, onChange]);

  return (
    <div className={classname}>
      <Space.Compact>
        <InputNumber
          {...beforeInputNumberProps}
          disabled={disabled}
          placeholder={placeholder && placeholder[0]}
          variant="borderless"
          value={val[0]}
          onChange={onBeforeInputNumberChange}
          onBlur={onBlur}
        />
        <div className={`${prefixCls}-${mtPrefixCls}-number-range-separator`}>
          <SwapRightOutlined />
        </div>
        <InputNumber
          {...afterInputNumberProps}
          disabled={disabled}
          placeholder={placeholder && placeholder[1]}
          variant="borderless"
          value={val[1]}
          onChange={onAfterInputNumberChange}
          onBlur={onBlur}
        />
      </Space.Compact>
    </div>
  );
}
