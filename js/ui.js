const todos = document.querySelector('.todos');
document.addEventListener('DOMContentLoaded', function () {
	// nav menu
	const menus = document.querySelectorAll('.side-menu');
	M.Sidenav.init(menus, { edge: 'right' });
	// add todo form
	const forms = document.querySelectorAll('.side-form');
	M.Sidenav.init(forms, { edge: 'left' });
});

//render todo data
const renderTodo = (data, id) => {
	const html = `
		<div class="card-panel todo white row" data-id="${id}">
			<span class="material-icons"> fiber_manual_record </span>
			<div class="todo-details">
				<div class="todo-title">${data.title}</div>
				<div class="todo-detail">${data.details}</div>
			</div>
			<div class="todo-delete">
				<i class="material-icons" data-id="${id}">delete_outline</i>
			</div>
		</div>
	`;
	todos.innerHTML += html;
};

// remove todo from DOM

const removeTodo = (id) => {
	const todo = document.querySelector(`.todo[data-id=${id}]`);
	todo.remove();
};
