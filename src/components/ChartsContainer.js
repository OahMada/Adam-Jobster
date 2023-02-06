import { useSelector } from 'react-redux';
import AreaChart from './AreaChart';
import BarChart from './BarChart';
import Wrapper from '../assets/wrappers/ChartsContainer';
import { useState } from 'react';

const ChartsContainer = () => {
	let [barChart, setBarChart] = useState(true);
	let { monthlyApplications: data } = useSelector((store) => store.allJobs);
	return (
		<Wrapper>
			<h4>monthly applications</h4>
			<button type='button' onClick={() => setBarChart(!barChart)}>
				{barChart ? 'area chart' : 'bar chart'}
			</button>
			{barChart ? <BarChart data={data} /> : <AreaChart data={data} />}
		</Wrapper>
	);
};

export default ChartsContainer;
