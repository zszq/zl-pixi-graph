const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');

module.exports = env => {
  console.log('env---', env);

  return {
    mode: env.mode,
    entry: {
      pixiGraph: '/src/index.ts'
    },
    output: {
      filename: '[name].js',
      path: path.resolve(__dirname, 'dist'),
      clean: true,
      library: {
        name: 'pixiGraph',
        type: 'umd'
      }
    },

    devtool: env.mode === 'development' ? 'inline-source-map' : 'source-map',
    devServer: {
      host: '0.0.0.0',
      static: './dist'
    },

    plugins: [
      new HtmlWebpackPlugin({
        title: 'pixi-graph-demo'
      })
    ],

    resolve: {
      alias: { '@': path.resolve(__dirname, 'src') },
      extensions: ['.ts', '.js']
    },
    module: {
      rules: [
        {
          test: /\.ts?$/,
          use: 'ts-loader',
          exclude: /node_modules/
        },
        {
          test: /\.(png|svg|jpg|jpeg|gif)$/i,
          type: 'asset/resource'
        }
      ]
    }
  };
};
