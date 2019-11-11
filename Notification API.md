## 分类

### 永久(persistent notifications)

- 只能在service worker中使用
- 通过[showNotification()](https://notifications.spec.whatwg.org/#dom-serviceworkerregistration-shownotification)创建
- 与[service worker registration](https://notifications.spec.whatwg.org/#service-worker-registration)关联
- 保存存在, 直到被移除, 从 [list of notifications](https://notifications.spec.whatwg.org/#list-of-notifications)

### 非永久(non-persistent notifications)

- UA不应该在"消息中心"显示非永久性通知
- 通过Notification构造函数创建
- 不与[service worker registration](https://notifications.spec.whatwg.org/#service-worker-registration)关联
- 几秒后会关闭, 执行[close steps](https://notifications.spec.whatwg.org/#close-steps)

## 替换已存在的通知

在用户一下子收到一堆通知时, 具有相同tag的所有通知会只显示最新的一个, 先前的会触发close事件关闭