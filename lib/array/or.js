"use strict"

let { pathToArray, get } = require('../static.js');

/**
 * 提取仅满足一个或多个条件的数据
 */
module.exports = function (data, options = {}) {

   let optionsArray = pathToArray(options)

   // 判断optionsArray是否为空的目的是当options为空时依然可以原样返回数组
   if (optionsArray.length) {

      // 遍历数据列
      for (let item of data) {

         // 遍历选项
         for (let option of optionsArray) {

            let { pathArray, value } = option

            let pathValue = get(item, pathArray, function (item) {
               if (item === value) {
                  return item
               }
            })

            if (pathValue === value) {
               this.data.push(item)
               break
            }

         }

      }

   } else {
      this.data = data
   }

   return this

}