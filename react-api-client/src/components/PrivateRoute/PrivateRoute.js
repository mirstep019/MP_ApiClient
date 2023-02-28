import { Navigate } from 'react-router-dom';

export default function PrivateRoute({children}) {
    const isAuthenticated = localStorage.getItem('jwt') !== null;
    return (
        isAuthenticated ? children : <Navigate to='/login'/>  
    )
}
