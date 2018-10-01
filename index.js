"use strict"

const object = require('./lib/object/')

const array = require('./lib/array/')

const get = require('./lib/get')

const set = require('./lib/set')

const query = require('./lib/query')

const clone = require('./lib/clone')

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