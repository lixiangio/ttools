"use strict"

let staticFunc = require('./lib/static')

let array = require('./lib/array/')

let object = require('./lib/object/')


/**
 * 入口函数
 * @param {*} data 待处理数据
 * @param {*} options 操作选项
 */
function Tools(data, options) {

   let methods

   if (data instanceof Array) {
      methods = new array(data)
   } else if (data instanceof Object) {
      methods = new object(data)
   } else {
      throw new Error('参数data必须为Array或Object类型')
   }

   // 选项表达式模式
   if (options) {
      // 遍历选项并执行选项名称对应的方法
      for (let name in options) {
         if (methods[name]) {
            methods[name](options[name])
         }
      }
      return methods.data
   }

   // 管道流模式
   else {
      return methods
   }

}

Object.assign(Tools, staticFunc)

// 将数组和对象的操作方法挂载到Tools函数上，方便直接访问
// Object.assign(Tools, array, object)

Tools.array = array

Tools.object = object

module.exports = Tools