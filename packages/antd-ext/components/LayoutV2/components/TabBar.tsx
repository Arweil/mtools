import { CloseOutlined, LeftOutlined, RightOutlined } from '@ant-design/icons';
import { Flex } from 'antd';
import type { OnResize } from 'rc-resize-observer';
import ResizeObserver from 'rc-resize-observer';
import React, { useEffect, useRef, useState } from 'react';
import { cx } from '../../utils/emotion';
import useLatest from '../hooks/useLatest';
import useMove from '../hooks/useMove';
import type { Tabbar } from '../types';

const padding = 16;

function TabBar(props: {
  tabbar: Tabbar[];
  selected: string;
  showScrollBtn?: boolean;
  styles: Record<string, string>;
  onSelect: (key: string) => void;
  onRemove: (key: string) => void;
  onCanScroll?: (canScroll: boolean) => void;
}) {
  const { tabbar, selected, showScrollBtn = true, styles, onSelect, onRemove, onCanScroll } = props;
  const [transform, setTransform] = useState(0);
  const prevTabbarLengthRef = useRef(tabbar.length); // 记录上一次 tabbar 的长度
  const scrollToEndRef = useRef(false); // 标记需要滚动到末尾
  const adjustPositionRef = useRef(false); // 标记需要调整位置
  const tabRefs = useRef<Map<string, HTMLDivElement>>(new Map()); // 存储每个tab的ref
  const wrapperRef = useRef<HTMLDivElement>(null);
  const tabListRef = useRef<HTMLDivElement>(null);
  const leftBtnRef = useRef<HTMLDivElement>(null);
  const rightBtnRef = useRef<HTMLDivElement>(null);

  // 获取 transform 的极限值（向左极限，负值）
  const getTransformMin = () => {
    const wrapperWidth = wrapperRef.current?.getBoundingClientRect().width ?? 0;
    const tabListWidth = tabListRef.current?.getBoundingClientRect().width ?? 0;
    return Math.min(0, wrapperWidth - tabListWidth - padding);
  };

  const alignInRange = useLatest((newTransform: number) => {
    return Math.min(Math.max(getTransformMin(), newTransform), 0);
  });

  // 确保选中的tab在可视区域内
  const scrollToSelectedTab = (data: { targetKey?: string } = {}) => {
    const { targetKey = selected } = data;
    const transformMin = getTransformMin();

    const selectedTabElement = tabRefs.current.get(targetKey);
    if (!selectedTabElement || !wrapperRef.current) return;

    const wrapperRect = wrapperRef.current.getBoundingClientRect();
    const tabListRect = tabListRef.current?.getBoundingClientRect();
    const tabRect = selectedTabElement.getBoundingClientRect();

    const wrapperWidth = wrapperRect.width ?? 0;
    const tabListWidth = tabListRect.width ?? 0;
    const tabWidth = tabRect.width ?? 0;

    if (!(wrapperWidth <= tabListWidth)) return;

    // 计算tab相对于容器的位置
    const tabLeft = tabRect.left - wrapperRect.left; // tab左边缘相对于容器的位置
    const tabRight = tabLeft + tabRect.width; // tab右边缘相对于容器的位置
    const visibleLeft = 0; // 可视区域左边缘
    const visibleRight = wrapperRect.width; // 可视区域右边缘

    const center = wrapperWidth / 2 - tabWidth / 2;
    // 判断是否需要滚动
    if (tabLeft < visibleLeft) {
      // tab在可视区域左侧，滚动到tab左边缘
      setTransform(prev => alignInRange(prev + center));
    } else if (tabRight > visibleRight) {
      // tab在可视区域右侧，滚动到tab右边缘刚好可见
      setTransform(prev => alignInRange(prev - center));
    } else {
      if (transformMin > transform) {
        setTransform(alignInRange(transformMin));
      }
    }
  };

  useMove(
    tabListRef,
    offsetX => {
      const wrapperWidth = wrapperRef.current?.getBoundingClientRect().width ?? 0;
      const tabListWidth = tabListRef.current?.getBoundingClientRect().width ?? 0;
      if (wrapperWidth < tabListWidth) {
        setTransform(alignInRange(transform + offsetX));
        return true;
      }
      return false;
    },
    leftBtnRef,
    rightBtnRef,
  );

  // 监听 tabbar 数量变化
  useEffect(() => {
    if (tabbar.length !== prevTabbarLengthRef.current) {
      if (tabbar.length > prevTabbarLengthRef.current) {
        // 新增 tab，标记需要滚动到末尾
        scrollToEndRef.current = true;
      } else {
        // 删除 tab，标记需要调整位置
        adjustPositionRef.current = true;
      }
      prevTabbarLengthRef.current = tabbar.length;
    }
  }, [tabbar.length]);

  const onWrapResize: OnResize = () => {
    // 容器大小变化后，重新定位选中的tab
    requestAnimationFrame(() => scrollToSelectedTab());
  };

  const onListResize: OnResize = () => {
    const transformMin = getTransformMin();
    // 新增 tab，滚动到末尾
    if (scrollToEndRef.current) {
      setTransform(alignInRange(transformMin));
      scrollToEndRef.current = false;
    }

    // 删除 tab，调整位置
    if (adjustPositionRef.current) {
      setTransform(prev => alignInRange(prev));
      adjustPositionRef.current = false;
    }

    // 通知父组件内容是否可以滚动
    onCanScroll?.(transformMin < 0);
  };

  const onSelectTab = (key: string) => {
    onSelect(key);

    requestAnimationFrame(() => scrollToSelectedTab({ targetKey: key }));
  };

  const onClose = (e: React.MouseEvent, key: string) => {
    e.stopPropagation();
    onRemove(key);
  };

  const showScrollButton = (direction: 'left' | 'right'): boolean => {
    if (!showScrollBtn) return false;

    if (direction === 'left') {
      return transform < 0;
    }

    return transform > getTransformMin();
  };

  const tabNodes = tabbar.map(item => (
    <div
      key={item.key}
      ref={el => {
        if (el) {
          tabRefs.current.set(item.key, el);
        } else {
          tabRefs.current.delete(item.key);
        }
      }}
      aria-selected={selected === item.key}
      className={cx({
        [styles.selected]: selected === item.key,
        [styles.tabNode]: selected !== item.key,
      })}
      onClick={() => onSelectTab(item.key)}
    >
      <Flex className={cx('tab', styles.tab)} align="center">
        {item.label}
        {tabbar.length > 1 ? (
          <CloseOutlined
            className={cx('close', styles.close)}
            onClick={e => onClose(e, item.key)}
          />
        ) : null}
      </Flex>
    </div>
  ));

  return (
    <ResizeObserver onResize={onWrapResize}>
      <div className={styles.wrap} ref={wrapperRef}>
        <Flex
          className={styles.leftBtn}
          align="center"
          ref={leftBtnRef}
          style={{ display: showScrollButton('left') ? 'flex' : 'none' }}
        >
          <LeftOutlined />
        </Flex>

        <ResizeObserver onResize={onListResize}>
          <Flex
            className={styles.list}
            align="center"
            ref={tabListRef}
            style={{
              width: 'fit-content',
              transform: `translateX(${transform}px)`,
              transition: '0.3s',
            }}
          >
            {tabNodes}
          </Flex>
        </ResizeObserver>

        {showScrollBtn && (
          <Flex
            className={styles.rightBtn}
            align="center"
            justify="right"
            ref={rightBtnRef}
            style={{ display: showScrollButton('right') ? 'flex' : 'none' }}
          >
            <RightOutlined />
          </Flex>
        )}
      </div>
    </ResizeObserver>
  );
}

export default React.memo(TabBar);
