## 常见报错

- 选择元素, 元素可能为`null`
  - 使用`!`非空断言
  - 关闭`strictNullChecks`(不推荐)
  - 使用`if`包裹后续逻辑
- 类型`EventTarget`上不存在属性`value`
  - 需要指明`event`对象的类型
  - `(<HTMLInputElement>event.target).value`
  - `(event.target as HTMLInputElement).value`
- (TS7053)当用`string`索引一个对象的属性时
  - 需要定义对象`key`的类型
    `const myObj: {[index: string]:any} = {}`
- JSX 元素类型“Element[]”不是 JSX 元素的构造函数
  - 组件返回了一个数组, 而不是单个元素
  - 将数组用单个元素包裹, 或使用fragment

## 常见需求

- 在对象中声明属性类型
**Interface:**
  
  ```typescript
  interface myObj {
      property: string;
  }
  
  var obj: myObj = { property: "My string" }
  ```
  
  **Custom type:**
  
  ```typescript
  type myObjType = {
      property: string
  };
    
  var obj: myObjType = { property: "My string" };
  ```

  **Cast operator:**

  ```js
  var obj = {
      myString: <string> 'hi',
      myNumber: <number> 132,
  };
  ```

  **Object type literal:**

  ```js
  var obj: { property: string; } = { property: "Mystring" };
  ```

  <https://stackoverflow.com/questions/12787781/type-definition-in-object-literal-in-typescript>
  
- 函数参数解构, 声明类型的写法

  ```typescript
  {emitDate}: {emitDate: ((_: Date | null) => void)}
  ```

# 常见疑问

- 抽象类和接口的区别
  - 抽象类在运行时存在, 接口只在编译时存在
  - 抽象类可以包含具体的方法实现, 用于被继承实现.
    抽象类里的`实现细节`实现了某些功能, 而需要实现的`抽象方法`通过继承实现, 以**自定义**`实现细节`完成的功能.