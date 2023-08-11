import React from 'react';
import OutLineWrapper from '../OutLineWrapper';
import type { OutLineWrapperProps } from '../OutLineWrapper';
import type { ProInputNumberProps } from './ProInputNumber';
import ProInputNumber from './ProInputNumber';

export interface ProInputNumberOutLineProps
  extends OutLineWrapperProps,
    Omit<ProInputNumberProps, 'children'> {}

export default function ProInputNumberOutLine(props: ProInputNumberOutLineProps) {
  const { label, ...restProps } = props;
  return (
    <OutLineWrapper<ProInputNumberOutLineProps> label={label}>
      <ProInputNumber {...restProps} bordered={false} />
    </OutLineWrapper>
  );
}
