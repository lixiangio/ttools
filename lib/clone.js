"use strict"

const toString = Object.prototype.toString

/**
 * clone递归器
 * @param {*} data 
 */
function clone(data) {

   if (toString.call(data) === '[object Object]') {
      const obj = Object.create(data)
      for (const name in obj) {
         obj[name] = clone(obj[name])
      }
      return obj;
   } else if (Array.isArray(data)) {
      const array = [];
      for (const item of data) {
         array.push(clone(item))
      }
      return array;
   } else {
      return data;
   }

}


/**
 * 克隆对象
 * @param {Object,Array} data 数据源
 */
module.exports = function () {

   return clone(this.data)

}