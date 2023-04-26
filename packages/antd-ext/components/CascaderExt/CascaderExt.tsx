import React, { useMemo } from 'react';
import { Cascader, CascaderProps } from 'antd';
import NotFoundContent from '../NotFoundContent';
import classNames from 'classnames';
import { css } from '@emotion/css';

const popup = css`
  min-height: 148px;
`;

export default function CascaderExt(props: CascaderProps) {
  const { popupClassName, ...restProps } = props;
  const formattedPopupClassName = useMemo(() => classNames(popupClassName, popup), [popupClassName]);

  return (
    <Cascader
      notFoundContent={<NotFoundContent />}
      popupClassName={formattedPopupClassName}
      {...restProps}
    />
  );
}
