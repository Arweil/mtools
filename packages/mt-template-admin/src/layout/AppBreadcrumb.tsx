import React, { useContext } from 'react';
import { Breadcrumb, PageHeader } from 'antd';
import { Link, RouteComponentProps, withRouter } from 'malganis/router';
import { MobXProviderContext, observer } from 'malganis/mobx-react';
import { UserStore as UserStoreMobx } from '../stores/UserStore';

interface AppBreadcrumbProps extends RouteComponentProps {
  breadcrumbNameMap: { [path: string]: string };
  specialPages?: string[];
}

const defaultSpecialPages = ['/', '/403', '/404', '/500'];

/**
 * 创建面包屑导航
 */
function AppBreadcrumb(props: AppBreadcrumbProps): JSX.Element | null {
  const { location, breadcrumbNameMap, specialPages = defaultSpecialPages } = props;
  const { pathname } = location;

  if (specialPages.includes(pathname) || Object.keys(breadcrumbNameMap).length === 0) {
    return null;
  }

  const pathSnippets = pathname.split('/').filter(i => i);
  const extraBreadcrumbItems = pathSnippets.map((_, index) => {
    const url = `/${pathSnippets.slice(0, index + 1).join('/')}`;
    return (
      <Breadcrumb.Item key={url}>
        {index === 0 || index === pathSnippets.length - 1 ? (
          breadcrumbNameMap[url]
        ) : (
          <Link to={url}>{breadcrumbNameMap[url]}</Link>
        )}
      </Breadcrumb.Item>
    );
  });

  return (
    <PageHeader
      ghost={false}
      style={{ marginBottom: 8 }}
      breadcrumb={<Breadcrumb>{extraBreadcrumbItems.map(item => item)}</Breadcrumb>}
    />
  );
}

AppBreadcrumb.defaultProps = {
  specialPages: defaultSpecialPages,
};

export default withRouter(
  observer((props: RouteComponentProps) => {
    const { store } = useContext(MobXProviderContext);
    const { UserStore } = store as {
      UserStore: UserStoreMobx;
    };

    return (
      <AppBreadcrumb
        // eslint-disable-next-line react/jsx-props-no-spreading
        {...props}
        breadcrumbNameMap={UserStore.mapBreadcrumb}
      />
    );
  }),
);
