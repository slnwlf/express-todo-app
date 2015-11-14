$(function() {

	var source = $('#todos-template').html();
	var template = Handlebars.compile(source);

	// array to hold todo data from API
	var allTodos = [];

	$.get('/api/todos', function(data) {
		console.log(data.todos);

		var todoHtml = template({
			todos: data.todos
		});
		$('#todo-list').append(todoHtml);
	});

	// form to create new todo
	var $createTodo = $('#create-todo');


	$createTodo.on('submit', function(event) {
		event.preventDefault();

		// serialze form data
		var newTodo = $(this).serialize();

		// POST request to create new todo
		$.post('/api/todos', newTodo, function(data) {
			console.log(data);

			// add new book to `allTodos`
			$('#todo-list').append(todoHtml);
			allTodos.push(data);
			// render all todos to view
			//   render();
		});

		// reset the form
		$createTodo[0].reset();
		$createTodo.find('input').first().focus();
	});
});