import { useState } from 'react';
import { Link } from 'react-router-dom';
import axios from 'axios';
import { toast } from 'react-toastify';
import { FaShieldAlt, FaArrowLeft } from 'react-icons/fa';

const AdminForgotPasswordScreen = () => {
    const [email, setEmail] = useState('');
    const [loading, setLoading] = useState(false);
    const [emailSent, setEmailSent] = useState(false);

    const submitHandler = async (e) => {
        e.preventDefault();
        setLoading(true);
        try {
            // We can send an extra flag if we want strictly admin logic in backend, 
            // but for now relying on user role lookup is sufficient, or we pass a query param?
            // Let's just hit the same endpoint, the backend will identify the user role and send appropriate email.
            await axios.post('/api/users/forgot-password', { email });
            setEmailSent(true);
            toast.success('Admin reset link sent');
            setLoading(false);
        } catch (err) {
            toast.error('Error: ' + (err.response?.data?.message || err.message));
            setLoading(false);
        }
    };

    return (
        <div className="min-h-screen flex items-center justify-center bg-gray-900 px-4">
            <div className="max-w-md w-full bg-gray-800 rounded-lg shadow-2xl overflow-hidden border border-gray-700">
                <div className="p-8">
                    <div className="text-center mb-8">
                        <div className="inline-block p-3 rounded-full bg-red-900/30 text-red-500 mb-4 border border-red-500/30">
                            <FaShieldAlt size={32} />
                        </div>
                        <h2 className="text-2xl font-bold text-white">Admin Recovery</h2>
                        <p className="text-gray-400 text-sm mt-2">Reset your administrative access</p>
                    </div>

                    {emailSent ? (
                        <div className="text-center">
                            <div className="bg-green-900/30 border border-green-500/30 text-green-400 p-4 rounded-lg mb-6">
                                <p className="font-bold">Check your inbox</p>
                                <p className="text-sm mt-1">We've sent a secure reset link to {email}</p>
                            </div>
                            <Link to="/admin/login" className="block w-full text-center text-gray-400 hover:text-white transition text-sm">
                                <FaArrowLeft className="inline mr-2" /> Back to Admin Login
                            </Link>
                        </div>
                    ) : (
                        <form onSubmit={submitHandler}>
                            <div className="mb-6">
                                <label htmlFor="email" className="block text-gray-400 text-sm font-bold mb-2">Admin Email</label>
                                <input
                                    type="email"
                                    id="email"
                                    className="w-full bg-gray-700 border border-gray-600 text-white rounded-lg px-4 py-3 focus:outline-none focus:border-red-500 focus:ring-1 focus:ring-red-500 placeholder-gray-500 transition"
                                    placeholder="admin@krealestate.com"
                                    value={email}
                                    onChange={(e) => setEmail(e.target.value)}
                                    required
                                />
                            </div>

                            <button
                                type="submit"
                                disabled={loading}
                                className={`w-full bg-gradient-to-r from-red-600 to-red-700 hover:from-red-500 hover:to-red-600 text-white font-bold py-3 px-4 rounded-lg shadow-lg transform transition hover:scale-[1.02] ${loading ? 'opacity-50 cursor-not-allowed' : ''}`}
                            >
                                {loading ? 'Processing...' : 'Send Recovery Link'}
                            </button>

                            <div className="mt-6 text-center">
                                <Link to="/admin/login" className="text-gray-500 hover:text-gray-300 text-sm transition">
                                    Return to Login
                                </Link>
                            </div>
                        </form>
                    )}
                </div>
                <div className="bg-gray-900/50 p-4 border-t border-gray-700 text-center">
                    <p className="text-xs text-gray-500">Secure Administrative System</p>
                </div>
            </div>
        </div>
    );
};

export default AdminForgotPasswordScreen;
