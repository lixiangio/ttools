const test = require('jtf')
const T = require('..')

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


test('精确匹配', t => {

   let result = T(data).query({ 'user.enable': true })

   t.deepEqual({ user: { enable: true } }, result)

})


test('模糊匹配', t => {

   let result = T(data).query({ '*.enable': false })

   // console.log(result)

   t.deepEqual({ sms: { enable: false } }, result)

})


test('回调函数，Object', t => {


   let result = T(data).query({ '*.enable': false }, function (key, value) {

      t.deepEqual('sms', key)

      t.deepEqual({ enable: false }, value)

   })

   t.deepEqual({ sms: { enable: false } }, result)

})


test('回调函数，Array', t => {

   let data = [
      {
         id: 555,
         cid: 15,
         oo: {
            o1: 34,
            o2: 56
         }
      },
      {
         id: 343,
         cid: 566,
         oo: {
            o1: 999,
            o2: 1111
         }
      },
      {
         id: 343,
         cid: 566,
         oo: {
            o1: 34,
            o2: 1111
         }
      },
   ]

   let result = T(data).query({ '*.oo.o1': 999 }, function (item) {

      t.deepEqual({ id: 343, cid: 566, oo: { o1: 999, o2: 1111 } }, item)

   })

   t.deepEqual([{ id: 343, cid: 566, oo: { o1: 999, o2: 1111 } }], result)

})