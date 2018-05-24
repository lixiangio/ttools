let T = require('..')


let outData = T.mixin({
   kk: [
      {
         oo: {
            dd: [{
               ss: 666,
            }]
         },
      }
   ],
   xx: 666,
   ss: {
      jj: 888
   },
   oo: {
      o1: 34,
      o2: 56
   }
}, {
      xx: 555,
      ss: {
         jj: [1, 23]
      },
      oo: null
   })

console.log(outData)