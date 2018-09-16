"use strict"

const { get } = require('../helper.js');


/**
 * 按照指定的键对数据进行分组，输出结果为分组对象
 * @param {Array} data 待处理数据
 * @param {String} path 数据路径
 */
module.exports = function (data, path) {
   
   const result = {}
   const pathArray = path.split('.')

   for (let item of data) {

      let value = get(item, pathArray)

      if (value) {
         if (!result[value]) {
            result[value] = []
         }
         result[value].push(item)
      }

   }

   return result

}