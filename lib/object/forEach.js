"use strict"

/**
* 仅遍历对象，不改变数据源
* @param {Object} container 数据源
* @param {Function} func 遍历函数
*/
module.exports = function (data, func) {

   if (func instanceof Function) {

      for (let name in data) {
         func(name, data[name])
      }

   }

   return data

}