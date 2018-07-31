"use strict"

/**
* 对象类
* @param {Object} data 导入对象
* @param {options} path 选项参数
*/
class object {
   constructor(data = {}) {
      this.data = data
   }
   value() {
      return this.data;
   }
}


module.exports = object