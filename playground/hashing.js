const { SHA256 } = require("crypto-js");
const jwt = require("jsonwebtoken");

var data = {
    id: 143
};

var token = jwt.sign(data, 'I am BATMAN');
console.log(token);

var decoded = jwt.verify(token, 'I am BATMAN');
console.log('decoded:', decoded);

/*var message = 'I am BATMAN!';
var hash = SHA256(message).toString();

console.log(`Message: ${message}`);
console.log(`Hash: ${hash}`);

var data = {
    id: 4
};

var token = {
    data,
    hash: SHA256(JSON.stringify(data) + 'salting').toString()
}

token.data.id = 5;
token.hash = SHA256(JSON.stringify(token.data)).toString();

var resultHash = SHA256(JSON.stringify(token.data) + 'salting').toString();

console.log(`token.hash: ${token.hash}`);
console.log(`resultHash: ${resultHash}`);

if (resultHash === token.hash) {
    console.log('Data has not been compromised');
} else {
    console.log('Data has been compromised');    
}*/
