import { cx } from '@emotion/css';
import { Flex, Typography } from 'antd';
import React from 'react';
import { usePrefixCls } from '../../utils';
import styles from '../styles/menuItem';

/**
 * 折叠后的菜单项
 *
 * @props
 * @returns
 */
function CollapsedMenuItem({ icon, label }: { icon: React.ReactNode; label: React.ReactNode }) {
  const { prefixCls } = usePrefixCls();

  return (
    <Flex
      className={cx(`${prefixCls}-collapsed-menu-item`, styles.menuItem)}
      vertical
      align="center"
      justify="center"
    >
      <span className={styles.icon}>{icon}</span>
      <Typography.Text className={styles.label} ellipsis>
        {label}
      </Typography.Text>
    </Flex>
  );
}

export default React.memo(CollapsedMenuItem);
