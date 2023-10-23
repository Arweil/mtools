/* eslint-disable react/jsx-props-no-spreading */
import React, { PureComponent } from 'react';
import { Button } from 'antd';
import { ButtonProps } from 'antd/lib/button';
import { setStateAsync } from './utils';

export interface ButtonExtProps extends ButtonProps {
  isAsyncClick?: boolean;
}

export default class ButtonExt extends PureComponent<
  ButtonExtProps,
  {
    fetching: boolean;
  }
> {
  private isClick: boolean;

  constructor(props: Readonly<ButtonExtProps>) {
    super(props);

    this.state = {
      fetching: false,
    };

    this.isClick = false; // 防止重复点击

    this.onClick = this.onClick.bind(this);
  }

  async onClick(event: React.MouseEvent<any, MouseEvent>): Promise<void> {
    if (this.isClick) {
      return;
    }

    this.isClick = true;

    const { isAsyncClick, onClick } = this.props;
    if (!onClick) {
      return;
    }

    // 如果标记异步，那么自动加入loading
    if (isAsyncClick) {
      try {
        await setStateAsync(this, { fetching: true });
        // eslint-disable-next-line @typescript-eslint/await-thenable
        await onClick(event);
      } catch (ex) {
        console.warn(ex);
      } finally {
        await setStateAsync(this, { fetching: false });
      }
    } else {
      onClick(event);
    }

    this.isClick = false;
  }

  render(): JSX.Element {
    const { onClick, loading, isAsyncClick, children, ...restProps } = this.props;
    const { fetching } = this.state;

    return (
      <Button
        onClick={onClick ? this.onClick : undefined}
        loading={fetching || loading}
        {...restProps}
      >
        {children}
      </Button>
    );
  }
}
