"use strict"


/**
 * path精确取值
 */
function get(data, pathArray) {

   for (let path of pathArray) {
      if (data[path]) {
         data = data[path]
      } else {
         return
      }
   }

   return data

}


/**
 * path模糊取值，惰性匹配子集
 * @param {Object|Array} data 数据源
 * @param {Array} pathArray 数据路径
 */
function getLazy(data, pathArray, func) {

   // path深度递进
   for (let index in pathArray) {

      let path = pathArray[index]
      let value = data[path]

      // 精确匹配
      if (value) {
         data = value
      }

      // 泛匹配
      else if (path === '*') {

         // 提取剩余path子集
         let subPathArray = pathArray.slice(Number(index) + 1)

         // 对象、数组结构
         if (data instanceof Object) {

            for (let key in data) {

               let item = data[key]
               let matchValue = getLazy(item, subPathArray, func)
               if (matchValue !== undefined) {
                  // 默认为惰性递归
                  // 当func返回值为true时表示惰性递归，否则递归匹配每个子集
                  if (func) {
                     if (func(matchValue)) {
                        return matchValue
                     }
                  } else {
                     return matchValue
                  }
               }

            }

         } else {
            return
         }

      }

      else {
         return value
      }

   }

   return data

}


module.exports = {
   get,
   getLazy
}