/* eslint-disable react/jsx-props-no-spreading */
import React from 'react';
import { Radio } from 'antd';
import { RadioGroupProps } from 'antd/lib/radio';

const RadioGroup = Radio.Group;

export interface IRadioGroupExtProps extends RadioGroupProps {
  dataMap?: {
    [key: string]: string;
    [key: number]: string;
  };
  dataList?: {
    code: string | number;
    name: string;
    disabled?: boolean;
  }[];
}

export default function RadioGroupExt(props: IRadioGroupExtProps): JSX.Element {
  const { dataMap = {}, dataList = [], ...resetProps } = props;
  return (
    <RadioGroup {...resetProps}>
      {
        Object.keys(dataMap).map((item) => (<Radio key={item} value={item}>{dataMap[item]}</Radio>))
      }

      {
        dataList.map((item) => (
          <Radio key={item.code} value={item.code} disabled={item.disabled}>{item.name}</Radio>
        ))
      }
    </RadioGroup>
  );
}
