import type { GlobalToken } from 'antd/es/theme/interface';
import type { ThemeColor } from '../theme/type';

export const customStyle = (
  token: GlobalToken,
  prefixCls: string,
  tokenExt: Partial<ThemeColor>,
) => `
  &.mt-card {
    border-radius: 8px;
    border: 1px solid ${token.colorBorder};
    
    .ant-card-head {
      min-height: var(--header-height);
      padding: 0 16px;
      border-bottom: 1px solid ${token.colorBorder};
      
      .ant-card-head-title {
        padding: 8px 0;
      }
    }
    
    .ant-card-body {
      height: var(--content-height);
      padding: 16px;
      overflow: auto;
    }
    
    .ant-card-actions {
      height: var(--footer-height);
      padding: 8px 16px;
      border-top: 1px solid ${token.colorBorder};
      background: ${token.colorBgLayout};
      
      > li {
        margin: 0;
        padding: 0;
        border-right: none;
      }
    }
    
    &:not(.ant-card-bordered) {
      border: none;
      
      .ant-card-head {
        border-bottom: none;
      }
      
      .ant-card-actions {
        border-top: none;
      }
    }
  }
`;
