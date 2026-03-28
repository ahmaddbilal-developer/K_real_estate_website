import { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useAuth } from '../../context/AuthContext';
import { toast } from 'react-toastify';
import { FaUserShield, FaLock, FaEye, FaEyeSlash } from 'react-icons/fa';

const AdminLoginScreen = () => {
    const [email, setEmail] = useState('');
    const [showPassword, setShowPassword] = useState(false);

    // ...

    <div>
        <label className="block text-gray-300 text-sm font-bold mb-2" htmlFor="password">
            Password
        </label>
        <div className="relative">
            <input
                type={showPassword ? "text" : "password"}
                id="password"
                placeholder="Enter password"
                className="w-full px-4 py-3 rounded bg-gray-700 text-white border border-gray-600 focus:border-secondary focus:outline-none focus:ring-1 focus:ring-secondary transition pr-10"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
            />
            <button
                type="button"
                onClick={() => setShowPassword(!showPassword)}
                className="absolute right-3 top-3.5 text-gray-500 hover:text-gray-300 focus:outline-none"
            >
                {showPassword ? <FaEyeSlash /> : <FaEye />}
            </button>
        </div>
    </div>

    const navigate = useNavigate();
    const { adminLogin, adminInfo } = useAuth();

    // Redirect if already logged in as admin
    useEffect(() => {
        if (adminInfo) {
            navigate('/admin/dashboard');
        }
    }, [navigate, adminInfo]);

    const submitHandler = async (e) => {
        e.preventDefault();
        try {
            await adminLogin(email, password);
            navigate('/admin/dashboard');
        } catch (err) {
            toast.error(err.response?.data?.message || err.message);
        }
    };

    return (
        <div className="min-h-screen bg-gray-900 flex items-center justify-center px-4">
            <div className="max-w-md w-full bg-gray-800 rounded-lg shadow-2xl overflow-hidden">
                <div className="px-8 py-6 border-b border-gray-700 bg-gray-800">
                    <div className="flex justify-center mb-4">
                        <div className="bg-primary p-4 rounded-full">
                            <FaUserShield className="text-3xl text-secondary" />
                        </div>
                    </div>
                    <h2 className="text-center text-2xl font-bold text-white">Admin Control Panel</h2>
                    <p className="text-center text-gray-400 mt-2">Sign in to manage the platform</p>
                </div>

                <div className="p-8 bg-gray-800">
                    <form onSubmit={submitHandler} className="space-y-6">
                        <div>
                            <label className="block text-gray-300 text-sm font-bold mb-2" htmlFor="email">
                                Email Address
                            </label>
                            <input
                                type="email"
                                id="email"
                                placeholder="admin@example.com"
                                className="w-full px-4 py-3 rounded bg-gray-700 text-white border border-gray-600 focus:border-secondary focus:outline-none focus:ring-1 focus:ring-secondary transition"
                                value={email}
                                onChange={(e) => setEmail(e.target.value)}
                            />
                        </div>

                        <div>
                            <label className="block text-gray-300 text-sm font-bold mb-2" htmlFor="password">
                                Password
                            </label>
                            <div className="relative">
                                <input
                                    type="password"
                                    id="password"
                                    placeholder="Enter password"
                                    className="w-full px-4 py-3 rounded bg-gray-700 text-white border border-gray-600 focus:border-secondary focus:outline-none focus:ring-1 focus:ring-secondary transition"
                                    value={password}
                                    onChange={(e) => setPassword(e.target.value)}
                                />
                                <FaLock className="absolute right-3 top-3.5 text-gray-500" />
                            </div>
                        </div>

                        <div className="flex items-center justify-between mb-6">
                            <div className="text-sm">
                                <Link to="/admin/forgot-password" className="font-medium text-secondary hover:text-secondary/80">
                                    Forgot your password?
                                </Link>
                            </div>
                        </div>

                        <button
                            type="submit"
                            className="w-full bg-secondary text-primary font-bold py-3 px-4 rounded-lg hover:bg-opacity-90 transition transform hover:scale-[1.02] shadow-lg mb-4"
                        >
                            Access Dashboard
                        </button>
                    </form>

                    {/* Default Credentials Notice */}
                    <div className="mt-6 p-4 bg-yellow-900/30 border border-yellow-600/50 rounded-lg">
                        <p className="text-yellow-400 text-sm font-bold mb-2">⚠️ Admin Access Only</p>
                        <p className="text-gray-300 text-xs mb-3">Only authorized administrators can access this panel.</p>

                        <p className="text-xs text-gray-500 mt-2 italic">* Change these credentials after first login</p>
                    </div>
                </div>
                <div className="px-8 py-4 bg-gray-900 border-t border-gray-700 text-center">
                    <Link to="/" className="text-sm text-gray-400 hover:text-white transition">
                        &larr; Back to Website
                    </Link>
                </div>
            </div>
        </div>
    );
};

export default AdminLoginScreen;
