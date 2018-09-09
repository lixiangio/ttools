"use strict"

let filter = require('./_filter')

/**
 * and查询，提取同时满足所有条件的数据
 * @param {Array} data 待处理数据
 * @param {Object} options 查询条件，支持多个
 */
module.exports = function (data, options) {

   // 遍历选项
   for (const path in options) {

      let values = options[path]

      data = filter(data, path, function (value) {
         if (values.indexOf(value) > -1) {
            return true
         }
      })

   }

   return data

}