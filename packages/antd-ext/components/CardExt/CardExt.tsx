import type { CardProps } from 'antd';
import { Card } from 'antd';
import classNames from 'classnames';
import React from 'react';
import { usePrefixCls } from '../utils';

export type CardExtProps = CardProps;

const CardExt: React.FC<CardExtProps> = props => {
  const { className, ...restProps } = props;
  const { mtPrefixCls } = usePrefixCls();
  const prefixCls = `${mtPrefixCls}-card`;

  const cardClassName = classNames(prefixCls, className);

  return <Card className={cardClassName} {...restProps} />;
};

export default CardExt;
