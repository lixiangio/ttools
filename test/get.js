import test from 'ava';
let T = require('..')

test('get', t => {

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

   let result = T.get(data, '0.b.0.kk.0.oo')

   console.log(result)

   t.truthy(result)

})


test('get * 单层模糊查询', t => {

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
                  },
                  {
                     oo: {
                        xx: [12, 2343]
                     },
                  },
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

   let result = T.get(data, '*.b.*.kk.*.oo.dd')

   // console.log(result[0].b[0].kk)

   t.truthy(result)

})