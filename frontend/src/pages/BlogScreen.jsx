import { useEffect, useState } from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom';

const BlogScreen = () => {
    const [blogs, setBlogs] = useState([]);

    useEffect(() => {
        const fetchBlogs = async () => {
            try {
                const { data } = await axios.get('/api/blogs');
                setBlogs(data);
            } catch (error) {
                console.error('Error fetching blogs', error);
                // toast.error('Failed to load blogs');
            }
        };
        fetchBlogs();
    }, []);

    return (
        <div className="container mx-auto px-4 py-8">
            <div className="text-center mb-12">
                <h1 className="text-4xl font-heading font-bold text-primary mb-4">Latest News & Insights</h1>
                <p className="text-gray-500">Stay updated with the latest trends and advice from our real estate experts.</p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                {blogs.map((blog) => (
                    <div key={blog._id} className="bg-white rounded-xl overflow-hidden shadow-lg hover:shadow-2xl transition duration-300">
                        <img
                            src={blog.image}
                            alt={blog.title}
                            className="w-full h-48 object-cover"
                            onError={(e) => {
                                e.target.onerror = null;
                                e.target.src = 'https://via.placeholder.com/400x250?text=Image+Not+Found';
                            }}
                        />
                        <div className="p-6">
                            <div className="text-sm text-gray-400 mb-2">{new Date(blog.createdAt).toLocaleDateString()}</div>
                            <h2 className="text-xl font-bold text-primary mb-3 line-clamp-2 hover:text-secondary">
                                <Link to={`/blog/${blog.slug}`}>{blog.title}</Link>
                            </h2>
                            <p className="text-gray-600 mb-4 line-clamp-3">
                                {blog.content}
                            </p>
                            <Link to={`/blog/${blog.slug}`} className="text-secondary font-bold hover:underline">Read More &rarr;</Link>
                        </div>
                    </div>
                ))}
            </div>
        </div>
    );
};

export default BlogScreen;
