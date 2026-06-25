import type { ConfigProviderProps } from 'antd';
import { ConfigProvider } from 'antd';
import type { ThemeConfig } from 'antd/es/config-provider/context';
import type { Locale } from 'antd/es/locale';
import React, { useEffect, useState } from 'react';
import { getI18NInstance } from '../../language';
import { LanguageContext } from '../../LanguageStore';
import type { TypeLanguage } from '../../types';

export interface ConfigProviderWithI18nProps extends ConfigProviderProps {
  language: TypeLanguage;
}

export default function ConfigProviderWithI18n(
  props: ConfigProviderWithI18nProps,
): React.ReactElement {
  const { children, locale, ...rest } = props;

  return (
    <ConfigProvider locale={locale} {...rest}>
      {children}
    </ConfigProvider>
  );
}

export function ConfigProviderWithI18nWrapper(
  props: Omit<
    ConfigProviderProps & {
      languages: TypeLanguage[];
      antdLocal: Partial<Record<TypeLanguage, Locale>>;
    },
    'locale'
  >,
): React.ReactElement {
  const { languages, antdLocal } = props;

  const [language, setLanguage] = useState<TypeLanguage>(languages[0]);
  const [locale, setLocale] = useState<Locale>(antdLocal[languages[0]]);

  useEffect(() => {
    getI18NInstance().changeLanguage(language);
    setLocale(antdLocal[language]);
  }, [antdLocal, language]);

  return (
    <LanguageContext.Provider value={{ language, setLanguage }}>
      <ConfigProviderWithI18n {...props} language={language} locale={locale} />
    </LanguageContext.Provider>
  );
}

// 对齐 antd `ConfigProvider.config` 的真实入参（antd 内部的 GlobalConfigProps）。
// 手写字面量结构而非用 `Parameters<typeof ConfigProvider.config>`，是为了避免生成
// declaration 时引用 antd 未导出的私有类型 GlobalConfigProps 而报 TS4032；
// 字面量结构会被内联进 .d.ts，对外类型零失真
// （完整保留 prefixCls / iconPrefixCls / theme / holderRender）。
export type ConfigProviderWithI18nConfig = {
  prefixCls?: string;
  iconPrefixCls?: string;
  theme?: ThemeConfig;
  holderRender?: (children: React.ReactNode) => React.ReactNode;
};

ConfigProviderWithI18n.config = ConfigProvider.config as (
  config: ConfigProviderWithI18nConfig,
) => void;
ConfigProviderWithI18nWrapper.config = ConfigProviderWithI18n.config;
