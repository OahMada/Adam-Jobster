import Wrapper from '../assets/wrappers/SmallSidebar';
import { useSelector, useDispatch } from 'react-redux';
import Logo from './Logo';
import { FaTimes } from 'react-icons/fa';
import { toggleSidebar } from '../features/user/userSlice';
import NavLinks from './NavLinks';

const SmallSidebar = () => {
	let dispatch = useDispatch();
	let { isSidebarOpen } = useSelector((store) => store.user);

	let toggle = () => {
		dispatch(toggleSidebar());
	};
	return (
		<Wrapper>
			<div className={`sidebar-container ${isSidebarOpen ? 'show-sidebar' : ''}`}>
				<div className='content'>
					<button className='close-btn' onClick={toggle}>
						<FaTimes />
					</button>
					<header>
						<Logo />
					</header>
					<NavLinks toggleSidebar={toggle} />
				</div>
			</div>
		</Wrapper>
	);
};

export default SmallSidebar;
