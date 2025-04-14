import type { GlobalToken } from 'antd/es/theme/interface';
import type { ThemeColor } from '../theme/type';

export const customStyle = (
  token: GlobalToken,
  prefixCls: string,
  tokenExt: Partial<ThemeColor>,
) => `
  &.${prefixCls} {
    border-radius: 8px;
    border: 1px solid #E7E9EE;
    
    .ant-card-head {
      min-height: 46px;
      padding: 0 16px;
      border-bottom: 1px solid ${token.colorBorder};
      background: ${token.colorBgContainer};
      border-radius: 8px 8px 0 0;
      
      .ant-card-head-wrapper {
        height: 100%;
      }
      
      .ant-card-head-title {
        padding: 12px 0;
        font-size: 13px;
        font-weight: 500;
        color: #222222;

        .${prefixCls}-head-title {
          display: flex;
          align-items: center;
          
          .${prefixCls}-head-title-icon {
            width: 16px;
            height: 16px;
            margin-right: 8px;
            flex-shrink: 0;
          }

          .${prefixCls}-head-title-text {
            overflow: hidden;
            white-space: nowrap;
            text-overflow: ellipsis;
            flex: 1;
          }

          .${prefixCls}-head-title-extra {
            margin-left: 8px;
            font-size: 14px;
            font-weight: normal;
            flex-shrink: 0;
          }
        }
      }
      
   
    }
    
    .ant-card-body {
      padding: 0 16px;
       background: #ffffff;
      
      &:last-child {
        border-radius: 0 0 8px 8px;
      }
    }

    .${prefixCls}-footer {
      border-top: 1px dashed #E7E9EE;
      background: #ffffff;
      display: flex;
      justify-content: footerAlign;
      align-items: center;
      border-radius: 0 0 8px 8px;

      .${prefixCls}-foot-label {
        display: flex;
        align-items: center;
        justify-content: space-between;
        width: 100%;
        min-height: 40px;
        .${prefixCls}-foot-label-left {
          display: flex;
          align-items: center;
          justify-content: center;
          .${prefixCls}-foot-label-item {
            display: flex;
            align-items: center;
            justify-content: center;
            gap: 4px;
            min-width: 70px;
            height: 20px;
            background: #FFFFFF;
            border-radius: 4px;
            border: 1px solid #D7DADE;
            margin-right: 3px;
            img {
              width: 10px;
              height: 10px;
            }
          
            span {
            font-weight: 400;
                font-size: 11px;
                color: #777777;
              }
          }
        }

        .${prefixCls}-foot-label-right {
          color: ${token.colorError};
          cursor: pointer;
        }
      }
    }
    
    .ant-card-actions {
      padding: 0 16px;
      border-top: 1px solid ${token.colorBorder};
      background: #ffffff;
      border-radius: 0 0 8px 8px;
      
    }
    
    
    // 无边框模式
    &:not(.ant-card-bordered) {
      border: none;
      box-shadow: none;
      
      .ant-card-head {
        border-bottom: none;
      }
      
      .ant-card-actions {
        border-top: none;
      }
    }
    
    // 悬浮效果
    &.${prefixCls}-hoverable:hover {
      box-shadow:  0px 4px 12px 4px rgba(0,0,0,0.05);;
    }
  }
`;
