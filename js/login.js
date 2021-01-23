// When the user clicks anywhere outside of the modals, close it
window.onclick = function (event) {
	const modalLogin = document.querySelector('#id01');
	const modalRegister = document.querySelector('#id02');
	const body = document.querySelector('body');
	if (event.target.lastChild == body) {
		modalLogin.style.display = 'none';
		modalRegister.style.display = 'none';
	}
};
//signup
const signupForm = document.querySelector('#signup-form');
signupForm.addEventListener('submit', evt => {
	evt.preventDefault();
	const email = signupForm['signup-email'].value;
	const password = signupForm['signup-password'].value;

	//sign up the user
	auth.createUserWithEmailAndPassword(email, password)
		.then(cred => {
			console.log(cred);
		})
		.catch(err => console.log(err.message));
	const modalRegister = document.querySelector('#id02');
	modalRegister.style.display = 'none';
	signupForm.reset();
});
