var source = $('#todos-template').html();
var template = Handlebars.compile(source);

$.get('/api/todos', function (data) {
	console.log(data.todos);

	var todoHtml = template({ todos: data.todos });
	$('#todo-list').append(todoHtml);
});
$.on('submit', '.update-todo', function(event) {
			event.preventDefault();

			// POST request to create new book
			$.post(baseUrl, newTodo, function(data) {
				console.log(data);

				// add new book to `allBooks`
				allTodos.push(data);

				// render all books to view
				render();
			});
		});