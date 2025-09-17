import type { InitOptions } from 'i18next';
import i18n from 'i18next';
import LanguageDetector from 'i18next-browser-languagedetector';
import { initReactI18next } from 'react-i18next';
import type { TypeLanguage } from './types';

// 定义语言包类型
type LocaleResource = Record<string, any>;

export function init(params: InitOptions): void {
  i18n
    .use(LanguageDetector)
    .use(initReactI18next)
    .init({
      interpolation: {
        escapeValue: false,
      },
      react: {
        useSuspense: false,
      },
      ...params,
    })
    .catch(err => {
      // eslint-disable-next-line no-console
      console.log(err);
    });
}

export async function changeLanguage(lang: TypeLanguage): Promise<void> {
  await i18n.changeLanguage(lang);
}

export function getI18NInstance() {
  return i18n;
}

export async function loadRouteLocale(params: {
  localeFile: () => Promise<{ default: LocaleResource }>;
  language: string;
  module: string;
}): Promise<void> {
  const { localeFile, language, module } = params;
  if (i18n.hasResourceBundle(language, module)) return;

  try {
    const localeModule = (await localeFile()) as {
      default: LocaleResource;
    };
    // 合并到 i18n 资源中（namespace 为模块名，避免 key 冲突）
    i18n.addResourceBundle(language, module, localeModule.default, true, true);
  } catch (error) {
    throw new Error(`Failed to load ${language} locale for module ${module}`);
  }
}
