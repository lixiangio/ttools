"use strict"

let { getLazy } = require('../helper')

/**
 * 通过path取值
 * @param {Object|Array} data 数据源
 * @param {String} path 数据路径
 * @param {Function} func 匹配回调函数
 */
module.exports = function (data, path, func) {

   let pathArray = path.split('.')

   let container = []

   for (let item of data) {

      let value = getLazy(item, pathArray)

      if (func(value, item)) {

         container.push(item)
         
      }

   }

   return container

}