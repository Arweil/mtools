import React from 'react';
import { Form } from 'antd'; // 修改Button为想要导入的组件
import type { FormItemProps } from 'antd';

export type FormItemExtProps = FormItemProps

export default function FormItemExt(props: FormItemExtProps) {
  const { children, ...restProps } = props;
  return <Form.Item {...restProps}>{children}</Form.Item>;
}
