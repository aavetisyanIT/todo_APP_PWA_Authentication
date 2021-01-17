// When the user clicks anywhere outside of the modals, close it
window.onclick = function (event) {
	const modalLogin = document.getElementById('id01');
	const modalRegister = document.getElementById('id02');
	const body = document.querySelector('body');
	if (event.target.lastChild == body) {
		modalLogin.style.display = 'none';
		modalRegister.style.display = 'none';
	}
};
