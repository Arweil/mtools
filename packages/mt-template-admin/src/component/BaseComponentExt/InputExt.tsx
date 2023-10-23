/* eslint-disable react/jsx-props-no-spreading */

import React from 'react';
import { Input } from 'antd';
import { InputProps } from 'antd/lib/input';

export interface InputExtProps extends InputProps {
  readonly?: boolean;
}

export default function InputExt(props: InputExtProps): JSX.Element {
  const { readonly, value } = props;

  if (readonly) {
    return <span style={{ wordWrap: 'break-word' }}>{value || '-'}</span>;
  }

  return <Input autoComplete="off" {...props} />;
}
