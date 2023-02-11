import { useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import Job from './Job';
import Wrapper from '../assets/wrappers/JobsContainer';
import Loading from './Loading';
import { getAllJobs, clearAllJobsStateValues } from '../features/allJobs/allJobsSlice';
import { toast } from 'react-toastify';
import PageBtnContainer from './PageBtnContainer';

const JobsContainer = () => {
	let { jobs, isLoading, page, totalJobs, numOfPages, search, searchStatus, searchType, sort } = useSelector(
		(store) => store.allJobs
	);
	let dispatch = useDispatch();

	useEffect(() => {
		let loadAllJobs = async () => {
			try {
				await dispatch(getAllJobs()).unwrap();
			} catch (error) {
				toast.error(error);
			}
		};
		loadAllJobs();
		// let abortFunc;
		// let loadAllJobs = async () => {
		// 	let resultPromise = dispatch(getAllJobs());
		// 	abortFunc = resultPromise.abort;
		// 	let resultAction = await resultPromise;
		// 	if (!getAllJobs.fulfilled.match(resultAction)) {
		// 		if (resultAction.payload) {
		// 			toast.error(resultAction.payload); // error generated with thunkAPI.rejectWithValue
		// 		} else {
		// 			console.log(resultAction.error);
		// 		}
		// 	}
		// };
		// loadAllJobs();
		// return () => {
		// 	abortFunc();
		// };
		// let resultPromise = dispatch(getAllJobs());
		// return () => {
		// 	resultPromise.abort();
		// };
	}, [search, searchStatus, searchType, sort, page, dispatch]);

	useEffect(() => {
		return () => {
			dispatch(clearAllJobsStateValues());
		};
	}, [dispatch]);

	// about add dispatch to dependency array https://stackoverflow.com/questions/67012223/is-safe-to-insert-dispatch-function-as-a-dependency-in-useeffect-function

	if (isLoading) {
		return <Loading center />;
	}

	if (jobs.length === 0) {
		return (
			<Wrapper>
				<h2>there is no jobs to display...</h2>
			</Wrapper>
		);
	}

	return (
		<Wrapper>
			<h5>
				{totalJobs} job{totalJobs > 1 && 's'} found
			</h5>
			<div className='jobs'>
				{jobs.map((job) => {
					return <Job key={job._id} {...job} />;
				})}
			</div>
			{numOfPages > 1 && <PageBtnContainer />}
		</Wrapper>
	);
};

export default JobsContainer;
