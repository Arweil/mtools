## 1.0.1
1. 修改了 proxyConfig.onError 方法，兼容异常导致的服务重启

## 1.0.0
1. 修改了 proxyConfig 的配置信息，path 参数变更为 express 路由

## 0.2.0
1. 新增了middlewares的配置项用于自定义中间件配置

## 0.1.0
1. 新增了gzip的配置项，可以按照content-type剔除某些请求不进行gzip压缩
2. 新增了文件日志记录，默认100M，backup 10个文件

## 0.0.9
1. 优化了代理请求的日志打印格式

## 0.0.8
1. 新增了 log4js 对请求进行打印，用于记录请求进入时间以及地址

## 0.0.7
1. 锁定了包版本
