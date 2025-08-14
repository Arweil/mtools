import type { Configuration as WebpackConfiguration } from 'webpack';
import type { Configuration as WebpackDevServerConfiguration } from 'webpack-dev-server';

export interface JaraxxusConfig {
  entry: string;
  publicPath: string;
  assetsDir: string;
  outputDir: string;
  srcDir: string;
  eslintConfigFile?: string;
  indexPath: string;
  favicon?: string;
  productionSourceMap?: boolean;
  configureWebpack?: Partial<WebpackConfiguration>;
  bundleAnalyzerReport?: boolean;
  babelExtends?: string;
  babelInclude?: string[];
  devServer?: WebpackDevServerConfiguration;
  css: {
    extract?: boolean;
    cssModules?: boolean;
    lessModifyVars?: Record<string, any>;
    localIdentName?: string;
    styleLoaderOptions?: string | Record<string, any>;
  };
}

export interface CssLoaderOptions {
  importLoaders: number;
  modules?:
    | boolean
    | {
        mode: 'icss' | 'local' | 'global';
        localIdentName?: string;
      };
  sourceMap?: boolean;
}
