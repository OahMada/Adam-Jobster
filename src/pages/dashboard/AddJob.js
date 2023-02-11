import { useSelector, useDispatch } from 'react-redux';
import { FormRow, FormRowSelect } from '../../components/';
import Wrapper from '../../assets/wrappers/DashboardFormPage';
import { toast } from 'react-toastify';
import {
	handleChange,
	clearValuesButNotJobLocation,
	createJob,
	clearJobStateValues,
	editJob,
} from '../../features/job/jobSlice';
import { useEffect } from 'react';
import { accessUserFromLocalStorage } from '../../utils/localStorage';

var AddJob = () => {
	let {
		isLoading,
		position,
		company,
		jobLocation,
		jobType,
		jobTypeOptions,
		status,
		statusOptions,
		isEditing,
		editJobId,
	} = useSelector((store) => store.job);

	let dispatch = useDispatch();

	let handelSubmit = async (e) => {
		e.preventDefault();
		if (!position || !company || !jobLocation) {
			toast.error('please fill out all fields');
			return;
		}
		if (isEditing) {
			try {
				await dispatch(
					editJob({ jobId: editJobId, job: { position, company, jobLocation, jobType, status } })
				).unwrap();
				dispatch(clearValuesButNotJobLocation());
				toast.success('job updated');
			} catch (error) {
				toast.error(error);
			}
			return;
		}
		try {
			// let result =
			await dispatch(createJob({ position, company, jobLocation, jobType, status })).unwrap();
			// console.log(result);
			toast.success('job added');
		} catch (error) {
			toast.error(error);
		}
	};

	let handleJobInput = (e) => {
		let name = e.target.name;
		let value = e.target.value;

		dispatch(handleChange({ name, value }));
	};

	useEffect(() => {
		if (isEditing) {
			return () => {
				dispatch(clearJobStateValues());
			};
		}
		dispatch(handleChange({ name: 'jobLocation', value: accessUserFromLocalStorage().location }));

		// eslint-disable-next-line react-hooks/exhaustive-deps
	}, []);

	// but why refresh took away jobLocation state?
	// react will destroy states when component unmounts, when the component mounts again, it only has the default state

	// let clearValuesButNotJobLocation = () => {
	// 	return (dispatch, getState) => {
	// 		dispatch(clearJobStateValues());
	// 		let location = getState().user.user.location;
	// 		dispatch(handleChange({ name: 'jobLocation', value: location }));
	// 	};
	// };

	return (
		<Wrapper>
			<form className='form'>
				<h3>{isEditing ? 'edit job' : 'add job'}</h3>
				<div className='form-center'>
					<FormRow name='position' type='text' value={position} handleChange={handleJobInput} />
					<FormRow name='company' type='text' value={company} handleChange={handleJobInput} />
					<FormRow
						name='jobLocation'
						type='text'
						labelText='lob location'
						value={jobLocation}
						handleChange={handleJobInput}
					/>
					<FormRowSelect name='status' value={status} handleChange={handleJobInput} list={statusOptions} />
					<FormRowSelect
						name='jobType'
						labelText='job type'
						value={jobType}
						handleChange={handleJobInput}
						list={jobTypeOptions}
					/>
					<div className='btn-container'>
						<button
							className='btn btn-block clear-btn'
							type='button'
							onClick={() => dispatch(clearValuesButNotJobLocation())}
						>
							clear
						</button>
						<button className='btn btn-block submit-btn' type='submit' onClick={handelSubmit} disabled={isLoading}>
							submit
						</button>
					</div>
				</div>
			</form>
		</Wrapper>
	);
};

export default AddJob;

// 594 Q&A No.3 create job request complete: Nah
// done dispatch action in reducer https://stackoverflow.com/questions/36730793/can-i-dispatch-an-action-in-reducer replace the useEffect => use redux-thunk middleware
// done access another slice in one slice => use redux-thunk middle
