"use strict"

let toString = Object.prototype.toString

/**
* 递归合并对象
* @param {Object} container 数据容器 
* @param {Object} join 需要加入到容器的数据
*/
module.exports = function (data, join) {

   // 只有同时为对象结构时才允许融合
   if (toString.call(join) === '[object Object]') {
      if (toString.call(data) === '[object Object]') {
         for (let name in join) {
            data[name] = mixin(data[name], join[name])
         }
         return data
      } else {
         return join
      }
   } else {
      return join
   }

}