## flex-basis

设置元素初始在`主轴方向`的大小

除非`flex-basis`的值为`auto`, 其相对于`width`属性有更高的优先级

默认为`content`的大小, 除非修改`box-sizing`属性

为`flex-grow`和`flex-shrink`依据的元素大小(如果为`auto`, 则参考元素本身的大小)

当设置为0(无视元素本身大小), 则`container`的所有空间都会被拿来分配, 即按比例分配`container`的空间

## flex-grow

设置元素如何分配剩余空间的

如: 两个元素一个的`flex-grow`值为3, 另一个为5, 如果有剩余空间, 则剩余空间将分为3: 5两部分, 分别对应两个元素扩展的量

## flex-shrink

设置元素如何缩小, 以适合父元素大小

如: 两个元素一个的`flex-shrink`值为3, 另一个为5, 如果两元素总大小超出了父元素的大小, 则超出空间将分为3: 5两部分, 分别对应两个元素缩小的量

## flex

`flex: 1`

为简写: `flex-grow: 1` / `flex-shrink: 1` / `flex-basis: 0`

`flex: auto`

为简写: `flex-grow: 1` / `flex-shrink: 1` / `flex-basis: auto`

## justify-content

设置`container`如何在主轴上分配元素排列

- flex-start, flex-end, center
- space-between, space-around
- stretch

## justify-self

设置元素本身如何在`inline-axis`上的位置

## justify-items

设置`container`内的所有`item`的默认`justify-self`值

## flex-wrap

设置`container`内元素换行行为

## flex-direction

设置`container`主轴方向

## flex-flow

为`flex-direction`和`flex-wrap`的简写

## order

元素默认递增, 按源码顺序排列

`order`改变元素排列