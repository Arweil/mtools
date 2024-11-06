import type { ButtonProps } from 'antd';
import { Button } from 'antd';
import React, { useCallback, useState } from 'react';
import useDebounceFn from '../utils/useDebounceFn';

export interface ButtonExtProps extends ButtonProps {
  isAsyncClick?: boolean;
  debounce?: boolean | number;
}

export default function ButtonExt(props: ButtonExtProps) {
  const { isAsyncClick, onClick, children, debounce, ...restProps } = props;
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

  // 防抖处理，如果传入boolean，则默认300ms
  const delay = typeof debounce === 'boolean' ? 300 : debounce ?? 0;
  const callback = useDebounceFn(onClickExt, delay);

  return (
    <Button loading={loading} onClick={callback} {...restProps}>
      {children}
    </Button>
  );
}
