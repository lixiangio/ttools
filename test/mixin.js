const test = require('jtf')
const T = require('..')

let data = [
   {
      id: 553,
      b: [
         {
            kk: [
               {
                  oo: {
                     dd: [{
                        ss: 666,
                     }]
                  },
               },
               {
                  ss: {
                     dd: [
                        {
                           rr: 666,
                        },
                        {
                           yy: 666,
                        }
                     ]
                  },
                  jj: 888
               }
            ],
            xx: 666,
            ss: 888
         }
      ],
   },
   {
      id: 555,
      cid: 3,
      b: [{
         kk: [{
            ss: [{
               ss: 666,
            }],
         }],
         jj: 888,
         xx: 12
      }],
      oo: {
         o1: 99,
         o2: 81
      }
   },
   {
      id: 555,
      cid: 15,
      oo: {
         o1: 34,
         o2: 56
      }
   }
]

let mixin = {
   kk: [1, 2, 3],
   oo: {
      o3: 5656,
      o4: 111
   }
}


test.skip('mixin', t => {

   let result = T(data).mixin(mixin, {
      oo: {
         o3: true,
         o4: true
      }
   })

   console.log(result)

})