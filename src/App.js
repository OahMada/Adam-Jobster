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

// done css modules: https://dev.to/myogeshchavan97/an-introduction-to-css-modules-in-react-2fkd

// done createSlice has a name, and configureStore have the same property, where are they used?
// https://redux-toolkit.js.org/api/createSlice#name
// The state produced by combineReducers() namespaces the states of each reducer under their keys as passed to combineReducers() https://redux.js.org/api/combinereducers

// done clear search form input if navigate to other pages

// done deploy to github pages
// https://medium.com/@bennirus/deploying-a-create-react-app-with-routing-to-github-pages-f386b6ce84c2
// https://stackoverflow.com/questions/71984401/react-router-not-working-with-github-pages
