const path = require('path')
const HTMLWebpackPlugin = require('html-webpack-plugin')

const isProduction = typeof NODE_ENV !== 'undefined' && NODE_ENV === 'production'
const mode = isProduction ? 'production' : 'development'

const public = path.resolve(__dirname, 'public')
const entryArticles = path.resolve(__dirname, 'src/app/components/App.tsx')
const entryHome = path.resolve(__dirname, 'src/app/index.tsx')
const dist = path.resolve(__dirname, 'dist')

//HTMLWebpackPlugin's options
const articlesTemplate = path.resolve(public, 'articles.html')
const homeTemplate = path.resolve(public, 'index.html')
const favicon = path.resolve(public, 'favicon.ico')

//clean-webpack-plugin
// const { CleanWebpackPlugin } = require('clean-webpack-plugin')

const base = {
  mode: mode,
  output: {
    filename: '[name].js',
    path: dist,
    publicPath: '/'
  },
  devtool: 'source-map',
  devServer: {
    open: true,
    compress: true,
    contentBase: public,
    host: 'localhost',
    port: 8080,
    watchContentBase: true,
  },
  module: {
    rules: [
      {
        test: /\.tsx?$/,
        use: [{
          loader: 'babel-loader'
        }],
        exclude: /node_modules/,
      },
      {
        test: /\.css$/,
        use: ['style-loader', 'css-loader']
      },
      {
        test: /\.html?$/,
        use: [{
          loader: 'html-loader',
          options: { minimize: isProduction }
        }]
      }
    ]
  },
  resolve: {
    extensions: ['.tsx', '.ts', '.js']
  },
}

const configs = [
  {
    entry: { articles: entryArticles },
    plugins: [
      // new CleanWebpackPlugin(),
      new HTMLWebpackPlugin({
        template: articlesTemplate,
        favicon: favicon,
        filename: 'articles.html'
      })
    ]
  },
  {
    entry: { home: entryHome },
    plugins: [
      // new CleanWebpackPlugin(),
      new HTMLWebpackPlugin({
        template: homeTemplate,
        favicon: favicon,
        filename: 'index.html'
      })
    ]
  },
]

module.exports = configs.map(config => Object.assign({}, base, config))