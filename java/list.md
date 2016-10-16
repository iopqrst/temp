#

`ArrayList` 在尾部添加元素效率高于 `LinkList` , 在集合头部添加元素 `LinkList` 效率高于 `ArrayList` （普通数组在头部添加元素导致所有元素向后移位，而链表结构的`LinkList`结构却不同。）

> 操作100W条数据
```
ArrayList: delete tail takes (22) ms
ArrayList: delete first takes (138793) ms
ArrayList: delete middle takes (49667) ms

LinkedList: delete tail takes (19) ms
LinkedList: delete first takes (8) ms
LinkedList: delete middle takes (602751) ms

```

```

- 对象 (第一次执行)
------------LinkedList--------------
foreach耗时:7ms
Iterator耗时:8ms
for循环耗时:11605ms
------------LinkedList--------------
------------ArrayList--------------
foreach耗时:17ms
Iterator耗时:10ms
for循环耗时:6ms
------------ArrayList--------------

- 对象 (第2次执行)
------------LinkedList--------------
foreach耗时:18ms
Iterator耗时:7ms
for循环耗时:107906ms
------------LinkedList--------------
------------ArrayList--------------
foreach耗时:23ms
Iterator耗时:12ms
for循环耗时:9ms
------------ArrayList--------------

```

```
- String (第一次执行)
------------LinkedList--------------
foreach耗时:10ms
Iterator耗时:16ms
for循环耗时:11058ms
------------LinkedList--------------
------------ArrayList--------------
foreach耗时:15ms
Iterator耗时:9ms
for循环耗时:6ms
------------ArrayList--------------

- String (第2次执行)
------------LinkedList--------------
foreach耗时:8ms
Iterator耗时:9ms
for循环耗时:10950ms
------------LinkedList--------------
------------ArrayList--------------
foreach耗时:12ms
Iterator耗时:9ms
for循环耗时:4ms
------------ArrayList--------------
```

> 几次执行结果可以看出，LinkedList的for循环比较费时，ArrayList的3种方式相差无几。（10W条数据）