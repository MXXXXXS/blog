## 原型与类型系统(Schemas and Types)

参考<https://graphql.org/learn/schema/>

### 对象类型及其字段(Object types and fields)

```graphql
type Character {
  name: String!
  appearsIn: [Episode!]!
}
```

- `Character` is a *GraphQL Object Type*, meaning it's a type with some fields. Most of the types in your schema will be object types.
- `name` and `appearsIn` are *fields* on the `Character` type. That means that `name` and `appearsIn` are the only fields that can appear in any part of a GraphQL query that operates on the `Character` type.
- `String` is one of the built-in *scalar* types - these are types that resolve to a single scalar object, and can't have sub-selections in the query. We'll go over scalar types more later.
- `String!` means that the field is *non-nullable*, meaning that the GraphQL service promises to always give you a value when you query this field. In the type language, we'll represent those with an exclamation mark.
- `[Episode!]!` represents an *array* of `Episode` objects. Since it is also *non-nullable*, you can always expect an array (with zero or more items) when you query the `appearsIn` field. And since `Episode!` is also *non-nullable*, you can always expect every item of the array to be an `Episode` object.

### 特殊(The Query and Mutation types)

每个GraphQL service有一个`query`类型, 可有一个`mutation`类型, 定义了每一个GraphQL query的*entry point*

### 标量类型(Scalar types)

- `Int`: A signed 32‐bit integer.
- `Float`: A signed double-precision floating-point value.
- `String`: A UTF‐8 character sequence.
- `Boolean`: `true` or `false`.
- `ID`: The ID scalar type represents a unique identifier, often used to refetch an object or as the key for a cache. The ID type is serialized in the same way as a String; however, defining it as an `ID` signifies that it is not intended to be human‐readable.

### 字段参数(Arguments)

- 每个字段可以有0到多个参数
- 参数是无序的, 用一个名称(name)标识
- 参数可选, 可以设默认值, 使用"="

```graphql
type Starship {
  length(unit: LengthUnit = METER): Float
}
```

### 枚举类型(Enumeration types)

也称为*Enums*, 一种特殊的标量, 限定为几个特定的值之一

```graphql
enum Episode {
  NEWHOPE
  EMPIRE
  JEDI
}
```

这意味着当使用`Episode`类型时, 其值为`NEWHOPE`, `EMPIRE`, `JEDI`之一

### 列表与非空(Lists and Non-Null)

使用感叹号"!"标识

```graphql
type Character {
  name: String!
  appearsIn: [Episode]!
}
```

在列表(List)中使用非空标识

```graphql
myField: [String!]
```

`myField`本身可以为`null`, 也可为空(`[]`), 但元素不能为`null`

```js
myField: null // valid
myField: [] // valid
myField: ['a', 'b'] // valid
myField: ['a', null, 'b'] // error
```

而要使`list`本身不能为`null`

```graphql
myField: [String]!
```

```js
myField: null // error
myField: [] // valid
myField: ['a', 'b'] // valid
myField: ['a', null, 'b'] // valid
```

### 接口(Interfaces)

和很多类型系统一样, GraphQL也支持接口(interfaces)

```graphql
interface Character {
  id: ID!
  name: String!
  friends: [Character]
  appearsIn: [Episode]!
}
```

意味着任何实现了该接口的类型必须有以上列举的这些字段, 可以有额外字段

```graphql
type Human implements Character {
  id: ID!
  name: String!
  friends: [Character]
  appearsIn: [Episode]!
  starships: [Starship]
  totalCredits: Int
}
```

### 联合类型(Union types)

类似接口(interfaces), 但不具体指定字段

```graphql
union SearchResult = Human | Droid | Starship
```

当返回一个`SearchResult`时, 会获得`Human`, `Droid`, `Starship`三种类型之一

联合类型的成员必须为确定的对象类型(object type), 不能创建自接口或其他联合类型

### 输入类型(Input types)

用于传入一整个对象到mutation中, 而不仅仅是一个标量, 类似对象类型

```graphql
input ReviewInput {
  stars: Int!
  commentary: String
}
```

## 查询与变更(Queries and Mutations)

参考<https://graphql.org/learn/queries/>

### 字段(Fields)

GraphQL是用于查询对象相应字段的,  例如

```
{
  hero {
    name
  }
}
```

```
{
  "data": {
    "hero": {
      "name": "R2-D2"
    }
  }
}
```

结果和查询有着相同的形状, 可以按需获取

> 查询是交互式的, 意味着可以改变后获得新的结果

查询字段可以为对象(Objects), 并指定子选择范围(*sub-selection*)

查询可以包含注释

```
{
  hero {
    name
    # Queries can have comments!
    friends {
      name
    }
  }
}
```

