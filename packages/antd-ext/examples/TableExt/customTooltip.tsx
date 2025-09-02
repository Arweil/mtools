/**
 * title: 自定义 Tooltip
 * description: 演示 TableExt 组件的 tdTooltip 属性用法，可以自定义单元格省略时的 tooltip 样式和行为
 */

import { ConfigProviderExt, TableExt } from '@m-tools/antd-ext';
import React from 'react';
import type { ColumnsTypeExt } from '../../components/TableExt/TableExt';
import type { IDataSource } from './mock';

interface DataType extends IDataSource {
  description: string;
  longText: string;
}

const mockData: DataType[] = [
  {
    id: 1,
    name: '张三',
    age: 25,
    address: '北京市朝阳区建国门外大街1号国贸大厦A座1001室',
    description: '这是一段很长的描述文字，用来测试单元格省略和 tooltip 功能的展示效果',
    longText:
      '这是一段非常非常长的文本内容，包含了大量的信息，当单元格宽度不足以显示全部内容时，会自动省略并在鼠标悬停时通过 tooltip 显示完整内容。这个功能对于表格中需要显示大量文本信息的场景非常有用。这是一段非常非常长的文本内容，包含了大量的信息，当单元格宽度不足以显示全部内容时，会自动省略并在鼠标悬停时通过 tooltip 显示完整内容。这个功能对于表格中需要显示大量文本信息的场景非常有用。这是一段非常非常长的文本内容，包含了大量的信息，当单元格宽度不足以显示全部内容时，会自动省略并在鼠标悬停时通过 tooltip 显示完整内容。这个功能对于表格中需要显示大量文本信息的场景非常有用。这是一段非常非常长的文本内容，包含了大量的信息，当单元格宽度不足以显示全部内容时，会自动省略并在鼠标悬停时通过 tooltip 显示完整内容。这个功能对于表格中需要显示大量文本信息的场景非常有用。这是一段非常非常长的文本内容，包含了大量的信息，当单元格宽度不足以显示全部内容时，会自动省略并在鼠标悬停时通过 tooltip 显示完整内容。这个功能对于表格中需要显示大量文本信息的场景非常有用。',
  },
  {
    id: 2,
    name: '李四',
    age: 30,
    address: '上海市浦东新区陆家嘴金融贸易区世纪大道88号金茂大厦',
    description: '产品经理，负责产品规划和需求分析，有丰富的互联网产品经验',
    longText:
      '作为一名资深的产品经理，我专注于用户体验设计和产品策略制定，致力于打造用户喜爱的产品。',
  },
  {
    id: 3,
    name: '王五',
    age: 28,
    address: '广州市天河区珠江新城花城大道85号高德置地广场',
    description: 'UI/UX 设计师，专注于界面设计和用户体验优化',
    longText:
      '设计是一门艺术，也是一门科学。我相信好的设计能够改变世界，让人们的生活变得更加美好。',
  },
];

export default function CustomTooltipDemo() {
  const columns: ColumnsTypeExt<DataType>[] = [
    {
      title: '姓名',
      dataIndex: 'name',
      width: 100,
      fixed: 'left',
    },
    {
      title: '年龄',
      dataIndex: 'age',
      width: 80,
    },
    {
      title: '地址',
      dataIndex: 'address',
      width: 200,
    },
    {
      title: '描述',
      dataIndex: 'description',
      width: 250,
    },
    {
      title: '详细信息',
      dataIndex: 'longText',
      width: 300,
    },
  ];

  return (
    <ConfigProviderExt themeExt="default">
      <TableExt
        columns={columns}
        dataSource={mockData}
        tdTooltip={{
          color: '#0000FF',
          styles: {
            root: { maxWidth: 500 },
            body: { color: '#FFFF00', maxHeight: 200, overflow: 'auto' },
          },
        }}
        pagination={false}
        rowKey="id"
      />
    </ConfigProviderExt>
  );
}
