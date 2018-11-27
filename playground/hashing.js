const {SHA256} = require('crypto-js');
const jwt = require('jsonwebtoken');

var data = {
    id: 4
};

var token = jwt.sign(data, 'saltkey');
console.log(token);

var decoded = jwt.verify(token, 'saltkey');
console.log(decoded);

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