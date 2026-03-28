import { useState, useEffect } from 'react';
import axios from 'axios';
import { toast } from 'react-toastify';
import { FaTrash, FaEnvelope } from 'react-icons/fa';

const AdminUsersScreen = () => {
    const [users, setUsers] = useState([]);
    const [loading, setLoading] = useState(true);

    const fetchUsers = async () => {
        try {
            const { data } = await axios.get('/api/users');
            setUsers(data);
            setLoading(false);
        } catch (error) {
            toast.error(error.response?.data?.message || error.message);
            setLoading(false);
        }
    };

    useEffect(() => {
        fetchUsers();
    }, []);

    const deleteHandler = async (id) => {
        if (window.confirm('Are you sure you want to delete this user?')) {
            try {
                // We might need a specific admin route for deleting OTHER users, 
                // currently deleteUserProfile deletes SELF. 
                // For now, I'll assuming we might add DELETE /api/users/:id later or use existing if modified.
                // Wait, the plan didn't specify delete functionality for admin, just VIEW.
                // I will omit delete for now to be safe and stick to "See details".
                toast.info('Delete functionality not yet enabled for admin viewing.');
            } catch (err) {
                toast.error(err.response?.data?.message || err.message);
            }
        }
    };

    return (
        <div className="container mx-auto px-4 py-8">
            <h1 className="text-3xl font-heading font-bold mb-8 text-primary">Registered Users</h1>

            <div className="bg-white rounded-xl shadow-lg overflow-hidden">
                <div className="overflow-x-auto">
                    <table className="min-w-full">
                        <thead className="bg-gray-50 border-b border-gray-100">
                            <tr>
                                <th className="px-6 py-4 text-left text-xs font-bold text-gray-500 uppercase tracking-wider">Name</th>
                                <th className="px-6 py-4 text-left text-xs font-bold text-gray-500 uppercase tracking-wider">Email</th>
                                <th className="px-6 py-4 text-left text-xs font-bold text-gray-500 uppercase tracking-wider">Joined</th>
                                <th className="px-6 py-4 text-left text-xs font-bold text-gray-500 uppercase tracking-wider">Role</th>
                            </tr>
                        </thead>
                        <tbody className="divide-y divide-gray-100">
                            {loading ? (
                                <tr>
                                    <td colSpan="4" className="px-6 py-8 text-center text-gray-500">Loading users...</td>
                                </tr>
                            ) : users.length === 0 ? (
                                <tr>
                                    <td colSpan="4" className="px-6 py-8 text-center text-gray-500">No users found</td>
                                </tr>
                            ) : (
                                users.map((user) => (
                                    <tr key={user._id} className="hover:bg-gray-50 transition">
                                        <td className="px-6 py-4">
                                            <div className="flex items-center">
                                                <div className="h-8 w-8 rounded-full bg-secondary/20 flex items-center justify-center text-secondary font-bold mr-3">
                                                    {user.name.charAt(0).toUpperCase()}
                                                </div>
                                                <span className="font-semibold text-gray-800">{user.name}</span>
                                            </div>
                                        </td>
                                        <td className="px-6 py-4 text-gray-600">
                                            <div className="flex items-center gap-2">
                                                <FaEnvelope className="text-gray-300" />
                                                <a href={`mailto:${user.email}`} className="hover:text-primary hover:underline">
                                                    {user.email}
                                                </a>
                                            </div>
                                        </td>
                                        <td className="px-6 py-4 text-gray-500 text-sm">
                                            {new Date(user.createdAt).toLocaleDateString()}
                                        </td>
                                        <td className="px-6 py-4">
                                            <span className={`px-2 py-1 text-xs font-bold rounded-full ${user.role === 'admin' ? 'bg-purple-100 text-purple-600' : 'bg-green-100 text-green-600'}`}>
                                                {user.role || 'User'}
                                                {/* Typo fix safely: user.role */}
                                            </span>
                                        </td>
                                    </tr>
                                ))
                            )}
                        </tbody>
                    </table>
                </div>
            </div>
        </div>
    );
};

export default AdminUsersScreen;
