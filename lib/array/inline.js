"use strict"

/**
 * 内联合并两个数组
 * @param {Object} container 容器
 * @param {Object} options 配置选项
 * @param {Array}  options.data 内联数组
 * @param {Object}  options.condition 内联表达式，支持多个
 */
module.exports = function (container, { data, condition }) {

   for (const name in condition) {
      
      const relation = condition[name]

      for (let pKey in relation) {

         let sKey = relation[pKey]

         // 子集聚合、去重
         const group = {}
         for (const item of data) {
            const key = item[sKey]
            if (group[key]) {
               group[key].push(item)
            } else {
               group[key] = [item]
            }
         }

         // 内联合并
         let merge = []
         for (let item of container) {
            let key = item[pKey]
            if (group[key]) {
               item[name] = group[key]
               merge.push(item)
            }
         }

         container = merge

      }

   }

   return container

}