import React from 'react';
import { css } from '@emotion/css';
import NotFound from './img/NotFound';
import useLocale from 'antd/es/locale/useLocale';

const empty = css`
  display: flex;
  align-items: center;
  flex-direction: column;
`;

const emptyImg = css`
  width: 100px;
  height: 58px;
  margin: 18px auto 8px;
`;

const emptyText = css`
  color: #bfbfbf;
  font-size: 12px;
  line-height: 18px;
`;

export default function NotFoundContent() {
  const [txt] = useLocale('Empty');

  return (
    <div className={empty}>
      <div className={emptyImg}>
        <NotFound />
      </div>
      <div className={emptyText}>{txt.description}</div>
    </div>
  );
}
