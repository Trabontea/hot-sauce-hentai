"use strict";

console.log("Load script.js and pula"); // Instantiating the global app object

var multiplyES5 = function multiplyES5(x, y) {
  return x * y;
};

var result = multiplyES5(3, 4);
console.log(result);

var add = function add(a, b) {
  return a + b;
};

console.log(add(20, 300)); //buns
// window.addEventListener( "load", function () {
//   const form = document.getElementById( "myForm" );
//
//   function sendData() {
//     const XHR = new XMLHttpRequest();
//
//     const objForm = Object.values(form).reduce((obj,field) => {
//       obj[field.name] = field.value;
//       return obj },  {});
//
//     console.log(objForm);
//
//     XHR.addEventListener( "load", function(event) {
//       document.getElementById('message').innerHTML = `<p>Thank you for your order ${objForm.name}</p>
//       <p>Youl will receive information on this email address: ${objForm.email}</p>`;
//       form.style.display = "none";
//     } );
//
//
//     XHR.addEventListener( "error", function( event ) {
//       document.getElementById('message').innerHTML = `Your order has a problem!`
//     } );
//
//     XHR.open( "POST", "https://jsonplaceholder.typicode.com/posts" );
//     XHR.send( [objForm.name, objForm.city, objForm.email]);
//   }
//
//   form.addEventListener( "submit", function ( event ) {
//     event.preventDefault();
//     sendData();
//   });
// });
// const data = [
//   {id: 'Production', status: "in progress", url: "dist/"}
//
//
// ]
"use strict";