"use strict"

let { get } = require('../static.js');

/**
 * 分组
 * 按照指定的键对数据进行分组，输出结果将保存为对象，脱离管道流
 */
module.exports = function (data, path) {
   
   let pathArray = path.split('.')
   for (let item of data) {
      let pathValue = get(item, pathArray)
      if (pathValue) {
         if (!this.data[pathValue]) {
            this.data[pathValue] = []
         }
         this.data[pathValue].push(item)
      }
   }

   return this

}