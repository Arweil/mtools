# @mtools

## Milk's Toolkit

## 使用流程

1. 启动文档服务，文档服务可以在编写用例的时候进行适当的测试

   ```bash
   $ npm run site
   ```

2. 构建

   ```bash
   $ npm run build
   ```

3. 提交（commit）需符合 eslint 规范以及 commit message 规范
4. 发布代码

   ```bash
   $ lerna publish

   $ lerna publish from-package

   $ lerna publish from-git
   ```

5. 发布文档

   ```bash
   $ npm run deploy:docs
   ```

6. 快速生成 antd-ext 组件模板
   ```bash
   $ npm run gcomp
   ```
