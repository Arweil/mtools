import React from 'react';
import { Breadcrumb, PageHeader } from 'antd';
import { Link, RouteComponentProps, withRouter } from 'malganis/router';
import type { IBaseMenuInfo } from './AppLayout';

interface AppBreadcrumbProps extends RouteComponentProps {
  menu: IBaseMenuInfo[];
  specialPages?: string[];
}

const defaultSpecialPages = ['/403', '/404', '/500'];

/**
 * 创建面包屑导航
 * 菜单需满足格式:
 * [{
 *    url: '/demo',
 *    name: 'demo',
 *    children: [
 *      {
 *        url: '/demo/demoA', // url必须包含父级的url
 *        name: 'demoA'
 *      }, {
 *        url: '/demo/demoB',
 *        name: 'demoB'
 *       }
 *    ]
 * }]
 */
function AppBreadcrumb(
  props: AppBreadcrumbProps,
): JSX.Element | null {
  const { location, menu, specialPages = defaultSpecialPages } = props;
  const { pathname } = location;

  if (specialPages.includes(pathname)) {
    return null;
  }

  const breadcrumbNameMap: { [key: string]: string } = {};
  function forEachTree(trees: IBaseMenuInfo[]) {
    trees.forEach((tree) => {
      if (tree.url && tree.name) {
        breadcrumbNameMap[tree.url] = tree.name;
      }

      if (tree.children && tree.children.length > 0) {
        forEachTree(tree.children);
      }
    });
  }
  forEachTree(menu);

  const pathSnippets = pathname.split('/').filter((i) => i);
  const extraBreadcrumbItems = pathSnippets.map((_, index) => {
    const url = `/${pathSnippets.slice(0, index + 1).join('/')}`;
    return (
      <Breadcrumb.Item key={url}>
        {
          index === 0 ? breadcrumbNameMap[url] : (
            <Link to={url}>{breadcrumbNameMap[url]}</Link>
          )
        }
      </Breadcrumb.Item>
    );
  });

  return (
    <PageHeader
      ghost={false}
      style={{ marginBottom: 8 }}
      breadcrumb={(
        <Breadcrumb>
          {
            extraBreadcrumbItems.map((item) => item)
          }
        </Breadcrumb>
      )}
    />
  );
}

AppBreadcrumb.defaultProps = {
  specialPages: defaultSpecialPages,
};

export default withRouter(AppBreadcrumb);
