import main from '../assets/images/main.svg';
import Wrapper from '../assets/wrappers/LandingPage';
import { Logo } from '../components/index';
import { Link } from 'react-router-dom';

const Landing = () => {
	return (
		<Wrapper>
			<nav>
				<Logo />
			</nav>
			<div className='container page'>
				<div className='info'>
					<h1>
						job <span>tracking</span> app
					</h1>
					<p>
						Bodega boys tofu DSA celiac, beard salvia palo santo chambray. Cronut fashion axe ramps gluten-free tonx.
						Bodega boys pitchfork blue bottle, chartreuse microdosing sartorial health goth narwhal quinoa twee
						vibecession single-origin coffee retro direct trade DSA. Jean shorts salvia art party gluten-free whatever
						blue bottle.
					</p>
					<Link to='/register' className='btn btn-hero'>
						login/Register
					</Link>
				</div>
				<img src={main} alt='job hunt' className='img main-img' />
			</div>
		</Wrapper>
	);
};

export default Landing;
