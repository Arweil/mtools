import { cx } from '@emotion/css';
import type { MenuProps } from 'antd';
import { ConfigProvider, Menu } from 'antd';
import ResizeObserver from 'rc-resize-observer';
import React, { useEffect, useRef, useState } from 'react';
import useLatest from '../hooks/useLatest';
import styles from '../styles/navbar';

const theme = {
  components: {
    Menu: {
      fontSize: 12,
      itemHoverColor: '#FFFFFF',
      itemColor: '#BBC0CC',
      horizontalItemSelectedColor: '#fff',
    },
  },
};

export default function NavBar(props: MenuProps) {
  const [wrapperWidth, setWrapperWidth] = useState(0);
  const [contentWidth, setContentWidth] = useState(0);
  const [transform, setTransform] = useState(0);
  const wrapRef = useRef<HTMLDivElement>(null);
  const contentRef = useRef<HTMLDivElement>(null);
  const needScroll = wrapperWidth < contentWidth;

  const transformMin = Math.min(0, wrapperWidth - contentWidth);
  const transformMax = 0;

  const alignInRange = (value: number) => {
    if (value < transformMin) {
      return transformMin;
    }
    if (value > transformMax) {
      return transformMax;
    }
    return value;
  };

  const onWheel = useLatest((e: WheelEvent) => {
    const { deltaX, deltaY } = e;

    let mixed = 0;
    const absX = Math.abs(deltaX);
    const absY = Math.abs(deltaY);
    if (absX > absY) {
      mixed = deltaX;
    } else {
      mixed = deltaY;
    }

    if (needScroll) {
      e.preventDefault();
      setTransform(alignInRange(transform - mixed));
    }
  });

  useEffect(() => {
    const ref = wrapRef.current;
    ref?.addEventListener('wheel', onWheel, { passive: false });

    return () => {
      ref?.removeEventListener('wheel', onWheel);
    };
  }, [onWheel]);

  return (
    <ResizeObserver onResize={size => setWrapperWidth(size.width)}>
      <div
        ref={wrapRef}
        className={cx(styles.wrap, {
          [styles.transformLeft]: transform < 0,
          [styles.transformRight]: transform > -contentWidth + wrapperWidth,
        })}
      >
        <ResizeObserver onResize={size => setContentWidth(size.width)}>
          <div
            ref={contentRef}
            className={styles.content}
            style={{ transform: `translateX(${transform}px)` }}
          >
            <ConfigProvider theme={theme}>
              <Menu
                {...props}
                disabledOverflow
                mode="horizontal"
                style={{ display: 'flex', height: 40, paddingBottom: 6 }}
              />
            </ConfigProvider>
          </div>
        </ResizeObserver>
      </div>
    </ResizeObserver>
  );
}
