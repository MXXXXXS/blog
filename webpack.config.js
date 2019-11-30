const path = require('path')
const HTMLWebpackPlugin = require('html-webpack-plugin')

const isProduction = typeof NODE_ENV !== 'undefined' && NODE_ENV === 'production'
const mode = isProduction ? 'production' : 'development'

const public = path.resolve(__dirname, 'public')
const dist = path.resolve(__dirname, 'dist')

const entryArticles = path.resolve(__dirname, 'src/app/components/App.tsx')
const entryHome = path.resolve(__dirname, 'src/app/index.tsx')
const entryAnalyser = path.resolve(__dirname, 'src/analyser/analyser.ts')

//HTMLWebpackPlugin's options
const articlesTemplate = path.resolve(public, 'articles.html')
const homeTemplate = path.resolve(public, 'index.html')
const favicon = path.resolve(public, 'favicon.ico')

//clean-webpack-plugin
const { CleanWebpackPlugin } = require('clean-webpack-plugin')

const base = {
  mode: mode,
  watch: true,
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
    output: {
      filename: '[name].js',
      path: path.resolve(dist, 'app'),
      publicPath: '/'
    },
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
    output: {
      filename: '[name].js',
      path: path.resolve(dist, 'app'),
      publicPath: '/'
    },
    plugins: [
      // new CleanWebpackPlugin(),
      new HTMLWebpackPlugin({
        template: homeTemplate,
        favicon: favicon,
        filename: 'index.html'
      })
    ]
  },
  {
    target: 'node',
    node: {
      __dirname: false,
      __filename: false,
    },
    entry: { analyser: entryAnalyser },
    output: {
      filename: '[name].js',
      path: path.resolve(dist, 'analyser'),
    },
    plugins: [
      new CleanWebpackPlugin(),
    ],
    module: {
      rules: [
        {
          test: /\.tsx?$/,
          use: [{
            loader: 'babel-loader',
          }],
          exclude: /node_modules/,
        },
      ]
    }
  },
]

module.exports = configs.map(config => Object.assign({}, base, config))