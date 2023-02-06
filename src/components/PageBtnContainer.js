import { useSelector, useDispatch } from 'react-redux';
import Wrapper from '../assets/wrappers/PageBtnContainer';
import { HiChevronDoubleLeft, HiChevronDoubleRight } from 'react-icons/hi';
import { handleChangePage } from '../features/allJobs/allJobsSlice';

const PageBtnContainer = () => {
	let { page, numOfPages } = useSelector((store) => store.allJobs);
	let dispatch = useDispatch();

	let pages = Array.from({ length: numOfPages }, (_, index) => index + 1);
	let nextPage = () => {
		let newPage = page + 1;
		if (newPage > numOfPages) {
			newPage = numOfPages;
		}
		dispatch(handleChangePage(newPage));
	};
	let prevPage = () => {
		let newPage = page - 1;
		if (newPage < 1) {
			newPage = 1;
		}
		dispatch(handleChangePage(newPage));
	};

	return (
		<Wrapper>
			<button type='button' className='prev-btn' onClick={prevPage}>
				<HiChevronDoubleLeft />
				prev
			</button>
			<div className='btn-container'>
				{pages.map((pageNumber) => {
					return (
						<button
							type='button'
							key={pageNumber}
							onClick={() => dispatch(handleChangePage(pageNumber))}
							className={`pageBtn ${pageNumber === page && 'active'}`}
						>
							{pageNumber}
						</button>
					);
				})}
			</div>
			<button type='button' className='next-btn' onClick={nextPage}>
				next
				<HiChevronDoubleRight />
			</button>
		</Wrapper>
	);
};
export default PageBtnContainer;
