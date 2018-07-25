// const MongoClient = require('mongodb').MongoClient;
const {MongoClient, ObjectID} = require('mongodb');


MongoClient.connect('mongodb://localhost:27017/TodoApp', (err, db) => {
    if(err){
       return console.log('Unable to connect to mongodb server');
    }
    console.log('Connected to MongoDB server');

    // db.collection('Todos').findOneAndUpdate({
    //     _id: new ObjectID('5b55cc01cc5373c7c2bf6871')
    // }, {
    //     $set: {
    //         completed: true
    //         }
    //     }, {
    //         returnOriginal: false
    // }).then((result) => {
    //     console.log(result);
    // });

    db.collection('Users').findOneAndUpdate({
        _id: new ObjectID('5b555f329eaefe5b5ebe8c1b')
    }, {
        $set: {
            name: 'Richard',
            },
        $inc: {
            age: 1
             }
     }, { 
        returnOriginal: false
    }).then((result) => {
        console.log(result);
    });

    // db.close();
});