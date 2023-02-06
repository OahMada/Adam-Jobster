import { FormRow, FormRowSelect } from '.';
import Wrapper from '../assets/wrappers/SearchContainer';
import { useSelector, useDispatch } from 'react-redux';
import { handleChange, clearFilters } from '../features/allJobs/allJobsSlice';
import { useState, useEffect } from 'react';

const SearchContainer = () => {
	let { searchStatus, searchType, sort, sortOptions, isLoading } = useSelector((store) => store.allJobs);
	let { statusOptions, jobTypeOptions } = useSelector((store) => store.job);
	let dispatch = useDispatch();
	let [localSearch, setLocalSearch] = useState('');

	let handleSearch = (e) => {
		let name = e.target.name;
		let value = e.target.value;
		dispatch(handleChange({ name, value }));
	};
	let handleSubmit = (e) => {
		e.preventDefault();
		setLocalSearch('');
		dispatch(clearFilters());
	};

	// var debounce = () => {
	// 	let timeoutId;
	// 	return (e) => {
	// 		setLocalSearch(e.target.value); // is it really needed?
	// 		clearTimeout(timeoutId);
	// 		timeoutId = setTimeout(() => {
	// 			dispatch(handleChange({ name: 'search', value: e.target.value }));
	// 		}, 1000);
	// 	};
	// };

	useEffect(() => {
		let timeoutId = setTimeout(() => {
			dispatch(handleChange({ name: 'search', value: localSearch }));
		}, 1000);
		return () => clearTimeout(timeoutId);
	}, [localSearch, dispatch]);

	return (
		<Wrapper>
			<form className='form'>
				<h4>search form</h4>
				<div className='form-center'>
					<FormRow type='text' name='search' value={localSearch} handleChange={(e) => setLocalSearch(e.target.value)} />
					<FormRowSelect
						labelText='status'
						name='searchStatus'
						value={searchStatus}
						handleChange={handleSearch}
						list={['all', ...statusOptions]}
					/>
					<FormRowSelect
						labelText='type'
						name='searchType'
						value={searchType}
						handleChange={handleSearch}
						list={['all', ...jobTypeOptions]}
					/>
					<FormRowSelect name='sort' value={sort} handleChange={handleSearch} list={sortOptions} />
					<button className='btn btn-block btn-danger' disabled={isLoading} onClick={handleSubmit}>
						clear filters
					</button>
				</div>
			</form>
		</Wrapper>
	);
};

export default SearchContainer;
