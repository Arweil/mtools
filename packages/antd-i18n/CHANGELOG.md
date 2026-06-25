# @m-tools/antd-i18n

## 0.1.0

### Minor Changes

- ### Breaking

  - 主入口 `@m-tools/antd-i18n` 不再导出 `ConfigProviderExtWithI18n`。使用 `@m-tools/antd-ext` 的项目请改用子路径入口：

    ```diff
    - import { ConfigProviderExtWithI18n } from '@m-tools/antd-i18n';
    + import { ConfigProviderExtWithI18n } from '@m-tools/antd-i18n/ext';
    ```

  - 主入口现仅依赖 `antd >= 5`，`@m-tools/antd-ext` 改为**可选依赖**（仅在使用 `/ext` 入口时需要安装）。

  ### Fixes

  - 修复 `ConfigProviderWithI18n.config` 的对外类型被错误收窄为 `ThemeConfig` 的问题：现完整保留 antd 原生 `GlobalConfigProps` 字段（`prefixCls` / `iconPrefixCls` / `theme` / `holderRender`），`config({ prefixCls })`、`config({ theme })` 等合法调用不再被误报。
  - 兼容 React 19 / `@types/react@19`：组件返回类型由全局 `JSX.Element` 改为 `React.ReactElement`，消除 `Cannot find namespace 'JSX'`（TS2503）类型错误。
  - 兼容 `moduleResolution: "node"`（classic）消费者：新增 `typesVersions` 映射，使 `@m-tools/antd-i18n/ext` 子路径在 classic TS 解析下也能正确解析类型（无需消费侧升级 `moduleResolution`）。
