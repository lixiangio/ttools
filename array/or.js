"use strict"

let { pathToArray, pathGetValue } = require('../common.js');

/**
 * 提取仅满足一个或多个条件的数据
 */
module.exports = function (data, options = {}) {

   let optionsArray = pathToArray(options)

   let result = []

   // 判断optionsArray是否为空的目的是当options为空时依然可以原样返回数组
   if (optionsArray.length) {

      // 遍历数据列
      for (let item of data) {

         // 遍历选项
         for (let option of optionsArray) {

            let { pathArray, value } = option

            let pathValue = pathGetValue(item, pathArray, function (item) {
               if (item === value) {
                  return item
               }
            })

            if (pathValue === value) {
               result.push(item)
               break
            }

         }

      }

   } else {
      result = data
   }

   return result

}