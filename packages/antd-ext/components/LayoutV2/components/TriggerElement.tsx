import { MenuFoldOutlined, MenuUnfoldOutlined } from '@ant-design/icons';
import React from 'react';
import type { LayoutProps } from '../types';

function TriggerElement({
  collapsed,
  trigger,
  onClick,
}: {
  collapsed: boolean;
  trigger?: LayoutProps['trigger'];
  onClick?: () => void;
}) {
  if (trigger === null) return null;
  let ele = null;
  if (trigger === undefined) ele = collapsed ? <MenuUnfoldOutlined /> : <MenuFoldOutlined />;
  if (trigger instanceof Function) ele = trigger(collapsed);
  return <div onClick={onClick}>{ele}</div>;
}

export default React.memo(TriggerElement);
