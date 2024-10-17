import { css } from '@emotion/css';
import { Cascader, Typography } from 'antd';
import type { DefaultOptionType } from 'antd/es/select';
import classNames from 'classnames';
import React, { useCallback, useMemo } from 'react';
import NotFoundContent from '../NotFoundContent';
import type { OutLineWrapperProps } from '../OutLineWrapper';
import OutLineWrapper from '../OutLineWrapper';
import type { ThemeColor } from '../theme/type';
import { usePrefixCls } from '../utils';
import type { CascaderExtProps } from './CascaderExt';

const popup = (tokenExt: Partial<ThemeColor>, prefixCls: string) => css`
  min-height: 148px;

  .${prefixCls}-cascader-menus {
    .${prefixCls}-typography {
      color: ${tokenExt.colorBlackL2};
    }
    .${prefixCls}-typography-disabled {
      color: ${tokenExt.colorBlackL3};
    }
    .${prefixCls}-cascader-checkbox-inner {
      border-radius: 4px;
    }
    .${prefixCls}-cascader-checkbox-disabled {
      .${prefixCls}-cascader-checkbox-inner {
        background: ${tokenExt.colorGreyL5};
      }
    }
  }
`;

const cascaderStyle = (tokenExt: Partial<ThemeColor>, prefixCls: string) => css`
  .${prefixCls}-select-selector {
    .${prefixCls}-select-selection-item {
      background: ${tokenExt.colorGreyL4};
      border-radius: 2px;
    }
  }
`;

export interface CascaderOutLineExtProps
  extends Omit<OutLineWrapperProps, 'disabled'>,
    CascaderExtProps {
  label: string;
}

export default function CascaderExt(props: CascaderOutLineExtProps) {
  const { label, disabled, tooltip, popupClassName, tokenExt, ...restProps } = props;

  const { prefixCls } = usePrefixCls();

  const filterOption = useCallback((inputValue: string, option: DefaultOptionType) => {
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
    () => classNames(popupClassName, popup(tokenExt, prefixCls)),
    [popupClassName, tokenExt, prefixCls],
  );

  const CascaderClassName = useMemo(
    () => classNames(cascaderStyle(tokenExt, prefixCls)),
    [tokenExt, prefixCls],
  );

  const optionRenderContent = contentProps => {
    const { disabled: contentDisabled, contentLabel } = contentProps;

    if (contentLabel) {
      return (
        <Typography.Paragraph
          disabled={contentDisabled}
          style={{ marginBottom: 0, maxWidth: 120 }}
          ellipsis={{
            rows: 1,
            expandable: false,
            tooltip: {
              title: contentLabel,
              ...tooltip,
            },
          }}
        >
          {contentLabel}
        </Typography.Paragraph>
      );
    }

    return <NotFoundContent />;
  };

  return (
    <OutLineWrapper
      label={label}
      // injectStyle={style}
      disabled={disabled}
      isRequired={restProps['aria-required'] === 'true'}
      className={CascaderClassName}
    >
      <Cascader
        allowClear
        multiple
        showSearch
        variant="borderless"
        optionRender={optionRenderContent}
        {...restProps}
        popupClassName={formattedPopupClassName}
      />
    </OutLineWrapper>
  );
}
