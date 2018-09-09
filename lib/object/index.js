"use strict"

const object = {
   mixin: require('./mixin.js')
}

/**
 * 对象类型声明式选项
 * @param {*} options 
 */
module.exports = function (options) {

   let data = this.data

   if (data.constructor === Object) {

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