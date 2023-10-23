import React, { useEffect, useState } from 'react';
import { TableExt, Table } from '@m-tools/antd-ext';
import type { ColumnsTypeExt } from '@m-tools/antd-ext/TableExt/TableExt';

interface DataType {
  key: React.Key;
  name: string;
  age: number;
  street: string;
  building: string;
  number: number;
  companyAddress: string;
  companyName: string;
  gender: string;
}

const columns: ColumnsTypeExt<DataType>[] = [
  {
    title: 'Name',
    dataIndex: 'name',
    key: 'name',
    width: 100,
    fixed: 'left',
    filters: [
      {
        text: 'Joe',
        value: 'Joe',
      },
      {
        text: 'John',
        value: 'John',
      },
    ],
    onFilter: (value: string, record) => record.name.indexOf(value) === 0,
  },
  {
    title: 'Other',
    children: [
      {
        title: 'Age',
        dataIndex: 'age',
        key: 'age',
        width: 150,
        hidden: true,
        sorter: (a, b) => a.age - b.age,
      },
      {
        title: 'Address',
        children: [
          {
            title: 'Street',
            dataIndex: 'street',
            key: 'street',
            width: 150,
          },
          {
            title: 'Block',
            children: [
              {
                title: 'Building',
                dataIndex: 'building',
                key: 'building',
                width: 100,
                useDefaultRender: false,
              },
              {
                title: 'Door No.',
                dataIndex: 'number',
                key: 'number',
                width: 100,
              },
            ],
          },
        ],
      },
    ],
  },
  {
    title: 'Company',
    children: [
      {
        title: 'Company Address',
        dataIndex: 'companyAddress',
        key: 'companyAddress',
        width: 200,
      },
      {
        title: 'Company Name',
        dataIndex: 'companyName',
        key: 'companyName',
      },
    ],
  },
  {
    title: 'Gender',
    dataIndex: 'gender',
    key: 'gender',
    width: 80,
    fixed: 'right',
  },
];

const App: React.FC = () => {
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    (async () => {
      try {
        setLoading(true);

        await new Promise((resolve, reject) => {
          setTimeout(resolve, 3000);
        });

        const d: DataType[] = [];
        for (let i = 0; i < 100; i++) {
          d.push({
            key: i,
            name: 'John Brown',
            age: i + 1,
            street: 'Lake Park',
            building: undefined,
            number: 2035,
            companyAddress: undefined,
            companyName: 'SoftLake Co',
            gender: 'M',
          });
        }

        setData(d);
      } finally {
        setLoading(false);
      }
    })();
  }, []);

  return (
    <>
      <TableExt
        useSkeleton
        loading={loading}
        columns={columns}
        dataSource={data}
        bordered
        size="middle"
        scroll={{ x: 'calc(700px + 50%)', y: 240 }}
      />
    </>
  );
};

export default App;
