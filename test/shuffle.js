"use strict"

const test = require('jtf')
const T = require('..')


test('array', t => {

   let sample = [12, 66, 'a', 'b', 'd']

   let result = T(sample).shuffle()

   console.log(result)

   result = T(sample).shuffle()

   console.log(result)

   t.ok(true)

})

test('object', t => {

   let sample = {
      a: 11,
      t: 889,
      s: 661,
      m: "jtk"
   }

   let result = T(sample).shuffle()

   console.log(result)

   result = T(sample).shuffle()

   console.log(result)

   t.ok(true)

})
