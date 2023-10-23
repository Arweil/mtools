import type { InputProps, InputRef } from 'antd';
import { Input } from 'antd';
import React, { useCallback, useEffect, useState } from 'react';
import useCursor from 'rc-input-number/es/hooks/useCursor';
import { useLayoutUpdateEffect } from 'rc-util/es/hooks/useLayoutEffect';

/**
 * 格式化字符串
 *
 * @param {string} val 需要格式化的字符串
 * @param {(number | undefined)} fixedNumber 精度
 * @param {number} devision 千分位，3
 * @returns 格式化后的字符串
 */
export function formatNumber(
  val: string,
  fixedNumber: number | undefined, // 精度
  devision: number, // 千分位 3
) {
  if (Object.prototype.toString.call(val) !== '[object String]') {
    return '';
  }
  let result = val;
  if (fixedNumber === 0) {
    // 先把非数字的都替换掉，除了数字、负号
    // 没有精度不允许输入点
    result = result.replace(/[^\d\-]/g, '');
  } else {
    // 先把非数字的都替换掉，除了数字、小数点、负号
    result = result.replace(/[^\d\.\-]/g, '');
  }

  // 必须保证第一个为数字而不是.
  result = result.replace(/^\./g, '');
  // 保证只有出现一个.而没有多个.
  result = result.replace(/\.{2,}/g, '.');
  // 保证.只出现一次，而不能出现两次以上
  result = result.replace('.', '$#$').replace(/\./g, '').replace('$#$', '.');
  // 负号处理
  if (result.startsWith('-')) {
    result = result.replace('-', '$#$').replace(/\-/g, '').replace('$#$', '-');
  } else {
    result = result.replace(/\-/g, '');
  }
  // 以上已经过滤，此处控制的是如果没有小数点，首位不能为类似于 01、02的金额
  if (result.indexOf('.') < 0 && result.startsWith('0') && result.length > 1) {
    result = result.replace('0', '');
  }

  // 表示小数已经超过需要的位数
  if (
    fixedNumber !== undefined &&
    result.indexOf('.') > -1 &&
    result.length - result.indexOf('.') - 1 > fixedNumber
  ) {
    const [int, float] = result.split('.');
    // 处理 1.00 转换数字后 变为 1 的情况
    if (float === undefined) {
      result = `${result}.${new Array(fixedNumber).fill('0').join('')}`;
    } else {
      // 抹掉精度后面的小数点
      result = `${int}.${float.slice(0, fixedNumber)}`;
    }
  }

  // 展示形式 devision ，千分位，万分位...
  const devisionRule = new RegExp(`\\B(?=(\\d{${devision}})+(?!\\d))`, 'g');
  if (result.indexOf('.') > -1) {
    const [int, float] = result.split('.');
    return devision ? `${int.replace(devisionRule, ',')}.${float}` : result;
  } else {
    return devision ? result.replace(devisionRule, ',') : result;
  }
}

export interface ProInputNumberProps extends Omit<InputProps, 'onChange'> {
  precision?: number; // 精度
  needThousandths?: boolean; // 是否需要格式化为千分位
  autoFix?: boolean; // 自动补齐位数，和 precision 一起使用
  onChange?: (value: string) => void;
}

export default function ProInputNumber(props: ProInputNumberProps) {
  const { precision, needThousandths, autoFix, ...restProps } = props;
  const { value, placeholder, onChange, onBlur = () => {}, onFocus = () => {} } = restProps;
  const [val, setVal] = useState<string | undefined>();
  const [focus, setFocus] = useState<boolean>(false);
  const inputRef = React.useRef<InputRef>(null);
  // @ts-ignore
  const [recordCursor, restoreCursor] = useCursor(inputRef.current?.input, focus);

  useEffect(() => {
    if (typeof value !== 'undefined') {
      const v = formatNumber(
        typeof value !== 'string' ? String(value) : value,
        precision,
        needThousandths ? 3 : 0,
      );
      setVal(v);
    }
  }, [precision, needThousandths, value]);

  useLayoutUpdateEffect(
    function () {
      if (needThousandths) {
        restoreCursor();
      }
    },
    [val],
  );

  const _onChange: React.ChangeEventHandler<HTMLInputElement> = useCallback(
    e => {
      recordCursor();

      let _v = e.target.value;
      const v = formatNumber(_v, precision, needThousandths ? 3 : 0);
      // 还原千分位
      if (needThousandths) {
        _v = v.replace(/\$\s?|(,*)/g, '');
      } else {
        _v = v;
      }
      setVal(v);
      onChange && onChange(_v);
    },
    [precision, needThousandths, recordCursor, onChange],
  );

  const _onBlur: React.FocusEventHandler<HTMLInputElement> = useCallback(
    e => {
      setFocus(false);

      if (val !== undefined && val !== '' && val !== '-' && precision !== undefined && autoFix) {
        const [, float = ''] = val.split('.');
        if (precision > float?.length) {
          const _v = `${val.includes('.') ? val : val + '.'}${new Array(precision - float.length)
            .fill('0')
            .join('')}`;
          setVal(_v);
          onChange && onChange(needThousandths ? _v.replace(/\$\s?|(,*)/g, '') : _v);
        }
      }

      onBlur && onBlur(e);
    },
    [val, precision, autoFix, needThousandths, onChange, onBlur],
  );

  const _onFocus: React.FocusEventHandler<HTMLInputElement> = useCallback(
    e => {
      setFocus(true);
      onFocus && onFocus(e);
    },
    [onFocus],
  );

  return (
    <Input
      autoComplete="off"
      {...restProps}
      ref={inputRef}
      value={val}
      onChange={_onChange}
      onBlur={_onBlur}
      onFocus={_onFocus}
      placeholder={placeholder}
    />
  );
}
