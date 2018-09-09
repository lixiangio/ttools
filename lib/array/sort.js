"use strict"

let get= require('../get.js');

/**
 * 多级排序
 * @param {*} array 
 * @param {*} options 
 */
function sort(array, options) {

   array.sort(function (a, b) {
      // 将多个sort条件叠加
      let difference
      for (let { type, path } of options) {
         let $a = a, $b = b
         // 迭代获取多层对象值
         for (let key of path) {
            if ($a instanceof Object) { $a = $a[key] }
            if ($b instanceof Object) { $b = $b[key] }
         }
         if (type === 'DESC') {
            difference = difference || $b - $a
         } else {
            difference = difference || $a - $b
         }
      }
      return difference
   })
   
}


/**
 * 排序
 */
module.exports = function (data, options = {}) {

   // 参数解析与分组，合并同一个数组的多个排序条件
   let pathObj = {}
   for (let path in options) {
      let type = options[path]
      // 补全不完整的path起始路径*.
      let pathArray = ('*.' + path).split('.')
      let pathId = pathArray.lastIndexOf('*') + 1
      let pathBefore = pathArray.slice(0, pathId)
      let pathAfter = pathArray.slice(pathId)
      let pathKey = pathBefore.join('.')
      if (pathObj[pathKey]) {
         pathObj[pathKey].sort.push({
            type: type,
            path: pathAfter,
         })
      } else {
         pathObj[pathKey] = {
            path: pathBefore,
            sort: [{
               type: type,
               path: pathAfter,
            }],
         }
      }
   }

   // 数据获取与排序
   for (let key in pathObj) {
      let item = pathObj[key]
      let array = get(data, item.path, function (array) {
         sort(array, item.sort)
      })
      sort(array, item.sort)
   }

   return data

}