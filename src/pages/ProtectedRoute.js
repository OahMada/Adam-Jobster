import { Navigate } from 'react-router-dom';
import { useSelector } from 'react-redux';

var ProtectedRoute = ({ children }) => {
	let { user } = useSelector((store) => store.user);
	if (!user) {
		return <Navigate to='/landing' />;
	}
	return children;
};

export default ProtectedRoute;
