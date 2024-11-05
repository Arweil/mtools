import { MenuFoldOutlined, MenuUnfoldOutlined } from '@ant-design/icons';
import React from 'react';
import type { LayoutProps } from '../types';

function TriggerElement({
  collapsed,
  trigger,
  onClick,
  style,
}: {
  collapsed: boolean;
  trigger?: LayoutProps['trigger'];
  onClick?: () => void;
  style?: React.CSSProperties;
}) {
  if (trigger === null) return null;
  let ele = null;
  if (trigger === undefined)
    ele = collapsed ? <MenuUnfoldOutlined style={style} /> : <MenuFoldOutlined style={style} />;
  if (trigger instanceof Function) ele = trigger(collapsed);
  return <div onClick={onClick}>{ele}</div>;
}

export default React.memo(TriggerElement);
