import { TableExt, Space, Typography, Card, ButtonExt } from '@m-tools/antd-ext';
import type { ColumnsTypeExt } from '@m-tools/antd-ext/es/TableExt/TableExt';
import React, { useCallback, useEffect, useMemo, useState } from 'react';
import { getFullData, getEmptyData } from '../mock';
import type { IDataSource } from '../mock';
import type { Theme } from '@m-tools/antd-ext/es/ConfigProviderExt/context';

export default function TableExtFrontEnd(props: {
  hidden: boolean;
  scroll: boolean;
  fixedNameLeft: boolean;
  fixedOPRight: boolean;
  empty: boolean;
  theme: Theme;
  rowSelection: boolean;
  loadWithNoData: boolean;
  noLoading: boolean;
}) {
  const {
    fixedNameLeft,
    fixedOPRight,
    hidden,
    scroll,
    empty,
    theme,
    rowSelection,
    loadWithNoData,
    noLoading,
  } = props;
  const [dataSource, setDataSource] = useState<IDataSource[]>([]);
  const [loading, setLoading] = useState(false);

  const onReload = useCallback(async () => {
    try {
      setLoading(true);
      const res = await getFullData();
      setDataSource(loadWithNoData ? [] : res.result || []);
    } finally {
      setLoading(false);
    }
  }, []);

  const onLoadEmptyData = useCallback(async () => {
    try {
      setLoading(true);
      const res = await getEmptyData();
      setDataSource(res.result || []);
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    onReload();
  }, [onReload]);

  const cols: ColumnsTypeExt<IDataSource>[] = useMemo(
    () => [
      {
        title: '姓名',
        dataIndex: 'name',
        fixed: fixedNameLeft ? 'left' : undefined,
        width: 100,
      },
      {
        title: '年龄',
        dataIndex: 'age',
        width: 70,
      },
      {
        title: '住址',
        dataIndex: 'address',
      },
      {
        title: '操作',
        dataIndex: 'op',
        width: 200,
        hidden,
        fixed: fixedOPRight ? 'right' : undefined,
        render: (text, record, index) => {
          const { needOP } = record;
          return (
            <Space size={[16, 0]} wrap>
              {needOP ? (
                <>
                  <Typography.Link>密码重置</Typography.Link>
                  <Typography.Link>其他功能</Typography.Link>
                </>
              ) : null}
              <Typography.Link>编辑</Typography.Link>
              <Typography.Link>删除</Typography.Link>
            </Space>
          );
        },
      },
    ],
    [hidden, fixedNameLeft, fixedOPRight],
  );

  return (
    <Card
      title={theme}
      extra={[
        <ButtonExt key="01" type="primary" onClick={onReload} style={{ marginRight: 8 }}>
          reload
        </ButtonExt>,
        <ButtonExt key="02" type="primary" onClick={onLoadEmptyData}>
          load empty data
        </ButtonExt>,
      ]}
    >
      <TableExt
        theme={theme}
        rowKey="id"
        useSkeleton={noLoading ? false : true}
        loading={noLoading ? undefined : loading}
        columns={cols}
        dataSource={dataSource}
        scroll={scroll ? { x: 1000 } : {}}
        emptyDesc={empty ? '自定义的为空文案' : undefined}
        rowSelection={
          rowSelection
            ? {
                fixed: true,
              }
            : undefined
        }
        summary={(currentData, fetching) => {
          return (
            <>
              <TableExt.Summary.Row>
                <TableExt.Summary.Cell index={0}>
                  {fetching ? <TableExt.SkeletonItem /> : 'Summary'}
                </TableExt.Summary.Cell>
                <TableExt.Summary.Cell colSpan={3} index={1}>
                  {fetching ? <TableExt.SkeletonItem /> : 'This is a summary content'}
                </TableExt.Summary.Cell>
              </TableExt.Summary.Row>
            </>
          );
        }}
      />
    </Card>
  );
}
