import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { showStats } from '../../features/allJobs/allJobsSlice';
import { toast } from 'react-toastify';
import { ChartsContainer, StatsContainer, Loading } from '../../components/';

const Stats = () => {
	let dispatch = useDispatch();
	let { isLoading, monthlyApplications } = useSelector((store) => store.allJobs);

	useEffect(() => {
		let fetchStats = async () => {
			try {
				await dispatch(showStats()).unwrap();
			} catch (error) {
				toast.error(error);
			}
		};
		fetchStats();
		// eslint-disable-next-line react-hooks/exhaustive-deps
	}, []);

	if (isLoading) {
		return <Loading center />;
	}

	return (
		<>
			<StatsContainer />
			{monthlyApplications.length > 0 && <ChartsContainer />}
		</>
	);
};

export default Stats;
