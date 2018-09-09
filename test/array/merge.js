"use strict"

const test = require('jtf')
const T = require('../../')

test('merge', t => {

   let data = [
      1,
      2,
      'x',
      {
         id: 555,
         cid: 666
      },
   ]

   let result = T(data).array({ merge: ["a", "x", "e"] })

   t.deepEqual([1, 2, 'x', { id: 555, cid: 666 }, 'a', 'e'], result)

})