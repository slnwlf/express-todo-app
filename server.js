// server.js
// SERVER SIDE JAVASCRIPT

var express = require('express');
var app = express();

var bodyParser = require('body-parser');

app.set('view engine', 'hbs');

app.use(bodyParser.urlencoded({
	extended: true
}));

var todos = [{
	task: 'Get milk',
	description: 'Go to the store',
	id: 1
}, {
	task: 'Ride bike',
	description: 'Road bike ride at lunch',
	id: 2
}, {
	task: 'Learn Javascript',
	description: 'Read a book about it',
	id: 3
}];

app.get('/api/todos/:id', function(req, res) {
	var todoId = parseInt(req.params.id);

	// foundTodo is the created ID?  Not sure. 

	var foundTodo = todos.filter(function(todo) {
		return todo.id == todoId;
	})[0];

	// send foundTodo to Json as data

	res.json(foundTodo);
});

app.get('/api/todos/', function(req, res) {

	res.json(todos);
});

app.get('/api/todos', function(req, res) {
	res.render('index.hbs', todos);
});

app.post('/api/todos', function(req, res) {
	// create new todo with form data (`req.body`)
	var newTodo = req.body;

	// set sequential id (last id in `todos` array + 1)
	if (todos.length > 0) {
		newTodo.id = todos[todos.length - 1].id + 1;
	} else {
		newTodo.id = 1;
	}

	// add newTodo to `todos` array
	todos.push(newTodo);

	// send newTodo as JSON response
	res.json(newTodo);
});

app.delete('/api/todos/:id', function(req, res) {
	var todoId = parseInt(req.params.id);

	var todoToDelete = todos.filter(function(todo) {
		return todo.id == todoId;
	})[0];

	todos.splice(todos.indexOf(todoToDelete), 1);

	res.json(todoToDelete);
});

app.put('/api/todos/:id', function(req, res) {
	var todoId = parseInt(req.params.id);
	var todoToUpdate = todos.filter(function(todo) {
		return todo.id == todoId;
	})[0];

	todoToUpdate.task = req.body.task;
	todoToUpdate.description = req.body.description;

	res.json(todoToUpdate);
});

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