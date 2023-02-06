import axios, { checkForUnauthorizedResponse } from '../../utils/axios';

export var registerUserThunkPayloadCreator = async (user, thunkAPI) => {
	try {
		let response = await axios.post('/auth/register', user);
		return response.data;
	} catch (error) {
		return thunkAPI.rejectWithValue(error.response.data.msg);
	}
};

export var loginUserThunkPayloadCreator = async (user, thunkAPI) => {
	try {
		let response = await axios.post('/auth/login', user);
		return response.data;
	} catch (error) {
		return thunkAPI.rejectWithValue(error.response.data.msg);
	}
};

export var updateUserThunkPayloadCreator = async (user, thunkAPI) => {
	try {
		let response = await axios.patch('/auth/updateUser', user);
		return response.data;
	} catch (error) {
		return checkForUnauthorizedResponse(error, thunkAPI);
	}
};
