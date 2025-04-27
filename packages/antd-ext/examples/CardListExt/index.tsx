import { CardExt, CardListExt } from '@m-tools/antd-ext';
import React from 'react';

const mockData = Array.from({ length: 12 }, (_, index) => ({
  id: index,
  title: `产品 ${index + 1}`,
  price: Math.floor(Math.random() * 1000) + 100,
  sales: Math.floor(Math.random() * 1000),
  description: `这是产品 ${index + 1} 的简介，一个很棒的产品。`,
  imageUrl: `https://picsum.photos/300/200?random=${index}`,
  details: {
    category: ['电子产品', '办公用品', '生活用品'][index % 3],
    brand: ['品牌A', '品牌B', '品牌C'][index % 3],
    specs: [
      { label: '尺寸', value: '120 x 230 x 450mm' },
      { label: '重量', value: '350g' },
      { label: '材质', value: '优质塑料' },
    ],
    features: ['高性能', '节能环保', '使用方便', '维护简单'],
  },
}));

const Demo = () => {
  const [currentPage, setCurrentPage] = React.useState(1);
  const pageSize = 8;

  const currentData = mockData.slice((currentPage - 1) * pageSize, currentPage * pageSize);

  return (
    <CardListExt
      dataSource={currentData}
      columns={4}
      rowGap={16}
      columnGap={16}
      pagination={{
        total: mockData.length,
        pageSize,
        position: 'bottom',
        current: currentPage,
        onChange: page => setCurrentPage(page),
      }}
      renderItem={item => (
        <CardExt
          hoverable
          cover={<img alt={item.title} src={item.imageUrl} />}
          footerLabels={[
            {
              icon: 'https://gw.alipayobjects.com/zos/antfincdn/aPkFc8Sj7n/method-draw-image.svg',
              label: `¥${item.price}`,
            },
            {
              icon: 'https://gw.alipayobjects.com/zos/antfincdn/1yNwGHwUyM/Vector.svg',
              label: `销量: ${item.sales}`,
            },
          ]}
        >
          {item.description}
        </CardExt>
      )}
    />
  );
};

export default Demo;
