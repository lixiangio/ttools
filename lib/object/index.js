"use strict"

class object {
   /**
   * @param {options} path 选项参数
   */
   constructor(data = {}) {
      this.data = data
   }
   value() {
      return this.data;
   }
   exclude() {

   }
}


object.prototype.mixin = require('./mixin.js');


module.exports = object