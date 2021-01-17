if ('serviceWorker' in navigator) {
	navigator.serviceWorker
		.register('/public/js/sw.js')
		.then(reg => console.log('service worker is registered', reg))
		.catch(err => console.log('service worker is not registered', err));
}
