import { ConfigProviderExt } from '@m-tools/antd-ext';
import type { ConfigProviderExtProps } from '@m-tools/antd-ext/es/ConfigProviderExt/ConfigProviderExt';
import type { Locale } from 'antd/es/locale';
import React, { useEffect, useState } from 'react';
import { getI18NInstance } from '../../language';
import { LanguageContext } from '../../LanguageStore';
import type { TypeLanguage } from '../../types';

export interface ConfigProviderWithI18nProps extends ConfigProviderExtProps {
  language: TypeLanguage;
}

export default function ConfigProviderExtWithI18n(props: ConfigProviderWithI18nProps): JSX.Element {
  const { children, locale, ...rest } = props;

  return (
    <ConfigProviderExt locale={locale} {...rest}>
      {children}
    </ConfigProviderExt>
  );
}

export function ConfigProviderExtWithI18nWrapper(
  props: Omit<
    ConfigProviderExtProps & {
      languages: TypeLanguage[];
      antdLocal: Partial<Record<TypeLanguage, Locale>>;
    },
    'locale'
  >,
): JSX.Element {
  const { languages, antdLocal } = props;

  const [language, setLanguage] = useState<TypeLanguage>(
    (window.localStorage.getItem('i18nextLng') as TypeLanguage) || languages[0],
  );
  const [locale, setLocale] = useState<Locale>(antdLocal[language]);

  useEffect(() => {
    getI18NInstance().changeLanguage(language);
    setLocale(antdLocal[language]);
  }, [antdLocal, language]);

  return (
    <LanguageContext.Provider value={{ language, setLanguage }}>
      <ConfigProviderExtWithI18n {...props} language={language} locale={locale} />
    </LanguageContext.Provider>
  );
}

ConfigProviderExtWithI18n.config = ConfigProviderExt.config;
ConfigProviderExtWithI18nWrapper.config = ConfigProviderExtWithI18n.config;
