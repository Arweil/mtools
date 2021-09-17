// 应用路由
// import React, { Suspense } from 'react';



// function getModule(module: any) {
//   // eslint-disable-next-line no-underscore-dangle
//   return module.__esModule ? (() => {
//     return Object.keys(module).map((item) => {
//       return module[item];
//     });
//   })() : [];
// }

// 异步加载store，缓存并注入到Provider中
// function renderPageWithStore(loaded: any) {
//   const { Page: ModulePage, ...stores } = loaded;

//   const Page = getModule(ModulePage)[0];

//   // 缓存前，先清空之前的store;
//   Object.keys(store.pageStores).forEach((item) => {
//     delete store.pageStores[item];
//   });

//   Object.keys(stores).forEach((ModuleStore) => {
//     const pageStoreList = getModule(stores[ModuleStore]);

//     pageStoreList.forEach((pageStore) => {
//       // 过滤，如果对象没有namespace，那么不加载它
//       if (!pageStore.namespace) {
//         // console.warn(`${pageStore.constructor.name} need a namespace`);
//         return;
//       }
//       store.pageStores[pageStore.namespace] = pageStore;
//     });
//   });

//   return <Page />;
// }

// export const Error500 = LoadPage({
//   pageUrl: '@/errorPages/Error'
// });

// export const Forbidden = Loadable({
//   loader: () => import('@/errorPages/Forbidden'),
//   loading: LoadingComponent,
// });

// export const NotFoundPage = Loadable({
//   loader: () => import('@/errorPages/NotFoundPage'),
//   loading: LoadingComponent,
// });
