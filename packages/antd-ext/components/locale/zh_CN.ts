import zh_CN from 'antd/es/locale/zh_CN';
import type { LocaleExt } from './interface';

// 扩展 antd 的分页语言包
const extendedZhCN: LocaleExt = {
  ...zh_CN,
  Pagination: {
    ...zh_CN.Pagination,
    showTotalTemplate: '共${total}条数据',
  },
};

export default extendedZhCN;
