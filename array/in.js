"use strict"

let { pathToArray, pathGetValue } = require('../common.js');

/**
 * in相当于在and基础上提供了多值验证。以数组的方式定义多个匹配值，只要命中其中之一，即表示匹配。
 */
module.exports = function (data, options = {}) {

   let result = []

   let optionsArray = pathToArray(options)

   // 遍历数据列
   for (let item of data) {

      let isMatch = true

      // 遍历选项
      for (let option of optionsArray) {

         let { pathArray, value } = option

         let pathValue = pathGetValue(item, pathArray, function (item) {
            if (value.indexOf(item) > -1) {
               return item
            }
         })

         if (value.indexOf(pathValue) === -1) {
            isMatch = false
            break
         }

      }

      // 比对最终值
      if (isMatch) {
         result.push(item)
      }

   }

   return result

}