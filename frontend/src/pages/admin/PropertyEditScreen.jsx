import { useState, useEffect } from 'react';
import axios from 'axios';
import { Link, useNavigate, useParams } from 'react-router-dom';
import { toast } from 'react-toastify';
import { FaChevronLeft, FaChevronRight, FaTrash } from 'react-icons/fa';

const PropertyEditScreen = () => {
    const { id } = useParams();
    const navigate = useNavigate();

    const [title, setTitle] = useState('');
    const [price, setPrice] = useState(0);
    const [location, setLocation] = useState('');
    const [type, setType] = useState('Buy');
    const [description, setDescription] = useState('');
    const [images, setImages] = useState([]);
    const [currentImageIndex, setCurrentImageIndex] = useState(0);
    const [uploading, setUploading] = useState(false);

    const isEdit = id ? true : false; // If ID exists, we are editing

    useEffect(() => {
        if (isEdit) {
            const fetchProperty = async () => {
                try {
                    const { data } = await axios.get(`/api/properties/${id}`);
                    setTitle(data.title);
                    setPrice(data.price);
                    setLocation(data.location);
                    setType(data.type);
                    setDescription(data.description);
                    setImages(data.images || []);
                } catch (error) {
                    toast.error(error.message);
                }
            };
            fetchProperty();
        }
    }, [id, isEdit]);

    const uploadFileHandler = async (e) => {
        const files = Array.from(e.target.files);
        const formData = new FormData();

        files.forEach(file => {
            formData.append('images', file);
        });

        setUploading(true);

        try {
            const { data } = await axios.post('/api/upload/multiple', formData, {
                headers: {
                    'Content-Type': 'multipart/form-data',
                },
            });

            // Append new images to existing ones
            setImages(prev => [...prev, ...data.images]);
            setUploading(false);
            if (files.length > 0) toast.success(`${files.length} images uploaded`);
        } catch (error) {
            console.error(error);
            setUploading(false);
            toast.error('Image upload failed');
        }
    };

    const removeImageHandler = (index) => {
        setImages(images.filter((_, i) => i !== index));
        if (currentImageIndex >= index && currentImageIndex > 0) {
            setCurrentImageIndex(currentImageIndex - 1);
        }
    };

    const submitHandler = async (e) => {
        e.preventDefault();
        try {
            const propertyData = {
                title,
                price,
                location,
                type,
                description,
                images, // Sending array
            };

            if (isEdit) {
                await axios.put(`/api/properties/${id}`, propertyData);
                toast.success('Property updated');
            } else {
                await axios.post('/api/properties', propertyData);
                toast.success('Property created');
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
                <h1 className="text-3xl font-heading font-bold mb-6 text-primary">{isEdit ? 'Edit Property' : 'Create Property'}</h1>

                <form onSubmit={submitHandler} className="space-y-6">
                    <div>
                        <label className="block text-gray-700 font-bold mb-2">Title</label>
                        <input
                            type="text"
                            className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:border-secondary"
                            value={title}
                            onChange={(e) => setTitle(e.target.value)}
                        />
                    </div>

                    <div className="grid grid-cols-2 gap-4">
                        <div>
                            <label className="block text-gray-700 font-bold mb-2">Price ($)</label>
                            <input
                                type="number"
                                className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:border-secondary"
                                value={price}
                                onChange={(e) => setPrice(e.target.value)}
                            />
                        </div>
                        <div>
                            <label className="block text-gray-700 font-bold mb-2">Type</label>
                            <select
                                className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:border-secondary"
                                value={type}
                                onChange={(e) => setType(e.target.value)}
                            >
                                <option value="Buy">Buy</option>
                                <option value="Rent">Rent</option>
                            </select>
                        </div>
                    </div>

                    <div>
                        <label className="block text-gray-700 font-bold mb-2">Location</label>
                        <input
                            type="text"
                            className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:border-secondary"
                            value={location}
                            onChange={(e) => setLocation(e.target.value)}
                        />
                    </div>

                    <div>
                        <label className="block text-gray-700 font-bold mb-2">Images</label>
                        <div className="flex gap-2 mb-2">
                            <input
                                type="file"
                                id="image-upload"
                                accept="image/*"
                                multiple
                                className="hidden"
                                onChange={uploadFileHandler}
                            />
                            <label
                                htmlFor="image-upload"
                                className="cursor-pointer bg-gray-100 text-gray-700 px-4 py-2 rounded-lg border border-gray-300 hover:bg-gray-200 transition flex items-center gap-2"
                            >
                                <span>📤 Upload Images</span>
                            </label>
                            <span className="text-sm text-gray-500 self-center">{images.length} images selected</span>
                        </div>
                        {uploading && <div className="text-sm text-blue-500 mt-1">Uploading...</div>}

                        {/* Image Gallery Preview */}
                        {images.length > 0 && (
                            <div className="mt-4 relative group w-full h-64 bg-gray-100 rounded-lg overflow-hidden border-2 border-gray-200">
                                <img
                                    src={images[currentImageIndex]}
                                    alt={`Preview ${currentImageIndex + 1}`}
                                    className="w-full h-full object-contain"
                                    onError={(e) => {
                                        e.target.onerror = null;
                                        e.target.src = 'https://via.placeholder.com/400x300?text=Image+Not+Found';
                                    }}
                                />

                                {/* Navigation Buttons (Show on Hover) */}
                                {images.length > 1 && (
                                    <>
                                        <button
                                            type="button"
                                            onClick={() => setCurrentImageIndex((prev) => (prev === 0 ? images.length - 1 : prev - 1))}
                                            className="absolute left-2 top-1/2 -translate-y-1/2 bg-black/50 text-white p-2 rounded-full opacity-0 group-hover:opacity-100 transition hover:bg-black/70"
                                        >
                                            <FaChevronLeft />
                                        </button>
                                        <button
                                            type="button"
                                            onClick={() => setCurrentImageIndex((prev) => (prev === images.length - 1 ? 0 : prev + 1))}
                                            className="absolute right-2 top-1/2 -translate-y-1/2 bg-black/50 text-white p-2 rounded-full opacity-0 group-hover:opacity-100 transition hover:bg-black/70"
                                        >
                                            <FaChevronRight />
                                        </button>
                                    </>
                                )}

                                {/* Delete Button */}
                                <button
                                    type="button"
                                    onClick={() => removeImageHandler(currentImageIndex)}
                                    className="absolute top-2 right-2 bg-red-500 text-white p-2 rounded-full opacity-0 group-hover:opacity-100 transition hover:bg-red-600 shadow-lg"
                                    title="Remove this image"
                                >
                                    <FaTrash size={12} />
                                </button>

                                {/* Pagination Dots */}
                                <div className="absolute bottom-2 left-0 right-0 flex justify-center gap-1">
                                    {images.map((_, idx) => (
                                        <div
                                            key={idx}
                                            className={`w-2 h-2 rounded-full ${currentImageIndex === idx ? 'bg-white' : 'bg-white/50'}`}
                                        />
                                    ))}
                                </div>
                            </div>
                        )}

                        {/* Thumbnails */}
                        {images.length > 1 && (
                            <div className="flex gap-2 mt-2 overflow-x-auto pb-2">
                                {images.map((img, idx) => (
                                    <img
                                        key={idx}
                                        src={img}
                                        alt={`Thumbnail ${idx}`}
                                        className={`w-16 h-16 object-cover rounded cursor-pointer border-2 ${currentImageIndex === idx ? 'border-secondary' : 'border-transparent'}`}
                                        onClick={() => setCurrentImageIndex(idx)}
                                    />
                                ))}
                            </div>
                        )}
                    </div>

                    <div>
                        <label className="block text-gray-700 font-bold mb-2">Description</label>
                        <textarea
                            className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:border-secondary h-32"
                            value={description}
                            onChange={(e) => setDescription(e.target.value)}
                        ></textarea>
                    </div>

                    <button type="submit" className="w-full bg-primary text-white py-3 rounded-lg font-bold hover:bg-opacity-90 transition">
                        {isEdit ? 'Update Property' : 'Create Property'}
                    </button>
                </form>
            </div>
        </div>
    );
};

export default PropertyEditScreen;
