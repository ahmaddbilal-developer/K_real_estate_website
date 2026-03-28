import { useState, useEffect } from 'react';
import { useNavigate, useLocation, Link } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import { toast } from 'react-toastify';
import { FaCheck, FaTimes, FaEye, FaEyeSlash } from 'react-icons/fa';
import { GoogleLogin } from '@react-oauth/google';
import { jwtDecode } from 'jwt-decode';
import axios from 'axios';

const RegisterScreen = () => {
    const [name, setName] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [showPassword, setShowPassword] = useState(false);
    const [showConfirmPassword, setShowConfirmPassword] = useState(false);
    const [confirmPassword, setConfirmPassword] = useState('');

    // ... (rest of logic) ...



    const { register, userInfo } = useAuth();
    const navigate = useNavigate();
    const { search } = useLocation();

    const redirect = search ? search.split('=')[1] : '/';

    useEffect(() => {
        if (userInfo) {
            navigate(redirect);
        }
    }, [navigate, userInfo, redirect]);

    // Password validation checks
    const hasMinLength = password.length >= 8;
    const hasNumber = /\d/.test(password);
    const hasSpecialChar = /[!@#$%^&*]/.test(password);
    const passwordsMatch = password && confirmPassword && password === confirmPassword;

    const submitHandler = async (e) => {
        e.preventDefault();
        if (password !== confirmPassword) {
            toast.error('Passwords do not match');
            return;
        }
        if (!hasMinLength || !hasNumber || !hasSpecialChar) {
            toast.error('Please meet all password requirements');
            return;
        }
        try {
            await register(name, email, password);
            toast.success('Registered successfully');
            navigate(redirect);
        } catch (err) {
            toast.error(err.response?.data?.message || err.message);
        }
    };

    return (
        <div className="flex justify-center items-center py-10">
            <div className="w-full max-w-md bg-white p-8 rounded-xl shadow-lg">
                <h1 className="text-3xl font-heading font-bold text-center mb-6 text-primary">Sign Up</h1>
                <form onSubmit={submitHandler} className="space-y-4">
                    <div>
                        <label className="block text-gray-700 font-bold mb-2">Name</label>
                        <input
                            type="text"
                            className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:border-secondary"
                            placeholder="Enter name"
                            value={name}
                            onChange={(e) => setName(e.target.value)}
                            required
                        />
                    </div>
                    <div>
                        <label className="block text-gray-700 font-bold mb-2">Email Address</label>
                        <input
                            type="email"
                            className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:border-secondary"
                            placeholder="Enter email"
                            value={email}
                            onChange={(e) => setEmail(e.target.value)}
                            required
                        />
                    </div>
                    <div>
                        <label className="block text-gray-700 font-bold mb-2">Password</label>
                        <div className="relative">
                            <input
                                type={showPassword ? "text" : "password"}
                                className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:border-secondary pr-10"
                                placeholder="Enter password"
                                value={password}
                                onChange={(e) => setPassword(e.target.value)}
                                required
                            />
                            <button
                                type="button"
                                onClick={() => setShowPassword(!showPassword)}
                                className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400 hover:text-gray-600 focus:outline-none"
                            >
                                {showPassword ? <FaEyeSlash /> : <FaEye />}
                            </button>
                        </div>

                        {/* Password Strength Checklist */}
                        {password && (
                            <div className="mt-3 space-y-2 text-sm">
                                <div className={`flex items-center gap-2 ${hasMinLength ? 'text-green-600' : 'text-gray-400'}`}>
                                    {hasMinLength ? <FaCheck /> : <FaTimes />}
                                    <span>At least 8 characters</span>
                                </div>
                                <div className={`flex items-center gap-2 ${hasNumber ? 'text-green-600' : 'text-gray-400'}`}>
                                    {hasNumber ? <FaCheck /> : <FaTimes />}
                                    <span>Contains a number</span>
                                </div>
                                <div className={`flex items-center gap-2 ${hasSpecialChar ? 'text-green-600' : 'text-gray-400'}`}>
                                    {hasSpecialChar ? <FaCheck /> : <FaTimes />}
                                    <span>Contains special character (!@#$%^&*)</span>
                                </div>
                            </div>
                        )}
                    </div>
                    <div>
                        <label className="block text-gray-700 font-bold mb-2">Confirm Password</label>
                        <div className="relative">
                            <input
                                type={showConfirmPassword ? "text" : "password"}
                                className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:border-secondary pr-10"
                                placeholder="Confirm password"
                                value={confirmPassword}
                                onChange={(e) => setConfirmPassword(e.target.value)}
                                required
                            />
                            <button
                                type="button"
                                onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                                className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400 hover:text-gray-600 focus:outline-none"
                            >
                                {showConfirmPassword ? <FaEyeSlash /> : <FaEye />}
                            </button>
                        </div>

                        {/* Password Match Indicator */}
                        {confirmPassword && (
                            <div className={`mt-2 text-sm flex items-center gap-2 ${passwordsMatch ? 'text-green-600' : 'text-red-500'}`}>
                                {passwordsMatch ? <FaCheck /> : <FaTimes />}
                                <span>{passwordsMatch ? 'Passwords match' : 'Passwords do not match'}</span>
                            </div>
                        )}
                    </div>
                    <button type="submit" className="w-full bg-primary text-white py-3 rounded-lg font-bold hover:bg-opacity-90 transition">
                        Sign Up
                    </button>
                </form>

                <div className="mt-6 text-center text-gray-600">
                    Have an account? <Link to={redirect ? `/login?redirect=${redirect}` : '/login'} className="text-secondary font-bold hover:underline">Login</Link>
                </div>

                <div className="mt-6">
                    <div className="relative">
                        <div className="absolute inset-0 flex items-center">
                            <div className="w-full border-t border-gray-300"></div>
                        </div>
                        <div className="relative flex justify-center text-sm">
                            <span className="px-2 bg-white text-gray-500">Or sign up with</span>
                        </div>
                    </div>

                    <div className="mt-6 flex flex-col gap-3">
                        {/* Google Login */}
                        <GoogleLogin
                            onSuccess={async (credentialResponse) => {
                                try {
                                    const decoded = jwtDecode(credentialResponse.credential);
                                    await axios.post('/api/users/google', {
                                        email: decoded.email,
                                        name: decoded.name,
                                        googleId: decoded.sub,
                                        picture: decoded.picture
                                    }).then(res => {
                                        localStorage.setItem('userInfo', JSON.stringify(res.data));
                                        window.location.href = redirect;
                                    });
                                } catch (error) {
                                    console.error(error);
                                    toast.error('Google Sign Up Failed');
                                }
                            }}
                            onError={() => {
                                toast.error('Google Sign Up Failed');
                            }}
                            useOneTap
                        />


                    </div>
                </div>
            </div>
        </div>
    );
};

export default RegisterScreen;
