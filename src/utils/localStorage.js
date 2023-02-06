export var addUserToLocalStorage = (user) => {
	localStorage.setItem('user', JSON.stringify(user));
};

export var removeUserFromLocalStorage = () => {
	localStorage.removeItem('user');
};

export var accessUserFromLocalStorage = () => {
	let user = localStorage.getItem('user');
	return user ? JSON.parse(user) : null;
};
