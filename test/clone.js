const test = require('jtf')
const typea = require('typea')
const T = require('..')
let toString = Object.prototype.toString

test('clone', t => {

   let sample = [
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
      }
   ]

   let result = T(sample).clone()

   let { data, error } = typea.strict(result, sample)

   t.ok(data, error)

})


test('new class', t => {

   class O {
      x() {

      }
      y() {

      }
   }

   let sample = new O()

   let result = T(sample).clone()

   let { data, error } = typea.strict(result, {
      x: Function,
      y: Function
   })

   t.ok(data, error)

})