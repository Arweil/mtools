/** 路由配置类型 - 页面路由 */
export interface PageRouteConfig {
  /** 路由路径 */
  path: string;
  /** 页面组件路径 */
  component: () => Promise<any>;
  /** 页面级 store (可选) */
  models?: () => Promise<any>[];
  /** 是否启用 KeepAlive */
  keepAlive?: boolean;
  /** 是否精确匹配 */
  exact?: boolean;
}

/** 路由配置类型 - 重定向 */
export interface RedirectRouteConfig {
  /** 路由路径 */
  path: string;
  /** 是否精确匹配 */
  exact?: boolean;
  /** 重定向路径 */
  redirect: string;
}

/** 路由配置类型 - 错误页面 */
export interface ErrorRouteConfig {
  /** 路由路径 */
  path: string;
  /** 错误页面类型 */
  errorType: '404' | '403' | '500';
}

/** 路由配置联合类型 */
export type RouteConfig = PageRouteConfig | RedirectRouteConfig | ErrorRouteConfig;

/** 路由配置列表 */
const routeConfigs: RouteConfig[] = [
  // Demo 页面
  {
    path: '/Demo/DemoSingleStore',
    component: () => import('@/pages/demoStore'),
    models: () => [import('@/pages/demoStore/Store')],
    keepAlive: true,
  },
  {
    path: '/Demo/DemoMulStore',
    component: () => import('@/pages/demoMulStore'),
    models: () => [
      import('@/pages/demoMulStore/stores/DemoStoreA'),
      import('@/pages/demoMulStore/stores/DemoStoreB'),
    ],
    keepAlive: true,
  },
  {
    path: '/Demo/DemoNoStore',
    component: () => import('@/pages/demoNoStore'),
    keepAlive: true,
  },
  // 错误页面
  {
    path: '/403',
    errorType: '403',
  },
  {
    path: '/500',
    errorType: '500',
  },
  // 404 兜底路由
  {
    path: '/*',
    errorType: '404',
  },
];

export default routeConfigs;
