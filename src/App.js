import { Landing, Register, Error, ProtectedRoute } from './pages/';
import { HashRouter, Routes, Route } from 'react-router-dom';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { AddJob, AllJobs, Stats, SharedLayout, Profile } from './pages/dashboard';

function App() {
	return (
		<HashRouter>
			<Routes>
				<Route
					path='/'
					element={
						<ProtectedRoute>
							<SharedLayout />
						</ProtectedRoute>
					}
				>
					<Route index element={<Stats />} />
					<Route path='all-jobs' element={<AllJobs />} />
					<Route path='add-job' element={<AddJob />} />
					<Route path='Profile' element={<Profile />} />
				</Route>
				<Route path='/landing' element={<Landing />} />
				<Route path='register' element={<Register />} />
				<Route path='*' element={<Error />} />
			</Routes>
			<ToastContainer position='top-center' />
		</HashRouter>
	);
}

export default App;

// TODO
// css modules: https://dev.to/myogeshchavan97/an-introduction-to-css-modules-in-react-2fkd
// createSlice has a name, and configureStore have the same property, where are they used?
// clear search form input if navigate to other pages

// deploy to github pages
// https://www.freecodecamp.org/news/deploy-a-react-app-to-github-pages/
