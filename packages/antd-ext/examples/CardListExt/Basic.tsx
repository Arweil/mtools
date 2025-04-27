import { CardExt, CardListExt } from '@m-tools/antd-ext';
import React from 'react';

const mockData = Array.from({ length: 12 }, (_, index) => ({
  id: index,
  title: `Card ${index + 1}`,
  description: `This is the description for card ${index + 1}`,
  imageUrl: `https://picsum.photos/300/200?random=${index}`,
  content: `这是卡片 ${index + 1} 的详细内容。这里可以放置更多的信息，比如详细描述、相关数据等。
    当用户点击卡片时，右侧会展开显示这些详细信息。点击同一张卡片可以收起详情区域。
    \n\n这是一个很好的方式来展示更多内容，而不会影响整体的布局和视觉效果。`,
}));

const Basic = () => {
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
        current: currentPage,
        onChange: page => setCurrentPage(page),
      }}
      renderItem={item => (
        <CardExt
          hoverable
          cover={<img alt={item.title} src={item.imageUrl} />}
          title={item.title}
          contentHeight={120}
        >
          {item.description}
        </CardExt>
      )}
      renderDetail={item => (
        <CardExt title={item.title} contentHeight="auto">
          <div style={{ whiteSpace: 'pre-line' }}>{item.content}</div>
        </CardExt>
      )}
    />
  );
};

export default Basic;
