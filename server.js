// server.js
// SERVER SIDE JAVASCRIPT

// This requires the mongoose library

var mongoose = require('mongoose');

// This variable points it to the JSON

var Todo = require('./models/todo');

// This is the connection string, with the path to the named db

mongoose.connect('mongodb://localhost/hellafresh');

// Need to change my database name?  But should not be "todos" because that is my collection of Todos. 

var express = require('express');
var app = express();

var bodyParser = require('body-parser');

app.set('view engine', 'hbs');

app.use(bodyParser.urlencoded({
	extended: true
}));

////////////////
// GET ROUTES //
////////////////

// get all todos
app.get('/api/todos', function(req, res) {
	// find all todos in db
	Todo.find(function(err, allTodos) {
		res.json({
			todos: allTodos
		});
	});
});

// get ONE  todo

app.get('/api/todos/:id', function(req, res) {
	// get todo id from url params (`req.params`)
	var todoId = req.params.id;

	// find todo in db by id
	Todo.findOne({
		_id: todoId
	}, function(err, foundTodo) {
		res.json(foundTodo);
	});
});


//////////////////////
//// Post routes  ////
//////////////////////


// create new todo
app.post('/api/todos', function(req, res) {
	// create new todo with form data (`req.body`)
	var newTodo = new Todo(req.body);

	// save new todo in db
	newTodo.save(function(err, savedTodo) {
		res.json(savedTodo);
	});
});

/////////////////////
// Delete routes ////
/////////////////////

  // delete todo
  app.delete('/api/todos/:id', function (req, res) {
    // get todo id from url params (`req.params`)
    var todoId = req.params.id;

    // find todo in db by id and remove
    Todo.findOneAndRemove({ _id: todoId }, function (err, deletedTodo) {
      res.json(deletedTodo);
    });
  });


//////////////////////
//// Put routes //////
//////////////////////

// update todo
app.put('/api/todos/:id', function(req, res) {
	// get todo id from url params (`req.params`)
	var todoId = req.params.id;

	// find todo in db by id
	Todo.findOne({
		_id: todoId
	}, function(err, foundTodo) {
		// update the todos's attributes
		foundTodo.task = req.body.task;
		foundTodo.description = req.body.description;

		// save updated todo in db
		foundTodo.save(function(err, savedTodo) {
			res.json(savedTodo);
		});
	});
});

var server = app.listen(process.env.PORT || 3000, function() {
	console.log('Example app listening at http://localhost:3000/');
});