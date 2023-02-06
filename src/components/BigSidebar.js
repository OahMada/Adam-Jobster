import Wrapper from '../assets/wrappers/BigSidebar';
import { useSelector } from 'react-redux';
import Logo from './Logo';
import NavLinks from './NavLinks';

const BigSidebar = () => {
	let { isSidebarOpen } = useSelector((store) => store.user);
	return (
		<Wrapper>
			<div className={`sidebar-container ${isSidebarOpen ? '' : 'show-sidebar'}`}>
				<div className='content'>
					<header>
						<Logo />
					</header>
					<NavLinks />
				</div>
			</div>
		</Wrapper>
	);
};

export default BigSidebar;
