"use strict"

let { pathToArray, pathGetValue } = require('../common.js');

/**
 * 批量赋值
 * 搜索符合条件的path，如果值不存在时会创建新的key/value
 */
module.exports = function (data, options = {}) {

   let optionsArray = pathToArray(options)

   for (let item of data) {

      // 遍历选项
      for (let option of optionsArray) {

         let { pathArray, value } = option

         // 每循环一次更新current
         let current = item

         // 遍历pathArray
         for (let key in pathArray) {
            let name = pathArray[key]
            if (current[name]) {
               current = current[name]
            } else if (name === '*') {
               if (current instanceof Array) {
                  current = pathGetValue(current, pathArray, key)
               }
               break
            } else {
               current = undefined
               break
            }
         }

      }

   }

   return data

}