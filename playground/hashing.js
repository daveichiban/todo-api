const {SHA256} = require("crypto-js");

var message = "I am called Dave"
var hash = SHA256(message).toString();

console.log(message);
console.log(hash);