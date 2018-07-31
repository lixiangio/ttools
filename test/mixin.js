import test from 'ava';
let T = require('..')


test('object', t => {

   let a = {
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
   }

   let b = {
      xx: 555,
      ss: {
         jj: [1, 23]
      },
      oo: {
         o3: 5656,
         o4: 111
      }
   }

   let result = T.mixin(a, b)

   // console.log(result)

   t.truthy(result);

})


test('undefined, array', t => {

   let a = [{
      oo: {
         dd: [{
            ss: 666,
         }]
      },
   }]

   let resultA = T.mixin(a, undefined)

   t.truthy(resultA === undefined);

   let resultB = T.mixin(undefined, a)

   t.truthy(resultB);

})


test('array, object', t => {

   let a = {
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

   let b = {
      kk: [1, 2, 3],
      oo: {
         o3: 5656,
         o4: 111
      }
   }

   let result = T.mixin(a, b)

   console.log(result)

   t.truthy(result);

})