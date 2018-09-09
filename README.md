### 特性

* 使用声明式风格，具有更好的容错性

* 相比lodash，对深层次、复杂的数据结构操作更加便捷、直观、高效

* 倾向于直接处理表层的数据需求，最大限度简化外部代码、减少碎片化代码

* path支持"*"号通配符泛匹配


### Install

```
npm install small-tools
```


### Path表达式

path表达式用于快速定义一个或一组数据的路径，允许使用“*”号作为通配符，匹配同一层级中的所有key。

通配符通常用于数组子集的模糊匹配，但也适用于对象结构。


### 通用类型

#### T(data).get(path)

通过path表达式取值，支持泛匹配

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

let result = T(data).get('b.*.kk.*.ss.dd.*.ss')
```

#### T(data).set(path, value)

通过path表达式赋值，支持泛匹配，如果值不存在时会创建新的key/value

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

let result = T(data).set('b.*.kk.*.ss.dd.*.ss', 888)
```

#### T(data).query(options)

通过path表达式取值，支持多条件匹配、值匹配

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

let result = T(data).query({
   'id': 666,
   'b.*.kk.*.ss.dd.*.ss': 666,
})
```


#### T(data).clone()

* data `Object, Array` 数据源

深度克隆一个对象


### 数组类型


#### T(data).array({ options })

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


let result = T(data).array({
   'and'：{
      'id': 553,
      'b.*.kk.*.ss.dd.*.ss': 666
   }
})
```

提取同时满足所有条件的数据

#### T(data).array({ or: options })

提取仅满足一个或多个条件的数据

#### T(data).array({ in: options })

in相当于在and基础上提供了多值验证。以数组的方式定义多个匹配值，只要命中其中之一，即表示匹配。

#### T(data).array({ group: path })

按照指定的键路径对数据进行分组，路径中不支持*号。

需要注意的是分组后的数组将被转为对象结构，因此会脱离数组管道流（对于分组而言对象结构更利于后续处理）。

#### T(data).array({ join: { data, options } })

用于按条件合并两个数组，类似SQL语言中的join水平拼接，将两个数组通过公共键合并为一个数组。

#### T(data).array({ inline: { data, relation, set } })

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

let result = T(master).array({
   'inline': {
      data: subset,
      relation: { 'id': 'mid' },
      set(parent, subset) {
         parent.sss = subset
         return parent
      }
   }
})
```

#### T(data).array({ sort: options })

数组排序，支持多列排序和嵌套数组排序。多层嵌套数组排序不会改变父级顺序，只是对多个嵌套数组本身的排序

#### T(data).array({ limit: count })

限制返回处理结果数量

### T(data).array({ destroy: options })

删除符合条件的值

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

let result = T(data).array({
   'destroy': {
      'id': null,
      'b.*.kk.*.ss.dd.*.ss': 666,
   }
})
```

#### 示例

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


let result = T(data).array({
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
```

### 对象类型

#### T(data).object({ mixin: data })

* data `*` 需要加入到容器的数据，允许任意数据类型

深度合并两个对象。对于内嵌数组类型是一个例外，因为数组key的动态特性，强制合并通常会产生无意义混乱的结果。目前的解决方案是遇到数组时按优先级覆盖整个数组。

```js
let data = {
   kk: [45,73, 22],
   oo: {
      o1: 8976,
      o2: 676878
   }
}

let mixin = {
   kk: [1, 2, 3],
   oo: {
      o3: 5656,
      o4: 111
   }
}

let result = T(data).object({ mixin })
```