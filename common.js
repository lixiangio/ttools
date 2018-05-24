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


/**
 * 克隆对象
 * @param {*} data 数据源
 */
function clone(data) {
   if (data instanceof Object) {
      if (Array.isArray(data)) {
         let array = [];
         for (let item of data) {
            array.push(clone(item))
         }
         return array;
      } else {
         let obj = {};
         for (let key in data) {
            obj[key] = clone(data[key]);
         }
         return obj;
      }
   } else {
      return data
   }
}

/**
 * 递归合并对象
 * @param {*} container 数据容器 
 * @param {*} join 需要加入到容器的数据
 */
function mixin(container, join) {
   if (join instanceof Object) {
      // 属性遍历
      for (let name in join) {
         let item_join = join[name]
         let item_container = container[name]
         // 子集为对象类型，迭代合并子集
         if (item_join instanceof Object) {
            // 仅在A、B均为对象时需要合并
            if (item_container instanceof Object) {
               container[name] = mixin(item_container, item_join)
            } else {
               container[name] = item_join
            }
         }
         // 非对象类型，直接覆盖
         else {
            container[name] = item_join
         }
      }
   }
   return container
}

module.exports = {
   pathToArray,
   pathGetValue,
   clone,
   mixin
}