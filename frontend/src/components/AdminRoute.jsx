import { Navigate, Outlet } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';

const AdminRoute = () => {
    const { adminInfo } = useAuth();

    return adminInfo && adminInfo.role === 'admin' ? <Outlet /> : <Navigate to="/admin/login" replace />;
};

export default AdminRoute;
