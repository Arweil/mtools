import React, { useCallback, useState } from 'react';
import { Button } from 'antd';
import type { ButtonProps } from 'antd';

export interface ButtonExtProps extends ButtonProps {
  isAsyncClick?: boolean;
}

export default function ButtonExt(props: ButtonExtProps) {
  const { isAsyncClick, onClick, children, ...restProps } = props;
  const [loading, setLoading] = useState(false);

  const onClickExt = useCallback(
    async event => {
      if (!onClick) {
        return;
      }

      // 如果标记异步，那么自动加入loading
      if (isAsyncClick) {
        try {
          setLoading(true);
          await onClick(event);
        } catch (ex) {
          console.warn(ex);
        } finally {
          setLoading(false);
        }
      } else {
        onClick(event);
      }
    },
    [isAsyncClick, onClick],
  );
  return (
    <Button loading={loading} onClick={onClickExt} {...restProps}>
      {children}
    </Button>
  );
}
