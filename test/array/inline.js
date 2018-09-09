"use strict"

const test = require('jtf')
const T = require('../..')


test('set string', t => {

   let master = [
      { id: 1, username: 'xinxin' },
      { id: 2, username: '小明' }
   ]

   let subset = [
      { id: 1, mid: 1, product: 12 },
      { id: 2, mid: 1, product: 34 },
      { id: 3, mid: 2, product: 56 },
      { id: 4, mid: 1, product: 232 },
      { id: 5, mid: 1, product: 988 },
      { id: 6, mid: 2, product: 34343 }
   ]

   let result = T(master).array({
      "inline": {
         data: subset,
         relation: { 'id': 'mid' },
         set: "xx"
      }
   })

   t.deepEqual({
      id: 1,
      username: 'xinxin',
      xx: [
         { id: 1, mid: 1, product: 12 },
         { id: 2, mid: 1, product: 34 },
         { id: 4, mid: 1, product: 232 },
         { id: 5, mid: 1, product: 988 }
      ]
   }, result[0]);

})


test('set function', t => {

   let master = [
      { id: 1, username: 'xinxin' },
      { id: 2, username: '小明' }
   ]

   let subset = [
      { id: 1, mid: 1, product: 12 },
      { id: 2, mid: 1, product: 34 },
      { id: 3, mid: 2, product: 56 },
      { id: 4, mid: 1, product: 232 },
      { id: 5, mid: 1, product: 988 },
      { id: 6, mid: 2, product: 34343 }
   ]

   let result = T(master).array({
      inline: {
         data: subset,
         relation: { 'id': 'mid' },
         set(parent, data) {
            parent.sub = data
            return parent
         }
      }
   })

   t.deepEqual({
      id: 2,
      username: '小明',
      sub: [
         { id: 3, mid: 2, product: 56 },
         { id: 6, mid: 2, product: 34343 }
      ]
   }, result[1])

})
