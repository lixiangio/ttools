"use strict"

/**
 * or查询，提取同时满足所有条件的数据
 * @param {Array} data 待处理数据
 * @param {Object} options 查询条件，支持多个
 */
module.exports = function () {

   let { data } = this

   if (data instanceof Array) {

      let m = data.length;

      while (m) {
         let i = (Math.random() * m--) >>> 0;
         [data[m], data[i]] = [data[i], data[m]];
      }

   }

   return data

}