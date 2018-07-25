var express = require('express');
var bodyParser = require('body-parser');
const {ObjectID} = require('mongodb');

var {mongoose} = require('./db/mongoose.js');
var {Todo} = require('./models/todo.js');
var {User} = require('./models/user');

var app = express();
const port = process.env.PORT || 3000; 

app.use(bodyParser.json());

app.post('/todos', (req, res) => {
    var todo = new Todo({
        text: req.body.text
    });
    todo.save().then((doc) => {
        res.send(doc);
    }, (e) => {
        res.status(400).send(e);
    });
});

app.get('/todos', (req, res) => {
    Todo.find().then((todos) => {
        res.send({
            todos});
    }, (e) => {
        res.status(400).send(e);
    });
});

// GET /todos/123455
app.get('/todos/:id', (req, res) => {
    var id = req.params.id; 

    // res.send(req.params);

    // valid id using isvalid

    if (!ObjectID.isValid(id)) {
            // console.log('ID not valid');
              // 404 - send back empty body
            return res.status(404).send();
        }

        Todo.findById(id).then((todo) => {
                if(!todo){
                    // return console.log('Id not found');
                    return res.status(404).send();
                }
                    res.send({todo});
            //     console.log('Todo By Id', todo);
            // }).catch((e) => console.log());
        }).catch((e) => {res.status(400).send()
            });

    //findByID
        //success
            // if todo - send back
            // if no todo - send back 404 with empty body
        //error
            //400 - and send empty body back
});


app.listen(port, () => {
    console.log(`Started up at port ${port}`);
});

module.exports = {app};