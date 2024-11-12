import { useEffect } from 'react';
import useLatest from './useLatest';

const useMove = (
  wrapRef: React.RefObject<HTMLDivElement>,
  onOffset: (offsetX: number) => boolean,
  leftRef?: React.RefObject<HTMLDivElement>,
  rightRef?: React.RefObject<HTMLDivElement>,
) => {
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

    if (onOffset(-mixed)) {
      e.preventDefault();
    }
  });

  const onClick = useLatest((e: MouseEvent, direction?: 'L' | 'R') => {
    e.stopPropagation();
    onOffset(direction === 'L' ? 400 : -400);
  });

  useEffect(() => {
    const wrap = wrapRef.current;
    const leftBtn = leftRef?.current;
    const rightBtn = rightRef?.current;
    wrap?.addEventListener('wheel', onWheel, { passive: false });
    leftBtn?.addEventListener('click', e => onClick(e, 'L'));
    rightBtn?.addEventListener('click', e => onClick(e, 'R'));

    return () => {
      wrap?.removeEventListener('wheel', onWheel);
      leftBtn?.removeEventListener('click', onClick);
      rightBtn?.removeEventListener('click', onClick);
    };
  }, []);
};

export default useMove;
