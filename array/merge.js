"use strict"

/**
 * 一维数组合并、去重
 */
module.exports = function (...data) {

   let result = {}

   for (let array of data) {
      for (let item of array) {
         result[item] = undefined
      }
   }

   return Object.keys(result)

}