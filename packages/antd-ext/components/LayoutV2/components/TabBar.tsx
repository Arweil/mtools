import { CloseOutlined, LeftOutlined, RightOutlined } from '@ant-design/icons';
import { cx } from '@emotion/css';
import { Flex } from 'antd';
import type { OnResize } from 'rc-resize-observer';
import ResizeObserver from 'rc-resize-observer';
import React, { useEffect, useRef, useState } from 'react';
import useLatest from '../hooks/useLatest';
import style from '../styles/tabbar';
import type { Tabbar } from '../types';

const rightPadding = 16;

function TabBar(props: {
  tabbar: Tabbar[];
  selected: string;
  onSelect: (key: string) => void;
  onRemove: (key: string) => void;
}) {
  const { tabbar, selected, onSelect, onRemove } = props;
  const [wrapperWidth, setWrapperWidth] = useState(0);
  const [tabListWidth, setTabListWidth] = useState(0);
  const [transform, setTransform] = useState(0);
  const containerRef = useRef<HTMLDivElement>(null);
  const wrapRef = useRef<HTMLDivElement>(null);
  const preTabListWidth = useRef(0);

  const transformMin = Math.min(0, wrapperWidth - tabListWidth - rightPadding);
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

  const onTransformChange = useLatest(() => {
    const { current: preWidth } = preTabListWidth;
    if (preWidth < tabListWidth) {
      setTransform(alignInRange(transform - (tabListWidth - preWidth)));
    } else if (preWidth > tabListWidth && transform < transformMin) {
      setTransform(alignInRange(transform));
    }
  });

  useEffect(() => {
    onTransformChange();
  }, [tabListWidth, onTransformChange]);

  const onWrapResize: OnResize = size => {
    setWrapperWidth(size.width);
  };

  const onListResize: OnResize = size => {
    preTabListWidth.current = tabListWidth;
    setTabListWidth(size.width);
  };

  const onMove = (e: React.MouseEvent, direction: 'L' | 'R') => {
    e.stopPropagation();
    const move = direction === 'L' ? 100 : -100;
    const newTransform = Math.min(transformMax, transform + move);
    setTransform(alignInRange(newTransform));
  };

  const onClose = (e: React.MouseEvent, key: string) => {
    e.stopPropagation();
    onRemove(key);
  };

  const leftBtn = () => {
    if (transform >= 0) return null;

    return (
      <Flex className={style.leftBtn} align="center" onClick={e => onMove(e, 'L')}>
        <LeftOutlined />
      </Flex>
    );
  };

  const rightBtn = () => {
    if (transform <= -tabListWidth + wrapperWidth) return null;

    return (
      <Flex className={style.rightBtn} align="center" justify="right" onClick={e => onMove(e, 'R')}>
        <RightOutlined />
      </Flex>
    );
  };

  const tabNodes = tabbar.map(item => (
    <div
      key={item.key}
      aria-selected={selected === item.key}
      className={cx({ [style.selected]: selected === item.key })}
      onClick={() => onSelect(item.key)}
    >
      <Flex className={cx('tab', style.tab)} align="center">
        {item.label}
        {tabbar.length > 1 ? (
          <CloseOutlined className={style.close} onClick={e => onClose(e, item.key)} />
        ) : null}
      </Flex>
    </div>
  ));

  return (
    <ResizeObserver onResize={onWrapResize}>
      <div className={style.wrap} ref={containerRef}>
        {leftBtn()}
        <ResizeObserver onResize={onListResize}>
          <Flex
            className={style.list}
            align="center"
            ref={wrapRef}
            style={{
              width: 'fit-content',
              transform: `translateX(${transform}px)`,
              transition: '0.3s',
            }}
          >
            {tabNodes}
          </Flex>
        </ResizeObserver>
        {rightBtn()}
      </div>
    </ResizeObserver>
  );
}

export default React.memo(TabBar);
