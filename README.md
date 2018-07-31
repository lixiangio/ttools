## Install

```
npm install small-tools
```

### 特性

支持函数链、对象声明、静态调用三种使用方式，采用jquery api风格。

相比lodash接口更为简洁，对于深层次、复杂的数据结构操作更加便捷、直观、高效。

small-tools的API是为高级的应用场景而设计的，倾向于直接处理表层的数据需求，实现更好的简化代码、降低碎片化。small-tools的优点同样也是它的缺点，由于API的封装粒度偏大，因此不适合处理高度细化的问题。



#### 函数链

函数链模式下，数据以管道流的方式依次传递，一个函数执行完毕后，会将结果转给下一个处理函数。

<!-- 函数链中可以使用所有的静态方法，与使用静态方法的唯一区别是函数链中不再需要传入data，只需要在实例化时传入一次即可。

函数链需要为每个链条创建实例，相比静态方法会产生额外的实例开销。 -->

```js
let T = require('small-tools')

let data = [...]

let result = T(data).and(options).or(options).value()

// 或
let { result } = T(data).and(options).or(options)
```


#### 对象声明式

对象声明式支持所有函数链方法，使用对象表达式来描述函数链。

另外，对象声明式会直接导出结果，不再需要用value()取值。

```js
let T = require('small-tools')

let data = [...]

let result = T(data, {
   and: options,
   or: options
})
```



#### 静态方法

很多时候我们并不需要使用函数链，可以直接使用类型静态函数返回结果，这种方式资源开销更低。

```js
let T = require('small-tools')

let data = [...]

let and = T.and(data, options)

let or = T.or(and, options)

let result = T.limit(or, 10)
```


## 数组类型

### path表达式

path路径表达式中允许使用“*”号作为通配符，实现key模糊匹配。即匹配当前位置数组中的多个子项，同时也可以通过指定具体的key来精确匹配某个单项。

*号通常用于数组子集的模糊查询，但也适用于非数组结构的普通对象，实际上我们将数组视为没有固定key的特殊对象。


### T(data).and({options})

```js
let data = [
   { id: 11, b: "name" },
   { id: 553 },
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


let result = T(data).and({
   'id': 553,
   'b.*.kk.*.ss.dd.*.ss': 666,
})
```

提取同时满足所有条件的数据

### T(data).or(options)

提取仅满足一个或多个条件的数据

### T(data).in(options)

in相当于在and基础上提供了多值验证。以数组的方式定义多个匹配值，只要命中其中之一，即表示匹配。

### T(data).group(path)

按照指定的键路径对数据进行分组，路径中不支持*号。

需要注意的是分组后的数组将被转为对象结构，因此会脱离数组管道流（对于分组而言对象结构更利于后续处理）。

### T(data).join({data, options})

用于按条件合并两个数组，类似SQL语言中的join水平拼接，将两个数组通过公共键合并为一个数组。

### T(data).inline({ data, relation, set })

内联合并两个数组，通过公共键（主键和外键）将一个数组嵌入到另一个数组中。

* data `Array` 内联数组

* relation `Object` 关联表达式

* set `Function` 匹配项处理、赋值函数

```js
let master = [
   { id: 1, username: 'xinxin' },
   { id: 2, username: '小明' }
]

let subset = [
   { id: 1, mid: 1, product: 12 },
   { id: 2, mid: 1, product: 34 },
   { id: 3, mid: 2, product: 56 },
   { id: 4, mid: 1, product: 232 },
   { id: 5, mid: 1, product: 988 },
   { id: 6, mid: 2, product: 34343 }
]

let result = T(master).inline({
   data: subset,
   relation: { 'id': 'mid' },
   set(parent, subset) {
      parent.sss = subset
      return parent
   }
}).value()
```

### T(data).set(options)

搜索匹配path表达式的数据，执行批量赋值操作，如果值不存在时会创建新的key/value

```js
let data = [
   {
      id: 553,
      b: [{
         kk: [{
            ss: 888,
         }],
      }],
   },
]


let result = T(data).set({
   'id': 666,
   'b.*.kk.*.ss.dd.*.ss': 666,
})
```

### T(data).sort(options)

数组排序，支持多列排序和嵌套数组排序。多层嵌套数组排序不会改变父级顺序，只是对多个嵌套数组本身的排序

### T(data).limit({count})

限制返回处理结果数量

### 数组示例

```js
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


// 使用函数链式风格
let result = T(data)
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
   .value()


// 使用对象声明式风格
let result = T(data, {
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


// 使用静态方法
let and = T.and(data, {
   'id': 553,
   'b.*.kk.*.ss.dd.*.ss': 666,
})

let or = T.or(and, {
   'id': 553,
   'b.*.kk.*.ss.dd.*.ss': 666,
})

let result = T.set(or, {
   'id': 553,
   'b.*.kk.*.ss.dd.*.ss': 666,
})
```


## 对象类型

### T(data).set(path)

通过path表达式赋值，如果值不存在时会创建新的key/value

### T(data).get(path)

通过path表达式取值



## 静态函数

静态函数用于满足一些零碎的需求，不针对特定数据类型的实用工具函数。

### T.clone(data)

* data `Object, Array` 数据源

深度克隆一个对象。

### T.mixin(container, join)

* container `*` 混合容器，允许任意数据类型

* join `*` 需要加入到容器的数据，允许任意数据类型

深度合并两个对象。

对于数组类型是一个例外，因为数组key的动态特性，强制合并通常会产生无意义混乱的结果。目前的解决方案是遇到数组时按优先级覆盖整个数组。

### T.get(data, path)

* data `Object, Array` 数据源

* path `String` path表达式

取值

### T.set(data, path)

* data `Object, Array` 数据源

* path `String` path表达式

赋值