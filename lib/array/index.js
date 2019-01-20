"use strict"

const array = {
   and: require('./and.js'),
   or: require('./or.js'),
   in: require('./in.js'),
   join: require('./join.js'),
   merge: require('./merge.js'),
   sort: require('./sort.js'),
   group: require('./group.js'),
   inline: require('./inline.js')
}


/**
 * 数组类型声明式选项
 * @param {*} options 
 */
module.exports = function (options) {

   if (Array.isArray(this.data)) {

      let data = this.data

      for (let name in options) {
         if (array[name]) {
            data = array[name](data, options[name])
         }
      }

      return data

   } else {

      return []

   }

}