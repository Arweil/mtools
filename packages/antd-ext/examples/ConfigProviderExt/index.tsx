import {
  ButtonExt,
  Card,
  ConfigProviderExt,
  DrawerExt,
  locale as antdLocale,
  Space,
  TableExt,
} from '@m-tools/antd-ext';
import type { LocaleExt } from '@m-tools/antd-ext/locale/interface';
import React, { useState } from 'react';

const { zh_CN, en_US } = antdLocale;

// 模拟表格数据
const dataSource = [
  {
    key: '1',
    name: '张三',
    age: 32,
    address: '北京市朝阳区',
  },
  {
    key: '2',
    name: '李四',
    age: 42,
    address: '上海市浦东新区',
  },
  {
    key: '3',
    name: '王五',
    age: 32,
    address: '广州市天河区',
  },
];

const columns = [
  {
    title: '姓名',
    dataIndex: 'name',
    key: 'name',
  },
  {
    title: '年龄',
    dataIndex: 'age',
    key: 'age',
  },
  {
    title: '住址',
    dataIndex: 'address',
    key: 'address',
  },
];

export default function App() {
  const [locale, setLocale] = useState<LocaleExt>(zh_CN);
  const [currentLang, setCurrentLang] = useState<'zh' | 'en'>('zh');
  const [drawerVisible, setDrawerVisible] = useState(false);

  const handleLanguageChange = (lang: 'zh' | 'en') => {
    if (lang === 'zh') {
      setLocale(zh_CN);
    } else {
      setLocale(en_US);
    }
    setCurrentLang(lang);
  };

  return (
    <ConfigProviderExt locale={locale}>
      <div style={{ padding: 24 }}>
        <Card title="语言切换示例" style={{ marginBottom: 24 }}>
          <Space>
            <ButtonExt
              type={currentLang === 'zh' ? 'primary' : 'default'}
              onClick={() => handleLanguageChange('zh')}
            >
              中文
            </ButtonExt>
            <ButtonExt
              type={currentLang === 'en' ? 'primary' : 'default'}
              onClick={() => handleLanguageChange('en')}
            >
              English
            </ButtonExt>
          </Space>
          <div style={{ marginTop: 16, color: '#666' }}>
            当前语言: {currentLang === 'zh' ? '中文' : 'English'}
          </div>
        </Card>

        <Card title="TableExt 组件示例" style={{ marginBottom: 24 }}>
          <TableExt
            dataSource={[]}
            columns={columns}
            pagination={{
              pageSize: 2,
              total: dataSource.length,
              showSizeChanger: true,
              showQuickJumper: true,
            }}
          />

          <TableExt
            dataSource={dataSource}
            columns={columns}
            pagination={{
              pageSize: 2,
              total: dataSource.length,
            }}
          />
        </Card>

        <Card title="DrawerExt 组件示例">
          <ButtonExt type="primary" onClick={() => setDrawerVisible(true)}>
            {currentLang === 'zh' ? '打开抽屉' : 'Open Drawer'}
          </ButtonExt>

          <DrawerExt
            title={currentLang === 'zh' ? '抽屉标题' : 'Drawer Title'}
            open={drawerVisible}
            onCancel={() => setDrawerVisible(false)}
            onOk={() => setDrawerVisible(false)}
            width={400}
          />
        </Card>
      </div>
    </ConfigProviderExt>
  );
}
