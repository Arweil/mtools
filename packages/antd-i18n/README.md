# @m-tools/antd-i18n

## 安装

要求：

- 项目使用了 antd >= 5 或者 @m-tools/antd-ext；
- typescript >= 5

```bash
$ npm install @m-tools/antd-i18n --save
```

## 使用

#### language.tsx

```tsx
import React from 'react';
import { init, RouteWithLocale, useLanguage } from '@m-tools/antd-i18n';

// 引用 antd 组件库语言包
import enUS from '@m-tools/antd-ext/node_modules/antd/lib/locale/en_US';
import zhCN from '@m-tools/antd-ext/node_modules/antd/lib/locale/zh_CN';
import zhHK from '@m-tools/antd-ext/node_modules/antd/lib/locale/zh_HK';

// 引用 dayjs 语言包
import 'dayjs/locale/zh-cn';
import 'dayjs/locale/en';
import 'dayjs/locale/zh-hk';

// 引用初始加载的语言包
import enLocale from './locale/common/en_US.json';
import zhLocale from './locale/common/zh_CN.json';
import zhHKLocale from './locale/common/zh_HK.json';

// 使用到的语言枚举
export const EnumLanguage = {
  ENGLISH: 'en_US',
  CHINESE: 'zh_CN',
  HONGKONG: 'zh_HK',
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
  module: string; // module 和路由绑定
  element: React.ReactNode;
}): JSX.Element {
  const { module, element } = props;

  const { language } = useLanguage();

  return (
    <RouteWithLocale
      module={module}
      element={element}
      language={language}
      localeFile={async () =>
        (await import(`@/locale/${module}/${language}.json`)) as { default: Record<string, any> }
      }
    />
  );
}
```

#### App.tsx 入口组件

- 如果使用了 @m-tools/antd-ext 使用 ConfigProviderExtWithI18n
- 如果使用了 antd 组件库使用 ConfigProviderWithI18n

```tsx
import { ConfigProviderExtWithI18n } from '@m-tools/antd-i18n';
import { Router, Route, RouteComponentProps } from 'react-router';
import { RouteWithLocaleWrapper as RouteWithLocale } from '@/language';

function App() {
  return (
    <ConfigProviderExtWithI18n>
      <Router>
        <Route
          path="/home"
          componentcomponent={(p: RouteComponentProps) => (
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
