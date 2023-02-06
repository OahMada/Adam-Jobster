import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import { getAllJobsThunkPayloadCreator, showStatsThunkPayloadCreator } from './allJobsThunkPayloadCreator';

const initialFiltersState = {
	search: '',
	searchStatus: 'all',
	searchType: 'all',
	sort: 'latest',
	sortOptions: ['latest', 'oldest', 'a-z', 'z-a'],
};

const initialState = {
	isLoading: false,
	jobs: [],
	totalJobs: 0,
	numOfPages: 1,
	page: 1,
	stats: {},
	monthlyApplications: [],
	...initialFiltersState,
};

export var getAllJobs = createAsyncThunk('allJobs/getJobs', getAllJobsThunkPayloadCreator);

export var showStats = createAsyncThunk('allJobs/showStats', showStatsThunkPayloadCreator);

var allJobsSlice = createSlice({
	name: 'allJobs',
	initialState,
	reducers: {
		updateJobs: (state, { payload }) => {
			let updatedJobs = state.jobs.filter((job) => job._id !== payload);
			return { ...state, jobs: updatedJobs };
		},
		handleChange: (state, { payload: { name, value } }) => {
			state.page = 1;
			state[name] = value;
		},
		clearFilters: (state) => {
			return { ...state, ...initialFiltersState };
		},
		handleChangePage: (state, { payload }) => {
			state.page = payload;
		},
		clearAllJobsStateValues: () => {
			return initialState;
		},
	},
	extraReducers: (builder) => {
		builder
			.addCase(getAllJobs.pending, (state) => {
				state.isLoading = true;
			})
			.addCase(getAllJobs.fulfilled, (state, { payload }) => {
				state.isLoading = false;
				state.jobs = payload.jobs;
				state.numOfPages = payload.numOfPages;
				state.totalJobs = payload.totalJobs;
			})
			.addCase(getAllJobs.rejected, (state) => {
				state.isLoading = false;
			})
			.addCase(showStats.pending, (state) => {
				state.isLoading = true;
			})
			.addCase(showStats.fulfilled, (state, { payload }) => {
				state.isLoading = false;
				state.stats = payload.defaultStats;
				state.monthlyApplications = payload.monthlyApplications;
			})
			.addCase(showStats.rejected, (state) => {
				state.isLoading = false;
			});
	},
});

export var { updateJobs, handleChange, clearFilters, clearAllJobsStateValues, handleChangePage } = allJobsSlice.actions;

export default allJobsSlice.reducer;

// why not define delete job logic here?
// define crud actions all at same place

// uncontrolled input for the search?
/**
 * const nameRef = useRef(); // create
 * <input type="text" name="name" ref={nameRef} required /> // assign
 * console.log("Name value: " + nameRef.current.value); // access
 */
// what happens if we leave ?search= // it depends on how server deal with it
