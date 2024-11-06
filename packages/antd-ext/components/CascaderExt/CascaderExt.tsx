import type { CascaderProps } from 'antd';
import { Cascader } from 'antd';
import classNames from 'classnames';
import React, { useMemo } from 'react';
import NotFoundContent from '../NotFoundContent';
import { css } from '../utils/emotion';

const popup = css`
  min-height: 148px;
`;

export default function CascaderExt(props: CascaderProps) {
  const { popupClassName, ...restProps } = props;
  const formattedPopupClassName = useMemo(
    () => classNames(popupClassName, popup),
    [popupClassName],
  );

  return (
    <Cascader
      notFoundContent={<NotFoundContent />}
      popupClassName={formattedPopupClassName}
      {...restProps}
    />
  );
}
