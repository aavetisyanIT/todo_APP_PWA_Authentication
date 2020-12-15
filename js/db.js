//offline data
db.enablePersistence().catch((err) => {
	if (err.code == 'failed-precondition') {
		//probable multiple tabs open at once
		console.log('persistence failed');
	} else if (err.code == 'unimplemented') {
		//lack of browser support
		console.log('persistence is not available');
	}
});

//real-time listner
db.collection('todos').onSnapshot((snapshot) => {
	//console.log(snapshot.docChanges());
	snapshot.docChanges().forEach((change) => {
		//console.log(change, change.doc.data(), change.doc.id);
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

// add new todo
const form = document.querySelector('form');
form.addEventListener('submit', (evt) => {
	evt.preventDefault();
	const todo = {
		title: form.title.value,
		details: form.details.value,
	};

	db.collection('todos')
		.doc()
		.set(todo)
		.catch((err) => console.log(err));

	form.title.value = '';
	form.details.value = '';
});

//delete todo
const todoContainer = document.querySelector('.todos');
todoContainer.addEventListener('click', (evt) => {
	if (evt.target.tagName === 'I') {
		const id = evt.target.getAttribute('data-id');
		db.collection('todos').doc(id).delete();
	}
});
