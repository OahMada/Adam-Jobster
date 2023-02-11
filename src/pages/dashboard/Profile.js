// import { useState } from 'react';
import { FormRow } from '../../components/';
import { useDispatch, useSelector } from 'react-redux';
import Wrapper from '../../assets/wrappers/DashboardFormPage';
import { toast } from 'react-toastify';
import { updateUser, handleUserChange } from '../../features/user/userSlice';
import { handleChange as handleJobChange } from '../../features/job/jobSlice';
import { addUserToLocalStorage } from '../../utils/localStorage';

const Profile = () => {
	let { isLoading, user } = useSelector((store) => store.user);
	let dispatch = useDispatch();

	let handleSubmit = async (e) => {
		e.preventDefault();
		let { name, email, lastName, location } = user;
		if (!name || !email || !lastName || !location) {
			toast.error('please fill out all fields');
		}
		try {
			let { user } = await dispatch(updateUser({ name, email, lastName, location })).unwrap();
			dispatch(handleJobChange({ name: 'jobLocation', value: user.location }));
			addUserToLocalStorage(user);
			toast.success('user updated');
		} catch (error) {
			toast.error(error);
		}
		// why a promise get returned?

		// https://redux.js.org/tutorials/fundamentals/part-4-store#using-middleware
		// Any middleware can return any value, and the return value from the first middleware in the pipeline is actually returned when you call store.dispatch().

		// https://redux.js.org/usage/writing-logic-thunks#how-does-the-middleware-work
		// If you pass a function into dispatch, the thunk middleware sees that it's a function instead of an action object, intercepts it, and calls that function with (dispatch, getState) as its arguments

		//redux-toolkit.js.org/api/createAsyncThunk#return-value
		// When dispatched, the thunk will: ... Return a fulfilled promise containing the final dispatched action (either the fulfilled or rejected action object)
	};

	// let updateJobLocationRightAway = (location) => {
	// 	return (dispatch) => {
	// 		dispatch(handleJobChange({ name: 'jobLocation', value: location }));
	// 	};
	// };

	let handleChange = (e) => {
		let name = e.target.name;
		let value = e.target.value;
		dispatch(handleUserChange({ name, value }));
	};
	return (
		<Wrapper>
			<form className='form' onSubmit={handleSubmit}>
				<h3>profile</h3>
				<div className='form-center'>
					<FormRow type='text' name='name' value={user.name} handleChange={handleChange} />
					<FormRow
						type='text'
						labelText='last name'
						name='lastName'
						value={user.lastName}
						handleChange={handleChange}
					/>
					<FormRow type='email' name='email' value={user.email} handleChange={handleChange} />
					<FormRow type='text' name='location' value={user.location} handleChange={handleChange} />
					<button type='submit' className='btn btn-block' disabled={isLoading}>
						{isLoading ? 'please wait...' : 'save changes'}
					</button>
				</div>
			</form>
		</Wrapper>
	);
};

export default Profile;

// done update slice state right away?
