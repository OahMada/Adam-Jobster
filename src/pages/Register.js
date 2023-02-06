import { useState, useEffect } from 'react';
import { Logo, FormRow } from '../components';
import Wrapper from '../assets/wrappers/RegisterPage';
import { toast } from 'react-toastify';
import { registerUser, loginUser } from '../features/user/userSlice';
import { useSelector, useDispatch } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { handleChange as handleJobChange } from '../features/job/jobSlice';
import { addUserToLocalStorage } from '../utils/localStorage';

var initialState = {
	name: '',
	email: '',
	password: '',
	isMember: true,
};

const Register = () => {
	let dispatch = useDispatch();
	let { user, isLoading } = useSelector((store) => store.user);

	let navigate = useNavigate();

	let [values, setValues] = useState(initialState);

	useEffect(() => {
		if (user) {
			setTimeout(() => {
				navigate('/');
			}, 2000);
		}
		// eslint-disable-next-line react-hooks/exhaustive-deps
	}, [user]);

	let handleChange = (e) => {
		let name = e.target.name;
		let value = e.target.value;
		setValues({ ...values, [name]: value });
	};

	let handleSubmit = async (e) => {
		e.preventDefault();
		let { name, email, password, isMember } = values;

		if (e.target.dataset.loginType !== 'demo' && (!email || !password || (!isMember && !name))) {
			toast.error('please fill out all the fields');
			return;
		}
		if (isMember) {
			try {
				let user;
				if (e.target.dataset.loginType === 'demo') {
					({ user } = await dispatch(loginUser({ email: 'testUser@test.com', password: 'secret' })).unwrap());
				} else {
					({ user } = await dispatch(loginUser({ email, password })).unwrap());
				}
				dispatch(handleJobChange({ name: 'jobLocation', value: user.location }));
				addUserToLocalStorage(user);

				toast.success(`welcome back, ${user.name}`);
			} catch (error) {
				toast.error(error);
			}
			return;
		}
		try {
			let { user } = await dispatch(registerUser({ name, email, password })).unwrap();
			dispatch(handleJobChange({ name: 'jobLocation', value: user.location }));
			addUserToLocalStorage(user);
			toast.success(`welcome, ${user.name}`);
		} catch (error) {
			toast.error(error);
		}
	};

	let toggleMember = () => {
		setValues({ ...values, isMember: !values.isMember });
	};

	return (
		<Wrapper className='full-page'>
			<form className='form' onSubmit={handleSubmit}>
				<Logo />
				<h3>{values.isMember ? 'login' : 'register'}</h3>
				{!values.isMember && <FormRow type='text' name='name' handleChange={handleChange} value={values.name} />}
				<FormRow type='email' name='email' handleChange={handleChange} value={values.email} />
				<FormRow type='password' name='password' handleChange={handleChange} value={values.password} />
				<button type='submit' className='btn btn-block' disabled={isLoading}>
					submit
				</button>
				<button
					type='button'
					className='btn btn-block btn-hipster'
					data-login-type='demo'
					disabled={isLoading}
					onClick={handleSubmit}
				>
					demo
				</button>
				<p>
					{values.isMember ? 'Not a member yet?' : 'Already a member?'}
					<button type='button' onClick={toggleMember} className='member-btn' disabled={isLoading}>
						{values.isMember ? 'Register' : 'Login'}
					</button>
				</p>
			</form>
		</Wrapper>
	);
};

export default Register;
