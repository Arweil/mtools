import type { PaginationProps } from 'antd';
import type { CardProps } from 'antd/lib/card';
import type { ReactNode } from 'react';

export interface CardListExtProps {
  dataSource: any[];
  columns?: number;
  rowGap?: number;
  columnGap?: number;
  cardProps?: CardProps;
  renderItem: (item: any, index: number) => ReactNode;
  renderDetail?: (item: any) => ReactNode;
  // 分页属性
  pagination?: false | (PaginationProps & { position?: 'top' | 'bottom' | 'both' });
}
