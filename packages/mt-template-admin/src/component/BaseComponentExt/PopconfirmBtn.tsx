/* eslint-disable react/jsx-props-no-spreading */
import React, { PureComponent } from 'react';
import { ButtonProps, Popconfirm, PopconfirmProps } from 'antd';
import ButtonExt from './ButtonExt';
import { setStateAsync } from './utils';

interface IPopconfirmBtnProps extends PopconfirmProps {
  isAsyncClick?: boolean;
  btnProps?: ButtonProps;
}

export default class PopconfirmBtn extends PureComponent<
  IPopconfirmBtnProps,
  {
    fetching: boolean;
  }
> {
  constructor(props: Readonly<IPopconfirmBtnProps>) {
    super(props);

    this.state = {
      fetching: false,
    };

    this.onConfirm = this.onConfirm.bind(this);
  }

  async onConfirm(): Promise<void> {
    const { isAsyncClick, onConfirm } = this.props;

    if (!onConfirm) {
      return;
    }

    if (isAsyncClick) {
      try {
        await setStateAsync(this, { fetching: true });
        onConfirm();
      } catch (ex) {
        console.warn(ex);
      } finally {
        await setStateAsync(this, { fetching: false });
      }
    } else {
      onConfirm();
    }
  }

  render(): JSX.Element {
    const { children, onConfirm, btnProps, ...restProps } = this.props;
    const { onClick, loading, ...restBtnProps } = btnProps || {};
    const { fetching } = this.state;
    return (
      <Popconfirm {...restProps} onConfirm={onConfirm ? this.onConfirm : undefined}>
        <ButtonExt loading={fetching || loading} {...restBtnProps}>
          {children}
        </ButtonExt>
      </Popconfirm>
    );
  }
}
