import { css } from '@emotion/css';

export const styles = (prefixCls: string) => css`
  border-radius: 12px;
  padding: 12px 20px !important;

  .${prefixCls}-notification-notice-content {
    .not-description {
      padding: 14px;
      .${prefixCls}-notification-notice-with-icon {
        .${prefixCls}-notification-notice-icon {
          .icon {
            height: 16px;
            margin: 4px;
            line-height: 0;
          }
        }

        .${prefixCls}-notification-notice-message {
          padding-top: 0;
          line-height: 24px;
          margin-inline-start: 26px;
        }
        .${prefixCls}-notification-notice-description {
          display: none;
        }
      }
    }

    .${prefixCls}-notification-notice-with-icon {
      line-height: 0;
      .${prefixCls}-notification-notice-icon {
        .icon {
          height: 40px;
          margin: 6px;
        }
      }
      .${prefixCls}-notification-notice-message {
        margin-bottom: 0;
        padding-top: 5px;
        font-weight: bold;
        font-size: 15px;
        line-height: 21px;
        margin-inline-start: ${52 + 12}px;
      }

      .${prefixCls}-notification-notice-description {
        padding: 6px 0 3px;
        color: #666666;
        font-size: 12px;
        line-height: 17px;
        margin-inline-start: ${52 + 12}px;
      }
    }
  }
`;
