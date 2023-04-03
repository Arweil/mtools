import React, { useMemo } from 'react';
import { Select, Typography } from 'antd';
import type { SelectProps, TooltipProps } from 'antd';
import NotFound from './img/NotFound';
import { css } from '@emotion/css';
import classNames from 'classnames';

const empty = css`
  display: flex;
  align-items: center;
  flex-direction: column;
`

const emptyImg = css`
  width: 100px;
  height: 58px;
  margin: 18px auto 8px;
`;

const emptyText = css`
  color: #BFBFBF;
  font-size: 12px;
  line-height: 18px;
`;

const popup = css`
  min-height: 148px;
`;

export function NotFoundContent() {
  return (
    <div className={empty}>
      <div className={emptyImg}>
        <NotFound />
      </div>
      <div className={emptyText}>暂无内容</div>
    </div>
  )
}

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
          ...tooltip
        },
      }}
    >
      {children}
    </Typography.Paragraph>
  )
}

export interface SelectExtProps extends SelectProps {
  dataMap?: { [key: string | number]: React.ReactNode };
  tooltip?: TooltipProps;
}

export default function SelectExt(props: SelectExtProps) {
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
        [mapLabelName]: React.isValidElement(item[mapLabelName]) ? item[mapLabelName] : (<SelectItemWrapper tooltip={tooltip} disabled={item.disabled}>{item[mapLabelName]}</SelectItemWrapper>) as React.ReactNode,
        relLabel: item[mapLabelName],
      }));
    }

    if (dataMap) {
      const dataMapKeys = Object.keys(dataMap);
      if (dataMapKeys.length > 0) {
        return dataMapKeys.map(item => ({
          value: item,
          label: React.isValidElement(dataMap[item]) ? dataMap[item] : (<SelectItemWrapper tooltip={tooltip}>{dataMap[item]}</SelectItemWrapper>) as React.ReactNode,
          relLabel: dataMap[item],
        }));
      }
    }

    return undefined;
  }, [options, dataMap, fieldNames]);

  const formattedPopupClassName = useMemo(() => classNames(popupClassName, popup), [popupClassName]);

  const formattedListHeight = useMemo(() => listHeight !== undefined ? listHeight : 220, [listHeight]);

  return (
    <Select
      allowClear
      options={formattedOptions}
      notFoundContent={<NotFoundContent />}
      popupClassName={formattedPopupClassName}
      optionLabelProp="relLabel"
      optionFilterProp="relLabel"
      style={{ minWidth: 130, ...style }}
      listHeight={formattedListHeight}
      fieldNames={fieldNames}
      {...restProps}
    >
      {children}
    </Select>
  );
}

