const test = require('jtf')
const T = require('../../')

test('mixin', t => {

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

   let mixin = {
      xx: 555,
      ss: {
         t: 0
      },
      mm: 222
   }

   let result = T(data).object({ mixin })

   t.deepEqual({
      kk: [{ oo: 122 }],
      xx: 555,
      ss: { jj: 888, t: 0 },
      oo: { o1: 34, o2: 56 },
      mm: 222
   }, result)

})


test.skip('undefined, array', t => {

   let data = {
      oo: {
         dd: [{
            ss: 666,
         }]
      },
   }

   let result = T(data).object({ mixin: undefined })

   console.log(result)

   t.ok(true)

})


test('array, object', t => {

   let data = {
      kk: [
         {
            oo: {
               dd: [{
                  ss: 666,
               }]
            },
         }
      ],
      oo: {
         o1: 8976,
         o2: 676878
      }
   }

   let mixin = {
      kk: [1, 2, 3],
      oo: {
         o3: 5656,
         o4: 111
      }
   }

   let result = T(data).object({ mixin })

   t.deepEqual({
      kk: [1, 2, 3],
      oo: { o1: 8976, o2: 676878, o3: 5656, o4: 111 }
   }, result)

})