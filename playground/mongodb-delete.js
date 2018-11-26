const {MongoClient, ObjectID} = require('mongodb');

MongoClient.connect('mongodb://localhost:27017/TodoApp', (err, client) => {
   if(err){
       return console.log(err);
   }
   const db = client.db('TodoApp');
   console.log('Connected to Server');

   //deleteMany
   //  db.collection('Todos').deleteMany({text: 'Eat Lunch'}).then((result) => {
   //      console.log(result);
   //  });

    //deleteOne
    // db.collection('Todos').deleteOne({text: 'Eat Lunch'}).then((result)=>{
    //     console.log(result);
    // });

    //findOneAndDelete
    // db.collection('Todos').findOneAndDelete({completed: false}).then((result) => {
    //     console.log(result);
    // });

    //deleteMany
     db.collection('Users').deleteMany({name: 'Rkane'}).then((result) => {
         console.log(result);
     });
    //findOneAndDelete
    db.collection('Users').findOneAndDelete({_id: new ObjectID('5bfc2073969591109c27ac6a')}).then((result) => {
        console.log(result);
    });

   // client.close();
});