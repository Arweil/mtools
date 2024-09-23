import type { DrawerProps } from 'antd';
import { Drawer, Space } from 'antd';
import React from 'react';
import ButtonExt from '../ButtonExt';
import type { ButtonExtMixinProps } from '../ButtonExt/Mix';
import { CloseOutlined } from '../icon';
import { usePrefixCls } from '../utils';

interface _DrawerExtProps extends DrawerProps {
  cancelText?: string;
  cancelButtonProps?: ButtonExtMixinProps;
  okText?: string;
  okButtonProps?: ButtonExtMixinProps;
  onCancel?: () => void;
  onOk?: () => void;
  footerStyle?: React.CSSProperties;
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

  return (
    <Drawer
      footer={
        <div style={{ textAlign: 'right', ...footerStyle }}>
          <Space size={8}>
            <ButtonExt isAsyncClick {...cancelButtonProps} onClick={onCancel}>
              {cancelText}
            </ButtonExt>
            <ButtonExt isAsyncClick debounce type="primary" {...okButtonProps} onClick={onOk}>
              {okText}
            </ButtonExt>
          </Space>
        </div>
      }
      extra={
        <div>
          {extra}
          <CloseOutlined
            className={`${prefixCls}-${mtPrefixCls}-drawer-close`}
            onClick={onCancel}
          />
        </div>
      }
      {...restProps}
      onClose={onCancel}
      closable={false}
    >
      {children}
    </Drawer>
  );
}
