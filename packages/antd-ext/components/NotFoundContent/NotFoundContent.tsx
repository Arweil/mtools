import React from 'react';
import { css } from "@emotion/css";
import NotFound from './img/NotFound';

const empty = css`
  display: flex;
  align-items: center;
  flex-direction: column;
`

const emptyImg = css`
  width: 100px;
  height: 58px;
  margin: 18px auto 8px;
`;

const emptyText = css`
  color: #BFBFBF;
  font-size: 12px;
  line-height: 18px;
`;

export default function NotFoundContent() {
  return (
    <div className={empty}>
      <div className={emptyImg}>
        <NotFound />
      </div>
      <div className={emptyText}>暂无内容</div>
    </div>
  )
}