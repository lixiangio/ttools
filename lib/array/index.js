"use strict"

/**
* @param {Array} data 导入数组
* @param {options} path 选项参数
*/
class array {
   constructor(data = []) {
      this.data = data
   }
   value() {
      return this.data;
   }
}

array.prototype.and = require('./and.js');

array.prototype.or = require('./or.js');

array.prototype.in = require('./in.js');

array.prototype.join = require('./join.js');

array.prototype.merge = require('./merge.js');

array.prototype.sort = require('./sort.js');

array.prototype.group = require('./group.js');

array.prototype.inline = require('./inline.js');


module.exports = array