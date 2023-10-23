/* eslint-disable react/jsx-props-no-spreading */
import React from 'react';
import { Checkbox } from 'antd';
import { CheckboxGroupProps, CheckboxOptionType } from 'antd/lib/checkbox';

const CheckboxGroup = Checkbox.Group;

export interface ICheckboxGroupExtProps extends CheckboxGroupProps {
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

export default function CheckboxGroupExt(props: ICheckboxGroupExtProps): JSX.Element {
  const { dataMap = {}, dataList = [], options, ...restProps } = props;

  const optionsDataMap: CheckboxOptionType[] = Object.keys(dataMap).map(item => ({
    label: dataMap[item],
    value: item,
  }));

  const optionsDataList: CheckboxOptionType[] = dataList.map(item => ({
    label: item.name,
    value: `${item.code}`,
    disabled: item.disabled,
  }));

  return <CheckboxGroup {...restProps} options={[...optionsDataMap, ...optionsDataList]} />;
}
