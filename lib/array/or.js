"use strict"

let filter = require('./_filter')

/**
 * or查询，提取同时满足所有条件的数据
 * @param {Array} data 待处理数据
 * @param {Object} options 查询条件，支持多个
 */
module.exports = function (data, options) {

   let result = []

   // 遍历选项
   for (const path in options) {

      let noMatch = []
      let value = options[path]

      let match = filter(data, path, function (val, item) {
         if (value === val) {
            return true
         } else {
            noMatch.push(item)
         }
      })

      result.push(...match)

      data = noMatch
      
   }

   return result

}