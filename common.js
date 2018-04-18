"use strict"

/**
 * options预处理，将options对象转为数组类型，分解options中的path为数组
 * @param {Object} options 
 */
function pathToArray(options) {

   let optionsArray = []
   for (let path in options) {
      optionsArray.push({
         pathArray: path.split('.'),
         value: options[path],
      })
   }

   return optionsArray

}

/**
 * 通过path取值，递归获取path对应值
 * @param {Object|Array} data 递归数据
 * @param {Array} pathArray 数据路径
 * @param {Function} func 仅包含嵌套数组时使用，每个单项的回调函数。对于内嵌数组会出现多项匹配，未定义func时为惰性匹配，定义func时根据返回值动态控制循环匹配次数，当返回值为true时会停止遍历，否则为全量匹配
 */
function pathGetValue(data, pathArray = [], func) {

   if (data instanceof Object) {

      let iteration = data

      for (let i in pathArray) {
         // 精确匹配对象或数组时，使用循环迭代
         let key = pathArray[i]
         let item = iteration[key]
         if (item instanceof Object) {
            iteration = item
         }
         // 模糊匹配数组时停止迭代，将剩余子集转交给数组递归处理逻辑
         else if (key === '*' && iteration instanceof Array) {
            let subPathArray = pathArray.slice(Number(i) + 1)
            if (subPathArray.length) {

               // 循环获取可能匹配到多项
               for (let item of iteration) {

                  let pathValue
                  if (item instanceof Object) {
                     pathValue = pathGetValue(item, subPathArray, func)
                  } else {
                     pathValue = item
                  }

                  if (func) {
                     // func存在时由返回值决定是否继续遍历
                     if (func(pathValue)) {
                        return pathValue
                     }
                  } else if (pathValue !== undefined) {
                     // 值不为空时停止遍历
                     return pathValue
                  }

               }

            } else {
               return iteration
            }
            break
         }
         // 非对象时停止迭代并返回结果
         else {
            return item
         }
      }
   }

}


module.exports = {
   pathToArray,
   pathGetValue
}