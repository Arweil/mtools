import React from 'react';
import { {{{originCompName}}} } from 'antd'; // 修改Button为想要导入的组件
import type { {{{originCompName}}}Props } from 'antd';

export interface {{{compName}}}Props extends {{{originCompName}}}Props {}

export default function {{{compName}}}(props: {{{compName}}}Props) {
  const { children, ...restProps } = props;
  return <{{{originCompName}}} {...restProps}>{children}</{{{originCompName}}}>;
}
