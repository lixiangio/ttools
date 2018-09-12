"use strict"

let toString = Object.prototype.toString


/**
 * clone递归器
 * @param {*} data 
 */
function clone(data) {

   if (toString.call(data) === '[object Object]') {
      let obj = Object.create(data)
      for (let key in obj) {
         obj[key] = clone(obj[key])
      }
      return obj;
   } else if (Array.isArray(data)) {
      let array = [];
      for (let item of data) {
         array.push(clone(item))
      }
      return array;
   } else {
      return data
   }

}


/**
 * 克隆对象
 * @param {Object,Array} data 数据源
 */
module.exports = function () {

   return clone(this.data)

}