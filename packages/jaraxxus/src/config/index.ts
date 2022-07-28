import fs from 'fs';
import defaultConfig, { JaraxxusConfig } from './defaultConfig';
import { resolveApp, isString, isArray } from '../utils';
import _ from 'lodash';

// 获取配置信息
const configPath = resolveApp('jaraxxus.config.js');
const customConfig: JaraxxusConfig = fs.existsSync(configPath) ? require(configPath) : {};

const config: JaraxxusConfig = _.merge(defaultConfig, customConfig);

export type FormattedConfig = Omit<JaraxxusConfig, "srcDir"> & {
  srcDir: string[];
}

const formattedConfig: FormattedConfig = {
  ...config,
  srcDir: (() => {
    const srcDir = config.srcDir;

    if (isString(srcDir)) {
      return [resolveApp(srcDir)];
    } else if (isArray<string>(srcDir)) {
      return srcDir.map((src) => {
        return resolveApp(src);
      });
    } else {
      return [];
    }
  })(),
};

export default formattedConfig;
