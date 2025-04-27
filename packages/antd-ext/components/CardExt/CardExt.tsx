import { css } from '@emotion/css';
import type { CardProps } from 'antd';
import { Card } from 'antd';
import classNames from 'classnames';
import React from 'react';
import { useThemeExt } from '../theme';
import { usePrefixCls } from '../utils';
import { customStyle } from './ThemeHermes';

interface FooterLabel {
  /** 标签图标URL */
  icon: string;
  /** 标签文本 */
  label: string;
  /** 标签样式 */
  labelStyle?: React.CSSProperties;
}

type FooterAlignType = 'left' | 'center' | 'right' | 'space-between';

export interface CardExtProps extends Omit<CardProps, 'type'> {
  /** 内容区域是否可滚动 */
  scrollable?: boolean;
  /** 内容区域高度 */
  contentHeight?: number | string;
  /** 是否显示悬浮效果 */
  hoverable?: boolean;
  /** 自定义底部内容 */
  footer?: React.ReactNode;
  /** 底部对齐方式 */
  footerAlign?: FooterAlignType;
  /** 底部样式 */
  footerStyle?: React.CSSProperties;
  /** 标题前的图标 */
  titleIcon?: string;
  /** 标题右侧的额外文本 */
  textExtra?: React.ReactNode;
  /** 标题样式 */
  headTitleClassName?: string;
  /** 底部标签 */
  footerLabels?: FooterLabel[];
  /** 底部标签右侧内容 */
  footerLabelRight?: React.ReactNode;
}

const isValidFooterLabel = (label: FooterLabel): boolean => {
  return (
    typeof label === 'object' &&
    label !== null &&
    typeof label.icon === 'string' &&
    typeof label.label === 'string' &&
    label.icon.length > 0 &&
    label.label.length > 0
  );
};

const isValidContentHeight = (height: number | string | undefined): boolean => {
  if (height === undefined) return true;
  if (typeof height === 'number') return height > 0;
  return typeof height === 'string' && height.length > 0;
};

const isValidTitleIcon = (icon: string | undefined): boolean => {
  return typeof icon === 'string' && icon.length > 0;
};

const CardExt: React.FC<CardExtProps> = props => {
  const {
    className,
    scrollable,
    contentHeight,
    style,
    bodyStyle,
    hoverable,
    footer,
    footerAlign = 'right',
    footerStyle,
    title,
    titleIcon,
    textExtra,
    headTitleClassName,
    footerLabels,
    footerLabelRight,
    ...restProps
  } = props;

  // 校验 contentHeight
  if (contentHeight !== undefined && !isValidContentHeight(contentHeight)) {
    console.warn('CardExt: contentHeight must be a positive number or non-empty string');
  }

  const { mtPrefixCls } = usePrefixCls();
  const prefixCls = `${mtPrefixCls}-card`;
  const { token, tokenExt } = useThemeExt();

  const cardClassName = classNames(
    prefixCls,
    {
      [`${prefixCls}-hoverable`]: hoverable,
    },
    css(customStyle(token, prefixCls, tokenExt)),
    className,
  );

  const styles = {
    body: {
      ...(scrollable ? { overflow: 'auto' } : {}),
      ...(isValidContentHeight(contentHeight) ? { height: contentHeight } : {}),
      ...bodyStyle,
    },
  };

  const renderLabelFooter = () => {
    if (!footerLabels || !Array.isArray(footerLabels) || footerLabels.length === 0) return null;

    // 验证每个标签的数据格式
    const validLabels = footerLabels.filter(isValidFooterLabel);
    if (validLabels.length === 0) return null;

    return (
      <div className={`${prefixCls}-foot-label`}>
        <div className={`${prefixCls}-foot-label-left`}>
          {validLabels.map((item, index) => (
            <div key={`${item.label}-${index}`} className={`${prefixCls}-foot-label-item`}>
              <img
                src={item.icon}
                alt={item.label}
                onError={e => {
                  e.currentTarget.style.display = 'none';
                }}
              />
              <span style={item.labelStyle}>{item.label}</span>
            </div>
          ))}
        </div>
        {footerLabelRight && (
          <div className={`${prefixCls}-foot-label-right`}>{footerLabelRight}</div>
        )}
      </div>
    );
  };

  const renderFooter = () => {
    if (!footer && !footerLabels) return null;

    return (
      <div
        style={{ ...footerStyle }}
        className={classNames(`${prefixCls}-footer`, {
          [`${prefixCls}-footer-${footerAlign}`]: footerAlign,
        })}
      >
        {footer}
        {renderLabelFooter()}
      </div>
    );
  };

  const renderTitle = () => {
    if (!title) return null;

    // 校验 titleIcon
    const validTitleIcon = isValidTitleIcon(titleIcon) ? titleIcon : undefined;

    return (
      <div className={classNames(`${prefixCls}-head-title`, headTitleClassName)}>
        {validTitleIcon && (
          <img
            className={`${prefixCls}-head-title-icon`}
            src={validTitleIcon}
            alt="titleIcon"
            onError={e => {
              e.currentTarget.style.display = 'none';
            }}
          />
        )}
        <span className={`${prefixCls}-head-title-text`}>{title}</span>
        {textExtra && <div className={`${prefixCls}-head-title-extra`}>{textExtra}</div>}
      </div>
    );
  };

  return (
    <Card
      className={cardClassName}
      style={style}
      styles={styles}
      title={renderTitle()}
      {...restProps}
      extra={null}
    >
      {props.children}
      {renderFooter()}
    </Card>
  );
};

export default CardExt;
