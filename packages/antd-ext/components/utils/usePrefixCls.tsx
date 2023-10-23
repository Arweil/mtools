import { useContext, useMemo } from 'react';
import { ConfigProvider, theme } from 'antd';
import { mtPrefixCls } from './config';

/**
 * 获取 ant-design ConfigProvider 配置的 prefixCls，还有token
 * 以及 antd-ext 自带的 prefixCls
 * @export
 * @returns
 */
export default function usePrefixCls() {
  const { useToken } = theme;
  const { token } = useToken();
  const { getPrefixCls } = useContext(ConfigProvider.ConfigContext);
  const prefixCls = useMemo(() => getPrefixCls(), [getPrefixCls]);

  return {
    token,
    prefixCls,
    mtPrefixCls,
  };
}
