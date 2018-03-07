const {SHA256} = require("crypto-js");
const jwt = require("jsonwebtoken");

var data = {
    id: 10
};

var token = jwt.sign(data,"123abc");

console.log(token);

var decode = jwt.verify(token, "123abc");

console.log("Decoded: ", decode);

// var message = "I am called Dave"
// var hash = SHA256(message).toString();

// console.log(message);
// console.log(hash);