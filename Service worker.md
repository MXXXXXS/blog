## 基本作用

作为一个代理架设在网页应用和服务器之间, 用于提升断网时的用户体验. 没有网时使用缓存的文件来提供页面显示, 有网时获取最新的信息. 在后台执行.

## 相关概念

作为一种worker, worker没有的`api`自然也没有, 比如`XHR`, `localStorage`

只能运行在`HTTPS`下, 为了安全(毕竟劫持了浏览器的请求, 功能很强大), 开发时`local host`下可以使用`HTTP`

通过`register()`注册一段脚本

一段脚本的作用域是其所在的目录及其子目录

## 生命周期

正在安装(install事件) =>

已安装或等待中(没有控制页面, 若另一个service worker在控制着应用, 则处于waiting状态) =>

激活中(触发activate事件) =>

已激活(控制着页面, 可以监听fetch) =>

废弃(安装失败或被新版本替换)

![生命周期(来自MDN)](https://mdn.mozillademos.org/files/12636/sw-lifecycle.png)