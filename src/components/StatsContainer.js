import StatItem from './StatItem';
import { useSelector } from 'react-redux';
import Wrapper from '../assets/wrappers/StatsContainer';
import { FaSuitcaseRolling, FaCalendarCheck, FaBug } from 'react-icons/fa';

const StatsContainer = () => {
	let { stats } = useSelector((store) => store.allJobs);

	let defaultStats = [
		{
			title: 'pending applications',
			count: stats.pending || 0,
			icon: <FaSuitcaseRolling />,
			color: '#e9b949',
			bcg: '#fcefc7',
		},
		{
			title: 'interviews scheduled',
			count: stats.interview || 0,
			icon: <FaCalendarCheck />,
			color: '#647acb',
			bcg: '#e0e8f9',
		},
		{
			title: 'jobs declined',
			count: stats.declined || 0,
			icon: <FaBug />,
			color: '#d66a6a',
			bcg: '#ffeeee',
		},
	];

	return (
		<Wrapper>
			{defaultStats.map((item, index) => {
				return <StatItem key={index} {...item} />;
			})}
		</Wrapper>
	);
};

export default StatsContainer;
