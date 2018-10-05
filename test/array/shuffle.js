"use strict"

const test = require('jtf')
const T = require('../..')

let sample = [12, 66, 'a', 'b', 'd']

test('shuffle', t => {

   let result = T(sample).array({ shuffle: true })

   console.log(result)

   result = T(sample).array({ shuffle: 1 })

   console.log(result)

   t.ok(true)

})
