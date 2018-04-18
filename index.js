"use strict"

let arrayMethods = require('./array/')

let objectMethods = require('./object/')

/**
* array类
* @param {Array} data 导入数组
* @param {options} path 选项参数
*/
class array {
   constructor(data = []) {
      this.result = data
      for (const name in arrayMethods) {
         this[name] = function (options) {
            this.result = arrayMethods[name](this.result, options)
            return this
         }
      }
   }
   value() {
      return this.result;
   }
}


/**
* object类
* @param {Object} data 导入对象
* @param {options} path 选项参数
*/
class object {
   constructor(data = {}) {
      this.result = data
   }
   value() {
      return this.result;
   }
}

function tools(data, options) {

   let methods

   if (data instanceof Array) {
      methods = new array(data)
   } else if (data instanceof Object) {
      methods = new object(data)
   }

   // 对象模式
   if (options) {
      // 遍历选项并执行选项名称对应的方法
      for (let name in options) {
         if (methods[name]) {
            methods[name](options[name])
         }
      }
      return methods.data
   }
   // 管道模式
   else {
      return methods
   }

}

Object.assign(tools, arrayMethods, objectMethods)

module.exports = tools