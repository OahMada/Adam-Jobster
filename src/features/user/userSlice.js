import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import {
	registerUserThunkPayloadCreator,
	loginUserThunkPayloadCreator,
	updateUserThunkPayloadCreator,
} from './userThunk';
import { accessUserFromLocalStorage } from '../../utils/localStorage';
import { clearAllJobsStateValues } from '../allJobs/allJobsSlice';
import { clearJobStateValues } from '../job/jobSlice';

var initialState = {
	isLoading: false,
	isSidebarOpen: false,
	user: accessUserFromLocalStorage(),
};

export var registerUser = createAsyncThunk('user/register', registerUserThunkPayloadCreator);

export var loginUser = createAsyncThunk('user/login', loginUserThunkPayloadCreator);

export var updateUser = createAsyncThunk('user/updateUser', updateUserThunkPayloadCreator);

export var clearStore = () => {
	return (dispatch) => {
		dispatch(logoutUser());
		dispatch(clearJobStateValues());
		dispatch(clearAllJobsStateValues());
	};
};

export var userSlice = createSlice({
	name: 'user',
	initialState,
	reducers: {
		toggleSidebar: (state) => {
			state.isSidebarOpen = !state.isSidebarOpen;
		},
		logoutUser: (state) => {
			state.user = null;
			state.isSidebarOpen = false;
		},
		handleUserChange: (state, { payload }) => {
			state.user[payload.name] = payload.value;
		},
	},
	extraReducers: (builder) => {
		builder
			.addCase(registerUser.pending, (state) => {
				state.isLoading = true;
			})
			.addCase(registerUser.fulfilled, (state, { payload }) => {
				let { user } = payload;
				state.user = user;
				state.isLoading = false;
			})
			.addCase(registerUser.rejected, (state) => {
				state.isLoading = false;
			})
			.addCase(loginUser.pending, (state) => {
				state.isLoading = true;
			})
			.addCase(loginUser.fulfilled, (state, { payload: { user } }) => {
				state.isLoading = false;
				state.user = user;
			})
			.addCase(loginUser.rejected, (state) => {
				state.isLoading = false;
			})
			.addCase(updateUser.pending, (state) => {
				state.isLoading = true;
			})
			.addCase(updateUser.fulfilled, (state, action) => {
				let {
					payload: { user },
				} = action;
				state.isLoading = false;
				state.user = user;
			})
			.addCase(updateUser.rejected, (state) => {
				state.isLoading = false;
			});
	},
});

export default userSlice.reducer;
export var { toggleSidebar, logoutUser, handleUserChange } = userSlice.actions;
