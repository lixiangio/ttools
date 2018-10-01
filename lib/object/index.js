"use strict"

const toString = Object.prototype.toString

const object = {
   mixin: require('./mixin.js'),
   forEach: require('./forEach.js')
}

/**
 * 对象类型声明式选项
 * @param {*} options 
 */
module.exports = function (options) {

   let data = this.data

   if (toString.call(data) === '[object Object]') {

      // 遍历选项并执行选项名称对应的方法
      for (let name in options) {
         if (object[name]) {
            data = object[name](data, options[name])
         }
      }

      return data

   } else {

      return {}

   }

}