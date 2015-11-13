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

// Todos that we don't need anymore 

// var todos = [{
// 	task: 'Get milk',
// 	description: 'Go to the store',
// 	id: 1
// }, {
// 	task: 'Ride bike',
// 	description: 'Road bike ride at lunch',
// 	id: 2
// }, {
// 	task: 'Learn Javascript',
// 	description: 'Read a book about it',
// 	id: 3
// }];


////////////////
// GET ROUTES //
////////////////

// app.get('/api/todos/', function(req, res) {
// 	res.json(todos);
// });

// app.get('/api/todos', function(req, res) {
// 	res.render('index.hbs', todos);
// });

// app.get('/api/todos/:id', function(req, res) {
// 	var todoId = parseInt(req.params.id);

// foundTodo is the created ID?  Not sure. 

var foundTodo = todos.filter(function(todo) {
	return todo.id == todoId;
})[0];

// send foundTodo to Json as data

// 	res.json(foundTodo);
// });

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

// app.post('/api/todos', function(req, res) {
// 	// create new todo with form data (`req.body`)
// 	var newTodo = req.body;

// 	// set sequential id (last id in `todos` array + 1)
// 	if (todos.length > 0) {
// 		newTodo.id = todos[todos.length - 1].id + 1;
// 	} else {
// 		newTodo.id = 1;
// 	}

// 	// add newTodo to `todos` array
// 	todos.push(newTodo);

// 	// send newTodo as JSON response
// 	res.json(newTodo);
// });

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

// app.delete('/api/todos/:id', function(req, res) {
// 	var todoId = parseInt(req.params.id);

// 	var todoToDelete = todos.filter(function(todo) {
// 		return todo.id == todoId;
// 	})[0];

// 	todos.splice(todos.indexOf(todoToDelete), 1);

// 	res.json(todoToDelete);
// });

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

// app.put('/api/todos/:id', function(req, res) {
// 	var todoId = parseInt(req.params.id);
// 	var todoToUpdate = todos.filter(function(todo) {
// 		return todo.id == todoId;
// 	})[0];

// 	todoToUpdate.task = req.body.task;
// 	todoToUpdate.description = req.body.description;

// 	res.json(todoToUpdate);
// });

// hbs.registerHelper('list', function(context, options) {
// 	var ret = "<ul>";

// 	for (var i = 0, j = context.length; i < j; i++) {
// 		ret = ret + "<li>" + options.fn(context[i]) + "</li>";
// 	}

// 	return ret + "</ul>";
// });

var server = app.listen(process.env.PORT || 3000, function() {
	console.log('Example app listening at http://localhost:3000/');
});