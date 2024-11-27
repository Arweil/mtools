import { css } from '@emotion/css';
import type { GlobalToken } from 'antd';
import { Cascader, theme, Typography } from 'antd';
import type { DefaultOptionType } from 'antd/es/select';
import classNames from 'classnames';
import React, { useCallback, useMemo, useRef, useState } from 'react';
import type { Theme } from '../ConfigProviderExt/context';
import NotFoundContent from '../NotFoundContent';
import OutLineWrapper from '../OutLineWrapper';
import { usePrefixCls } from '../utils';
import type { CascaderExtProps } from './CascaderExt';

const popup = (token: GlobalToken, prefixCls: string) => css`
  min-height: 148px;
  .ant-cascader-dropdown {
    margin-left: -84px !important;
  }
  .${prefixCls}-cascader-menus {
    .${prefixCls}-typography {
      color: ${token.colorTextLabel};
    }
    .${prefixCls}-typography-disabled {
      color: ${token.colorTextDisabled};
    }
    .${prefixCls}-cascader-checkbox-inner {
      border-radius: 4px;
    }
    .${prefixCls}-cascader-checkbox-disabled {
      .${prefixCls}-cascader-checkbox-inner {
        background: ${token.colorBgContainerDisabled};
      }
    }
    .${prefixCls}-cascader-menu-item {
      .${prefixCls}-cascader-menu-item-expand-icon {
        color: ${token.colorArrow};
      }
    }
  }
`;

const cascaderStyle = (token: GlobalToken, prefixCls: string) => css`
  .${prefixCls}-select-selector {
      height: 30px !important;
      padding: 0px !important;
      .${prefixCls}-select-selection-search {
        inset-inline-start: 0;
        margin-inline-start: 0;
      }
      .${prefixCls}-select-selection-placeholder{
        inset-inline-start: 0;
      }
    .${prefixCls}-select-selection-overflow .${prefixCls}-select-selection-item {
      background: ${token.colorTextLightSolid};
      border-radius: 2px;
    }
  }
  .ant-select-dropdown {
    margin-left: -84px;
  }
`;

const { useToken } = theme;

export interface CascaderOutLineExtProps extends CascaderExtProps {
  label: string;
  customTheme?: Theme;
}

export default function CascaderExt(props: CascaderOutLineExtProps) {
  const { label, disabled, tooltip, popupClassName, tokenExt, ...restProps } = props;

  const { prefixCls } = usePrefixCls();
  const { token } = useToken();
  const refCascaderOutLine = useRef<HTMLDivElement>(null);
  const [width, setWidth] = useState<number>(refCascaderOutLine.current?.offsetWidth);

  const refCascader = useRef<HTMLDivElement>(null);

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
    () => classNames(popupClassName, popup(token, prefixCls)),
    [popupClassName, token, prefixCls],
  );

  const CascaderClassName = useMemo(
    () => classNames(cascaderStyle(token, prefixCls)),
    [token, prefixCls],
  );

  const optionRenderContent = contentProps => {
    const { disabled: contentDisabled, label: contentLabel } = contentProps;

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

  const onDropdownVisibleChange = useCallback((open: boolean) => {
    if (open) {
      console.log(refCascader?.current);
      const test = refCascader?.current?.offsetWidth;
      console.log(test, refCascaderOutLine?.current?.offsetWidth);

      setWidth(refCascaderOutLine?.current?.offsetWidth - test || 0);
    }
  }, []);

  console.log(width);

  return (
    <OutLineWrapper
      label={label}
      // injectStyle={style}
      ref={refCascaderOutLine}
      disabled={disabled}
      isRequired={restProps['aria-required'] === 'true'}
      className={CascaderClassName}
    >
      <div ref={refCascader}>
        <Cascader
          allowClear
          showSearch
          variant="borderless"
          optionRender={optionRenderContent}
          onDropdownVisibleChange={onDropdownVisibleChange}
          {...restProps}
          popupClassName={formattedPopupClassName}
        />
      </div>
    </OutLineWrapper>
  );
}
