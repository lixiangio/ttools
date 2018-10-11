"use strict"

const test = require('jtf')
const T = require('../..')

let sample = [12, 66, 'a', 'b', 'd']

test('shuffle', t => {

   let result = T(sample).array({ shuffle: true })

   result = T(sample).array({ shuffle: 1 })

   t.ok(true)

})
