const path = require('path');
const webpack = require("webpack");
const TerserPlugin = require("terser-webpack-plugin");
const HtmlWebpackPlugin = require('html-webpack-plugin');

module.exports = {
  entry: __dirname + '/client/index.tsx',
  output: {
    path: __dirname + '/dist',
    filename: '[name].js',
  },
  mode: 'development',
  resolve: {
    extensions: ['.tsx', '.ts', '.js', '.css'],
  },

  devtool: 'source-map',
  optimization: {
    minimize: true,
    minimizer: [
      new TerserPlugin({
        include: /\.min\.js$/,
      }),
    ],
  },
  module: {
    rules: [
      // all files with a `.ts` or `.tsx` extension will be handled by `ts-loader`
      { test: /\.tsx?$/, loader: "ts-loader" },
      {
        test: /\.css$/i,
        use: ["style-loader", "css-loader"],
      },
    ]
  },
  plugins: [new HtmlWebpackPlugin({   
    title: 'Production',
    template: './public/index.html'
  })],
  devServer: {
    static: {
      directory: path.resolve(__dirname, 'dist'),
    },
    port: 8000,
    open: true,
    hot: true,
    compress: true,
    historyApiFallback: true,
  },
}