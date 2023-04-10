import React, { useCallback, useContext, useMemo, useState } from 'react';
import { InputNumber, Space } from 'antd';
import { FormItemInputContext } from 'antd/es/form/context';
import { SwapRightOutlined } from '../icon';
import classNames from 'classnames';
import { getRangeNumberStyle } from './style';
import { usePrefixCls } from '../utils';

export type RangeNumberVal = [number | null, number | null];

export interface RangeNumberExtProps {
  value?: RangeNumberVal;
  onChange?: (val: RangeNumberVal) => void;
  placeholder?: [string, string];
  disabled?: boolean;
  bordered?: boolean;
  className?: string;
}

function isNoVal(val: number | null | undefined) {
  return val === undefined || val === null;
}

export default function RangeNumberExt(props: RangeNumberExtProps) {
  const [val, setVal] = useState<RangeNumberVal>([null, null]);

  const { value, placeholder, disabled, bordered = true, className, onChange } = props;
  const { prefixCls, mtPrefixCls, token } = usePrefixCls();

  const { status: contextStatus } = useContext(FormItemInputContext);

  const classname = useMemo(() => classNames(
    `${prefixCls}-${mtPrefixCls}-number-range`,
    getRangeNumberStyle(token, prefixCls),
    disabled ? `${prefixCls}-${mtPrefixCls}-number-range-disabled` : undefined,
    bordered ? undefined : `${prefixCls}-${mtPrefixCls}-number-range-borderless`,
    contextStatus ? `${prefixCls}-${mtPrefixCls}-number-range-${contextStatus}` : undefined,
    className,
  ), [token, prefixCls, disabled, bordered, contextStatus, className]);

  const onBeforeInputNumberChange = useCallback((_val: number | null) => {
    if (!(value === undefined || value.length < 1 || isNoVal(value[0]))) {
      setVal([value[0], val[1]]);
    }

    const valCopy: RangeNumberVal = [...val];
    valCopy[0] = _val;
    setVal(valCopy);
    onChange && onChange(valCopy);
  }, [val, value, onChange]);

  const onAfterInputNumberChange = useCallback((_val: number | null) => {
    if (!(value === undefined || value.length < 2 || isNoVal(value[1]))) {
      setVal([val[0], value[1]]);
    }

    const valCopy: RangeNumberVal = [...val];
    valCopy[1] = _val;
    setVal(valCopy);
    onChange && onChange(valCopy);
  }, [val, value, onChange]);

  const onBlur = useCallback(() => {
    if (val === undefined || val.length < 2 || isNoVal(val[0]) || isNoVal(val[1])) {
      return;
    }

    const finVal: RangeNumberVal = [...val.sort((a, b) => (a || 0) - (b || 0))];
    setVal(finVal);
    onChange && onChange(finVal);
  }, [val]);

  return (
    <div className={classname}>
      <Space.Compact>
        <InputNumber
          disabled={disabled}
          placeholder={placeholder && placeholder[0]}
          bordered={false}
          value={value !== undefined ? value[0] : val[0]}
          onChange={onBeforeInputNumberChange}
          onBlur={onBlur}
        />
        <div className={`${prefixCls}-${mtPrefixCls}-number-range-separator`}>
          <SwapRightOutlined />
        </div>
        <InputNumber
          disabled={disabled}
          placeholder={placeholder && placeholder[1]}
          bordered={false}
          value={value !== undefined ? value[1] : val[1]}
          onChange={onAfterInputNumberChange}
          onBlur={onBlur}
        />
      </Space.Compact>
    </div>
  )
}
