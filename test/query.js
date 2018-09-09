const test = require('jtf')
const T = require('..')

test('精确查询', t => {

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

   let result = T(data).query({ '*.enable': true })

   t.deepEqual({ push: { enable: true }, user: { enable: true } }, result)

})


test.skip('模糊查询', t => {

   let data = {
      "push": {
         enable: false
      },
      "sms": {
         enable: true
      },
      "user": {
         enable: false
      }
   }

   let result = T(data).query({ '*.enable': true })

   console.log(result)

   t.deepEqual([
      { enable: true }
   ], result)

})