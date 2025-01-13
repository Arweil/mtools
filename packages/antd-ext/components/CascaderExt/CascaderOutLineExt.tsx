import { css } from '@emotion/css';
import type { GlobalToken } from 'antd';
import { Cascader, theme, Typography } from 'antd';
import classNames from 'classnames';
import React, { useMemo, useRef } from 'react';
import type { Theme } from '../ConfigProviderExt/context';
import NotFoundContent from '../NotFoundContent';
import OutLineWrapper from '../OutLineWrapper';
import { usePrefixCls } from '../utils';
import type { CascaderExtProps } from './CascaderExt';

const popup = (token: GlobalToken, prefixCls: string) => css`
  min-height: 148px;
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

const style = (prefixCls: string) => css`
  .${prefixCls}-select-borderless {
    .${prefixCls}-select-selector {
      border: 0px !important;
      height: 30px !important;
      padding: 0;
      .${prefixCls}-select-selection-search {
        inset-inline-start: 0;
        margin-inline-start: 0;
      }
      .${prefixCls}-select-selection-placeholder{
        inset-inline-start: 0;
      }
    }
    &.${prefixCls}-select-single {
      height: 30px;
    }
  }

  .${prefixCls}-select {
    width: 100%;
  }
`;

const wrapperCss = (prefixCls: string) => css`
  .${prefixCls}-cascader-dropdown {
    inset: auto auto 37px 0px !important;
  }
`;

const { useToken } = theme;

export interface CascaderOutLineExtProps extends CascaderExtProps {
  label: string;
  customTheme?: Theme;
}

export default function CascaderExt(props: CascaderOutLineExtProps) {
  const { label, disabled, tooltip, popupClassName, ...restProps } = props;

  const { prefixCls } = usePrefixCls();
  const { token } = useToken();
  const refCascaderOutLine = useRef<HTMLDivElement>(null);

  const refCascader = useRef<HTMLDivElement>(null);

  const formattedPopupClassName = useMemo(
    () => classNames(popupClassName, popup(token, prefixCls)),
    [popupClassName, token, prefixCls],
  );

  const wrapperClassName = useMemo(() => classNames(wrapperCss(prefixCls)), [prefixCls]);

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

  return (
    <div ref={refCascader} className={wrapperClassName}>
      <OutLineWrapper
        label={label}
        injectStyle={style}
        ref={refCascaderOutLine}
        disabled={disabled}
        isRequired={restProps['aria-required'] === 'true'}
      >
        <Cascader
          {...restProps}
          variant="borderless"
          optionRender={optionRenderContent}
          popupClassName={formattedPopupClassName}
          getPopupContainer={() => refCascader.current}
        />
      </OutLineWrapper>
    </div>
  );
}
