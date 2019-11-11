## MongoDB存储三层的结构

*database* -> *collection* -> *document*

## Mongoose的使用

1. 定义`schema`, 用于描述`document`的结构, 各个字段的类型
2. 从`schema`创建`modal`, `modal`对应了一个`collection`. `modal`有一些方法用于检索`document`
3. 由`modal`创建`document`实例, 对应着数据库内的某个具体*document*, 实例具有一些方法与数据库交互

