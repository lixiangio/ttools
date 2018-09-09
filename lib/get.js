"use strict"

const { get, getLazy } = require('./helper.js');


/**
 * 通过path取值
 * @param {Object|Array} data 数据源
 * @param {String} path 数据路径
 */
module.exports = function (path) {

   let pathArray = path.split('.')

   // 精确匹配
   if (pathArray.indexOf('*') === -1) {

      return get(this.data, pathArray)

   }

   // 模糊递归匹配，返回值为数组
   else {

      let container = []

      getLazy(this.data, pathArray, function (value) {
         container.push(value)
      })

      return container

   }

}