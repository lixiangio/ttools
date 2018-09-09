"use strict"

let object = require('./lib/object/')

let array = require('./lib/array/')

let get = require('./lib/get')

let set = require('./lib/set')

let query = require('./lib/query')

let clone = require('./lib/clone')

/**
 * 入口函数
 * @param {*} data 待处理数据
 */
function Tools(data) {

   return {
      data,
      array,
      object,
      get,
      set,
      query,
      clone
   }

}

module.exports = Tools