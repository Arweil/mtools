import React from 'react';
import { Drawer, Space } from 'antd';
import type { DrawerProps } from 'antd';
import ButtonExt from '../ButtonExt';
import { CloseOutlined } from '../icon';
import { usePrefixCls } from '../utils';
import type { ButtonExtMixinProps } from '../ButtonExt/Mix';

interface _DrawerExtProps extends DrawerProps {
  cancelText?: string;
  cancelButtonProps?: ButtonExtMixinProps;
  okText?: string;
  okButtonProps?: ButtonExtMixinProps;
  onCancel?: () => void;
  onOk?: () => void;
}

export type DrawerExtProps = Omit<_DrawerExtProps, 'onClose'>;

export default function DrawerExt(props: DrawerExtProps) {
  const {
    cancelText = '取消',
    cancelButtonProps,
    onCancel = () => undefined,
    okText = '确定',
    okButtonProps,
    onOk = () => undefined,
    children,
    extra,
    footerStyle,
    ...restProps
  } = props;

  const { prefixCls, mtPrefixCls } = usePrefixCls();

  console.log(okButtonProps, cancelButtonProps);

  return (
    <Drawer
      footer={
        <Space size={8}>
          <ButtonExt isAsyncClick {...cancelButtonProps} onClick={onCancel}>
            {cancelText}
          </ButtonExt>
          <ButtonExt isAsyncClick type="primary" {...okButtonProps} onClick={onOk}>
            {okText}
          </ButtonExt>
        </Space>
      }
      footerStyle={{ textAlign: 'right', ...footerStyle }}
      extra={
        <CloseOutlined className={`${prefixCls}-${mtPrefixCls}-drawer-close`} onClick={onCancel} />
      }
      {...restProps}
      onClose={onCancel}
      closable={false}
    >
      {children}
    </Drawer>
  );
}
