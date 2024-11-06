import type { GlobalToken } from 'antd';
import useLocale from 'antd/es/locale/useLocale';
import classNames from 'classnames';
import React from 'react';
import type { ThemeColor } from '../theme/type';
import { mtPrefixCls as _mtPrefixCls } from '../utils/config';
import { css } from '../utils/emotion';
import useMapTheme from '../utils/useMapTheme';
import usePrefixCls from '../utils/usePrefixCls';
import NotFound from './img/NotFound';

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

const emptyText = (token: GlobalToken) => css`
  color: ${token.colorTextDisabled};
  font-size: 12px;
  line-height: 18px;
`;

function NotFoundContent(props: { className?: string }) {
  const { className } = props;
  const [txt] = useLocale('Empty');
  const { token, prefixCls, mtPrefixCls } = usePrefixCls();

  return (
    <div className={classNames(`${prefixCls}-${mtPrefixCls}-empty`, empty, className)}>
      <div className={emptyImg}>
        <NotFound />
      </div>
      <div
        className={classNames(`${prefixCls}-${mtPrefixCls}-empty-description`, emptyText(token))}
      >
        {txt.description}
      </div>
    </div>
  );
}

const customStyle = (token: GlobalToken, prefixCls: string, tokenExt: Partial<ThemeColor>) => css`
  .${prefixCls}-${_mtPrefixCls}-empty-description {
    color: ${tokenExt.colorBlackL4};
  }
`;

export default function Mixin() {
  const { classes } = useMapTheme({
    emotioncss: {
      hermes: customStyle,
      zeus: customStyle,
    },
  });
  return <NotFoundContent className={classes} />;
}
