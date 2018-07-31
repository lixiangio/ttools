"use strict"

let { pathToArray, get } = require('../static.js');

/**
 * 提取同时满足所有条件的数据
 * @param {*} options and查询条件，支持多个
 */
module.exports = function (options) {

   let optionsArray = pathToArray(options)

   let data = []

   // 遍历数据列表
   for (let item of this.data) {

      let isMatchAll = true

      // 遍历选项
      for (let option of optionsArray) {

         let { pathArray, value } = option

         let pathValue = get(item, pathArray, function (item) {
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
         data.push(item)
      }

   }

   this.data = data

   return this

}