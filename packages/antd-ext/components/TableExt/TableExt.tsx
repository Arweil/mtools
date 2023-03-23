import React, { useEffect, useMemo, useRef, useState } from 'react';
import { Table, Empty, Typography, Skeleton } from 'antd';
import { css } from '@emotion/css';
import type { TableProps, ColumnsType, ColumnGroupType, ColumnType, TablePaginationConfig } from 'antd/es/table';
import type { TooltipProps } from 'antd/es/tooltip';
import type { SpinProps } from 'antd/lib/spin';

const emptyClass = css`
  color: #8F959E;
  border-top: 1px solid #F1F2F5;
  border-bottom: 1px solid #F1F2F5;
  text-align: center;
  padding: 30px 0;
`;

export interface ColumnTypeExt<RecordType> extends ColumnType<RecordType> {
  useDefaultRender?: boolean;
  hidden?: boolean;
  enums?: { [key: string | number]: string | number };
}

export type ColumnsTypeExt<RecordType> = (ColumnGroupType<RecordType> | ColumnTypeExt<RecordType>);

export interface TableExtProps<RecordType extends { $$mock?: boolean } = any> extends TableProps<RecordType> {
  columns?: ColumnsTypeExt<RecordType>[];
  tdTooltip?: TooltipProps;
  emptyDesc?: string;
  useSkeleton?: boolean;
}

export interface OperateBtnGroupProps {
  children?: React.ReactNode;
}

function isSpinObj(param: any): param is SpinProps {
  return Object.prototype.toString.call(param) === '[object Object]';
}

function isBool(param: any): param is boolean {
  return Object.prototype.toString.call(param) === '[object Boolean]';
}

export default function TableExt<RecordType extends { $$mock?: boolean } = any>(props: TableExtProps<RecordType>) {
  const {
    columns,
    dataSource,
    tdTooltip,
    emptyDesc = '没有数据',
    loading,
    useSkeleton = false,
    pagination,
    rowSelection,
    ...restProps
  } = props;

  const isFirstTimeRendered = useRef(false);
  const cacheLoadingState = useRef<boolean | undefined>(undefined);
  const [fetching, setFetching] = useState(useSkeleton);

  // 获取当前loading的状态，loading可以为spinprops
  const curLoadingState = useMemo(() => {
    if (isSpinObj(loading) && loading.spinning !== undefined) {
      return loading.spinning;
    }

    if (isBool(loading)) {
      return loading;
    }

    return undefined;
  }, [loading]);

  // 判断是否加载完数据，通过 pre, cur 的loading状态判断
  const hasLoadedData = useMemo(() => {
    if (!curLoadingState && cacheLoadingState.current) {
      return true;
    }

    cacheLoadingState.current = curLoadingState;
    return false;
  }, [curLoadingState])

  // 数据源内容
  const finDataSource = useMemo(() => {
    // 如果使用骨架屏，需要默认一些数据，以展示骨架屏
    if (useSkeleton && !(dataSource && dataSource.length > 0) && !isFirstTimeRendered.current && !hasLoadedData) {
      return new Array(10).fill({ $$mock: true });
    }

    return dataSource;
  }, [dataSource, hasLoadedData]);

  // 判断是否有数据，是占位数据还是真实的数据
  const hasData = useMemo(() => {
    if (!dataSource || (dataSource && dataSource.length === 0)) {
      return false
    }

    if (dataSource.some(item => item.$$mock)) {
      return false;
    }

    return true;
  }, [dataSource]);

  // 同步loading 数据到 fetching，并且记录第一次渲染，用于骨架屏处理
  useEffect(() => {
    if (!useSkeleton || curLoadingState === undefined || isFirstTimeRendered.current) {
      return;
    }

    if (curLoadingState && !hasData) {
      setFetching(true);
    }

    // 如何判断请求完成
    // 1. loading 状态结束 false
    // 2. dataSource 有数据 [错] 如果数据返回 []
    // 3. 缓存之前的状态 如果之前的状态为 true, 现在为 false
    if (hasLoadedData) {
      isFirstTimeRendered.current = true;
      setFetching(false);
    }
  }, [curLoadingState, hasData, hasLoadedData]);

  const SkeletonItem = useMemo(() => <Skeleton.Input block style={{ minWidth: "initial", height: 22 }} />, []);

  const formattedCols = useMemo(() => {
    if (!columns || columns.length === 0) {
      return columns;
    }

    const cols: ColumnsType<RecordType> = [];
    columns.forEach((item: ColumnTypeExt<RecordType>) => {
      const { hidden = false, useDefaultRender = true, enums, render, ...restProps } = item;

      if (!hidden) {
        if (fetching) {
          restProps.title = SkeletonItem;
        }

        cols.push({
          ...restProps,
          render: useDefaultRender ? (value, record, index) => {
            if (fetching) {
              return SkeletonItem;
            }

            if (render) {
              return render(value, record, index);
            }

            if (value === undefined || value === null || value === '') {
              return '-';
            }

            return (
              <Typography.Paragraph
                style={{ marginBottom: 0 }}
                ellipsis={{
                  rows: 2,
                  expandable: false,
                  tooltip: {
                    children: value,
                    ...tdTooltip,
                  },
                }}
              >
                {value}
              </Typography.Paragraph>
            );
          } : render,
        });
      }
    });

    return cols;
  }, [columns, fetching]);

  const EmptyText = useMemo(() => <Empty image={Empty.PRESENTED_IMAGE_SIMPLE} description={emptyDesc} />, [emptyDesc]);

  const pager: TablePaginationConfig | false | undefined = useMemo(() => {
    // 如果没有数据，那么返回undefined
    if (!hasData) {
      return {
        // BUGFIX: antdv5 目前没有暴露 none，TablePaginationPosition
        position: ['none', 'none'] as any[],
      };
    }

    if (pagination === false) {
      return false;
    }

    const total = (pagination && pagination.total) || (finDataSource && finDataSource.length) || 0;

    if (total > 10) {
      return {
        showQuickJumper: true,
        showSizeChanger: true,
        pageSizeOptions: [10, 20, 50, 100],
        showTotal: () => `共${total}条数据`,
        ...pagination,
      }
    }

    return false;
  }, [pagination, finDataSource, hasData]);

  if (finDataSource && finDataSource.length > 0 || !useSkeleton) {
    return (
      <Table
        loading={fetching ? undefined : loading}
        columns={formattedCols}
        dataSource={finDataSource}
        locale={{
          emptyText: EmptyText
        }}
        pagination={pager}
        rowSelection={fetching && rowSelection ? { renderCell: () => SkeletonItem, columnTitle: SkeletonItem, ...rowSelection } : rowSelection}
        {...restProps}
      />
    )
  }

  return <div className={emptyClass}>{emptyDesc}</div>;
}
