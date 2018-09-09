const test = require('jtf')
const T = require('..')

test('clone', t => {

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
            },
            {
               jj: [
                  {
                     ss: {
                        dd: [
                           {
                              ss: 666,
                           },
                           {
                              oo: 888,
                           }
                        ]
                     },
                  }
               ],
               ss: 666,
               xx: 88,
            },
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
      },
      {
         id: 555,
         cid: 666,
         oo: {
            o1: 485,
            o2: 66
         }
      },
   ]

   let result = T(data).clone()

   t.deepEqual(data, result);

})

// console.log(result[0].b[0].kk[0].oo.dd[0].ss)