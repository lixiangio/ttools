"use strict"

let { pathGetValue } = require('../common.js');

/**
 * 分组
 * 按照指定的键对数据进行分组，输出结果将保存为对象，脱离管道流
 */
module.exports = function (data, path) {

   let result = {}
   let pathArray = path.split('.')
   for (let item of data) {
      let pathValue = pathGetValue(item, pathArray)
      if (pathValue) {
         if (!result[pathValue]) {
            result[pathValue] = []
         }
         result[pathValue].push(item)
      }
   }

   return result

}