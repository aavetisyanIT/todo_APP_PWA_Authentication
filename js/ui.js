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

const loggedOutLinks = document.querySelectorAll('.logged-out');
const loggedInLinks = document.querySelectorAll('.logged-in');
const addButton = document.querySelector('#add-btn');

const setupUI = user => {
	if (user) {
		//toggle top nav buttons
		loggedInLinks.forEach(item => (item.style.display = 'block'));
		loggedOutLinks.forEach(item => (item.style.display = 'none'));
		//show add-todo button
		addButton.style.display = 'block';
	} else {
		//toggle top nav buttons
		loggedInLinks.forEach(item => (item.style.display = 'none'));
		loggedOutLinks.forEach(item => (item.style.display = 'block'));
		//hide add-todo button
		addButton.style.display = 'none';
	}
};

//render todo data
const renderTodo = (data = {}, id = {}) => {
	if (data.title) {
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
		document.querySelector('#logout-msg').style.display = 'none';
	} else {
		document.querySelector('#logout-msg').style.display = 'block';
	}
};

// remove todo from DOM
const removeTodo = id => {
	const todo = document.querySelector(`.todo[data-delete-id=${id}]`);
	todo.remove();
};

// setup materialize components
document.addEventListener('DOMContentLoaded', function () {
	var modals = document.querySelectorAll('.modal');
	M.Modal.init(modals);

	var items = document.querySelectorAll('.collapsible');
	M.Collapsible.init(items);
});
