## 常见问题

- `onChange`的行为变成了`onInput`, 即每次内容变化就会触发, 而不是等到`Enter`输入
- `React`对事件进行了包裹, 当使用`TS`时, 不同事件有相应的类型, 如`onBlur`对应`React.FocusEvent<HTMLInputElement>`. 参考https://zh-hans.reactjs.org/docs/events.html
- 在`React`里使用`TS`, 参考https://create-react-app.dev/docs/adding-typescript/
- 列表渲染时`key`不能在子组件内获得

## 技巧与Tips

### 组件通信

#### 父组件到单级子组件

- 传props

#### 父组件到深层子组件

- (不推荐)层层传props
- (推荐)context

#### 子组件到单级父组件

- 父组件向子组件传一个函数(prop), 子组件调用该函数, 回调函数的思想

#### 子组件到高层父组件

- (不推荐)父组件向子组件层层传一个函数(prop), 子组件调用该函数, 回调函数的思想
- (推荐)context

#### 单级父组件相同的组件间通信

- 共有状态提升至相同的单级父组件, 更改共有状态(子组件到单级父组件通信)

#### 单级父组件不同的组件间通信

- context

### 状态管理

#### 局部: 保存在组件中

- class组件使用`this.state`
- function组件使用`hooks`

#### 全局: 从组件中抽离出来统一管理

- 状态管理库, 如redux
- context

### 事件处理

`class`组件的事件`handler`推荐在`constructor`内`.bind(this)`, 或者使用箭头函数

```react
//方法一
constructor() {
    this.hanlder = this.handler.bind(this)
}
handler() {
    //Do something
}
<button onClick={this.handler}></button>
//方法二
handler = () => {
    //Do something
}
<button onClick={this.handler}></button>
```

