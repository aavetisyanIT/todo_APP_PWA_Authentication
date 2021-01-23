const todos = document.querySelector('.todos');
document.addEventListener('DOMContentLoaded', function () {
	// nav menu
	const menus = document.querySelector('.side-menu');
	M.Sidenav.init(menus, { edge: 'right' });
	// add todo form
	const addForm = document.querySelector('.side-form');
	M.Sidenav.init(addForm, { edge: 'left' });
	//edit todo form
	const editForm = document.querySelector('.edit-form');
	M.Sidenav.init(editForm, { edge: 'left' });
});

//render todo data
const renderTodo = (data, id) => {
	const html = `
		<div class="card-panel todo white row" data-delete-id="${id}">
			<span class="material-icons"> fiber_manual_record </span>
			<div class="todo-details">
				<div class="todo-title">${data.title}</div>
				<div class="todo-detail">${data.details}</div>
			</div>
			<div class="todo-edit">
				<i class="material-icons sidenav-trigger" data-target="edit-form" data-edit-id="${id}">edit_outline</i>
			</div>
			<div class="todo-delete">
				<i class="material-icons" data-delete-id="${id}">delete_outline</i>
			</div>
		</div>
	`;
	todos.innerHTML += html;
};

// remove todo from DOM
const removeTodo = (id) => {
	const todo = document.querySelector(`.todo[data-delete-id=${id}]`);
	todo.remove();
};
