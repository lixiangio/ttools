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
                     dd: [123]
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
   },
   {
      b: [
         {
            kk: [
               {
                  oo: {
                     ss: 9696
                  },
               }
            ]
         }
      ],
   },
]


test('精确匹配', t => {

   let result = T(data).get('0.b.0.kk.1.jj')

   t.deepEqual(888, result)

})


test('单层模糊匹配，空值', t => {

   let data = {
      "push": {
         enable: true
      },
      "sms": {
         enable: false
      },
      "user": {
         enable: true
      }
   }

   let result = T(data).get('*.name')

   t.deepEqual([], result)

})

test('单层模糊匹配 2', t => {

   let result = T(data).get('*.oo')

   t.deepEqual([{ o1: 99, o2: 81 }, { o1: 34, o2: 56 }], result)

})


test('多层模糊匹配', t => {

   let result = T(data).get('*.b.*.kk.*.oo')

   t.deepEqual([ { dd: [ 123 ] }, { ss: 9696 } ], result)

})


test('模糊匹配，无匹配项时返回数组', t => {

   let result = T(data).get('*.oo.999')

   t.deepEqual([], result)

})


test('模糊匹配入口为对象', t => {

   let result = T(data[0]).get('b.0.kk.1.ss.dd.1')

   t.deepEqual({ yy: 666 }, result)

})