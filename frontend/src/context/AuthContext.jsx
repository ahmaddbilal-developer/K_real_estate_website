import { createContext, useContext, useState, useEffect } from 'react';
import axios from 'axios';

const AuthContext = createContext();

export const useAuth = () => useContext(AuthContext);

export const AuthProvider = ({ children }) => {
    const [userInfo, setUserInfo] = useState(
        localStorage.getItem('userInfo') ? JSON.parse(localStorage.getItem('userInfo')) : null
    );

    const [adminInfo, setAdminInfo] = useState(
        localStorage.getItem('adminInfo') ? JSON.parse(localStorage.getItem('adminInfo')) : null
    );

    // Axios config to include credentials (cookies) in every request
    axios.defaults.withCredentials = true;

    // --- User Auth ---
    const login = async (email, password) => {
        const { data } = await axios.post('/api/users/auth', { email, password });
        setUserInfo(data);
        localStorage.setItem('userInfo', JSON.stringify(data));

        // If user is also admin, strictly separating sessions means we DO NOT set adminInfo here.
        // User must login via Admin Panel to get adminInfo state.
    };

    const register = async (name, email, password) => {
        const { data } = await axios.post('/api/users', { name, email, password });
        setUserInfo(data);
        localStorage.setItem('userInfo', JSON.stringify(data));
    };

    const logout = async () => {
        // This hits the backend endpoint which clears the 'jwt' cookie.
        // BEWARE: This will technically log out both because cookie is shared.
        await axios.post('/api/users/logout');

        // Clear ALL local auth state to stay in sync with cleared cookie
        setUserInfo(null);
        setAdminInfo(null);
        localStorage.removeItem('userInfo');
        localStorage.removeItem('adminInfo');
    };

    // --- Admin Auth ---
    const adminLogin = async (email, password) => {
        // We reuse the same endpoint but handle state differently
        const { data } = await axios.post('/api/users/auth', { email, password });

        if (data.role !== 'admin') {
            throw new Error('Not authorized as admin');
        }

        setAdminInfo(data);
        localStorage.setItem('adminInfo', JSON.stringify(data));

        // Also update userInfo so the main site knows we are logged in (as admin)
        setUserInfo(data);
        localStorage.setItem('userInfo', JSON.stringify(data));
    };

    const adminLogout = async () => {
        await axios.post('/api/users/logout');

        // Clear ALL local auth state
        setUserInfo(null);
        setAdminInfo(null);
        localStorage.removeItem('userInfo');
        localStorage.removeItem('adminInfo');
    };

    return (
        <AuthContext.Provider value={{
            userInfo, login, register, logout,
            adminInfo, adminLogin, adminLogout
        }}>
            {children}
        </AuthContext.Provider>
    );
};
