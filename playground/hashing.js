const {SHA256} = require('crypto-js');
const jwt = require('jsonwebtoken');
const bcrypt = require('bcryptjs');

var password = 'securepass';
bcrypt.genSalt(10, (err, salt) => {
    bcrypt.hash(password, salt, (err, hash) => {
        console.log(hash);
        console.log(salt);
    });
});

var hashedPass = '$2a$10$nic2fu5KP.KpWwXjBaw8WO9HkoK3qO00OPfMsPK0JX6KS8nC8VA7e';
bcrypt.compare(password, hashedPass, (err, res) => {
    console.log(res);
});

// var data = {
//     id: 4
// };
// var token = jwt.sign(data, 'saltkey');
// console.log(token);
//
// var decoded = jwt.verify(token, 'saltkey');
// console.log(decoded);

// var message = 'I am user number 3';
// var hash = SHA256(message).toString();
// console.log(`Message: ${message}\nHash: ${hash}`);
//

// var token = {
//     data: data,
//     hash: SHA256(JSON.stringify(data) + 'secret').toString()
// };
//
// var resultHash = SHA256(JSON.stringify(token.data) + 'secret').toString();
// if (resultHash===token.hash) {
//     console.log('Successful auth');
// }
// else{
//     console.log('Data changed!');
// }