import React, { useCallback, useMemo } from 'react';
import { Select, Typography } from 'antd';
import type { SelectProps, TooltipProps } from 'antd';
import { css } from '@emotion/css';
import classNames from 'classnames';
import type { BaseOptionType, DefaultOptionType } from 'antd/es/select';
import NotFoundContent from '../NotFoundContent';

const popup = css`
  min-height: 148px;
`;

export interface SelectItemWrapperProps {
  children?: React.ReactNode;
  disabled?: boolean;
  tooltip?: TooltipProps;
}

export function SelectItemWrapper(props: SelectItemWrapperProps): JSX.Element {
  const { children, disabled, tooltip } = props;
  return (
    <Typography.Paragraph
      disabled={disabled}
      style={{ marginBottom: 0 }}
      ellipsis={{
        rows: 1,
        expandable: false,
        tooltip: {
          children,
          ...tooltip,
        },
      }}
    >
      {children}
    </Typography.Paragraph>
  );
}

export type DefaultOptionExtType = Partial<DefaultOptionType> & {
  relLabel?: React.ReactNode;
};

export interface SelectExtProps<
  ValueType = any,
  OptionType extends BaseOptionType = DefaultOptionExtType,
> extends SelectProps<ValueType, OptionType> {
  dataMap?: Record<string | number, React.ReactNode>;
  tooltip?: TooltipProps;
}

export default function SelectExt<ValueType = any>(props: SelectExtProps) {
  const {
    dataMap,
    options,
    children,
    popupClassName,
    tooltip,
    style,
    listHeight,
    fieldNames,
    ...restProps
  } = props;

  const formattedOptions = useMemo(() => {
    if (options && options.length > 0) {
      const mapLabelName = fieldNames?.label || 'label';

      return options.map(item => ({
        ...item,
        [mapLabelName]: React.isValidElement(item[mapLabelName])
          ? item[mapLabelName]
          : ((
              <SelectItemWrapper tooltip={tooltip} disabled={item.disabled}>
                {item[mapLabelName]}
              </SelectItemWrapper>
            ) as React.ReactNode),
        relLabel: item[mapLabelName],
      }));
    }

    if (dataMap) {
      const dataMapKeys = Object.keys(dataMap);
      if (dataMapKeys.length > 0) {
        return dataMapKeys.map(item => ({
          value: item,
          label: React.isValidElement(dataMap[item])
            ? dataMap[item]
            : ((
                <SelectItemWrapper tooltip={tooltip}>{dataMap[item]}</SelectItemWrapper>
              ) as React.ReactNode),
          relLabel: dataMap[item],
        }));
      }
    }

    return undefined;
  }, [options, dataMap, fieldNames, tooltip]);

  const filterOption = useCallback((inputValue: string, option: DefaultOptionExtType) => {
    // 如果是字符串
    if (!React.isValidElement(option.relLabel)) {
      // 转换成小写，英文时比较适用
      return (option.relLabel as string).toLowerCase().includes(inputValue.toLowerCase());
    }

    return false;
  }, []);

  const formattedPopupClassName = useMemo(
    () => classNames(popupClassName, popup),
    [popupClassName],
  );

  const formattedListHeight = useMemo(
    () => (listHeight !== undefined ? listHeight : 220),
    [listHeight],
  );

  return (
    <Select<ValueType, DefaultOptionExtType>
      allowClear
      options={formattedOptions}
      notFoundContent={<NotFoundContent />}
      popupClassName={formattedPopupClassName}
      optionLabelProp="relLabel"
      optionFilterProp="relLabel"
      filterOption={filterOption}
      style={{ minWidth: 130, ...style }}
      listHeight={formattedListHeight}
      fieldNames={fieldNames}
      {...restProps}
    >
      {children}
    </Select>
  );
}
