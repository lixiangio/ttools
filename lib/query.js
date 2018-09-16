"use strict"

const { getLazy } = require('./helper')

/**
 * 提取同时满足所有条件的数据集合
 * 使用and匹配，第一层单独处理
 * @param {Object} options 查询条件，支持多个
 * @param {Function} func 匹配回调函数
 */
module.exports = function (options, func) {

   let data = this.data

   // 数组结构
   if (Array.isArray(data)) {

      data = array(data, options)

      if (func && data) {
         data.forEach(func)
      }

      return data

   }

   // 对象结构
   else if (data instanceof Object) {

      data = object(data, options)

      if (func && data) {
         for (let key in data) {
            func(key, data[key])
         }
      }

      return data

   } else {

      return

   }

}


/**
 * 根数组类型处理函数
 * @param {*} data 
 * @param {*} options 
 */
function array(data, options) {

   for (let path in options) {

      let container = []
      let value = options[path]
      let pathArray = path.split('.')
      let [first, ...subPathArray] = pathArray
      let firstValue = data[first]

      if (firstValue) {

         let matchValue = getLazy(firstValue, subPathArray)

         if (matchValue === value) {
            container.push(firstValue)
         }

      } else if (first === '*') {

         for (let item of data) {

            let matchValue = getLazy(item, subPathArray)

            if (matchValue === value) {
               container.push(item)
            }

         }

      }

      data = container

   }

   return data

}


/**
 * 根对象类型处理函数，使用and匹配
 * @param {*} data 
 * @param {*} options 
 */
function object(data, options) {

   for (let path in options) {

      let container = {}
      let value = options[path]
      let pathArray = path.split('.')
      let [first, ...subPathArray] = pathArray
      let firstValue = data[first]

      if (firstValue) {

         let matchValue = getLazy(firstValue, subPathArray)

         if (matchValue === value) {
            container[first] = firstValue
         }

      } else if (first === '*') {

         for (let key in data) {

            let item = data[key]
   
            let matchValue = getLazy(item, subPathArray)
   
            if (matchValue === value) {
   
               container[key] = item
   
            }
   
         }

      }

      data = container

   }

   return data

}