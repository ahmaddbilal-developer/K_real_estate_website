import { useState, useEffect } from 'react';
import { useAuth } from '../context/AuthContext';
import axios from 'axios';
import { toast } from 'react-toastify';
import { FaCheck, FaTimes, FaEye, FaEyeSlash } from 'react-icons/fa';

const ProfileScreen = () => {
    const { userInfo, logout } = useAuth(); // Assuming we update context to handle profile update roughly

    // Local state for form
    const [name, setName] = useState('');
    const [email, setEmail] = useState('');
    const [oldPassword, setOldPassword] = useState('');
    const [password, setPassword] = useState('');
    const [confirmPassword, setConfirmPassword] = useState('');

    const [deletePassword, setDeletePassword] = useState('');
    const [showDeleteModal, setShowDeleteModal] = useState(false);

    // Password Visibility State
    const [showOldPassword, setShowOldPassword] = useState(false);
    const [showPassword, setShowPassword] = useState(false);
    const [showConfirmPassword, setShowConfirmPassword] = useState(false);

    useEffect(() => {
        if (userInfo) {
            setName(userInfo.name);
            setEmail(userInfo.email);
        }
    }, [userInfo]);

    const deleteAccountHandler = async () => {
        try {
            await axios.delete('/api/users/profile', {
                data: { password: deletePassword }
            });
            setShowDeleteModal(false);
            logout(); // Reuse existing logout which clears local storage
            toast.success('Account closed successfully');
        } catch (err) {
            toast.error(err.response?.data?.message || err.message);
        }
    };

    const submitHandler = async (e) => {
        e.preventDefault();

        // Password Validation
        if (password) {
            if (password !== confirmPassword) {
                toast.error('Passwords do not match');
                return;
            }
            // Strong Password Regex: At least 8 chars, 1 number, 1 special char
            const strongPasswordRegex = /^(?=.*[0-9])(?=.*[!@#$%^&*])[a-zA-Z0-9!@#$%^&*]{8,}$/;
            if (!strongPasswordRegex.test(password)) {
                toast.error('Password must be at least 8 characters and contain a number and a special character (@, #, $, etc.)');
                return;
            }
            if (!oldPassword) {
                toast.error('Please enter your old password to set a new one');
                return;
            }
        }

        try {
            const { data } = await axios.put('/api/users/profile', {
                name,
                // email, // Email cannot be updated
                oldPassword,
                password,
            });
            toast.success('Profile updated successfully');
            localStorage.setItem('userInfo', JSON.stringify({ ...userInfo, ...data }));
            setOldPassword('');
            setPassword('');
            setConfirmPassword('');
        } catch (err) {
            toast.error(err.response?.data?.message || err.message);
        }
    };

    return (
        <div className="container mx-auto px-4 py-8 max-w-lg">
            <h1 className="text-3xl font-heading font-bold mb-6 text-primary">My Profile</h1>
            <div className="bg-white p-8 rounded-xl shadow-lg">
                {userInfo && userInfo.role === 'admin' ? (
                    <div className="text-center space-y-6">
                        <div className="text-6xl mb-4">🛡️</div>
                        <h2 className="text-2xl font-bold text-gray-800">Admin Profile</h2>
                        <div className="bg-yellow-50 p-4 rounded-lg border border-yellow-200">
                            <p className="text-yellow-800">
                                <strong>Note:</strong> Administrator profiles cannot be updated from the user dashboard.
                            </p>
                        </div>
                        <div className="text-left space-y-4">
                            <div>
                                <label className="block text-gray-500 font-bold mb-1">Name</label>
                                <p className="text-lg font-semibold text-gray-800">{userInfo.name}</p>
                            </div>
                            <div>
                                <label className="block text-gray-500 font-bold mb-1">Email</label>
                                <p className="text-lg font-semibold text-gray-800">{userInfo.email}</p>
                            </div>
                            <div>
                                <label className="block text-gray-500 font-bold mb-1">Role</label>
                                <span className="bg-primary text-secondary text-xs px-2 py-1 rounded font-bold uppercase tracking-wide">Administrator</span>
                            </div>
                        </div>
                    </div>
                ) : (
                    <>
                        <form onSubmit={submitHandler} className="space-y-4">
                            <div>
                                <label className="block text-gray-700 font-bold mb-2">Name</label>
                                <input
                                    type="text"
                                    className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:border-secondary"
                                    value={name}
                                    onChange={(e) => setName(e.target.value)}
                                />
                            </div>
                            <div>
                                <label className="block text-gray-700 font-bold mb-2">Email Address</label>
                                <input
                                    type="email"
                                    className="w-full px-4 py-2 border rounded-lg bg-gray-100 text-gray-500 cursor-not-allowed"
                                    value={email}
                                    readOnly
                                    title="Email cannot be changed"
                                />
                            </div>

                            <div className="border-t border-gray-100 my-4 pt-4">
                                <h3 className="text-lg font-bold text-primary mb-3">Change Password</h3>
                                <div>
                                    <label className="block text-gray-700 font-bold mb-2">Old Password</label>
                                    <div className="relative">
                                        <input
                                            type={showOldPassword ? "text" : "password"}
                                            className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:border-secondary pr-10"
                                            placeholder="Required to set new password"
                                            value={oldPassword}
                                            onChange={(e) => setOldPassword(e.target.value)}
                                        />
                                        <button
                                            type="button"
                                            onClick={() => setShowOldPassword(!showOldPassword)}
                                            className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400 hover:text-gray-600 focus:outline-none"
                                        >
                                            {showOldPassword ? <FaEyeSlash /> : <FaEye />}
                                        </button>
                                    </div>
                                </div>
                            </div>

                            <div>
                                <label className="block text-gray-700 font-bold mb-2">New Password</label>
                                <div className="relative">
                                    <input
                                        type={showPassword ? "text" : "password"}
                                        className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:border-secondary pr-10"
                                        placeholder="New Password"
                                        value={password}
                                        onChange={(e) => setPassword(e.target.value)}
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
                                <div className="mt-2 p-3 bg-gray-50 rounded-lg border border-gray-100">
                                    <p className="text-xs font-semibold text-gray-500 mb-2">Password requirements:</p>
                                    <ul className="space-y-1">
                                        <li className={`flex items-center text-xs ${password.length >= 8 ? 'text-green-600 font-bold' : 'text-gray-400'}`}>
                                            {password.length >= 8 ? <FaCheck className="mr-2" /> : <FaTimes className="mr-2" />}
                                            At least 8 characters
                                        </li>
                                        <li className={`flex items-center text-xs ${/\d/.test(password) ? 'text-green-600 font-bold' : 'text-gray-400'}`}>
                                            {/\d/.test(password) ? <FaCheck className="mr-2" /> : <FaTimes className="mr-2" />}
                                            Contains a number
                                        </li>
                                        <li className={`flex items-center text-xs ${/[!@#$%^&*]/.test(password) ? 'text-green-600 font-bold' : 'text-gray-400'}`}>
                                            {/[!@#$%^&*]/.test(password) ? <FaCheck className="mr-2" /> : <FaTimes className="mr-2" />}
                                            Contains a special char (@#$%^&*)
                                        </li>
                                    </ul>
                                </div>
                            </div>
                            <div>
                                <label className="block text-gray-700 font-bold mb-2">Confirm New Password</label>
                                <div className="relative">
                                    <input
                                        type={showConfirmPassword ? "text" : "password"}
                                        className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:border-secondary pr-10"
                                        placeholder="Confirm new password"
                                        value={confirmPassword}
                                        onChange={(e) => setConfirmPassword(e.target.value)}
                                    />
                                    <button
                                        type="button"
                                        onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                                        className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400 hover:text-gray-600 focus:outline-none"
                                    >
                                        {showConfirmPassword ? <FaEyeSlash /> : <FaEye />}
                                    </button>
                                </div>
                            </div>
                            <button type="submit" className="w-full bg-primary text-white py-3 rounded-lg font-bold hover:bg-opacity-90 transition">
                                Update Profile
                            </button>
                        </form>

                        {/* Close Account Section */}
                        <div className="mt-8 pt-8 border-t border-gray-200">
                            <h3 className="text-lg font-bold text-red-600 mb-2">Danger Zone</h3>
                            <p className="text-sm text-gray-500 mb-4">Once you delete your account, there is no going back. Please be certain.</p>
                            <button
                                onClick={() => setShowDeleteModal(true)}
                                className="w-full border border-red-500 text-red-500 py-3 rounded-lg font-bold hover:bg-red-50 transition"
                            >
                                Close Account
                            </button>
                        </div>
                    </>
                )}
            </div>

            {/* Delete Confirmation Modal */}
            {showDeleteModal && (
                <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 px-4">
                    <div className="bg-white rounded-xl shadow-2xl p-8 max-w-sm w-full">
                        <div className="text-center mb-6">
                            <div className="text-4xl mb-3 text-red-500">⚠️</div>
                            <h3 className="text-xl font-bold text-gray-800 mb-2">Final Confirmation</h3>
                            <p className="text-gray-600 text-sm">
                                This action is <strong>irreversible</strong>. To permanently close your account, please verify your password.
                            </p>
                        </div>
                        <input
                            type="password"
                            className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:border-red-500 mb-4"
                            placeholder="Enter your password"
                            value={deletePassword}
                            onChange={(e) => setDeletePassword(e.target.value)}
                        />
                        <div className="flex gap-3">
                            <button
                                onClick={() => {
                                    setShowDeleteModal(false);
                                    setDeletePassword('');
                                }}
                                className="flex-1 py-2 rounded-lg font-bold text-gray-600 hover:bg-gray-100 transition"
                            >
                                Cancel
                            </button>
                            <button
                                onClick={deleteAccountHandler}
                                disabled={!deletePassword}
                                className="flex-1 py-2 rounded-lg font-bold bg-red-500 text-white hover:bg-red-600 transition disabled:opacity-50"
                            >
                                Confirm Delete
                            </button>
                        </div>
                    </div>
                </div>
            )}
        </div>
    );
};

export default ProfileScreen;
