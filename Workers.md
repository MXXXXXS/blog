## web workers vs service worker

https://stackoverflow.com/questions/38632723/what-can-service-workers-do-that-web-workers-cannot

https://nolanlawson.github.io/cascadia-2016/#/35

从名字上看, 一个带"s"结尾, 意指多个, 另一个不带. web workers每个页面对应多个, 而service worker一个对应所有页面

web workers生命周期与标签页相同, service worker是独立的

web workers用于并行, service worker用于离线

## web workers

web workers提供了在后台线程运行脚本的方法

通过一个`constructor`创建, 运行一个js文件(运行在worker线程), 在独立的全局作用域

没有`window`对象, 没有`LocalStorage`

不能直接操作`dom`, 但有一堆api可以用, `XMLHttpRequest`, `WebSockets`, `IndexedDB`...

通过`postMessage()`和`Message`事件与主线程通信, 传输信息, 并不共用同一实例, [structured cloning](https://developer.mozilla.org/en-US/docs/Web/Guide/API/DOM/The_structured_clone_algorithm)

workers可以产生新的workers, 只要和父页面同源

`XMLHttpRequest`上的`responseXML`和`channel`属性都为`null`

## service worker

没有`window`对象, 没有`LocalStorage`, 没有`XMLHttpRequest`, 只有`Fetch API`