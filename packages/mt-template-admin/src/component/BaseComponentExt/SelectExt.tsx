/* eslint-disable react/jsx-props-no-spreading */
import React, { PureComponent } from 'react';
import { Select } from 'antd';
import { OptionProps, SelectValue, SelectProps } from 'antd/lib/select';

export interface FSelectDataList {
  code: string | number;
  name: string;
  disabled?: boolean;
  title?: string;
  className?: string;
}

interface FSelectPropsExt {
  dataMap?: {
    [key: string]: string;
    [key: number]: string;
  };
  dataList?: FSelectDataList[];
  optionAll?: boolean | { code: string; name: string };
  readonly?: boolean;
}

export interface SelectExtend<T = SelectValue> extends FSelectPropsExt, SelectProps<T> {}

const { Option } = Select;

const onFilterOption = (input: string, option: React.ReactElement<OptionProps>) => {
  if (typeof option.props.children === 'string') {
    return option.props.children.toLowerCase().indexOf(input.toLowerCase()) >= 0;
  }
  return option;
};

function isStrOrNum(params: unknown): params is string | number {
  return (
    Object.prototype.toString.call(params) === '[object String]' ||
    Object.prototype.toString.call(params) === '[object Number]'
  );
}

function isStrOrNumArr(params: unknown): params is (string | number)[] {
  if (Array.isArray(params)) {
    return params.every(isStrOrNum);
  }

  return false;
}

function getValFromCode(
  code: string | number,
  dataMap: SelectExtend['dataMap'],
  dataList: SelectExtend['dataList'],
): string {
  return (
    (dataMap && dataMap[code]) ||
    (dataList && dataList.find(item => item.code === code)?.name) ||
    '-'
  );
}

export default class SelectExt<T = SelectValue> extends PureComponent<SelectExtend<T>> {
  render(): JSX.Element {
    const {
      dataMap = {}, // 数据源 对象
      dataList = [], // 数据源 数组
      optionAll = false, // 是否有 "全部"
      optionFilterProp = 'children',
      filterOption = onFilterOption,
      readonly,
      ...restProps
    } = this.props;

    if (readonly) {
      const { value } = restProps;
      // 如果 value 是字符串
      if (isStrOrNum(value)) {
        return <>{getValFromCode(value, dataMap, dataList)}</>;
      }

      // 如果 value 是字符串或者数字数组
      if (isStrOrNumArr(value) && restProps.mode === 'multiple') {
        if (value.length) {
          return <>{value.map(item => getValFromCode(item, dataMap, dataList)).join(',')}</>;
        }
        return <>-</>;
      }
    }

    let finOptionAll = null;
    if (Object.prototype.toString.call(optionAll) === '[object Boolean]') {
      finOptionAll = optionAll ? <Option value="all">全部</Option> : null;
    } else if (Object.prototype.toString.call(optionAll) === '[object Object]') {
      finOptionAll = (
        <Option value={(optionAll as { code: string; name: string }).code}>
          {(optionAll as { code: string; name: string }).name}
        </Option>
      );
    }

    return (
      <Select
        optionFilterProp={optionFilterProp}
        // eslint-disable-next-line @typescript-eslint/ban-ts-comment
        // @ts-ignore
        filterOption={filterOption}
        {...restProps}
      >
        {finOptionAll}
        {Object.keys(dataMap).map(item => (
          <Option key={item} value={item}>
            {dataMap[item]}
          </Option>
        ))}
        {dataList.map(item => {
          const { code, name, ...restOptionProps } = item;
          return (
            <Option value={code} {...restOptionProps}>
              {name}
            </Option>
          );
        })}
      </Select>
    );
  }
}
