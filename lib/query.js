"use strict"

let { getLazy } = require('./helper')

/**
 * 提取同时满足所有条件的数据集合
 * @param {Object} options 查询条件，支持多个
 * @param {Function} func 匹配回调函数
 */
module.exports = function (options) {

   let data = this.data

   // 数组结构
   if (Array.isArray(data)) {

      return array(data, options)

   }

   // 对象结构
   else if (data instanceof Object) {

      return object(data, options)

   } else {

      return

   }

}


/**
 * 根数组类型处理函数，使用and匹配
 * @param {*} data 
 * @param {*} options 
 */
function array(data, options) {

   for (let path in options) {

      let container = []
      let value = options[path]
      let pathArray = path.split('.')
      
      for (let item of data) {

         let matchValue = getLazy(item, pathArray)

         if (matchValue === value) {

            container.push(item)

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

      for (let key in data) {

         let item = data[key]

         let matchValue = getLazy(item, pathArray)

         if (matchValue === value) {

            container[key] = item

         }

      }

      data = container

   }

   return data

}