```
{
  "data": {
    "hero": {
      "name": "R2-D2",
      "friends": [
        {
          "name": "Luke Skywalker"
        },
        {
          "name": "Han Solo"
        },
        {
          "name": "Leia Organa"
        }
      ]
    }
  }
}
```

### 参数(Arguments)

字段可以传参, 带来更强大的功能

查询更精准

```
{
  human(id: "1000") {
    name
    height(unit: FOOT)
  }
}
```

```
{
  "data": {
    "human": {
      "name": "Luke Skywalker",
      "height": 5.6430448
    }
  }
}
```

### 别名(Alias)

对同一个类型依据其字段内容进行分类, 赋予另一个名称, 使用":"

例如

```
{
  empireHero: hero(episode: EMPIRE) {
    name
  }
  jediHero: hero(episode: JEDI) {
    name
  }
}
```

```
{
  "data": {
    "empireHero": {
      "name": "Luke Skywalker"
    },
    "jediHero": {
      "name": "R2-D2"
    }
  }
}
```

查询的是`hero`类型, 但依据其字段`episode`内容不同(`EMPIRE`, `JEDI`), 分别命名为`empireHero`, `jediHero`

### 片段(Fragments)

复用相同字段内容

片段不能指向自身, 会导致一个循环, 爆栈

定义

```
fragment comparisonFields on Character {
  name
  appearsIn
  friends {
    name
  }
}
```

使用

```
{
  leftComparison: hero(episode: EMPIRE) {
    ...comparisonFields
  }
  rightComparison: hero(episode: JEDI) {
    ...comparisonFields
  }
}
```

结果

```
{
  "data": {
    "leftComparison": {
      "name": "Luke Skywalker",
      "appearsIn": [
        "NEWHOPE",
        "EMPIRE",
        "JEDI"
      ],
      "friends": [
        {
          "name": "Han Solo"
        },
        {
          "name": "Leia Organa"
        },
        {
          "name": "C-3PO"
        },
        {
          "name": "R2-D2"
        }
      ]
    },
    "rightComparison": {
      "name": "R2-D2",
      "appearsIn": [
        "NEWHOPE",
        "EMPIRE",
        "JEDI"
      ],
      "friends": [
        {
          "name": "Luke Skywalker"
        },
        {
          "name": "Han Solo"
        },
        {
          "name": "Leia Organa"
        }
      ]
    }
  }
}
```

#### 在片段中使用变量

```
query HeroComparison($first: Int = 3) {
  leftComparison: hero(episode: EMPIRE) {
    ...comparisonFields
  }
  rightComparison: hero(episode: JEDI) {
    ...comparisonFields
  }
}

fragment comparisonFields on Character {
  name
  friendsConnection(first: $first) {
    totalCount
    edges {
      node {
        name
      }
    }
  }
}
```

```
{
  "data": {
    "leftComparison": {
      "name": "Luke Skywalker",
      "friendsConnection": {
        "totalCount": 4,
        "edges": [
          {
            "node": {
              "name": "Han Solo"
            }
          },
          {
            "node": {
              "name": "Leia Organa"
            }
          },
          {
            "node": {
              "name": "C-3PO"
            }
          }
        ]
      }
    },
    "rightComparison": {
      "name": "R2-D2",
      "friendsConnection": {
        "totalCount": 3,
        "edges": [
          {
            "node": {
              "name": "Luke Skywalker"
            }
          },
          {
            "node": {
              "name": "Han Solo"
            }
          },
          {
            "node": {
              "name": "Leia Organa"
            }
          }
        ]
      }
    }
  }
}
```

### 变量(Variables)

例子

定义变量

```
query HeroNameAndFriends($episode: Episode) {
  hero(episode: $episode) {
    name
    friends {
      name
    }
  }
}
```

设置变量的值

```
{
  "episode": "JEDI"
}
```

结果

```
{
  "data": {
    "hero": {
      "name": "R2-D2",
      "friends": [
        {
          "name": "Luke Skywalker"
        },
        {
          "name": "Han Solo"
        },
        {
          "name": "Leia Organa"
        }
      ]
    }
  }
}
```

#### 变量定义

- 在`query`中类似`($episode: Episode)`的部分, 有着"$"前缀, 其类型为`Episode`
- 变量具有类型, 为`scalars`, `enums`, `input object types`之一
- 变量可选, 或必须(使用"!")

#### 变量默认值

使用"="

```
query HeroNameAndFriends($episode: Episode = JEDI) {
  hero(episode: $episode) {
    name
    friends {
      name
    }
  }
}
```

默认值为`JEDI`

#### 如何设置值

