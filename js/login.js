//signup
const signupForm = document.querySelector('#signup-form');
signupForm.addEventListener('submit', evt => {
	evt.preventDefault();

	//get user info
	const email = signupForm['signup-email'].value;
	const password = signupForm['signup-password'].value;

	//sign up the user
	auth.createUserWithEmailAndPassword(email, password)
		.then(cred => {
			console.log('Logged in');
		})
		.catch(err => console.log(err.message));
	const modal = document.querySelector('#modal-signup');
	M.Modal.getInstance(modal).close();
	signupForm.reset();
});

//logout user
const logout = document.querySelector('#logout');
logout.addEventListener('click', evt => {
	evt.preventDefault();
	auth.signOut()
		.then(() => console.log('User signed out'))
		.catch(err => console.log(err.message));
});

// login user
const loginForm = document.querySelector('#login-form');
