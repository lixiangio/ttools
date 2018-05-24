## Install

      npm install small-tools --save

## 使用说明

支持静态调用、函数链、对象声明三种使用方式，用法与lodash相似。

## 函数静态方法

### clone(data)

> 深度克隆一个对象

### mixin(data, data)

> 深度混合两个对象


## 数组工具链

> 函数链中可以使用所有的静态方法，与使用静态方法的唯一区别是函数链中不再需要传入data，只需要在实例化时传入一次即可。

> 函数链需要为每个链条创建实例，相比静态方法会产生额外的实例开销。

```js
let T = require('small-tools')

let data = [...]

let { result } = T(data).and(options).or(options)

// 或
let result = T(data).and(options).or(options).value()

```

### 对象声明式

```js
let T = require('small-tools')

let data = [...]

let result = T(data, options)
```

### 使用静态方法（适用于单步操作）

> 在某些场景下不需要创建实例来缓存状态，直接调用函数返回结果资源开销更低。

```js
let T = require('small-tools')

let data = [...]

let and = T.and(data, options)

let result = T.or(and, options)
```


## 选项或方法

> path中允许使用“*”号作为通配符，实现key模糊匹配。即匹配数组当前层级中的每个子项，同时也可以通过指定具体的key来精确匹配某个单项。

> 数据以管道流的方式依次传递，一个方法执行完后，会将处理结果转给下一个方法。

### and(data, options)

提取同时满足所有条件的数据

### or(data, options)

提取仅满足一个或多个条件的数据

### in(data, options)

in相当于在and基础上提供了多值验证。以数组的方式定义多个匹配值，只要命中其中之一，即表示匹配。

### group(data, path)

按照指定的键路径对数据进行分组，路径中不能包含*号。

需要注意的是分组后的数组将被转为对象结构，因此会脱离数组管道流（对于分组而言对象结构更利于后续处理）。

### join(data, options)

用于按条件合并两个数组，类似SQL语言中的join水平拼接，将两个数组通过公共键合并为一个数组。

### merge()

一维数组合并、去重

```js

let result = T.merge(options)
```

### set(data, options)

搜索符合条件的path，执行批量替换操作，如果值不存在时会创建新的key/value

### sort(data, options)

数组排序，支持多列排序和嵌套数组排序。多层嵌套数组排序不会改变父级顺序，只是对多个嵌套数组本身的排序

### limit(data, options)

限制返回处理结果数量

### 示例

```js
// 数据
let data = [
   { id: 11, b: "name" },
   { id: 88, b: "name" },
   { id: 23, b: "age" },
   { id: 342454, b: "age" },
   { id: 88, b: "test" },
   {
      id: 553,
      b: {
         xx: {
            jj: {
               ss: { vv: 888 }
            }
         },
         xxx: {
            jj: {
               ss: {
                  vv: 666,
                  vvv: 888,
               }
            }
         }
      }
   },
   {
      id: 553,
      b: [{
         kk: [{
            ss: [{
               ss: 666,
            }],
         }],
         jj: 888,
      }],
   },
   {
      id: 553,
      b: [{
         kk: [{
            ss: {
               dd: [{
                  ss: 666,
               }]
            },
         }],
      }],
   },
]


// 使用链式风格
let { data } = T(data)
   .filter({
      'id': 553,
      'b.*.kk.*.ss.dd.*.ss': 666,
   })
   .and({
      'id': 553,
      'b.*.kk.*.ss.dd.*.ss': 666,
   })
   .or({
      'id': 553,
      'b.*.kk.*.ss.dd.*.ss': 666,
   })
   .in({
      'id': [553, 8881],
      'b.*.kk.*.ss.dd.*.ss': [666, 2323],
   })
   .set({
      'jid': 8888,
      'hxs': 484848,
   })

console.log(data)


// 使用对象声明式
let data = T(data, {
   filter: {
      'id': 553,
      'b.*.kk.*.ss.dd.*.ss': 666,
   },
   and: {
      'id': 553,
      'b.*.kk.*.ss.dd.*.ss': 666,
   },
   or: {
      'id': 553,
      'b.*.kk.*.ss.dd.*.ss': 666,
   },
   in: {
      'id': [553, 8881],
      'b.*.kk.*.ss.dd.*.ss': [666, 2323],
   },
   join: {
      'data': [],
      'path': {
         'b.*.kk.*.ss.dd.*.ss': 'k.*.kk.*.ss.dd.*.ss',
      },
   },
   set: {
      'jid': 8888,
      'hxs': 484848,
   },
   sort: {
      'id': 'DESC',
      'cid': 'DESC',
      'b.*.xx': 'ASE',
      'b.*.kk.*.ss.dd.*.xx': 'ASE',
      'oo.o1': 'DESC'
   },
   limit: 12,
})

console.log(data)

// 使用静态方法
let and = T.and(data, {
   'id': 553,
   'b.*.kk.*.ss.dd.*.ss': 666,
})

let result = T.or(and, {
   'id': 553,
   'b.*.kk.*.ss.dd.*.ss': 666,
})
```


## 对象工具链

> 暂无