参考<https://medium.com/the-graphqlhub/graphql-tour-variables-58c6abd10f56>

GraphQL标准没有说明如何实现设置值的机制, GraphQL-JS生态使用了一个分离的JSON blob

```
{
 “username”: “kn0thing”
}
```

```
POST https://www.graphqlhub.com/graphql
{
  "query":"query ($username: String!){
    reddit {
      user(username: $username) {
        username
        commentKarma
        createdISO
      }
    }
  }",
  "variables":"{
    \"username\":\"kn0thing\"
  }"
}
```

### 操作名(Operation name)

只在有复数操作(multi-operation)的文档里需要, 有助于调试和服务端日志. 当有错误发生时, 通过名称定位到某个查询会更容易.

用于描述`query`, `mutation`,`subscription`三者之一

```
query HeroNameAndFriends {
  hero {
    name
    friends {
      name
    }
  }
}
```

```
{
  "data": {
    "hero": {
      "name": "R2-D2",
      "friends": [
        {
          "name": "Luke Skywalker"
        },
        {
          "name": "Han Solo"
        },
        {
          "name": "Leia Organa"
        }
      ]
    }
  }
}
```

### 指令(Directives)

标准目前定义了两条指令

- `@include(if: Boolean)` Only include this field in the result if the argument is `true`.
- `@skip(if: Boolean)` Skip this field if the argument is `true`.

例子

```
query Hero($episode: Episode, $withFriends: Boolean!) {
  hero(episode: $episode) {
    name
    friends @include(if: $withFriends) {
      name
    }
  }
}
```

设置

```
{
  "episode": "JEDI",
  "withFriends": true
}
```

结果

```
{
  "data": {
    "hero": {
      "name": "R2-D2",
      "friends": [
        {
          "name": "Luke Skywalker"
        },
        {
          "name": "Han Solo"
        },
        {
          "name": "Leia Organa"
        }
      ]
    }
  }
}
```

设置

```
{
  "episode": "JEDI",
  "withFriends": false
}
```

结果

```
{
  "data": {
    "hero": {
      "name": "R2-D2"
    }
  }
}
```

### 变更(Mutations)

用于改变服务端数据

```
mutation CreateReviewForEpisode($ep: Episode!, $review: ReviewInput!) {
  createReview(episode: $ep, review: $review) {
    stars
    commentary
  }
}
```

```
{
  "ep": "JEDI",
  "review": {
    "stars": 5,
    "commentary": "This is a great movie!"
  }
}
```

结果

```
{
  "data": {
    "createReview": {
      "stars": 5,
      "commentary": "This is a great movie!"
    }
  }
}
```

通过一次请求就可以变更并获得新的字段值

`review`变量不是一个标量, 是`input object type`

#### 变更中的复数字段(Multiple fields in mutations)

一个变更可以包含多个字段

查询和变更的一个重要区别是

**查询字段数并行执行的, 而变更是串行的**

### 行内片段(Inline Fragments)

当字段返回一个接口(interface)或联合类型(union type)时, 需要使用行内片段来获取数据

```
query HeroForEpisode($ep: Episode!) {
  hero(episode: $ep) {
    name
    ... on Droid {
      primaryFunction
    }
    ... on Human {
      height
    }
  }
}
```

```
{
  "ep": "JEDI"
}
```

```
{
  "data": {
    "hero": {
      "name": "R2-D2",
      "primaryFunction": "Astromech"
    }
  }
}
```

`hero`字段返回`Character`类型, 可能是一个`Human`或`Droid`, 取决于`episode`变量

为了匹配正确的类型, 使用了行内片段和类型判断

第一个片段有着`... on Droid`的标签, `primaryFunction`字段只会在当`hero`返回的`Charactor`是`Droid`类型时才执行

第二个片段同理

具名片段(named fragments)也可以这么使用, 具名片段总是有一个与之关联的类型

#### 元字段(Meta fields)

在不知道会返回什么类型的数据时, 可以使用`__typename`, 一个元字段, 来获得对象的类型

```
{
  search(text: "an") {
    __typename
    ... on Human {
      name
    }
    ... on Droid {
      name
    }
    ... on Starship {
      name
    }
  }
}
```

```
{
  "data": {
    "search": [
      {
        "__typename": "Human",
        "name": "Han Solo"
      },
      {
        "__typename": "Human",
        "name": "Leia Organa"
      },
      {
        "__typename": "Starship",
        "name": "TIE Advanced x1"
      }
    ]
  }
}
```

## 执行(Execution)

一个GraphQL在服务端被执行, 并返回一个JSON, 有着和查询类型的形状

### 根字段和解析器(Root fields & resolvers)



## 内省(Introspection)

用于获知GraphQL支持哪些查询

