import type { Locale } from 'antd/es/locale';
import type { PaginationLocale } from 'rc-pagination/es/interface';

// 扩展 PaginationLocale 接口
export interface PaginationLocaleExt extends PaginationLocale {
  showTotalTemplate?: string;
}

// 扩展 Locale 接口
export interface LocaleExt extends Locale {
  Pagination: PaginationLocaleExt;
}
