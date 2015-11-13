var source = $('#todos-template').html();
var template = Handlebars.compile(source);

$.get('/api/todos', function (data) {
	console.log(data.todos);

	var todoHtml = template({ todos: data.todos });
	$('#todo-list').append(todoHtml);
});