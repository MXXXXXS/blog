import fs from 'fs'
import path from 'path'

interface Index {
  articles: string[]
}

const collectionSrc = path.resolve(__dirname, '../../public/articles')
const files = fs.readdirSync(collectionSrc)
const markdownFiles = files.filter((file) => /.md$/.test(file))
const indexFile = path.resolve(collectionSrc, 'index.json')

const index: Index = {
  articles: []
}

index.articles = markdownFiles

console.log(index.articles)

fs.writeFileSync(indexFile, JSON.stringify(index, null, 2))