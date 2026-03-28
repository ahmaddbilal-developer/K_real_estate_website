import { useState, useEffect } from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom';
import { toast } from 'react-toastify';

const AdminDashboard = () => {
    const [stats, setStats] = useState({
        users: 0,
        properties: 0,
        messages: 0,
    });
    const [properties, setProperties] = useState([]);
    const [blogs, setBlogs] = useState([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        fetchData();
    }, []);

    const fetchData = async () => {
        try {
            const statsRes = await axios.get('/api/users/stats');
            setStats(statsRes.data);

            const propsRes = await axios.get('/api/properties');
            const blogsRes = await axios.get('/api/blogs');

            setProperties(propsRes.data);
            setBlogs(blogsRes.data);
            setLoading(false);
        } catch (error) {
            console.error(error);
            setLoading(false);
            toast.error('Failed to load dashboard data');
        }
    };

    const deleteHandler = async (id) => {
        if (window.confirm('Are you sure you want to delete this property?')) {
            try {
                await axios.delete(`/api/properties/${id}`);
                toast.success('Property deleted');
                fetchData();
            } catch (err) {
                toast.error(err.response?.data?.message || err.message);
            }
        }
    };

    const deleteBlogHandler = async (id) => {
        if (window.confirm('Are you sure you want to delete this blog?')) {
            try {
                await axios.delete(`/api/blogs/${id}`);
                toast.success('Blog deleted');
                fetchData();
            } catch (err) {
                toast.error(err.response?.data?.message || err.message);
            }
        }
    };

    if (loading) {
        return <div className="text-center py-20"><div className="text-xl text-gray-500">Loading dashboard...</div></div>;
    }

    return (
        <div className="container mx-auto px-4">
            <h1 className="text-3xl font-heading font-bold mb-8 text-primary">Admin Dashboard</h1>

            {/* Stats Cards */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-12">
                <div className="bg-white p-6 rounded-xl shadow-md border-l-4 border-secondary hover:shadow-lg transition">
                    <h3 className="text-gray-500 font-bold mb-2">Total Properties</h3>
                    <p className="text-3xl font-bold text-primary">{stats.properties}</p>
                    <Link to="/admin/property/create" className="text-sm text-secondary hover:underline mt-2 inline-block">+ Add New</Link>
                </div>
                <div className="bg-white p-6 rounded-xl shadow-md border-l-4 border-blue-500 hover:shadow-lg transition cursor-pointer" onClick={() => window.location.href = '/admin/users'}>
                    <h3 className="text-gray-500 font-bold mb-2">Total Users</h3>
                    <p className="text-3xl font-bold text-primary">{stats.users}</p>
                    <Link to="/admin/users" className="text-sm text-blue-600 hover:underline mt-2 inline-block">View All →</Link>
                </div>
                <div className="bg-white p-6 rounded-xl shadow-md border-l-4 border-green-500 hover:shadow-lg transition cursor-pointer" onClick={() => window.location.href = '/admin/messages'}>
                    <h3 className="text-gray-500 font-bold mb-2">New Messages</h3>
                    <p className="text-3xl font-bold text-primary">{stats.messages}</p>
                    <Link to="/admin/messages" className="text-sm text-green-600 hover:underline mt-2 inline-block">View All →</Link>
                </div>
            </div>

            {/* Property Management */}
            <div className="bg-white rounded-xl shadow-lg overflow-hidden mb-12">
                <div className="flex justify-between items-center p-6 border-b border-gray-100 bg-gradient-to-r from-primary to-primary/90 text-white">
                    <h2 className="text-xl font-bold">Manage Properties</h2>
                    <Link to="/admin/property/create" className="bg-secondary text-primary px-4 py-2 rounded-lg hover:bg-opacity-90 transition font-semibold">
                        + Add Property
                    </Link>
                </div>

                {properties.length === 0 ? (
                    <div className="p-12 text-center">
                        <p className="text-gray-500 mb-4">No properties yet. Start by adding your first property!</p>
                        <Link to="/admin/property/create" className="inline-block bg-primary text-white px-6 py-2 rounded-lg hover:bg-opacity-90 transition">
                            + Add First Property
                        </Link>
                    </div>
                ) : (
                    <div className="overflow-x-auto">
                        <table className="w-full text-left">
                            <thead className="bg-gray-50 text-gray-600 uppercase text-sm">
                                <tr>
                                    <th className="p-4">ID</th>
                                    <th className="p-4">Title</th>
                                    <th className="p-4">Price</th>
                                    <th className="p-4">Type</th>
                                    <th className="p-4">Actions</th>
                                </tr>
                            </thead>
                            <tbody className="divide-y divide-gray-100">
                                {properties.map((property) => (
                                    <tr key={property._id} className="hover:bg-gray-50">
                                        <td className="p-4 text-gray-500 text-sm">{property._id.substring(0, 10)}...</td>
                                        <td className="p-4 font-bold text-primary">{property.title}</td>
                                        <td className="p-4">${property.price.toLocaleString()}</td>
                                        <td className="p-4">
                                            <span className={`px-2 py-1 rounded text-xs font-bold ${property.type === 'Buy' ? 'bg-blue-100 text-blue-800' : 'bg-green-100 text-green-800'}`}>
                                                {property.type}
                                            </span>
                                        </td>
                                        <td className="p-4 flex space-x-2">
                                            <Link to={`/admin/property/${property._id}/edit`} className="bg-gray-200 text-gray-700 px-3 py-1 rounded hover:bg-gray-300">Edit</Link>
                                            <button onClick={() => deleteHandler(property._id)} className="bg-red-100 text-red-600 px-3 py-1 rounded hover:bg-red-200">Delete</button>
                                        </td>
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                    </div>
                )}
            </div>

            {/* Blog Management */}
            <div className="bg-white rounded-xl shadow-lg overflow-hidden">
                <div className="flex justify-between items-center p-6 border-b border-gray-100 bg-gradient-to-r from-primary to-primary/90 text-white">
                    <h2 className="text-xl font-bold">Manage Blogs</h2>
                    <Link to="/admin/blog/create" className="bg-secondary text-primary px-4 py-2 rounded-lg hover:bg-opacity-90 transition font-semibold">
                        + Add Blog
                    </Link>
                </div>

                {blogs.length === 0 ? (
                    <div className="p-12 text-center">
                        <p className="text-gray-500 mb-4">No blog posts yet. Create your first blog post!</p>
                        <Link to="/admin/blog/create" className="inline-block bg-primary text-white px-6 py-2 rounded-lg hover:bg-opacity-90 transition">
                            + Add First Blog
                        </Link>
                    </div>
                ) : (
                    <div className="overflow-x-auto">
                        <table className="w-full text-left">
                            <thead className="bg-gray-50 text-gray-600 uppercase text-sm">
                                <tr>
                                    <th className="p-4">ID</th>
                                    <th className="p-4">Title</th>
                                    <th className="p-4">Slug</th>
                                    <th className="p-4">Actions</th>
                                </tr>
                            </thead>
                            <tbody className="divide-y divide-gray-100">
                                {blogs.map((blog) => (
                                    <tr key={blog._id} className="hover:bg-gray-50">
                                        <td className="p-4 text-gray-500 text-sm">{blog._id.substring(0, 10)}...</td>
                                        <td className="p-4 font-bold text-primary">{blog.title}</td>
                                        <td className="p-4 text-gray-500">{blog.slug}</td>
                                        <td className="p-4 flex space-x-2">
                                            <Link to={`/admin/blog/${blog._id}/edit`} className="bg-gray-200 text-gray-700 px-3 py-1 rounded hover:bg-gray-300">Edit</Link>
                                            <button onClick={() => deleteBlogHandler(blog._id)} className="bg-red-100 text-red-600 px-3 py-1 rounded hover:bg-red-200">Delete</button>
                                        </td>
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                    </div>
                )}
            </div>
        </div>
    );
};

export default AdminDashboard;
