import fs from 'fs'
import path from 'path'
import fse from 'fs-extra'
import config from './config.json'

// 源码 + public资源 => blog位置
const blogDir = config.blog //输出到的blog位置
const app = "dist/app" //打包的源码位置
const publicDir = "public" //public资源位置

// 笔记页, demo展示页

// 构建笔记索引
  interface Index {
    articles: string[]
  }
const index: Index = {
  articles: []
}
const articles = path.join(publicDir, "articles") //笔记位置
fse.copySync(config.notes, articles)
const files = fs.readdirSync(config.notes)
const markdownFiles = files.filter((file) => /.md$/.test(file))
index.articles = markdownFiles
const indexFile = path.resolve(articles, 'index.json')
fs.writeFileSync(indexFile, JSON.stringify(index, null, 2))
console.log('已对' + index.articles.length + '篇文章创建索引')

// 复制demo, 构建索引
const demo = path.join(publicDir, "demo") //展示的demo位置
const demoIndexFile = path.resolve(demo, 'index.json')
const demoIndex: Record<string, string> = {}
Object.entries(config.demo).forEach(([name, srcDemoPath]) => {
  const url = new URL(srcDemoPath)
  // 两种位置, 本地项目拷贝或http(s)的在线链接
  if (/https?:/.test(url.protocol)) {
    demoIndex[name] = srcDemoPath
  } else {
    // 复制demo
    const destDemoPath = path.join(demo, name)
    fse.copySync(srcDemoPath, destDemoPath)
    // 创建demo索引
    demoIndex[name] = './demo/' + name
  }
  console.log("已收集demo", name);
})
fs.writeFileSync(demoIndexFile, JSON.stringify(demoIndex, null, 2))

// 部署到blog位置
fse.copySync(publicDir, blogDir)
fse.copySync(app, blogDir)
console.log('已部署到', blogDir)