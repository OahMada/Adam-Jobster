import { FaLocationArrow, FaBriefcase, FaCalendarAlt } from 'react-icons/fa';
import { Link } from 'react-router-dom';
import Wrapper from '../assets/wrappers/Job';
import { useDispatch, useSelector } from 'react-redux';
import JobInfo from './JobInfo';
import moment from 'moment';
import { deleteJob, setEditJob } from '../features/job/jobSlice';
import { toast } from 'react-toastify';
import {
	updateJobs,
	// getAllJobs
} from '../features/allJobs/allJobsSlice';

const Job = ({ _id, position, company, jobLocation, jobType, createdAt, status }) => {
	let dispatch = useDispatch();
	let { isLoading } = useSelector((store) => store.job);
	let date = moment(createdAt).format('MMM do, YY');

	let handleDeleteJob = async (jobId) => {
		try {
			let { msg } = await dispatch(deleteJob(jobId)).unwrap();
			dispatch(updateJobs(_id));
			// await dispatch(getAllJobs()).unwrap();
			toast.success(msg);
		} catch (error) {
			toast.error(error);
		}
	};

	return (
		<Wrapper>
			<header>
				<div className='main-icon'>{company.charAt(0)}</div>
				<div className='info'>
					<h5>{position}</h5>
					<p>{company}</p>
				</div>
			</header>
			<div className='content'>
				<div className='content-center'>
					<JobInfo icon={<FaLocationArrow />} text={jobLocation} />
					<JobInfo icon={<FaCalendarAlt />} text={date} />
					<JobInfo icon={<FaBriefcase />} text={jobType} />
					<div className={`status ${status}`}>{status}</div>
				</div>
				<footer>
					<div className='actions'>
						<Link
							to='/add-job'
							className='btn edit-btn'
							onClick={() => dispatch(setEditJob({ position, company, jobLocation, jobType, status, editJobId: _id }))}
						>
							edit
						</Link>
						<button
							className='btn delete-btn'
							onClick={() => {
								handleDeleteJob(_id);
							}}
							type='button'
							disabled={isLoading}
						>
							delete
						</button>
					</div>
				</footer>
			</div>
		</Wrapper>
	);
};

export default Job;
