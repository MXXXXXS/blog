const process = require('process')
const path = require('path')
const fs = require('fs')

const NODE_ENV = process.env.NODE_ENV
const isProduction = NODE_ENV === 'production'
const mode = isProduction ? 'production' : 'development'

const public = path.resolve(__dirname, 'public')
const dist = path.resolve(__dirname, 'dist')

const entryArticles = path.resolve(__dirname, 'src/app/components/App.tsx')
const entryHome = path.resolve(__dirname, 'src/app/index.tsx')
const entryAnalyser = path.resolve(__dirname, 'src/analyser/analyser.ts')

const merge = require('webpack-merge')

//HTMLWebpackPlugin's options
const HTMLWebpackPlugin = require('html-webpack-plugin')
const htmlTemplate = path.resolve(public, 'index.html')
const favicon = path.resolve(public, 'favicon.ico')

// 清空目标目录
if (isProduction) {
  fs.rmdirSync(dist, {
    recursive: true
  })
  fs.mkdirSync(dist)
}

const base = {
  mode: mode,
  watch: !isProduction,
  devtool: isProduction ? undefined : 'source-map',
  devServer: {
    open: true,
    compress: true,
    contentBase: public,
    host: 'localhost',
    port: 8080,
    watchContentBase: true,
    after: function (app, server, compiler) {

    }
  },
  module: {
    rules: [
      {
        test: /\.(tsx?|css)$/,
        use: [{
          loader: 'babel-loader'
        }],
        exclude: /node_modules/,
      },
      {
        test: /\.css$/,
        use: [{
          loader: require('styled-jsx/webpack').loader,
          options: {
            type: (filename, options) => options.query.type || 'scoped' // https://github.com/zeit/styled-jsx#styles-in-regular-css-files
          }
        }]
      },
      {
        test: /\.html?$/,
        use: [{
          loader: 'html-loader',
          options: {
            minimize: isProduction
          }
        }]
      },
      {
        test: /\.svg$/,
        use: ['svg-inline-loader']
      }
    ]
  },
  resolve: {
    extensions: ['.tsx', '.ts', '.js']
  },
}

const configs = [{
  entry: {
    articles: entryArticles
  },
  output: {
    filename: '[name].js',
    path: path.resolve(dist, 'app'),
    publicPath: isProduction ? './' : '/'  //devserver需要"/", 而生产环境配成相对路径, 以方便挂载到域名路径下
  },
  plugins: [
    new HTMLWebpackPlugin({
      template: htmlTemplate,
      favicon: favicon,
      filename: 'articles.html'
    })
  ]
},
{
  entry: {
    home: entryHome
  },
  output: {
    filename: '[name].js',
    path: path.resolve(dist, 'app'),
    publicPath: isProduction ? './' : '/'  //devserver需要"/", 而生产环境配成相对路径, 以方便挂载到域名路径下
  },
  plugins: [
    new HTMLWebpackPlugin({
      template: htmlTemplate,
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
  entry: {
    analyser: entryAnalyser
  },
  output: {
    filename: '[name].js',
    path: path.resolve(dist, 'analyser'),
  },
  module: {
    rules: [{
      test: /\.tsx?$/,
      use: [{
        loader: 'babel-loader',
      }],
      exclude: /node_modules/,
    },]
  }
},
]

console.log('isProduction: ', isProduction)

module.exports = configs.map(config => merge.smart({}, base, config))