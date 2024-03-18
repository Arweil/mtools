import { EllipsisOutlined } from '@ant-design/icons';
import type { DropDownProps, TreeDataNode, TreeProps } from 'antd';
import { Dropdown, Row, Tree } from 'antd';
import classNames from 'classnames';
import React, { useMemo, useRef } from 'react';
import ButtonExt from '../ButtonExt/ButtonExt';
import { usePrefixCls } from '../utils';
export interface TreeExtProps extends TreeProps {
  treeData: TreeDataNodeExt[];
  getNodeMore?: (tdn: TreeDataNode) => DropDownProps | void;
}
export type TreeDataNodeExt = TreeDataNode & {
  // more?: DropDownProps;
};

function dfs(t: TreeDataNode[], visitFn: (tdn: TreeDataNode) => void) {
  function _createTree(node: TreeDataNode) {
    const newNode = { ...node };
    visitFn(newNode);

    if (Array.isArray(node.children)) {
      newNode.children = node.children.map(child => _createTree(child));
    }
    return newNode;
  }

  const newt = t.map(node => _createTree(node));

  return newt;
}

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
    getNodeMore,
    ...restProps
  } = props;

  const _treeData = useMemo(() => {
    console.log(treeRef);
    // debugger
    if (!getNodeMore) {
      return treeData;
    }
    if (typeof getNodeMore !== 'function') {
      console.warn('[warn]: getNodeMore should be a function'); // TODO: 优化警告
      return treeData;
    }
    return dfs(treeData, tdn => {
      const nodeMore = getNodeMore(tdn);
      if (!nodeMore) return;
      const { menu, ...rest } = nodeMore;
      const morePorps = {
        ...rest,
        menu,
      };
      const ddProps = {
        getPopupContainer: () => treeRef.current,
        trigger: ['click'] as 'click'[],
        arrow: { pointAtCenter: true },
        ...morePorps,
      };
      tdn.title = (
        <Row justify={'space-between'} align="middle">
          {tdn.title}
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
      );
    });
  }, [treeData, prefixCls, getNodeMore]);

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
