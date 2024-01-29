import { css } from '@emotion/css';
import type { TooltipProps } from 'antd';
import { Tooltip } from 'antd';
import React, { useEffect, useRef, useState } from 'react';

const row1 = css`
  overflow: hidden;
  word-break: break-word;
  display: -webkit-box;
  -webkit-box-orient: vertical;
  -webkit-line-clamp: 1;
`;

export default function TypographyRowOne(props: {
  children: React.ReactNode;
  tooltipProps: TooltipProps;
}) {
  const { children, tooltipProps } = props;
  const [isNativeEllipsis, setIsNativeEllipsis] = useState(false);

  const ref = useRef<HTMLDivElement>();

  useEffect(() => {
    const textEle = ref.current;

    if (textEle) {
      setIsNativeEllipsis(textEle.offsetHeight < textEle.scrollHeight);
    }
  }, [children]);

  return (
    <Tooltip open={isNativeEllipsis ? undefined : false} title={children} {...tooltipProps}>
      <div className={row1} ref={ref}>
        {children}
      </div>
    </Tooltip>
  );
}
