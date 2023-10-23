import React from 'react';
import { Input } from 'antd';
import type { InputProps } from 'antd';

export type InputExtProps = InputProps;

export function InputExt(props: InputExtProps) {
  return <Input autoComplete="off" {...props} />;
}
