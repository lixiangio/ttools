"use strict"

import test from 'ava';
import T from '../..';

test('string', t => {

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

   let result = T(master).inline({
      data: subset,
      relation: { 'id': 'mid' },
      set: "xx"
   }).value()

   // console.log(result[0])

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


test('function', t => {

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

   let result = T(master).inline({
      data: subset,
      relation: { 'id': 'mid' },
      set(parent, subset) {
         parent.sss = subset
         return parent
      }
   }).value()

   t.deepEqual({
      id: 1,
      username: 'xinxin',
      sss: [
         { id: 1, mid: 1, product: 12 },
         { id: 2, mid: 1, product: 34 },
         { id: 4, mid: 1, product: 232 },
         { id: 5, mid: 1, product: 988 }
      ]
   }, result[0]);

})


test('声明式', t => {

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

   let result = T(master, {
      inline: {
         data: subset,
         relation: { 'id': 'mid' },
         set(parent, subset) {
            parent.sss = subset
            return parent
         }
      }
   })

   t.truthy(result[0]);

})
