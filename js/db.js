//offline data
db.enablePersistence().catch(err => {
	if (err.code == 'failed-precondition') {
		//probable multiple tabs open at once
		console.log('persistence failed');
	} else if (err.code == 'unimplemented') {
		//lack of browser support
		console.log('persistence is not available');
	}
});

const todoDB = db.collection('todos');

//listen for auth status chages
auth.onAuthStateChanged(user => {
	const addButton = document.querySelector('#add-btn');
	//if user is logged in
	if (user) {
		//real-time listner
		todoDB.onSnapshot(snapshot => {
			snapshot.docChanges().forEach(change => {
				if (change.type === 'added') {
					//add the document data to the web page
					renderTodo(change.doc.data(), change.doc.id);
				}
				if (change.type === 'removed') {
					//remove the document data from the web page
					removeTodo(change.doc.id);
				}
			});
		});
		//show add-todo button
		addButton.style.display = 'block';
		//use is logged off
	} else {
		renderTodo();
		//hide add-todo button
		addButton.style.display = 'none';
	}
});

// add new todo
const form = document.querySelector('.add-todo.container.section');
form.addEventListener('submit', evt => {
	evt.preventDefault();
	const todo = {
		title: form.title.value,
		details: form.details.value,
	};

	todoDB
		.doc()
		.set(todo)
		.catch(err => console.log(err));

	form.title.value = '';
	form.details.value = '';
});

//delete todo
const todoContainer = document.querySelector('.todos');
todoContainer.addEventListener('click', evt => {
	if (evt.target.innerText === 'delete_outline') {
		const id = evt.target.getAttribute('data-delete-id');
		todoDB.doc(id).delete();
	}
});

//edit todo
todoContainer.addEventListener('click', evt => {
	if (evt.target.innerText === 'edit_outline') {
		const todoTitle = document.querySelector('#editTitle');
		const todoDetails = document.querySelector('#editDetails');
		const id = evt.target.getAttribute('data-edit-id');
		let todoCurrentValue = null;
		todoDB
			.doc(id)
			.get()
			.then(doc => {
				if (doc.exists) {
					todoCurrentValue = doc.data();
					todoTitle.value = todoCurrentValue.title;
					todoDetails.value = todoCurrentValue.details;
					const editForm = document.querySelector('.edit-todo');
					editForm.addEventListener('submit', e => {
						e.preventDefault();
						//submitting edited form and updating DB
						const updatedTodo = {
							title: editForm.editTitle.value,
							details: editForm.editDetails.value,
						};
						//updating DB
						todoDB.doc(id).update(updatedTodo);
						//edit-form instance and closing if after submiting
						const editFormInstance = M.Sidenav.getInstance(
							document.querySelector('.edit-form'),
						);
						editFormInstance.close();
						location.reload();
					});
				} else {
					console.log('No Such document');
				}
			})
			.catch(err => {
				console.log(err);
			});
	}
});
