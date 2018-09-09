"use strict"

/**
 * 数组去重、合并
 */
module.exports = function (data, options) {

   let result = new Map()

   for (let item of data) {
      result.set(item, undefined)
   }

   for (let item of options) {
      result.set(item, undefined)
   }

   return [...result.keys()]

}