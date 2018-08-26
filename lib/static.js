"use strict"

let toString = Object.prototype.toString


/**
 * 将多个path路径对象转为数组结构
 * @param {Object} options 包含多个path字符串的对象
 */
function pathToArray(options) {

   let optionsArray = []
   for (let path in options) {
      optionsArray.push({
         pathArray: path.split('.'),
         value: options[path],
      })
   }

   return optionsArray

}


/**
 * get递归器
 * @param {Object|Array} data 数据源
 * @param {Array} pathArray 数据路径
 */
function getRecursive(data, pathArray) {

   let iteration = data

   // 向内深度递进，不保留路径
   for (let i in pathArray) {

      let key = pathArray[i]
      let item = iteration[key]

      if (item) {
         iteration = item
      }

      // 模糊匹配时停止迭代，将剩余子集转交给递归函数处理
      else if (key === '*') {

         let subPathArray = pathArray.slice(Number(i) + 1)

         // 数组结构
         if (iteration instanceof Array) {

            let subData = []

            // 循环递归子集匹配多项
            for (let item of iteration) {

               let subValue = getRecursive(item, subPathArray)
               if (subValue !== undefined) {
                  subData.push(item)
               }

            }

            if (subData.length) {

               return subData

            } else {

               return

            }

         }

         // 对象结构
         else if (iteration instanceof Object) {

            let subData = {}

            // 循环递归子集匹配多项
            for (let key in iteration) {

               let item = iteration[key]
               let subValue = getRecursive(item, subPathArray)
               if (subValue !== undefined) {
                  subData[key] = item
               }

            }

            if (Object.keys(subData).length) {
               return subData
            } else {
               return
            }


         } else {

            return

         }

      }

      // 原值返回（空值可包含0、null、false）
      else {

         return item

      }

   }

   return iteration

}


/**
 * 通过path取值，递归获取path对应值
 * @param {Object|Array} data 数据源
 * @param {String} path 数据路径
 */
function get(data, path) {

   let pathArray = path.split('.')

   return getRecursive(data, pathArray)

}


/**
 * 批量赋值
 * 搜索符合条件的path，如果值不存在时会创建新的key/value
 */
function set(data, options = {}) {

   let optionsArray = pathToArray(options)

   for (let item of data) {

      // 遍历选项
      for (let option of optionsArray) {

         let { pathArray, value } = option

         // 每循环一次更新current
         let current = item

         // 遍历pathArray
         for (let key in pathArray) {
            let name = pathArray[key]
            if (current[name]) {
               current = current[name]
            } else if (name === '*') {
               if (current instanceof Array) {
                  current = get(current, pathArray, key)
               }
               break
            } else {
               current = undefined
               break
            }
         }

      }

   }

   return data

}


/**
 * 克隆对象
 * @param {Object,Array} data 数据源
 */
function clone(data) {

   if (toString.call(data) === '[object Object]') {
      let obj = {};
      for (let key in data) {
         obj[key] = clone(data[key]);
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


module.exports = {
   pathToArray,
   get,
   set,
   clone,
   mixin
}