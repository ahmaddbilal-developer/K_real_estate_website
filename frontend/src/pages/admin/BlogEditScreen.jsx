import { useState, useEffect } from 'react';
import axios from 'axios';
import { Link, useNavigate, useParams } from 'react-router-dom';
import { toast } from 'react-toastify';

const BlogEditScreen = () => {
    const { id } = useParams();
    const navigate = useNavigate();

    const [title, setTitle] = useState('');
    const [slug, setSlug] = useState('');
    const [content, setContent] = useState('');
    const [image, setImage] = useState('');
    const [uploading, setUploading] = useState(false);

    const isEdit = id ? true : false;

    useEffect(() => {
        if (isEdit) {
            const fetchBlog = async () => {
                try {
                    const { data } = await axios.get(`/api/blogs/${id}`);
                    setTitle(data.title);
                    setSlug(data.slug);
                    setContent(data.content);
                    setImage(data.image);
                } catch (error) {
                    toast.error(error.message);
                }
            };
            fetchBlog();
        }
    }, [id, isEdit]);

    const uploadFileHandler = async (e) => {
        const file = e.target.files[0];
        const formData = new FormData();
        formData.append('image', file);
        setUploading(true);

        try {
            const { data } = await axios.post('/api/upload', formData, {
                headers: {
                    'Content-Type': 'multipart/form-data',
                },
            });

            setImage(data.image);
            setUploading(false);
        } catch (error) {
            console.error(error);
            setUploading(false);
            toast.error('Image upload failed');
        }
    };

    const submitHandler = async (e) => {
        e.preventDefault();
        try {
            const blogData = {
                title,
                slug,
                content,
                image,
            };

            if (isEdit) {
                await axios.put(`/api/blogs/${id}`, blogData);
                toast.success('Blog updated');
            } else {
                await axios.post('/api/blogs', blogData);
                toast.success('Blog created');
            }
            navigate('/admin/dashboard');
        } catch (err) {
            toast.error(err.response?.data?.message || err.message);
        }
    };

    return (
        <div className="flex justify-center">
            <div className="w-full max-w-2xl bg-white p-8 rounded-xl shadow-lg">
                <Link to="/admin/dashboard" className="text-gray-500 hover:text-secondary mb-4 inline-block">&larr; Back to Dashboard</Link>
                <h1 className="text-3xl font-heading font-bold mb-6 text-primary">{isEdit ? 'Edit Blog' : 'Create Blog Post'}</h1>

                <form onSubmit={submitHandler} className="space-y-6">
                    <div>
                        <label className="block text-gray-700 font-bold mb-2">Title</label>
                        <input
                            type="text"
                            className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:border-secondary"
                            value={title}
                            onChange={(e) => {
                                setTitle(e.target.value);
                                // Auto-generate slug from title
                                const generatedSlug = e.target.value
                                    .toLowerCase()
                                    .replace(/[^a-z0-9]+/g, '-')
                                    .replace(/(^-|-$)+/g, '');
                                setSlug(generatedSlug);
                            }}
                        />
                    </div>

                    <div>
                        <label className="block text-gray-700 font-bold mb-2">Slug</label>
                        <input
                            type="text"
                            className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:border-secondary"
                            placeholder="my-blog-post-title"
                            value={slug}
                            onChange={(e) => setSlug(e.target.value)}
                        />
                    </div>

                    <div>
                        <label className="block text-gray-700 font-bold mb-2">Featured Image</label>
                        <input
                            type="text"
                            className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:border-secondary mb-2 bg-gray-50"
                            value={image}
                            readOnly
                        />
                        <input
                            type="file"
                            className="block w-full text-sm text-gray-500 file:mr-4 file:py-2 file:px-4 file:rounded-full file:border-0 file:text-sm file:font-semibold file:bg-blue-50 file:text-blue-700 hover:file:bg-blue-100"
                            onChange={uploadFileHandler}
                        />
                        {uploading && <div className="text-sm text-blue-500 mt-2">Uploading...</div>}

                        {/* Image Preview */}
                        {image && !uploading && (
                            <div className="mt-4">
                                <p className="text-sm text-gray-600 mb-2">Preview:</p>
                                <img
                                    src={image}
                                    alt="Blog preview"
                                    className="w-full h-48 object-cover rounded-lg border-2 border-gray-200"
                                    onError={(e) => {
                                        e.target.onerror = null;
                                        e.target.src = 'https://via.placeholder.com/400x300?text=Image+Not+Found';
                                    }}
                                />
                            </div>
                        )}
                    </div>

                    <div>
                        <label className="block text-gray-700 font-bold mb-2">Content</label>
                        <textarea
                            className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:border-secondary h-64"
                            value={content}
                            onChange={(e) => setContent(e.target.value)}
                        ></textarea>
                    </div>

                    <button type="submit" className="w-full bg-primary text-white py-3 rounded-lg font-bold hover:bg-opacity-90 transition">
                        {isEdit ? 'Update Blog' : 'Publish Blog'}
                    </button>
                </form>
            </div>
        </div>
    );
};

export default BlogEditScreen;
