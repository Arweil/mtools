import { LeftOutlined, RightOutlined } from '@ant-design/icons';
import type { MenuProps } from 'antd';
import { ConfigProvider, Flex, Menu } from 'antd';
import ResizeObserver from 'rc-resize-observer';
import React, { useEffect, useRef, useState } from 'react';
import useLatest from '../hooks/useLatest';
import useMove from '../hooks/useMove';
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
  const leftBtnRef = useRef<HTMLDivElement>(null);
  const rightBtnRef = useRef<HTMLDivElement>(null);
  const contentRef = useRef<HTMLDivElement>(null);
  const needScroll = wrapperWidth < contentWidth;

  const transformMin = Math.min(0, wrapperWidth - contentWidth);
  const transformMax = 0;

  const alignInRange = useLatest((value: number) => {
    if (value < transformMin) {
      return transformMin;
    }
    if (value > transformMax) {
      return transformMax;
    }
    return value;
  });

  useMove(
    wrapRef,
    offsetX => {
      if (needScroll) {
        setTransform(alignInRange(transform + offsetX));
        return true;
      }
      return false;
    },
    leftBtnRef,
    rightBtnRef,
  );

  useEffect(() => {
    setTransform(alignInRange(transform));
  }, [transformMax, transformMin]);

  return (
    <ResizeObserver onResize={size => setWrapperWidth(size.width)}>
      <div ref={wrapRef} className={styles.wrap}>
        <Flex
          className={styles.leftBtn}
          align="center"
          ref={leftBtnRef}
          style={{ display: transform >= 0 ? 'none' : 'flex' }}
        >
          <LeftOutlined />
        </Flex>

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

        <Flex
          className={styles.rightBtn}
          align="center"
          justify="right"
          ref={rightBtnRef}
          style={{ display: transform <= -contentWidth + wrapperWidth ? 'none' : 'flex' }}
        >
          <RightOutlined />
        </Flex>
      </div>
    </ResizeObserver>
  );
}
