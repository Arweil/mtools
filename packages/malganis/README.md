# malganis
此包旨在能够快速的建立一个React框架的应用，而不用去担心状态管理以及路由的引用。

此包目前使用 react-router v5 版本作为路由管理，使用 mobx v6 作为状态管理。

## 设计思想
作为常规的SPA应用，路由管理和状态管理基本上是每个项目都需要的。创建一个新的应用时，开发需要每次思考如何引用路由，如何进行状态管理。

为什么使用mobx：
1. mobx 和 redux 相比模板语法较少，对于小团队开发能够降低开发成本。
2. mobx 学习成本低。相比 redux，就单说 redux 的异步 action 处理：
  * redux-thunk：重复代码和模板代码过多
  * redux-saga：完全一套异步处理的语法，学习成本较高
  * redux-observable：需要结合rxjs，异步处理场景丰富，但是学习rxjs的思想成本更高
  * ...
3. mobx 使用响应式处理，会进行依赖收集，能够在属性变更后实时触发页面渲染，减少的人为操作。

> 对于简单的应用，也许状态管理都不需要，我们甚至可以不用 mobx 进行状态管理。

此框架把应用中的状态分成了两类：
1. 全局状态，比如：登录人信息，全局的菜单状态等等
2. 页面状态，比如：根据ID查询到详细信息，详细信息中的某个属性可能在多个组件都需要使用。但是他的生命周期就在当前页面中，切换页面即销毁。

所以我们使用 <code>app.model()</code> 时注册的是全局状态，而在路由中（dynamic）引用的 model 是页面状态。

我们在创建状态时一般是以类的形式创建：
```ts
// @/stores/UserStore

class UserStore {
  namespace = 'UserStore';

  // mobx 语法
}
```

> 每一个Store状态类都需要namespace，<code>app.unmodel()</code> 用来根据namespace销毁全局状态，而页面状态在切换页面是，也要根据namespace去筛选当前页面注册的状态去进行销毁

我们在使用注册的状态时
```tsx | pure
import React, { useContext } from 'react';
import { MobXProviderContext, observer } from 'malganis/mobx-react';
import { UserStore as UserStoreMbx } from '@/stores/UserStore';

// observer 为 react-mobx 语法
observer(function ComponentName() {
  // 获取全局 以及 当前页面的 Store
  const { store } = useContext(MobXProviderContext);

  // 取需要的Store
  const { UserStore } = store as { UserStore: UserStoreMbx };

  // 从Store中取属性
  const { name } = UserStore;

  return (
    <div>{name}</div>
  )
})
```


## Usage

### 安装包
```bash
```

### 创建应用实例

创建实例，进行全局的配置
* historyOptions：在history的基础上拓展了type属性，用来定义路由方式，主要的两种方式为：'browser' | 'hash'
* fetchingComp：定义全局文件加载中的展示内容

```ts
// App.tsx

import malganis from 'malganis';

const app = malganis({
  historyOptions: {
    type: 'browser',
  },
  fetchingComp: LoadingComponent,
});
```

### 注册路由与页面状态
dynamic 实现了路由页面的按需加载，以及状态的按需加载。

* app 为固定参数
* component：用来引入组件，import 语法实现了页面的按需加载（基于webpack）。
* models：用来引入状态管理，models 可以传入多个状态文件，他们都是按需加载的。
* fetchingComp：在加载文件时页面展示的内容。

```tsx | pure
// App.tsx

import {
  Router,
  Route,
} from 'malganis/router';
import dynamic from 'malganis/dynamic';
import type { History, IMalGanisApp } from 'malganis/lib/type';

app.router((app: IMalGanisApp, history: History) => {
  return (
    <Router history={history}>
      <Route
        path="/Your/Path"
        component={dynamic({
          app,
          component: () => import('@/pages/Your/PageComponent'),
          models: () => [
            import('@/pages/Your/Model'),
          ],
          fetchingComp: ('custom fetching loading...'),
        })}
      />
    </Router>
  )
});
```

### 设置全局状态
把状态类的实例注入到全局，并不会在页面拆卸时移除此API注入的实例。

```ts
// App.tsx

class UserStore {
  namespace = 'UserStore';
}

const instance = new UserStore();

app.model(instance)
```

### 卸载状态
根据状态类的命名空间移除状态

```ts
app.unmodule(namespace)
```

### 创建根节点元素到HTML节点中

```ts
// App.tsx

app.start()
```
