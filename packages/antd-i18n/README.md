# @m-tools/antd-i18n

## 依赖说明

主入口 `@m-tools/antd-i18n` **仅依赖 `antd >= 5`，不依赖 `@m-tools/antd-ext`**。

> 本包仅提供 ESM 产物（`es/`），请在支持 ESM 的构建环境（Vite / webpack 5 / Node 12+ 等）中使用。

如果你的项目使用的是 `@m-tools/antd-ext`，需要用到与之配套的 `ConfigProviderExtWithI18n`，请改用子路径入口 `@m-tools/antd-i18n/ext`（见下文 [入口组件](#apptsx-入口组件)）。

## 安装

要求：

- `antd >= 5`、`typescript >= 5`；
- 仅当使用 `@m-tools/antd-i18n/ext` 时才需要额外安装 `@m-tools/antd-ext >= 1.5.9`。

```bash
$ npm install @m-tools/antd-i18n --save
```

## 使用

#### language.tsx

```tsx
import React from 'react';
import { init, RouteWithLocale, useLanguage } from '@m-tools/antd-i18n';

// 引用 antd 组件库语言包
import enUS from 'antd/es/locale/en_US';
import zhCN from 'antd/es/locale/zh_CN';
import zhHK from 'antd/es/locale/zh_HK';

// 引用 dayjs 语言包
import 'dayjs/locale/zh-cn';
import 'dayjs/locale/en';
import 'dayjs/locale/zh-hk';

// 引用初始加载的语言包
import enLocale from './locale/common/en-US.json';
import zhLocale from './locale/common/zh-CN.json';
import zhHKLocale from './locale/common/zh-HK.json';

// 使用到的语言枚举
export const EnumLanguage = {
  ENGLISH: 'en-US',
  CHINESE: 'zh-CN',
  HONGKONG: 'zh-HK',
} as const;

// 初始化 i18next
export function initLanguage() {
  init({
    resources: {
      [EnumLanguage.ENGLISH]: { common: enLocale },
      [EnumLanguage.CHINESE]: { common: zhLocale },
      [EnumLanguage.HONGKONG]: { common: zhHKLocale },
    },
    fallbackLng: EnumLanguage.ENGLISH,
  });
}

// ConfigProviderI18N 组件的语言相关 props
export const ConfigProviderI18NProps = {
  languages: [EnumLanguage.ENGLISH, EnumLanguage.CHINESE, EnumLanguage.HONGKONG],
  antdLocal: {
    [EnumLanguage.ENGLISH]: enUS,
    [EnumLanguage.CHINESE]: zhCN,
    [EnumLanguage.HONGKONG]: zhHK,
  },
};

// 语言选择器的选项
export const SelectLanguage = {
  [EnumLanguage.ENGLISH]: 'English',
  [EnumLanguage.CHINESE]: '中文',
  [EnumLanguage.HONGKONG]: '香港',
} as const;

// 实现路由语言包的按需加载以及语言切换
export function RouteWithLocaleWrapper(props: {
  module: string | string[]; // module 和路由绑定，支持单个或多个 module
  element: React.ReactNode;
}): JSX.Element {
  const { module, element } = props;

  const { language } = useLanguage();

  // 处理单个 module 的情况
  if (typeof module === 'string') {
    return (
      <RouteWithLocale
        modules={[module]}
        element={element}
        language={language}
        localeFiles={[
          async () =>
            (await import(`@/locale/${module}/${language}.json`)) as {
              default: Record<string, any>;
            },
        ]}
      />
    );
  }

  // 处理多个 module 的情况
  const localeFiles = module.map(
    mod => async () =>
      (await import(`@/locale/${mod}/${language}.json`)) as {
        default: Record<string, any>;
      },
  );

  return (
    <RouteWithLocale
      modules={module}
      element={element}
      language={language}
      localeFiles={localeFiles}
    />
  );
}
```

#### App.tsx 入口组件

根据所用组件库选择对应的 ConfigProvider：

- 使用 **antd** 组件库：从主入口引入 `ConfigProviderWithI18n`
- 使用 **@m-tools/antd-ext**：从子路径入口引入 `ConfigProviderExtWithI18n`（需要项目已安装 `@m-tools/antd-ext`）

```tsx
import { ConfigProviderExtWithI18n } from '@m-tools/antd-i18n/ext';
import { Router, Route, RouteComponentProps } from 'react-router';
import { RouteWithLocaleWrapper as RouteWithLocale } from '@/language';

function App() {
  return (
    <ConfigProviderExtWithI18n>
      <Router>
        <Route
          path="/home"
          component={(p: RouteComponentProps) => (
            <RouteWithLocale
              module="home"
              element={
                <DynamicComponent app={app} component={() => import('@/pages/home')} {...p} />
              }
            />
          )}
        />
      </Router>
    </ConfigProviderExtWithI18n>
  );
}

export default App;
```

#### Home 页面

```tsx
import { useTranslation } from '@m-tools/antd-i18n';

function Home() {
  const { t } = useTranslation('home');

  return (
    <div>
      {/* 标题 */}
      <h1>{t('title')}</h1>
    </div>
  );
}

export default Home;
```

#### 语言切换

```tsx
import { useCallback } from 'react';
import { useLanguage, getI18NInstance, type TypeLanguage } from '@m-tools/antd-i18n';
import { SelectLanguage } from '@/language';

function AppLayout() {
  const { language, setLanguage } = useLanguage();

  // setLanguage 更新 language 会执行 i18n.changeLanguage()；
  // 如果代码中使用 i18n.t() 而不是在组件内使用 useTranslation。需要手动执行 i18n.changeLanguage()；
  const onChangeLanguage = useCallback(async (lng: TypeLanguage) => {
    await getI18NInstance().changeLanguage(lng);
    setLanguage(lng);
  }, []);

  return <LanguageSwitch value={language} onChange={onChangeLanguage} languages={SelectLanguage} />;
}

export default AppLayout;
```
