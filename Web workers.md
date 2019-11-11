## 作用域

### WorkerGlobalScope

作为任意worker的scope, 上面的属性可以直接使用(没有前缀)

为很多别的scope的基类

有一堆事件handler

- onerror
- onoffline
- ononline
- ...

### DedicatedWorkerGlobalScope

自带两个属性

- onmessage(用于处理来自主线程的消息)
- onmessageerror

自带两个方法

- close()
- postMessage()(用于向主线程发送消息)

继承自WorkerGlobalScope的方法

- dump()
- importScripts()(导入单个或多个脚本到当前的scope, 创建子worker)

实现了别处的一些方法

- atob(), btoa()
- setTimeout(), setTimeInterval(), clearTimeout(), clearTimeInterval()

### SharedWorkerGlobalScope



## Dedicated worker

单个标签页专用

## Shared worker

被多个iframes, 不同的window, workers共享

由于被多个脚本共享, 通信需要通过一个port对象(显式或隐式)

连接port可以显式调用start()或隐式得使用onmessage事件handler

如果没有onmessage, 而是通过addEventListener()来监听message事件, 需要调用start()

