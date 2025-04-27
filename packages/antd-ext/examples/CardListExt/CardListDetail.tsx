import { css } from '@emotion/css';
import { CardExt, CardListExt, Space } from '@m-tools/antd-ext';
import React from 'react';

const mockData = Array.from({ length: 8 }, (_, index) => ({
  id: index,
  title: `任务 ${index + 1}`,
  status: ['进行中', '已完成', '已暂停'][index % 3],
  priority: ['高', '中', '低'][index % 3],
  progress: Math.floor(Math.random() * 100),
  deadline: `2024-${String((index % 12) + 1).padStart(2, '0')}-${String(
    Math.floor(Math.random() * 28) + 1,
  ).padStart(2, '0')}`,
  description: `这是任务 ${index + 1} 的简要描述，包含任务目标和基本要求。`,
  imageUrl: `https://picsum.photos/300/200?random=${index}`,
  details: {
    owner: ['张三', '李四', '王五'][index % 3],
    department: ['技术部', '产品部', '设计部'][index % 3],
    members: ['成员A', '成员B', '成员C'],
    milestones: [
      { time: '2024-01-01', content: '项目启动' },
      { time: '2024-03-01', content: '阶段性验收' },
      { time: '2024-06-01', content: '项目结项' },
    ],
    attachments: [
      { name: '需求文档.pdf', size: '2.5MB' },
      { name: '设计稿.sketch', size: '8.1MB' },
      { name: '测试报告.docx', size: '1.2MB' },
    ],
  },
}));

const CardListDetail = () => {
  const [selectedId, setSelectedId] = React.useState<number | null>(null);

  const getStatusColor = (status: string) => {
    switch (status) {
      case '进行中':
        return '#1890ff';
      case '已完成':
        return '#52c41a';
      case '已暂停':
        return '#faad14';
      default:
        return '#d9d9d9';
    }
  };

  const getPriorityColor = (priority: string) => {
    switch (priority) {
      case '高':
        return '#f5222d';
      case '中':
        return '#faad14';
      case '低':
        return '#52c41a';
      default:
        return '#d9d9d9';
    }
  };

  const handleCardClick = (item: any) => {
    setSelectedId(selectedId === item.id ? null : item.id);
  };

  const styles = {
    root: css`
      width: 100%;
      max-width: 100%;
      overflow: hidden;
      .ant-space {
        width: 100% !important;
      }
      .ant-space-item {
        width: 100%;
      }
    `,
    selectedCard: css`
      box-shadow: 0px 1px 7px 0px rgba(51, 112, 255, 0.3);
      border-radius: 8px !important;
      border: 1px solid #3370ff !important;
      background: linear-gradient(180deg, #eef5ff 0%, #ffffff 100%);
    `,
  };

  return (
    <div className={styles.root}>
      <Space direction="vertical" size="large">
        <div style={{ height: 800, border: '1px solid #e4e9ec', padding: 10 }}>
          <CardListExt
            dataSource={mockData}
            className={'db-card-list'}
            renderItem={item => (
              <CardExt
                hoverable
                title={item.title}
                onClick={() => handleCardClick(item)}
                className={selectedId === item.id ? styles.selectedCard : ''}
                footerLabels={[
                  {
                    icon: 'https://gw.alipayobjects.com/zos/antfincdn/aPkFc8Sj7n/method-draw-image.svg',
                    label: item.status,
                    labelStyle: { color: getStatusColor(item.status) },
                  },
                  {
                    icon: 'https://gw.alipayobjects.com/zos/antfincdn/1yNwGHwUyM/Vector.svg',
                    label: `优先级: ${item.priority}`,
                    labelStyle: { color: getPriorityColor(item.priority) },
                  },
                ]}
              >
                <Space direction="vertical" size="small" style={{ width: '100%' }}>
                  <div>进度：{item.progress}%</div>
                  <div>截止日期：{item.deadline}</div>
                  <div>{item.description}</div>
                </Space>
              </CardExt>
            )}
            renderDetail={item => (
              <CardExt
                title={`${item.title} - 详细信息`}
                contentHeight="auto"
                style={{ height: '100%' }}
              >
                <Space direction="vertical" size="large" style={{ width: '100%' }}>
                  <div>
                    <h3>基本信息</h3>
                    <p>状态：{item.status}</p>
                    <p>优先级：{item.priority}</p>
                    <p>进度：{item.progress}%</p>
                    <p>截止日期：{item.deadline}</p>
                  </div>

                  <div>
                    <h3>团队信息</h3>
                    <p>负责人：{item.details.owner}</p>
                    <p>所属部门：{item.details.department}</p>
                    <p>团队成员：{item.details.members.join('、')}</p>
                  </div>

                  <div>
                    <h3>里程碑</h3>
                    {item.details.milestones.map((milestone, index) => (
                      <p key={index}>
                        {milestone.time}：{milestone.content}
                      </p>
                    ))}
                  </div>

                  <div>
                    <h3>相关附件</h3>
                    {item.details.attachments.map((file, index) => (
                      <p key={index}>
                        {file.name}（{file.size}）
                      </p>
                    ))}
                  </div>

                  <div>
                    <h3>任务描述</h3>
                    <p>{item.description}</p>
                  </div>
                </Space>
              </CardExt>
            )}
          />
        </div>
      </Space>
    </div>
  );
};

export default CardListDetail;
