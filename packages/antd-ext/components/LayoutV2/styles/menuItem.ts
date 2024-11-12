import { css } from '@emotion/css';

const menuItem = css`
  width: 54px;
  height: 100%;
  padding: 6px 5px;
  line-height: 0;
`;

const icon = css`
  .anticon {
    color: #9aa0a8;
    line-height: 0 !important;
  }
`;

const label = css`
  font-size: 11px;
  color: #333333;
  line-height: 16px;
  font-weight: 400;
`;

export default { menuItem, icon, label };
