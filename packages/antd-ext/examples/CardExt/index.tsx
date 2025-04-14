import { Button, Space, theme } from 'antd';
import React from 'react';
import { CardExt } from '../../components';

const CardExtExample: React.FC = () => {
  const { token } = theme.useToken();

  return (
    <Space direction="vertical" size="large" style={{ width: '100%' }}>
      {/* 基础用法 */}
      <CardExt title="基础卡片" style={{ width: 300 }}>
        <p>基础卡片内容</p>
      </CardExt>

      {/* 可滚动内容 */}
      <CardExt title="可滚动内容" style={{ width: 300 }} scrollable contentHeight={100}>
        <p>第一行内容</p>
        <p>第二行内容</p>
        <p>第三行内容</p>
        <p>第四行内容</p>
        <p>第五行内容</p>
        <p>第六行内容</p>
      </CardExt>

      {/* 悬浮效果 */}
      <CardExt title="悬浮效果" hoverable style={{ width: 300 }}>
        <p>鼠标悬浮时会有阴影效果</p>
      </CardExt>

      {/* 自定义标题样式 */}
      <CardExt
        title="自定义标题"
        style={{ width: 300 }}
        titleIcon="https://gw.alipayobjects.com/zos/rmsportal/KDpgvguMpGfqaHPjicRK.svg"
        textExtra={<span style={{ color: token.colorTextSecondary }}>副标题信息</span>}
      >
        <p>使用 titleIcon 添加标题图标</p>
        <p>使用 textExtra 添加标题右侧文本</p>
      </CardExt>
      {/* 带封面的卡片 */}
      <CardExt
        hoverable
        style={{ width: 300 }}
        cover={
          <img
            alt="example"
            src="https://gw.alipayobjects.com/zos/rmsportal/JiqGstEfoWAOHiTxclqi.png"
          />
        }
        footer={
          <Space>
            <Button>分享</Button>
            <Button type="primary">查看</Button>
          </Space>
        }
        footerStyle={{
          padding: '8px 24px',
          background: token.colorBgContainer,
        }}
      >
        <h3 style={{ margin: 0 }}>带封面的卡片</h3>
        <p style={{ color: token.colorTextSecondary }}>可以添加封面图片，并搭配底部操作按钮</p>
      </CardExt>
      {/* 自定义底部样式 */}
      <CardExt
        title="自定义底部样式"
        style={{ width: 300 }}
        footer={
          <Button type="primary" block>
            提交
          </Button>
        }
        footerStyle={{
          padding: '8px 0 8px 0',
          background: token.colorBgContainer,
        }}
      >
        <p>使用 footerStyle 自定义底部样式</p>
      </CardExt>
      {/* 底部标签 */}
      <CardExt
        title="底部标签"
        style={{ width: 300 }}
        footerLabels={[
          {
            icon: 'https://gw.alipayobjects.com/zos/rmsportal/KDpgvguMpGfqaHPjicRK.svg',
            label: '标签一',
          },
          {
            icon: 'https://gw.alipayobjects.com/zos/rmsportal/KDpgvguMpGfqaHPjicRK.svg',
            label: '标签二',
          },
        ]}
      >
        <p>使用 footerLabels 添加底部标签</p>
        <p>每个标签可以包含图标和文本</p>
      </CardExt>

      {/* 底部标签带自定义右侧内容 */}
      <CardExt
        title="底部标签带右侧内容"
        style={{ width: 300 }}
        footerLabels={[
          {
            icon: 'https://gw.alipayobjects.com/zos/rmsportal/KDpgvguMpGfqaHPjicRK.svg',
            label: '标签一',
          },
          {
            icon: 'https://gw.alipayobjects.com/zos/rmsportal/KDpgvguMpGfqaHPjicRK.svg',
            label: '标签二',
          },
        ]}
        footerLabelRight={
          <Button type="link" danger>
            删除
          </Button>
        }
      >
        <p>使用 footerLabelRight 自定义右侧内容</p>
        <p>可以放置任意 ReactNode 内容</p>
      </CardExt>
    </Space>
  );
};

export default CardExtExample;
