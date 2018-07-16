const {SHA256} = require('crypto-js');
const jwt = require('jsonwebtoken');

var data = {
    id: 10
};

var token = jwt.sign(data, '1423sd');
console.log(token);

var decoded = jwt.verify(token, '1423sd');
console.log('decoded ', decoded)
//var message = 'I am user number 3';
//var hash = SHA256(message).toString();
//
//console.log("Message :" + message);
//console.log("Hash : " + hash);
//
//var data = {
//    id: 4
//};
//var token = {
//    data: data,
//    hash: SHA256(JSON.stringify(data) + 'secret').toString()
//}
//
////salting the hash adding a salt or secret to the hash so somone can't manipulate some data that is returned
////man in the middle
//
//token.data.id = 5;
//token.hash = SHA256(JSON.stringify(token.data)).toString();
//
//
//var resultHash = SHA256(JSON.stringify(token.data) + 'secret').toString();
//
//if(resultHash === token.hash){
//    console.log('data was not changed');
//    
//}else{
//    console.log('data was changed');
//                
//} 