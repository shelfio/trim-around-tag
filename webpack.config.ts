import webpack from 'webpack';
import {resolve} from 'path';
import PacktrackerPlugin from '@packtracker/webpack-plugin';

const config: webpack.Configuration = {
  mode: 'production',
  entry: './src/index.ts',
  target: 'node',
  output: {
    libraryTarget: 'umd',
    umdNamedDefine: true,
    filename: 'index.js',
    path: resolve(__dirname, 'lib'),
    globalObject: `(typeof self !== 'undefined' ? self : this)`
  },
  optimization: {
    minimize: true
  },
  plugins: [
    new PacktrackerPlugin({
      project_token: process.env.PT_PROJECT_TOKEN,
      upload: process.env.CI === 'true',
      fail_build: true
    })
  ],
  module: {
    rules: [
      {
        test: /\.(ts|js)x?$/,
        use: {
          loader: 'babel-loader',
          options: {
            cacheDirectory: true
          }
        }
      }
    ]
  },
  resolve: {
    modules: ['node_modules'],
    extensions: ['.ts', '.tsx', '.js', '.json']
  }
};

export default config;
