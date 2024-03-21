import { css } from '@emotion/css';
import type { GlobalToken } from 'antd';
import type { ThemeColor } from '../theme/type';
import { mtPrefixCls } from '../utils/config';

const uploadHeight = 64;
export const customStyle = (
  token: GlobalToken,
  prefixCls: string,
  tokenExt: Partial<ThemeColor>,
) => css`
  &.${prefixCls}-upload-wrapper {
    color: ${tokenExt.colorBlackL2};

    // 针对picture-card做样式自定义
    &.${mtPrefixCls}-upload-picture-card-wrapper {
      .${prefixCls}-upload-list-picture-card {
        .${prefixCls}-upload.${prefixCls}-upload-select {
          width: 100%;
          height: ${uploadHeight}px;
          background-color: ${tokenExt.colorGreyL7};
          border-radius: 4px;
          .${mtPrefixCls}-upload-btn {
            width: 100%;
            background: none;
            border: 0;
            cursor: pointer;
            span {
              margin-right: 5px;
            }
          }
        }
        .${prefixCls}-upload-list-item-container {
          display: block;
          width: 100%;
          height: ${uploadHeight}px;
          padding: 16px 20px;
          background-color: ${tokenExt.colorGreyL7};
          border-radius: 4px;
          .${mtPrefixCls}-upload-list-item {
            height: 100%;
            &.status-uploading {
              color: ${tokenExt.colorBlackL3};
              .${prefixCls}-progress {
                margin: 0;
                text-align: center;
              }
            }
            &.status-error {
              color: ${tokenExt.colorError};
            }
            .${mtPrefixCls}-upload-list-item-file {
              overflow: hidden;
              .${mtPrefixCls}-upload-file-icon {
                width: 32px;
                height: 32px;
                margin-right: 5px;
                img {
                  width: 100%;
                  object-fit: contain;
                }
              }
              .${mtPrefixCls}-upload-file-title {
                overflow: hidden;
                white-space: nowrap;
                text-overflow: ellipsis;
              }
            }
            .${mtPrefixCls}-upload-close-btn {
              cursor: pointer;
            }
            .${prefixCls}-flex {
              height: 100%;
            }
          }
        }
      }
    }
  }
`;
