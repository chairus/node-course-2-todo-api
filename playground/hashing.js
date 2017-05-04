const { SHA256 } = require("crypto-js");
const jwt = require("jsonwebtoken");
const bcrypt = require("bcryptjs");

var password = '123abc';

bcrypt.genSalt(10, (err, salt) => {
    bcrypt.hash(password, salt, (err, hash) => {
        console.log(hash);
    });
});

var hashedPassword = '$2a$10$hjl4H42tvhj6VEnRPWhht.Ix9EYwDM5/U1cs.nHNtUvLEwmmrneV6';

bcrypt.compare(password, '$2a$10$hjl4H42tvhj6VEnRPWhht.Ix9EYwDM5/U1cs.nHNtUvLEwmmrneV6', (err, res) => {
    console.log(res);
})

// var data = {
//     id: 143
// };
//
// var token = jwt.sign(data, 'I am BATMAN');
// console.log(token);
//
// var decoded = jwt.verify(token, 'I am BATMAN');
// console.log('decoded:', decoded);
//
// var message = 'I am BATMAN!';
// var hash = SHA256(message).toString();
//
// console.log(`Message: ${message}`);
// console.log(`Hash: ${hash}`);
//
// var data = {
//     id: 4
// };
//
// var token = {
//     data,
//     hash: SHA256(JSON.stringify(data) + 'salting').toString()
// }
//
// token.data.id = 5;
// token.hash = SHA256(JSON.stringify(token.data)).toString();
//
// var resultHash = SHA256(JSON.stringify(token.data) + 'salting').toString();
//
// console.log(`token.hash: ${token.hash}`);
// console.log(`resultHash: ${resultHash}`);
//
// if (resultHash === token.hash) {
//     console.log('Data has not been compromised');
// } else {
//     console.log('Data has been compromised');
// }
