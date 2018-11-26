const {MongoClient, ObjectID} = require('mongodb');

MongoClient.connect('mongodb://localhost:27017/TodoApp', (err, client) => {
   if(err){
       return console.log(err);
   }
   console.log('Connected');
   const db = client.db('TodoApp');

   db.collection('Users').findOneAndUpdate({
       _id: new ObjectID('5bfc1e9dc6a10214e46602d4')
   }, {
       $set: {
           name: 'Rkane'
       },
       $inc: {
           age: 1
       }
   }, {
       returnOriginal: false
   }).then((result) => {
       console.log(result);
   });

   // client.close();
});