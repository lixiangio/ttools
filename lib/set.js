"use strict"

const { get } = require('./helper.js');


/**
 * 通过path取值
 * @param {Object|Array} data 数据源
 * @param {String} path 数据路径
 */
module.exports = function (path, value) {

   if (!(this.data instanceof Object)) return

   const pathArray = path.split('.')

   // 精确匹配
   if (pathArray.indexOf('*') === -1) {

      return get(this.data, pathArray, value)

   }

   // 模糊递归匹配，返回值为数组
   else {

      getRecursive(this.data, pathArray, value)

   }

}


/**
 * get递归器
 * @param {Object|Array} data 数据源
 * @param {Array} pathArray 数据路径
 */
function getRecursive(data, pathArray, setValue) {

   // 向内深度递进
   for (const index in pathArray) {

      const path = pathArray[index]
      const value = data[path]

      // 精确匹配，迭代递进
      if (value) {

         data = value

      }

      // 泛匹配
      else if (path === '*') {

         // 停止迭代，将剩余路径转交给递归函数处理
         let subPathArray = pathArray.slice(Number(index) + 1)

         // 对象、数组结构
         if (data instanceof Object) {

            // 循环递归子集匹配多项
            for (let key in data) {

               let item = data[key]
               let subValue = getRecursive(item, subPathArray, setValue)
               if (subValue !== undefined) {
                  setValue
               }

            }

         } else {

            return

         }

      } else {

         return value

      }

   }

   return data

}