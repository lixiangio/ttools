const test = require('jtf')
const T = require('../..')

test('forEach', t => {

   let data = {
      kk: [
         {
            oo: 122,
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
   }

   let result = T(data).object({
      forEach(name, value) {
         t.ok(name)
         t.ok(value)
      }
   })

   t.deepEqual(data, result)

})