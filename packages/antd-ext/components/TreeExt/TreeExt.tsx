import { EllipsisOutlined } from '@ant-design/icons';
import type { DropDownProps, TreeDataNode, TreeProps } from 'antd';
import { Dropdown, Row, Tree } from 'antd';
import { isString } from 'antd/es/button';
import type { MenuItemType } from 'antd/es/menu/hooks/useItems';
import classNames from 'classnames';
import React, { useMemo, useRef } from 'react';
import ButtonExt from '../ButtonExt/ButtonExt';
import { usePrefixCls } from '../utils';
export interface TreeExtProps extends TreeProps {
  treeData: TreeDataNodeExt[];
}
export type TreeDataNodeExt = TreeDataNode & {
  more?: DropDownProps;
};

export default function TreeExt(props: TreeExtProps) {
  const { prefixCls, token, mtPrefixCls } = usePrefixCls();
  const treeRef = useRef(null);
  const {
    className,
    blockNode = true,
    showIcon = true,
    showLine,
    children,
    treeData,
    ...restProps
  } = props;

  const _treeData = useMemo(() => {
    console.log(treeRef);
    // debugger
    return treeData.map(tree => {
      if (tree.more) {
        const { menu, ...rest } = tree.more;
        // 改写Dropdown选项样式
        const menuItems = (menu?.items || []).map(it => {
          const _it = it as MenuItemType;
          return {
            ..._it,
            label: isString(_it.label) ? _it.label : _it.label,
          };
        });
        const morePorps = {
          ...rest,
          menu: {
            ...menu,
            items: menuItems,
          },
        };
        const ddProps = {
          getPopupContainer: () => treeRef.current,
          trigger: ['click'] as 'click'[],
          arrow: { pointAtCenter: true },
          ...morePorps,
        };
        return {
          ...tree,
          title: (
            <Row justify={'space-between'} align="middle">
              {tree.title}
              <Dropdown {...ddProps}>
                <ButtonExt
                  className={prefixCls + '-more-btn'}
                  onClick={e => e.stopPropagation()}
                  size="small"
                  type="text"
                >
                  <EllipsisOutlined />
                </ButtonExt>
              </Dropdown>
            </Row>
          ),
        };
      }
      return tree;
    });
  }, [treeData, prefixCls]);

  const treeClassName = classNames(showLine ? '' : 'not-showline', blockNode ? 'is-blockNode' : '');

  return (
    <div ref={treeRef} className={className}>
      <Tree
        showIcon={showIcon}
        showLine={showLine}
        blockNode={blockNode}
        className={treeClassName}
        treeData={_treeData}
        {...restProps}
      >
        {children}
      </Tree>
    </div>
  );
}
