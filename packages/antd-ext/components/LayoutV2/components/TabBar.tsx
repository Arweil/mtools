import { CloseOutlined, LeftOutlined, RightOutlined } from '@ant-design/icons';
import { Flex } from 'antd';
import type { OnResize } from 'rc-resize-observer';
import ResizeObserver from 'rc-resize-observer';
import React, { useEffect, useRef, useState } from 'react';
import { cx } from '../../utils/emotion';
import useLatest from '../hooks/useLatest';
import useMove from '../hooks/useMove';
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
  const leftBtnRef = useRef<HTMLDivElement>(null);
  const rightBtnRef = useRef<HTMLDivElement>(null);
  const needScroll = wrapperWidth < tabListWidth;

  const transformMin = Math.min(0, wrapperWidth - tabListWidth - rightPadding);
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

  // 容器变化，重新调整transform位置
  useEffect(() => {
    setTransform(alignInRange(transform));
  }, [transformMax, transformMin]);

  // tabbar变化，重新调整transform位置
  useEffect(() => {
    setTransform(alignInRange(transformMin));
  }, [tabListWidth]);

  const onWrapResize: OnResize = size => {
    setWrapperWidth(size.width);
  };

  const onListResize: OnResize = size => {
    setTabListWidth(size.width);
  };

  const onClose = (e: React.MouseEvent, key: string) => {
    e.stopPropagation();
    onRemove(key);
  };

  const tabNodes = tabbar.map(item => (
    <div
      key={item.key}
      aria-selected={selected === item.key}
      className={cx({
        [style.selected]: selected === item.key,
        [style.tabNode]: selected !== item.key,
      })}
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
        <Flex
          className={style.leftBtn}
          align="center"
          ref={leftBtnRef}
          style={{ display: transform >= 0 ? 'none' : 'flex' }}
        >
          <LeftOutlined />
        </Flex>

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

        <Flex
          className={style.rightBtn}
          align="center"
          justify="right"
          ref={rightBtnRef}
          style={{ display: transform <= -tabListWidth + wrapperWidth ? 'none' : 'flex' }}
        >
          <RightOutlined />
        </Flex>
      </div>
    </ResizeObserver>
  );
}

export default React.memo(TabBar);
