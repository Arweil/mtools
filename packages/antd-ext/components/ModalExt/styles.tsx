import { css } from '@emotion/css';
import type { GlobalToken } from 'antd';
import type { ThemeColor } from '../theme/type';
import { mtPrefixCls } from '../utils/config';

export const styles = (token: GlobalToken, prefixCls: string, tokenExt: Partial<ThemeColor>) => css`
  width: 360px !important;

  .${prefixCls}-modal-content {
    display: flex;
    flex-direction: column;
    // min-height: 240px;
    padding: 20px 30px;
    border-radius: 12px;
  }

  .${prefixCls}-modal-body {
    flex: 1 1 auto;
    text-align: center;
  }

  .${prefixCls}-modal-confirm-body-wrapper {
    height: inherit;

    .${prefixCls}-modal-confirm-content {
      z-index: 0;
      line-height: 0;

      .${prefixCls}-${mtPrefixCls}-background-img {
        position: absolute;
        top: 0;
        right: 0;
        bottom: 0;
        left: 0;
        z-index: -1;

        & > img {
          max-width: 100%;
          max-height: 100%;
        }
      }

      .${prefixCls}-${mtPrefixCls}-icon {
        width: 52px;
        margin: 8px 0;
      }

      .${prefixCls}-${mtPrefixCls}-title {
        margin-top: 16px;
        color: #333333;
        font-weight: bold;
        font-size: 15px;
        font-family: PingFangSC, PingFang SC;
        line-height: 21px;
        text-shadow: 0px 0px 10px rgba(0, 0, 0, 0.05);
      }

      .${prefixCls}-${mtPrefixCls}-content {
        min-height: 34px;
        margin-top: 8px;
        color: #666666;
        font-weight: 400;
        font-size: 12px;
        font-family: PingFangSC, PingFang SC;
        line-height: 17px;
        text-shadow: 0px 0px 10px rgba(0, 0, 0, 0.05);
      }
    }
  }

  .${prefixCls}-modal-confirm-btns {
    display: flex;
    gap: 12px;
    margin: 21px 24px 4px;
    text-align: center;

    .${prefixCls}-btn {
      width: 100%;
      font-size: 12px;

      & + .${prefixCls}-btn {
        margin-inline-start: 0;
      }
    }
  }
`;
