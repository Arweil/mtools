import React from 'react';
import { Input } from 'antd';
import type { InputProps } from 'antd';

export interface InputExtProps extends InputProps {
  labelInside?: boolean; // 是否需要把label展示在输入框内
}

export function InputExt(props: InputExtProps) {
  return (
    <Input autoComplete='off' {...props} />
  );
}
