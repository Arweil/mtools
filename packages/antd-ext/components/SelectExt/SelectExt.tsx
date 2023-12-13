import React, { useCallback, useMemo } from 'react';
import { Select, Typography, theme } from 'antd';
import type { GlobalToken, SelectProps, TooltipProps } from 'antd';
import { css } from '@emotion/css';
import classNames from 'classnames';
import type { BaseOptionType, DefaultOptionType } from 'antd/es/select';
import NotFoundContent from '../NotFoundContent';
import { usePrefixCls } from '../utils';

const { useToken } = theme;

const popup = (token: GlobalToken, prefixCls: string, mtPrefixCls: string) => css`
  min-height: 148px;

  .${prefixCls}-${mtPrefixCls}-select-item-wrapper {
    display: flex;
    align-items: center;
  }

  .${prefixCls}-${mtPrefixCls}-select-checkbox {
    margin-inline-end: ${token.marginXS}px;
  }

  .${prefixCls}-select-item-option-selected {
    .${prefixCls}-${mtPrefixCls}-select-checkbox-inner {
      background-color: ${token.colorPrimary};
      border-color: ${token.colorPrimary};

      &::after {
        position: absolute;
        top: 50%;
        display: block;
        box-sizing: border-box;
        width: ${(token.controlInteractiveSize / 14) * 5}px;
        height: ${(token.controlInteractiveSize / 14) * 8}px;
        border: ${token.lineWidthBold}px solid ${token.colorWhite};
        border-top: 0;
        transform: rotate(45deg) scale(1) translate(-50%, -50%);
        content: '';
        border-inline-start: 0;
        inset-inline-start: 21.5%;
      }
    }
  }

  .${prefixCls}-select-item-option-disabled {
    .${prefixCls}-${mtPrefixCls}-select-checkbox-inner {
      background: ${token.colorBgContainerDisabled};
      border-color: ${token.colorBorder};

      &::after {
        border-color: ${token.colorTextDisabled};
      }
    }
  }

  .${prefixCls}-${mtPrefixCls}-select-checkbox-inner {
    position: relative;
    display: block;
    width: ${token.controlInteractiveSize}px;
    height: ${token.controlInteractiveSize}px;
    background-color: ${token.colorBgContainer};
    border: ${token.lineWidth}px solid ${token.colorBorder};
    border-radius: ${token.borderRadiusSM}px;

    &:hover {
      border-color: ${token.colorPrimary};
    }
  }

  .${prefixCls}-${mtPrefixCls}-select-content {
    overflow: hidden;
  }
`;

export interface SelectItemWrapperProps {
  children?: React.ReactNode;
  disabled?: boolean;
  tooltip?: TooltipProps;
  multiple: boolean;
}

export function SelectItemWrapperWithComp(props: SelectItemWrapperProps): JSX.Element {
  const { children, multiple } = props;
  const { prefixCls, mtPrefixCls } = usePrefixCls();

  return multiple ? (
    <div className={`${prefixCls}-${mtPrefixCls}-select-item-wrapper`}>
      <span className={classNames(`${prefixCls}-${mtPrefixCls}-select-checkbox`)}>
        <span className={`${prefixCls}-${mtPrefixCls}-select-checkbox-inner`} />
      </span>
      <div className={`${prefixCls}-${mtPrefixCls}-select-content`}>{children}</div>
    </div>
  ) : (
    <>{children}</>
  );
}

export function SelectItemContent(props: Omit<SelectItemWrapperProps, 'multiple'>) {
  const { disabled, children, tooltip } = props;

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

export function SelectItemWrapper(props: SelectItemWrapperProps): JSX.Element {
  const { children, disabled, tooltip, multiple } = props;

  if (multiple) {
    return (
      <SelectItemWrapperWithComp multiple={multiple}>
        <SelectItemContent disabled={disabled} tooltip={tooltip}>
          {children}
        </SelectItemContent>
      </SelectItemWrapperWithComp>
    );
  }

  return (
    <SelectItemContent disabled={disabled} tooltip={tooltip}>
      {children}
    </SelectItemContent>
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
  multipleCheckbox?: boolean;
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
    multipleCheckbox,
    ...restProps
  } = props;

  const { prefixCls, mtPrefixCls } = usePrefixCls();

  const { token } = useToken();

  const useOptionCheckbox = useMemo(() => {
    return (props.mode === 'multiple' || props.mode === 'tags') && multipleCheckbox;
  }, [props.mode, multipleCheckbox]);

  const formattedOptions = useMemo(() => {
    if (options && options.length > 0) {
      const mapLabelName = fieldNames?.label || 'label';

      return options.map(item => ({
        ...item,
        [mapLabelName]: React.isValidElement(item[mapLabelName]) ? (
          <SelectItemWrapperWithComp multiple={useOptionCheckbox}>
            {item[mapLabelName]}
          </SelectItemWrapperWithComp>
        ) : (
          ((
            <SelectItemWrapper
              tooltip={tooltip}
              disabled={item.disabled}
              multiple={useOptionCheckbox}
            >
              {item[mapLabelName]}
            </SelectItemWrapper>
          ) as React.ReactNode)
        ),
        relLabel: item[mapLabelName],
      }));
    }

    if (dataMap) {
      const dataMapKeys = Object.keys(dataMap);
      if (dataMapKeys.length > 0) {
        return dataMapKeys.map(item => ({
          value: item,
          label: React.isValidElement(dataMap[item]) ? (
            <SelectItemWrapperWithComp multiple={useOptionCheckbox}>
              dataMap[item]
            </SelectItemWrapperWithComp>
          ) : (
            ((
              <SelectItemWrapper tooltip={tooltip} multiple={useOptionCheckbox}>
                {dataMap[item]}
              </SelectItemWrapper>
            ) as React.ReactNode)
          ),
          relLabel: dataMap[item],
        }));
      }
    }

    return undefined;
  }, [options, dataMap, fieldNames, tooltip, useOptionCheckbox]);

  const filterOption = useCallback((inputValue: string, option: DefaultOptionExtType) => {
    if (Object.prototype.toString.call(option.relLabel) === '[object String]') {
      // 转换成小写，英文时比较适用
      return (option.relLabel as string).toLowerCase().includes(inputValue.toLowerCase());
    }

    if (Object.prototype.toString.call(option.relLabel) === '[object Number]') {
      return `${option.relLabel as number}`.includes(inputValue);
    }

    return false;
  }, []);

  const formattedPopupClassName = useMemo(
    () => classNames(popupClassName, popup(token, prefixCls, mtPrefixCls)),
    [popupClassName, token, prefixCls, mtPrefixCls],
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
      menuItemSelectedIcon={useOptionCheckbox ? null : props.menuItemSelectedIcon}
    >
      {children}
    </Select>
  );
}
