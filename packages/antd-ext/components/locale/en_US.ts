import en_US from 'antd/es/locale/en_US';
import type { LocaleExt } from './interface';

// 扩展 antd 的分页语言包
const extendedEnUS: LocaleExt = {
  ...en_US,
  Pagination: {
    ...en_US.Pagination,
    showTotalTemplate: 'Total ${total} items',
  },
};

export default extendedEnUS;
