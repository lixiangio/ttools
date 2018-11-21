"use strict"

/**
 * 内联合并两个数组
 * @param {Object} container 容器
 * @param {Object} options 配置选项
 * @param {Array}  options.from 内联数组
 * @param {Object}  options.join 内联表达式，支持多个
 */
module.exports = function (container, options) {

   if (options instanceof Function) {
      const set = {}
      options({
         from(value) {
            set.from = value
            return this
         },
         join(value) {
            set.join = value
            return this
         }
      })
      options = set
   }

   let { from, join } = options

   for (const name in join) {

      const relation = join[name]

      for (const pKey in relation) {

         const sKey = relation[pKey]

         // 子集聚合、去重
         const group = {}
         for (const item of from) {
            const key = item[sKey]
            if (group[key]) {
               group[key].push(item)
            } else {
               group[key] = [item]
            }
         }

         // 内联合并
         const merge = []
         for (const item of container) {
            const key = item[pKey]
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