"use strict"

let { pathToArray, pathGetValue } = require('../common.js');

/**
 * 提取同时满足所有条件的数据
 * @param {*} data 待处理数据
 * @param {*} options 选项
 */
module.exports = function (data, options = {}) {

   let optionsArray = pathToArray(options)

   let result = []

   // 遍历数据列表
   for (let item of data) {

      let isMatchAll = true

      // 遍历选项
      for (let option of optionsArray) {

         let { pathArray, value } = option

         let pathValue = pathGetValue(item, pathArray, function (item) {
            if (item === value) {
               return item
            }
         })

         // 只要有一项没有返回值即表示不符合条件，停止遍历
         if (pathValue !== value) {
            isMatchAll = false
            break
         }

      }

      if (isMatchAll) {
         result.push(item)
      }

   }

   return result

}