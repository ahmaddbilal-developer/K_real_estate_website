import { useState, useEffect } from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom';
import { toast } from 'react-toastify';
import { FaEdit, FaTrash, FaPlus } from 'react-icons/fa';

const AdminBlogsScreen = () => {
    const [blogs, setBlogs] = useState([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        fetchBlogs();
    }, []);

    const fetchBlogs = async () => {
        try {
            const { data } = await axios.get('/api/blogs');
            setBlogs(data);
            setLoading(false);
        } catch (error) {
            toast.error(error.response?.data?.message || error.message);
            setLoading(false);
        }
    };

    const deleteHandler = async (id) => {
        if (window.confirm('Are you sure you want to delete this blog post?')) {
            try {
                await axios.delete(`/api/blogs/${id}`);
                toast.success('Blog deleted');
                fetchBlogs();
            } catch (err) {
                toast.error(err.response?.data?.message || err.message);
            }
        }
    };

    return (
        <div className="container mx-auto px-4">
            <div className="flex justify-between items-center mb-6">
                <h1 className="text-3xl font-heading font-bold text-primary">Manage Blogs</h1>
                <Link to="/admin/blog/create" className="bg-secondary text-primary px-4 py-2 rounded-lg hover:bg-opacity-90 transition font-bold flex items-center gap-2">
                    <FaPlus /> Create New Blog
                </Link>
            </div>

            {loading ? (
                <div className="text-center py-20"><div className="text-xl text-gray-500">Loading blogs...</div></div>
            ) : blogs.length === 0 ? (
                <div className="bg-white rounded-xl shadow p-12 text-center">
                    <p className="text-gray-500 mb-4">No blog posts found.</p>
                    <Link to="/admin/blog/create" className="text-secondary hover:underline">Write your first blog post</Link>
                </div>
            ) : (
                <div className="bg-white rounded-xl shadow-lg overflow-hidden">
                    <div className="overflow-x-auto">
                        <table className="w-full text-left">
                            <thead className="bg-gray-50 text-gray-600 uppercase text-sm border-b">
                                <tr>
                                    <th className="p-4">Image</th>
                                    <th className="p-4">Title</th>
                                    <th className="p-4">Slug</th>
                                    <th className="p-4">Actions</th>
                                </tr>
                            </thead>
                            <tbody className="divide-y divide-gray-100">
                                {blogs.map((blog) => (
                                    <tr key={blog._id} className="hover:bg-gray-50 transition">
                                        <td className="p-4">
                                            <img
                                                src={blog.image || 'https://via.placeholder.com/50'}
                                                alt={blog.title}
                                                className="w-12 h-12 object-cover rounded"
                                                onError={(e) => { e.target.onerror = null; e.target.src = 'https://via.placeholder.com/50?text=NA'; }}
                                            />
                                        </td>
                                        <td className="p-4 font-bold text-primary">{blog.title}</td>
                                        <td className="p-4 text-gray-600">{blog.slug}</td>
                                        <td className="p-4">
                                            <div className="flex gap-2">
                                                <Link to={`/admin/blog/${blog._id}/edit`} className="bg-blue-100 text-blue-600 p-2 rounded hover:bg-blue-200" title="Edit">
                                                    <FaEdit />
                                                </Link>
                                                <button onClick={() => deleteHandler(blog._id)} className="bg-red-100 text-red-600 p-2 rounded hover:bg-red-200" title="Delete">
                                                    <FaTrash />
                                                </button>
                                            </div>
                                        </td>
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                    </div>
                </div>
            )}
        </div>
    );
};

export default AdminBlogsScreen;
