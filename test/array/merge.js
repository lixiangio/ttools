"use strict"

let T = require('..')

let data = [
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
      id: 555,
      cid: 666,
      oo: {
         o1: 485,
         o2: 66
      }
   },
]

// 独立单项
let merge = T.merge(["a", "x", "e"], ["a", "c", "e"], ["a", "c", "p"])

console.log(merge)