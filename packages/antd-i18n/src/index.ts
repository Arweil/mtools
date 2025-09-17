import { ConfigProviderExtWithI18nWrapper as ConfigProviderExtWithI18n } from './components/ConfigProviderExtWithI18n';
import { ConfigProviderWithI18nWrapper as ConfigProviderWithI18n } from './components/ConfigProviderWithI18n';
import { LanguageSwitch } from './components/LanguageSwitch';
import { RouteWithLocale } from './components/RouteWithLocale';
import { getI18NInstance, init } from './language';
import { useLanguage } from './LanguageStore';
import type { TypeLanguage } from './types';

export * from 'react-i18next';
export {
  init,
  getI18NInstance,
  useLanguage,
  ConfigProviderWithI18n,
  RouteWithLocale,
  LanguageSwitch,
  ConfigProviderExtWithI18n,
  TypeLanguage,
};
