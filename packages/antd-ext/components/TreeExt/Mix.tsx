import { Tree } from 'antd';
import React from 'react';
import type { Theme } from '../ConfigProviderExt/context';
import ThemeWrapper from '../theme/ThemeWrapper';
import useMapTheme from '../utils/useMapTheme';
import { customStyle as customStyleHermes } from './ThemeHermes';
import type { TreeExtProps } from './TreeExt';
import TreeExt from './TreeExt';

const { DirectoryTree, TreeNode } = Tree;
export interface TreeExtMixinProps extends TreeExtProps {
  theme?: Theme;
}

export default function Mixin(props: TreeExtMixinProps) {
  const { className, theme, ...restProps } = props;
  const { classes, themeConfig } = useMapTheme({
    className,
    theme,
    emotioncss: {
      hermes: customStyleHermes,
      zeus: customStyleHermes,
    },
  });
  return (
    <ThemeWrapper theme={themeConfig} type={['Tree', 'Dropdown']}>
      <TreeExt className={classes} {...restProps} />
    </ThemeWrapper>
  );
}

Mixin.DirectoryTree = DirectoryTree;
Mixin.TreeNode = TreeNode;
