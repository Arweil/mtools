import { Space, TableExt, Typography } from '@m-tools/antd-ext';
import type { ColumnsTypeExt } from '@m-tools/antd-ext/TableExt/TableExt';
import React, { useCallback, useEffect, useMemo, useState } from 'react';
import type { IDataSource } from '../mock';
import { pager } from '../mock';

export default function TableExtBackEnd() {
  const [dataSource, setDataSource] = useState<IDataSource[]>([]);
  const [loading, setLoading] = useState(false);
  const [current, setCurrent] = useState<number>(1);
  const [pageSize, setPageSize] = useState<number>(3);
  const [total, setTotal] = useState<number>(0);

  const onPageChange = useCallback(async (page: number, _pageSize: number) => {
    try {
      setLoading(true);
      const res = await pager.getDataFromPager({ pageNum: page, pageSize: _pageSize });
      if (!res.result) {
        return;
      }

      setCurrent(res.result.current);
      setPageSize(res.result.size);
      setTotal(res.result.total);
      setDataSource(res.result.records);
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    pager.init(5);
    onPageChange(1, 3);
  }, [onPageChange]);

  const cols: ColumnsTypeExt<IDataSource>[] = useMemo(
    () => [
      {
        title: '姓名',
        dataIndex: 'name',
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
        render: (text, record) => {
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
    [],
  );

  return (
    <TableExt
      rowKey="id"
      useSkeleton={true}
      loading={loading}
      columns={cols}
      dataSource={dataSource}
      scroll={scroll ? { x: 1000 } : {}}
      emptyDesc="自定义的为空文案"
      pagination={{
        current,
        pageSize,
        total,
        pageSizeOptions: [3, 5, 10, 20],
        onChange: onPageChange,
      }}
    />
  );
}
