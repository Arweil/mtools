import type { GlobalToken } from 'antd';
import { Empty, Skeleton, Table, Typography } from 'antd';
import type { ColumnType, TablePaginationConfig, TableProps } from 'antd/es/table';
import type { TooltipProps } from 'antd/es/tooltip';
import type { SpinProps } from 'antd/lib/spin';
import classNames from 'classnames';
import React, { useEffect, useMemo, useRef, useState } from 'react';
import { usePrefixCls } from '../utils';
import { css } from '../utils/emotion';
import TypographyRowOne from './TypographyRowOne';

const emptyClass = (token: GlobalToken) => css`
  color: ${token.colorTextDisabled};
  border-top: 1px solid ${token.colorBorder};
  border-bottom: 1px solid ${token.colorBorder};
  text-align: center;
  padding: 30px 0;
  background-color: ${token.colorBgContainer};
`;

export interface ColumnTypeExt<RecordType> extends ColumnType<RecordType> {
  useDefaultRender?: boolean;
  hidden?: boolean;
  enums?: Record<string | number, string | number>;
}

export interface ColumnGroupTypeExt<RecordType>
  extends Omit<ColumnTypeExt<RecordType>, 'dataIndex'> {
  children?: ColumnsTypeExt<RecordType>[];
}

export type ColumnsTypeExt<RecordType> = ColumnGroupTypeExt<RecordType> | ColumnTypeExt<RecordType>;

export interface TableExtProps<RecordType extends { $$mock?: boolean } = any>
  extends Omit<TableProps<RecordType>, 'summary'> {
  columns?: ColumnsTypeExt<RecordType>[];
  tdTooltip?: TooltipProps;
  emptyDesc?: string;
  useSkeleton?: boolean;
  useEmpty?: boolean;
  cellEllipsisRows?: number;
  summary?: (data: readonly RecordType[], fetching: boolean) => React.ReactNode;
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

/**
 * 遍历树，可以用callback获取，操作每一个结点
 * @param tree 树
 * @param callback 执行函数
 * @returns undefined
 */
function forEachTree<T>(
  tree: ColumnGroupTypeExt<T>,
  callback: (treeNode: ColumnGroupTypeExt<T>) => void,
) {
  if (tree === null) {
    return;
  }

  const copyTree = { ...tree };

  callback(copyTree);

  if (copyTree.children && copyTree.children.length > 0) {
    const cols = [];
    copyTree.children.forEach(item => {
      // 剔除隐藏的列
      const { hidden = false } = item;
      if (!hidden) {
        cols.push(forEachTree(item as ColumnGroupTypeExt<T>, callback));
      }
    });
    copyTree.children = cols;
  }

  return copyTree;
}

export function SkeletonItem() {
  return <Skeleton.Input block style={{ minWidth: 'initial', height: 22 }} />;
}

export default function TableExt<RecordType extends { $$mock?: boolean } = any>(
  props: TableExtProps<RecordType>,
) {
  const {
    columns,
    dataSource,
    tdTooltip,
    emptyDesc = '暂无数据',
    loading,
    useSkeleton = false,
    useEmpty = false,
    pagination,
    rowSelection,
    summary,
    cellEllipsisRows = 1,
    ...restProps
  } = props;

  const { token, prefixCls, mtPrefixCls } = usePrefixCls();
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
  }, [curLoadingState]);

  // 数据源内容
  const finDataSource = useMemo(() => {
    // 如果使用骨架屏，需要默认一些数据，以展示骨架屏
    if (
      useSkeleton &&
      !(dataSource && dataSource.length > 0) &&
      !isFirstTimeRendered.current &&
      !hasLoadedData
    ) {
      const firstPageMax =
        (pagination && pagination.pageSizeOptions && Number(pagination.pageSizeOptions[0])) || 10;
      return new Array(firstPageMax || 10).fill({ $$mock: true });
    }

    return dataSource;
  }, [dataSource, hasLoadedData, pagination, useSkeleton]);

  // 判断是否有数据，是占位数据还是真实的数据
  const hasData = useMemo(() => {
    if (!dataSource || (dataSource && dataSource.length === 0)) {
      return false;
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
  }, [curLoadingState, hasData, hasLoadedData, useSkeleton]);

  const formattedCols = useMemo(() => {
    if (!columns || columns.length === 0) {
      return columns;
    }

    const cols: ColumnsTypeExt<RecordType>[] = [];
    columns.forEach((item: ColumnsTypeExt<RecordType>) => {
      const c = forEachTree(item as ColumnGroupTypeExt<RecordType>, i => {
        const { useDefaultRender = true, render } = i;
        i.title = fetching ? <SkeletonItem /> : i.title;
        i.render = useDefaultRender
          ? (value, record, index) => {
              if (fetching) {
                return <SkeletonItem />;
              }

              if (render) {
                return render(value, record, index);
              }

              if (value === undefined || value === null || value === '') {
                return '-';
              }

              return cellEllipsisRows === 1 ? (
                <TypographyRowOne tooltipProps={tdTooltip}>{value}</TypographyRowOne>
              ) : (
                <Typography.Paragraph
                  style={{ marginBottom: 0 }}
                  ellipsis={{
                    rows: cellEllipsisRows,
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
            }
          : render;
      });

      cols.push(c);
    });

    return cols;
  }, [cellEllipsisRows, columns, fetching, tdTooltip]);

  const EmptyText = useMemo(
    () => <Empty image={Empty.PRESENTED_IMAGE_SIMPLE} description={emptyDesc} />,
    [emptyDesc],
  );

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

    const firstPageMax =
      (pagination && pagination.pageSizeOptions && Number(pagination.pageSizeOptions[0])) || 10;

    if (total > firstPageMax) {
      return {
        showQuickJumper: true,
        showSizeChanger: true,
        pageSizeOptions: [10, 20, 50, 100],
        showTotal: () => `共${total}条数据`,
        ...pagination,
      };
    }

    return false;
  }, [pagination, finDataSource, hasData]);

  if (((finDataSource && finDataSource.length > 0) || !useSkeleton) && !useEmpty) {
    return (
      <Table
        loading={fetching ? undefined : loading}
        columns={formattedCols}
        dataSource={finDataSource}
        locale={{
          emptyText: EmptyText,
        }}
        pagination={pager}
        rowSelection={
          fetching && rowSelection
            ? { renderCell: SkeletonItem, columnTitle: <SkeletonItem />, ...rowSelection }
            : rowSelection
        }
        summary={summary ? currentData => summary(currentData, fetching) : undefined}
        {...restProps}
      />
    );
  }

  return (
    <div
      className={classNames(
        emptyClass(token),
        restProps.className,
        `${prefixCls}-${mtPrefixCls}-table-empty`,
      )}
    >
      {emptyDesc}
    </div>
  );
}
