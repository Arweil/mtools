import type { PaginationProps } from 'antd';
import { Pagination } from 'antd';
import type { CardProps } from 'antd/lib/card';
import classNames from 'classnames';
import React, { useEffect } from 'react';
import left from '../assets/img/left.svg';
import right from '../assets/img/right.svg';
import { useThemeExt } from '../theme';
import { usePrefixCls } from '../utils';
import { css } from '../utils/emotion';
import { customStyle } from './ThemeHerme';
export interface CardListExtProps {
  dataSource: any[];
  columns?: number;
  rowGap?: number;
  columnGap?: number;
  cardProps?: CardProps;
  renderItem: (item: any, index: number) => React.ReactNode;
  renderDetail?: (item: any) => React.ReactNode;
  // 分页属性
  pagination?: false | (PaginationProps & { position?: 'top' | 'bottom' | 'both' });
  className?: string;
  // 再次点击 是否收起
  isCollapse?: boolean;
  cardSelectedStyle?: React.CSSProperties;
}

export const CardListExt: React.FC<CardListExtProps> = ({
  dataSource = [],
  columns = 4,
  rowGap = 16,
  columnGap = 16,
  renderItem,
  renderDetail,
  pagination,
  className,
  cardSelectedStyle,
  isCollapse = false,
}) => {
  const containerRef = React.useRef<HTMLDivElement>(null);
  const [selectedItem, setSelectedItem] = React.useState<any>(null);
  const [cardWidth, setCardWidth] = React.useState<number>(0);
  const { mtPrefixCls } = usePrefixCls();
  const prefixCls = `${mtPrefixCls}-card-list`;
  const { token, tokenExt } = useThemeExt();

  React.useEffect(() => {
    if (containerRef.current) {
      const containerWidth = containerRef.current.offsetWidth;
      const calculatedWidth = (containerWidth - (columns - 1) * columnGap) / columns;
      setCardWidth(calculatedWidth);
    }
  }, [columns, columnGap]);

  const styles = css`
    ${customStyle(token, mtPrefixCls, tokenExt)}
    display: flex;
    flex-direction: column;
    width: 100%;

    .${prefixCls}-content {
      &.selected {
        width: ${cardWidth}px;
        padding-right: 10px;
      }
      overflow-x: hidden;
      overflow-y: auto;
      //自定义滚动条样式
      &::-webkit-scrollbar {
        width: 4px;
      }
      &::-webkit-scrollbar-thumb {
        background-color: #e3e6eb;
        border-radius: 25px;
      }
    }

    .${prefixCls}-list {
      display: flex;
      flex-wrap: wrap;
      gap: ${rowGap}px ${columnGap}px;
      width: 100%;
      transition: all 0.3s ease;
      &.selected {
        width: ${cardWidth}px;
      }
    }

    .${prefixCls}-item {
      width: ${cardWidth}px;
      cursor: pointer;
    }

    .${prefixCls}-detail {
      position: relative;
      width: calc(100% - ${cardWidth}px - ${columnGap}px);
      margin-right: calc(-1 * (100% - ${cardWidth}px - ${columnGap}px));
      transform: translateX(20px);
      transition: all 1s ease;
      &.visible {
        margin-left: 5px;
        transform: translateX(0);
      }
      &-icon {
        position: absolute;
        top: 30%;
        left: 0;
        width: 10px;
        height: 26px;
        cursor: pointer;
      }
    }

    .${prefixCls}-pagination {
      display: flex;
      justify-content: flex-end;
      padding: 16px 0;
      transition: width 0.3s ease;
      &.selected {
        width: ${cardWidth}px;
      }
    }

    &.has-detail {
      .${prefixCls}-content:not(.selected) {
        width: 100%;
      }
    }
  `;

  const handleItemClick = (item: any, index: number) => {
    if (renderDetail) {
      const _item = JSON.stringify(selectedItem) === JSON.stringify(item) ? null : item;
      if (isCollapse || (!isCollapse && _item)) {
        setSelectedItem(_item);
      }
      if (!_item) return;
      // 滚动到选中的卡片
      setTimeout(() => {
        const itemElement = document.querySelector(`.${styles} #cardList-item-${index}`);
        if (itemElement) {
          itemElement.scrollIntoView({ behavior: 'smooth', block: 'center' });
        }
      }, 100);
    }
  };

  const renderPagination = () => {
    if (!pagination) return null;
    const { position, ...paginationProps } = pagination;
    return (
      <div
        className={classNames(`${prefixCls}-pagination`, {
          selected: selectedItem && renderDetail,
        })}
      >
        <Pagination {...paginationProps} />
      </div>
    );
  };
  useEffect(() => {
    console.log('pagination', pagination);
  }, [pagination]);
  return (
    <div
      className={classNames(prefixCls, styles, className, {
        'has-detail': renderDetail,
      })}
      ref={containerRef}
    >
      {pagination && pagination.position !== 'bottom' && renderPagination()}
      <div className={`${prefixCls}-wrapper`}>
        <div
          className={classNames(`${prefixCls}-content`, {
            selected: selectedItem && renderDetail,
          })}
        >
          <div
            className={classNames(`${prefixCls}-list`, {
              selected: selectedItem && renderDetail,
            })}
          >
            {dataSource.map((item, index) => (
              <div
                key={index}
                id={`cardList-item-${index}`}
                style={
                  selectedItem &&
                  JSON.stringify(selectedItem) === JSON.stringify(item) &&
                  renderDetail
                    ? cardSelectedStyle || {}
                    : undefined
                }
                className={classNames(`${prefixCls}-item`, {
                  selected:
                    selectedItem &&
                    JSON.stringify(selectedItem) === JSON.stringify(item) &&
                    renderDetail,
                })}
                onClick={() => handleItemClick(item, index)}
              >
                {renderItem(item, index)}
              </div>
            ))}
          </div>
        </div>
        {renderDetail && (
          <div
            className={classNames(`${prefixCls}-detail`, {
              visible: selectedItem,
            })}
          >
            <img
              src={selectedItem ? right : left}
              alt="right"
              className={`${prefixCls}-detail-icon`}
              onClick={() => setSelectedItem(null)}
            />
            {selectedItem && renderDetail(selectedItem)}
          </div>
        )}
      </div>
      {pagination && pagination.position !== 'top' && renderPagination()}
    </div>
  );
};

export default CardListExt;
