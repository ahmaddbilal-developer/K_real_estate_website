import { useEffect, useState } from 'react';
import axios from 'axios';
import { useParams, Link } from 'react-router-dom';
import { toast } from 'react-toastify';

const BlogDetailScreen = () => {
    const { slug } = useParams();
    const [blog, setBlog] = useState(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    useEffect(() => {
        const fetchBlog = async () => {
            try {
                setLoading(true);
                const { data } = await axios.get(`/api/blogs/slug/${slug}`);
                setBlog(data);
                setLoading(false);
            } catch (error) {
                console.error(error);
                setError(error.response?.data?.message || error.message);
                setLoading(false);
                toast.error('Failed to load blog post');
            }
        };
        fetchBlog();
    }, [slug]);

    if (loading) return <div className="text-center py-20 text-xl font-bold text-gray-400">Loading...</div>;

    if (error) return (
        <div className="text-center py-20">
            <h2 className="text-2xl font-bold text-red-500 mb-4">Error Loading Blog</h2>
            <p className="text-gray-600 mb-6">{error}</p>
            <Link to="/blogs" className="text-primary hover:underline">Back to Blogs</Link>
        </div>
    );

    if (!blog) return (
        <div className="text-center py-20">
            <h2 className="text-2xl font-bold text-gray-700 mb-4">Blog Post Not Found</h2>
            <Link to="/blogs" className="text-primary hover:underline">Back to Blogs</Link>
        </div>
    );

    return (
        <div className="container mx-auto px-4 py-8 max-w-4xl">
            <Link to="/blogs" className="text-gray-500 hover:text-secondary mb-6 inline-block">&larr; Back to Blog</Link>

            <img
                src={blog.image}
                alt={blog.title}
                className="w-full h-auto rounded-xl shadow-lg mb-8"
                onError={(e) => {
                    e.target.onerror = null;
                    e.target.src = 'https://via.placeholder.com/800x400?text=Image+Not+Found';
                }}
            />

            <div className="text-center mb-8">
                <h1 className="text-3xl md:text-5xl font-heading font-bold text-primary mb-4">{blog.title}</h1>
                <p className="text-gray-400">Published on {new Date(blog.createdAt).toLocaleDateString()}</p>
            </div>

            <div className="prose prose-lg max-w-none text-gray-700 leading-relaxed whitespace-pre-line">
                {blog.content}
            </div>
        </div>
    );
};

export default BlogDetailScreen;
