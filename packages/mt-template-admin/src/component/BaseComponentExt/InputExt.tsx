/* eslint-disable react/jsx-props-no-spreading */

import React from 'react';
import {
  Input,
} from 'antd';
import { InputProps } from 'antd/lib/input';

export default function InputExt(props: InputProps): JSX.Element {
  return (
    <Input
      autoComplete="off"
      {...props}
    />
  );
}
