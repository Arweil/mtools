import type { ConfigProviderProps } from 'antd';
import { ConfigProvider } from 'antd';
import type { Locale } from 'antd/es/locale';
import React, { useEffect, useState } from 'react';
import { getI18NInstance } from '../../language';
import { LanguageContext } from '../../LanguageStore';
import type { TypeLanguage } from '../../types';

export interface ConfigProviderWithI18nProps extends ConfigProviderProps {
  language: TypeLanguage;
}

export default function ConfigProviderWithI18n(props: ConfigProviderWithI18nProps): JSX.Element {
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
): JSX.Element {
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

ConfigProviderWithI18n.config = ConfigProvider.config;
ConfigProviderWithI18nWrapper.config = ConfigProviderWithI18n.config;
