import { CloseOutlined } from '@ant-design/icons';
import classNames from 'classnames';
import React, { useCallback, useRef } from 'react';
import { tabItemActiveStyle, tabItemStyle } from '../styles/layoutHermes';

export default function TabItem(props: {
  activeUrl: string | number;
  url: string | number;
  children: React.ReactNode;
  showRemoveIcon: boolean;
  history?: any;
  onSelect: (key: string | number) => void;
  onRemove: (key: string | number) => void;
}) {
  const { activeUrl, url, children, showRemoveIcon, history, onRemove, onSelect } = props;
  const refSpan = useRef<HTMLSpanElement>(null);

  const isActive = activeUrl === url;

  const classes = classNames([tabItemStyle, isActive ? tabItemActiveStyle : '']);

  const _onRemove: React.MouseEventHandler<HTMLSpanElement> = useCallback(
    e => {
      e.stopPropagation();
      onRemove(url);
    },
    [onRemove, url],
  );

  const _onSelect = useCallback(() => {
    onSelect(url);
    if (history) {
      history.push(url);
    }
  }, [onSelect, history, url]);

  return (
    <div className={classes} onClick={_onSelect} id={url + ''}>
      <span style={!showRemoveIcon ? { marginLeft: 0 } : {}} ref={refSpan}>
        {children}
      </span>
      {showRemoveIcon ? (
        <CloseOutlined style={{ fontSize: 10, padding: 6 }} onClick={_onRemove} />
      ) : null}
    </div>
  );
}
