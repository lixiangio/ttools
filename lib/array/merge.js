"use strict"

/**
 * 一维数组合并、去重
 */
module.exports = function (...data) {

   for (let array of data) {
      if (array instanceof Array) {
         for (let item of array) {
            this.data[item] = undefined
         }
      }
   }

   this.data = Object.keys(result)


   return this

}