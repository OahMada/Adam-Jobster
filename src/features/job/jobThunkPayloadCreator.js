import axios, { checkForUnauthorizedResponse } from '../../utils/axios';
import { clearValuesButNotJobLocation } from './jobSlice';

export var createJobThunkPayloadCreator = async (job, thunkAPI) => {
	try {
		let response = await axios.post('/jobs', job);
		thunkAPI.dispatch(clearValuesButNotJobLocation());
		return response.data;
	} catch (error) {
		return checkForUnauthorizedResponse(error, thunkAPI);
	}
};

export var deleteJobThunkPayloadCreator = async (jobId, thunkAPI) => {
	try {
		let response = await axios.delete(`/jobs/${jobId}`);
		return response.data;
	} catch (error) {
		return checkForUnauthorizedResponse(error, thunkAPI);
	}
};

export var editJobThunkPayloadCreator = async ({ jobId, job }, thunkAPI) => {
	try {
		await axios.patch(`/jobs/${jobId}`, job);
	} catch (error) {
		return checkForUnauthorizedResponse(error, thunkAPI);
	}
};
