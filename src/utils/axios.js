import axios from 'axios';
import { accessUserFromLocalStorage } from './localStorage';
import { clearStore } from '../features/user/userSlice';

var customInstance = axios.create({ baseURL: 'https://jobify-prod.herokuapp.com/api/v1/toolkit' });

customInstance.interceptors.request.use(
	(config) => {
		let user = accessUserFromLocalStorage();
		if (user) {
			config.headers['Authorization'] = `Bearer ${user.token}`;
		}
		return config;
	},
	(error) => {
		return Promise.reject(error);
	}
);

export var checkForUnauthorizedResponse = (error, thunkAPI) => {
	if (error.response.status === 401) {
		thunkAPI.dispatch(clearStore());
		return thunkAPI.rejectWithValue('unauthorized, logging out');
	}
	return thunkAPI.rejectWithValue(error.response.data.msg);
};

export default customInstance;
