import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
// import { accessUserFromLocalStorage } from '../../utils/localStorage';
// why not get from state? because job slice has no access to user slice more on this https://stackoverflow.com/questions/72807148/how-to-access-state-of-one-slice-in-reducer-of-another-slice-using-redux-toolkit
import {
	createJobThunkPayloadCreator,
	deleteJobThunkPayloadCreator,
	editJobThunkPayloadCreator,
} from './jobThunkPayloadCreator';

const initialState = {
	isLoading: false,
	position: '',
	company: '',
	jobLocation: '',
	jobTypeOptions: ['full-time', 'part-time', 'remote', 'internship'],
	jobType: 'full-time',
	statusOptions: ['interview', 'declined', 'pending'],
	status: 'pending',
	isEditing: false,
	editJobId: '',
};

export var createJob = createAsyncThunk('job/createJob', createJobThunkPayloadCreator);

// console.log(createJob.fulfilled);

export var clearValuesButNotJobLocation = () => {
	return (dispatch, getState) => {
		dispatch(clearJobStateValues());
		let location = getState().user.user.location;
		dispatch(handleChange({ name: 'jobLocation', value: location }));
	};
};
// why put here?
// https://redux-toolkit.js.org/usage/usage-guide#defining-async-logic-in-slices
// Because we don't have separate "actions" files, it makes sense to write these thunks directly in our "slice" files. That way, they have access to the plain action creators from the slice, and it's easy to find where the thunk function lives.

export var deleteJob = createAsyncThunk('job/deleteJob', deleteJobThunkPayloadCreator);

export var editJob = createAsyncThunk('job/editJob', editJobThunkPayloadCreator);

var jobSlice = createSlice({
	name: 'job',
	initialState,
	reducers: {
		handleChange: (state, { payload: { name, value } }) => {
			state[name] = value;
		},
		clearJobStateValues: () => {
			return initialState;
		},
		setEditJob: (state, { payload }) => {
			return { ...state, isEditing: true, ...payload };
		},
	},
	extraReducers: (builder) => {
		builder
			.addCase(createJob.pending, (state) => {
				state.isLoading = true;
			})
			.addCase(createJob.fulfilled, (state) => {
				state.isLoading = false;
			})
			.addCase(createJob.rejected, (state) => {
				state.isLoading = false;
			})
			.addCase(deleteJob.pending, (state) => {
				state.isLoading = true;
			})
			.addCase(deleteJob.fulfilled, (state) => {
				state.isLoading = false;
			})
			.addCase(deleteJob.rejected, (state) => {
				state.isLoading = false;
			})
			.addCase(editJob.pending, (state) => {
				state.isLoading = true;
			})
			.addCase(editJob.fulfilled, (state) => {
				state.isLoading = false;
			})
			.addCase(editJob.rejected, (state) => {
				state.isLoading = false;
			});
	},
});

export default jobSlice.reducer;
export var { handleChange, clearJobStateValues, setEditJob } = jobSlice.actions;

// error message when you messed up the job id // its a server thing
// async thunk action creator result, payload is the server returned one? yes
