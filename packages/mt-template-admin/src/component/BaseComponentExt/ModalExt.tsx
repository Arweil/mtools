/* eslint-disable react/jsx-props-no-spreading */
import React, { PureComponent } from 'react';
import { Modal, Spin } from 'antd';
import { ModalProps } from 'antd/lib/modal';
import { setStateAsync } from './utils';

export interface ModalExtProps extends ModalProps {
  isLoading?: boolean;
}

export const enumZIndex = {
  levelBasement1: 900,
  default: 1000,
  level1: 1100,
  level2: 1200,
  level3: 1300,
};

export default class ModalExt extends PureComponent<
  ModalExtProps,
  {
    fetching: boolean;
  }
> {
  private isClick: boolean;

  constructor(props: Readonly<ModalExtProps>) {
    super(props);

    this.state = {
      fetching: false,
    };

    this.isClick = false; // 防止重复点击

    this.onOk = this.onOk.bind(this);
  }

  async onOk(e: React.MouseEvent<any>): Promise<void> {
    if (this.isClick) {
      return;
    }

    this.isClick = true;
    const { onOk } = this.props;
    if (!onOk) {
      return;
    }

    try {
      await setStateAsync(this, {
        fetching: true,
      });

      onOk(e);
    } catch (ex) {
      console.warn(ex);
    } finally {
      await setStateAsync(this, {
        fetching: false,
      });
    }

    this.isClick = false;
  }

  render(): JSX.Element {
    const { onOk, isLoading, okButtonProps, cancelButtonProps, children, ...restProps } =
      this.props;
    const { fetching } = this.state;

    return (
      <Modal
        closable={false}
        maskClosable={false}
        style={{
          top: 20,
        }}
        bodyStyle={{
          overflowY: 'scroll',
          maxHeight: window.innerHeight - 160,
        }}
        okButtonProps={{
          loading: fetching,
          ...okButtonProps,
        }}
        cancelButtonProps={{
          disabled: fetching,
          ...cancelButtonProps,
        }}
        onOk={onOk ? this.onOk : undefined}
        {...restProps}
      >
        {isLoading === undefined ? children : <Spin spinning={isLoading}>{children}</Spin>}
      </Modal>
    );
  }
}
