"use strict"

/**
 * 内联合并两个数组
 * @param {Object} container 容器
 * @param {Object} options 配置选项
 * @param {Array}  options.data 内联数组
 * @param {Object}  options.relation 关联key，支持多个
 * @param {String}  options.set 使用字符串声明内联数据的保存路径
 * @param {Function}  options.set(parent, subset) 使用函数处理每个匹配项，并返回处理结果
 */
module.exports = function (container, { data, relation, set }) {

   for (let pKey in relation) {

      let sKey = relation[pKey]

      // 子集聚合、去重
      let group = {}
      for (let item of data) {
         let key = item[sKey]
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
            if (set instanceof Function) {
               item = set(item, group[key])
            } else {
               item[set] = group[key]
            }
            merge.push(item)
         }
      }

      container = merge

   }

   return container

}