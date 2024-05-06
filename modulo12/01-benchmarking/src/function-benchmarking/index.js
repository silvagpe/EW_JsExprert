import Benchmark from "benchmark";
import CartOld from "./cart-id-old.js";
import CartNew from "./cart-id-new.js";
import CartRmPropOld from "./cart-rm-prop-old.js";
import CartRmPropNew from "./cart-rm-prop-new.js";
import CartPriceOld from "./cart-price-old.js";
import CartPriceNew from "./cart-price-new.js";
import database from "../../database.js";



const suite = new Benchmark.Suite;

// // add tests
// suite.add('Cart#carIdUUID', function() {
//     new CartOld()    
// })
// .add('Cart#carIdCrypto', function() {
//     new CartNew()
// })
// // add listeners
// .on('cycle', function(event) {
//   console.log(String(event.target));
// })
// .on('complete', function() {
//   console.log('Fastest is ' + this.filter('fastest').map('name'));
// })
// // run async
// .run({ 'async': true });

// var data = {
//     products:[
//         {
//             id: 'ae',
//             n:undefined,
//             abc:undefined,
//             a:null,
//             b:123
//         },
//         {
//             id: 'ae',
//             n:undefined,
//             abc:undefined,
//             a:null,
//             b:123
//         }
//     ]
// }

// suite.add('Cart#rmEmptyPropsMapReduce', function() {
//     new CartPriceOld(data)    
// })
// .add('Cart#rmEmptyPropsFor', function() {
//     new CartPriceNew(data)
// })
// .on('cycle', function(event) {
//   console.log(String(event.target));
// })
// .on('complete', function() {
//   console.log('Fastest is ' + this.filter('fastest').map('name'));
// })
// .run({ 'async': true });


suite.add('Cart#calcTotalOld', function() {
    new CartPriceOld(database)    
})
.add('Cart#calcTotalNew', function() {
    new CartPriceNew(database)
})
.on('cycle', function(event) {
  console.log(String(event.target));
})
.on('complete', function() {
  console.log('Fastest is ' + this.filter('fastest').map('name'));
})
.run({ 'async': true });