## 定义schema的方式

参考<https://blog.apollographql.com/three-ways-to-represent-your-graphql-schema-a41f4175100d>

- GraphQL Schema Definition Language
  写在一个.graphql或.gql文件里

  ```javascript
  const fs = require(`fs`)
  const { buildSchema } = require(`graphql`)
  
  const schema = buildSchema(fs.readFileSync(__dirname + `/api.graphqls`, `utf8`))
  ```

- 直接写成模板字符串

- 通过GraphQL的内省机制(introspection)获得

## 开发时调试接口

- GraphiQL, 一个queries和mutations的编写测试GUI工具
  有独立的electron应用, 也有很多框架有集成
  当使用Express框架时, 可以使用[express-graphql](<https://github.com/graphql/express-graphql>)
- Apollo.js, 带有一个queries和mutations的编写测试GUI工具[GraphQL Playground](https://www.apollographql.com/docs/apollo-server/features/graphql-playground/)

## 实现

- Apollo.js
  一个GraphQL解决方案

  具有一个后端实现, 一个多功能前端工具

  有独立的版本, 也有与各个框架的整合

- GraphQL code generator
  用于快速从schema生成相应的服务端代码大致结构, 方便省力

- GraphQL.js
  一个参考级的后端实现

