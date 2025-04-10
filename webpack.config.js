const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');

module.exports = {
  mode: "development",
  entry: './src/index.js',
  output: {
    path: path.resolve(__dirname, 'dist'),
    filename: 'bundle.js',
  },
  module: {
    rules: [
      {
        test: /\.css$/i, // Tambahkan rule untuk file CSS
        use: ['style-loader', 'css-loader']
      }
    ]
  },
  plugins: [
    new HtmlWebpackPlugin({
      template: './src/index.html',
      filename: 'index.html',
    }),
    new HtmlWebpackPlugin({
      template: './src/dashboard.html',
      filename: 'dashboard.html',
    }),
    new HtmlWebpackPlugin({
      template: './src/customer.html',
      filename: 'customer.html',
    }),
    new HtmlWebpackPlugin({
      template: './src/register.html',
      filename: 'register.html',
    })
  ],
  devServer: {
    static: [
      {
        directory: path.join(__dirname, 'dist'),
      },
      {
        directory: path.join(__dirname, 'public'),
        publicPath: '/',
      }
    ],
    compress: true,
    port: 3000,
  }  
};
