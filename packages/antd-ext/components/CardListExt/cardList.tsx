import type { PaginationProps } from 'antd';
import { Pagination } from 'antd';
import type { CardProps } from 'antd/lib/card';
import classNames from 'classnames';
import React from 'react';
import left from '../assets/img/left.svg';
import right from '../assets/img/right.svg';
import { useThemeExt } from '../theme';
import { usePrefixCls } from '../utils';
import { css } from '../utils/emotion';
import { customStyle } from './ThemeHerme';

// 数据转换和兼容处理函数
const normalizeProps = (props: CardListExtProps): CardListExtProps => {
  const normalized = { ...props };

  // 确保 dataSource 是数组
  if (!Array.isArray(normalized.dataSource)) {
    console.warn('CardListExt: dataSource should be an array, converting to empty array');
    normalized.dataSource = [];
  }

  // 确保 columns 是正整数
  if (normalized.columns !== undefined) {
    const parsedColumns = Number(normalized.columns);
    if (isNaN(parsedColumns) || parsedColumns <= 0) {
      console.warn('CardListExt: columns should be a positive number, using default value 4');
      normalized.columns = 4;
    } else {
      normalized.columns = Math.floor(parsedColumns);
    }
  }

  // 确保 rowGap 是非负数
  if (normalized.rowGap !== undefined) {
    const parsedRowGap = Number(normalized.rowGap);
    if (isNaN(parsedRowGap) || parsedRowGap < 0) {
      console.warn('CardListExt: rowGap should be a non-negative number, using default value 16');
      normalized.rowGap = 16;
    } else {
      normalized.rowGap = parsedRowGap;
    }
  }

  // 确保 columnGap 是非负数
  if (normalized.columnGap !== undefined) {
    const parsedColumnGap = Number(normalized.columnGap);
    if (isNaN(parsedColumnGap) || parsedColumnGap < 0) {
      console.warn(
        'CardListExt: columnGap should be a non-negative number, using default value 16',
      );
      normalized.columnGap = 16;
    } else {
      normalized.columnGap = parsedColumnGap;
    }
  }

  // 确保 renderItem 是函数
  if (typeof normalized.renderItem !== 'function') {
    console.warn('CardListExt: renderItem must be a function, using default empty render');
    normalized.renderItem = () => null;
  }

  // 确保 renderDetail 是函数或 undefined
  if (normalized.renderDetail !== undefined && typeof normalized.renderDetail !== 'function') {
    console.warn('CardListExt: renderDetail must be a function, removing invalid render');
    normalized.renderDetail = undefined;
  }

  // 处理 pagination
  if (normalized.pagination !== false && normalized.pagination !== undefined) {
    if (typeof normalized.pagination !== 'object') {
      console.warn(
        'CardListExt: pagination should be false or an object, using default pagination',
      );
      normalized.pagination = { position: 'bottom' };
    } else {
      // 确保 position 值合法
      if (
        normalized.pagination.position &&
        !['top', 'bottom', 'both'].includes(normalized.pagination.position)
      ) {
        console.warn('CardListExt: invalid pagination position, using default "bottom"');
        normalized.pagination.position = 'bottom';
      }
    }
  }

  // 确保 isCollapse 是布尔值
  normalized.isCollapse = Boolean(normalized.isCollapse);

  return normalized;
};

export interface CardListExtProps {
  dataSource: any[];
  columns?: number;
  rowGap?: number;
  columnGap?: number;
  cardProps?: CardProps;
  renderItem: (item: any, index: number) => React.ReactNode;
  renderDetail?: (item: any) => React.ReactNode;
  pagination?: false | (PaginationProps & { position?: 'top' | 'bottom' | 'both' });
  className?: string;
  isCollapse?: boolean;
  cardSelectedStyle?: React.CSSProperties;
}

export const CardListExt: React.FC<CardListExtProps> = props => {
  // 规范化处理传入的属性
  const {
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
  } = normalizeProps(props);

  const containerRef = React.useRef<HTMLDivElement>(null);
  const [selectedItem, setSelectedItem] = React.useState<any>(null);
  const [cardWidth, setCardWidth] = React.useState<number>(0);
  const { mtPrefixCls } = usePrefixCls();
  const prefixCls = `${mtPrefixCls}-card-list`;
  const { token, tokenExt } = useThemeExt();

  React.useEffect(() => {
    if (containerRef.current) {
      const containerWidth = containerRef.current.offsetWidth;
      const scrollbarWidth = 4;
      const calculatedWidth =
        (containerWidth - scrollbarWidth * 2 - (columns - 1) * columnGap) / columns;
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
      flex-shrink: 0;
      width: ${cardWidth}px;
      cursor: pointer;
    }

    .${prefixCls}-detail {
      position: relative;
      width: calc(100% - ${cardWidth}px - 21px);
      margin-right: calc(-1 * (100% - ${cardWidth}px + 12px));
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
                key={JSON.stringify(item)}
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
