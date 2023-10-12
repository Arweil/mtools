import React from 'react';
import { Button } from 'antd'; // 修改Button为想要导入的组件
import type { ButtonProps } from 'antd';

export interface {{{compName}}}Props extends ButtonProps {}

export default function {{{compName}}}(props: {{{compName}}}Props) {
  const { children, ...restProps } = props;
  return <Button {...restProps}>{children}</Button>;
}
