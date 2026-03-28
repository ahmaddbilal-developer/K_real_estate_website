import { useState } from 'react';
import { Link } from 'react-router-dom';
import axios from 'axios';
import { toast } from 'react-toastify';
import { FaEnvelope } from 'react-icons/fa';

const ForgotPasswordScreen = () => {
    const [email, setEmail] = useState('');
    const [loading, setLoading] = useState(false);
    const [emailSent, setEmailSent] = useState(false);

    const submitHandler = async (e) => {
        e.preventDefault();
        setLoading(true);
        try {
            await axios.post('/api/users/forgot-password', { email });
            setEmailSent(true);
            toast.success('Reset link sent to your email');
            setLoading(false);
        } catch (err) {
            toast.error(err.response?.data?.message || err.message);
            setLoading(false);
        }
    };

    return (
        <div className="min-h-screen bg-gray-100 flex flex-col justify-center items-center py-12 px-6 lg:px-8">
            <div className="sm:mx-auto sm:w-full sm:max-w-md">
                <h2 className="mt-6 text-center text-3xl font-heading font-bold text-gray-900">
                    Forgot Password
                </h2>
                <p className="mt-2 text-center text-sm text-gray-600">
                    Enter your email address to receive a reset link.
                </p>
            </div>

            <div className="mt-8 sm:mx-auto sm:w-full sm:max-w-md">
                <div className="bg-white py-8 px-4 shadow sm:rounded-lg sm:px-10 border-t-4 border-primary">
                    {emailSent ? (
                        <div className="text-center">
                            <div className="mx-auto flex items-center justify-center h-12 w-12 rounded-full bg-green-100 mb-4">
                                <FaEnvelope className="h-6 w-6 text-green-600" />
                            </div>
                            <h3 className="text-lg font-medium text-gray-900">Check your email</h3>
                            <p className="mt-2 text-sm text-gray-500">
                                We sent a password reset link to <strong>{email}</strong>.
                                Please check your inbox (and spam folder) and follow the instructions.
                            </p>
                            <div className="mt-6">
                                <Link to="/login" className="font-medium text-primary hover:text-secondary">
                                    Return to Login
                                </Link>
                            </div>
                        </div>
                    ) : (
                        <form className="space-y-6" onSubmit={submitHandler}>
                            <div>
                                <label htmlFor="email" className="block text-sm font-medium text-gray-700">
                                    Email address
                                </label>
                                <div className="mt-1">
                                    <input
                                        id="email"
                                        name="email"
                                        type="email"
                                        autoComplete="email"
                                        required
                                        className="appearance-none block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm placeholder-gray-400 focus:outline-none focus:ring-secondary focus:border-secondary sm:text-sm"
                                        value={email}
                                        onChange={(e) => setEmail(e.target.value)}
                                    />
                                </div>
                            </div>

                            <div>
                                <button
                                    type="submit"
                                    disabled={loading}
                                    className={`w-full flex justify-center py-2 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-primary hover:bg-opacity-90 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-secondary ${loading ? 'opacity-70 cursor-not-allowed' : ''}`}
                                >
                                    {loading ? 'Sending...' : 'Send Reset Link'}
                                </button>
                            </div>
                        </form>
                    )}

                    {!emailSent && (
                        <div className="mt-6">
                            <div className="relative">
                                <div className="absolute inset-0 flex items-center">
                                    <div className="w-full border-t border-gray-300"></div>
                                </div>
                                <div className="relative flex justify-center text-sm">
                                    <span className="px-2 bg-white text-gray-500">
                                        Remember your password?
                                    </span>
                                </div>
                            </div>

                            <div className="mt-6 text-center">
                                <Link to="/login" className="font-medium text-primary hover:text-secondary">
                                    Sign in
                                </Link>
                            </div>
                        </div>
                    )}
                </div>
            </div>
        </div>
    );
};

export default ForgotPasswordScreen;
