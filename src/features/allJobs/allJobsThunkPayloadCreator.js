import axios, { checkForUnauthorizedResponse } from '../../utils/axios';

export var getAllJobsThunkPayloadCreator = async (_, thunkAPI) => {
	let { search, searchStatus, searchType, sort, page } = thunkAPI.getState().allJobs;
	try {
		let url = `/jobs?status=${searchStatus}&jobType=${searchType}&sort=${sort}&page=${page}&search=${search}`;
		let response = await axios.get(
			url
			// , { signal: thunkAPI.signal }
		);

		return response.data;
	} catch (error) {
		return checkForUnauthorizedResponse(error, thunkAPI);
	}
};

export var showStatsThunkPayloadCreator = async (_, thunkAPI) => {
	try {
		let response = await axios.get('/jobs/stats');
		// console.log(response.data);
		return response.data;
	} catch (error) {
		return checkForUnauthorizedResponse(error, thunkAPI);
	}
};
