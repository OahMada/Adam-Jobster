import Wrapper from '../assets/wrappers/Navbar';
import { FaAlignLeft, FaUserCircle, FaCaretDown } from 'react-icons/fa';
import { useState } from 'react';
import Logo from './Logo';
import { useSelector, useDispatch } from 'react-redux';
import { toggleSidebar, clearStore } from '../features/user/userSlice';
import { removeUserFromLocalStorage } from '../utils/localStorage';
import { toast } from 'react-toastify';

const Navbar = () => {
	let { user } = useSelector((store) => store.user);
	let dispatch = useDispatch();
	let [showLogout, setShowLogout] = useState(false);

	let toggle = () => {
		dispatch(toggleSidebar());
	};

	let logOut = () => {
		dispatch(clearStore());
		removeUserFromLocalStorage();
		toast.success('logging out...');
	};

	return (
		<Wrapper>
			<div className='nav-center'>
				<button type='button' className='toggle-btn' onClick={toggle}>
					<FaAlignLeft />
				</button>
				<div>
					<Logo />
					<h3 className='logo-text'>dashboard</h3>
				</div>
				<div className='btn-container'>
					<button type='button' className='btn' onClick={() => setShowLogout(!showLogout)}>
						<FaUserCircle />
						{user?.name}
						<FaCaretDown />
					</button>
					<div className={`dropdown ${showLogout ? 'show-dropdown' : ''}`}>
						<button type='buttonx' className='dropdown-btn' onClick={logOut}>
							logout
						</button>
					</div>
				</div>
			</div>
		</Wrapper>
	);
};

export default Navbar;
