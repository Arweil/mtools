import { Cascader } from 'antd';
import classNames from 'classnames';
import React, { useMemo } from 'react';
import NotFoundContent from '../NotFoundContent';
import { css } from '../utils/emotion';

const popup = css`
  min-height: 148px;
`;

export default function CascaderExt(props: React.ComponentProps<typeof Cascader>) {
  const formattedPopupClassName = useMemo(
    () => classNames(props.popupClassName, popup),
    [props.popupClassName],
  );

  return (
    <Cascader
      {...props}
      notFoundContent={<NotFoundContent />}
      popupClassName={formattedPopupClassName}
    />
  );
}
