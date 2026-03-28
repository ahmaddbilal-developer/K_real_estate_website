import { useEffect, useState } from 'react';
import axios from 'axios';
import { useParams, Link } from 'react-router-dom';
import { toast } from 'react-toastify';
import { useAuth } from '../context/AuthContext';
import { FaChevronLeft, FaChevronRight } from 'react-icons/fa';
import luxuryVillaImg from '../assets/images/luxury-villa.png';
import modernAptImg from '../assets/images/modern-apartment.png';
import cozyCottageImg from '../assets/images/cozy-cottage.png';

const PropertyDetailScreen = () => {
    const { id } = useParams();
    const { userInfo, adminInfo } = useAuth();

    const [property, setProperty] = useState(null);
    const [loading, setLoading] = useState(true);
    const [currentImageIndex, setCurrentImageIndex] = useState(0);

    // Inquiry Form State
    const [message, setMessage] = useState('');
    const [subject, setSubject] = useState('Inquiry about property');

    useEffect(() => {
        const fetchProperty = async () => {
            try {
                const { data } = await axios.get(`/api/properties/${id}`);
                setProperty(data);
                setSubject(`Inquiry about ${data.title}`);
                setLoading(false);
            } catch (error) {
                console.error(error);
                // Mock fallback data for testing
                const mockProperties = {
                    '1': {
                        _id: '1',
                        title: 'Luxury Villa',
                        location: 'Beverly Hills, CA',
                        price: 2500000,
                        images: [luxuryVillaImg],
                        type: 'Buy',
                        bedrooms: 5,
                        bathrooms: 4,
                        area: 4500,
                        description: 'Stunning luxury villa in the heart of Beverly Hills. This magnificent property features floor-to-ceiling windows, a state-of-the-art kitchen, and breathtaking views. The master suite includes a spa-like bathroom and private balcony. Perfect for those seeking the ultimate in luxury living.'
                    },
                    '2': {
                        _id: '2',
                        title: 'Modern Apartment',
                        location: 'New York, NY',
                        price: 850000,
                        images: [modernAptImg],
                        type: 'Rent',
                        bedrooms: 2,
                        bathrooms: 2,
                        area: 1200,
                        description: 'Contemporary apartment in prime Manhattan location. Features include hardwood floors, modern appliances, and stunning city views. Building amenities include 24/7 concierge, fitness center, and rooftop terrace. Walking distance to subway and finest restaurants.'
                    },
                    '3': {
                        _id: '3',
                        title: 'Cozy Cottage',
                        location: 'Aspen, CO',
                        price: 1200000,
                        images: [cozyCottageImg],
                        type: 'Buy',
                        bedrooms: 3,
                        bathrooms: 2,
                        area: 2000,
                        description: 'Charming mountain cottage with rustic elegance. Featuring exposed beams, stone fireplace, and panoramic mountain views. Perfect ski-in/ski-out location with easy access to Aspen\'s world-class slopes. Ideal as a vacation retreat or year-round residence.'
                    }
                };

                const mockProperty = mockProperties[id];
                if (mockProperty) {
                    setProperty(mockProperty);
                    setSubject(`Inquiry about ${mockProperty.title}`);
                }
                setLoading(false);
            }
        };
        fetchProperty();
    }, [id]);

    const submitInquiryHandler = async (e) => {
        e.preventDefault();
        try {
            await axios.post('/api/messages', {
                propertyId: id,
                subject,
                message,
            });
            toast.success('Inquiry sent successfully!');
            setMessage('');
        } catch (err) {
            toast.error(err.response?.data?.message || err.message);
        }
    };

    if (loading) return <div className="container mx-auto px-4 py-20 text-center"><div className="text-xl text-gray-500">Loading property details...</div></div>;
    if (!property) return <div className="container mx-auto px-4 py-20 text-center"><div className="text-xl text-gray-500">Property not found</div><Link to="/" className="text-secondary hover:underline mt-4 inline-block">← Back to Home</Link></div>;

    return (
        <div className="container mx-auto px-4 pt-2 pb-4">
            <Link to="/" className="text-gray-500 hover:text-secondary mb-3 inline-flex items-center gap-2 font-semibold">
                ← Back to Home
            </Link>

            <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 mt-3">
                {/* Main Content */}
                <div className="lg:col-span-2 space-y-6">
                    {/* Property Image Gallery */}
                    <div className="relative rounded-2xl overflow-hidden shadow-2xl group h-[500px]">
                        <img
                            src={property.images && property.images.length > 0 ? property.images[currentImageIndex] : 'https://via.placeholder.com/800x600'}
                            alt={property.title}
                            className="w-full h-full object-cover"
                            onError={(e) => {
                                e.target.onerror = null;
                                e.target.src = 'https://via.placeholder.com/800x600?text=Image+Not+Found';
                            }}
                        />
                        <div className="absolute top-6 left-6 bg-secondary text-primary px-4 py-2 rounded-full font-bold shadow-lg">
                            For {property.type}
                        </div>

                        {/* Navigation Buttons */}
                        {property.images && property.images.length > 1 && (
                            <>
                                <button
                                    onClick={() => setCurrentImageIndex((prev) => (prev === 0 ? property.images.length - 1 : prev - 1))}
                                    className="absolute left-4 top-1/2 -translate-y-1/2 bg-black/50 text-white p-3 rounded-full opacity-0 group-hover:opacity-100 transition hover:bg-black/70"
                                >
                                    <FaChevronLeft size={20} />
                                </button>
                                <button
                                    onClick={() => setCurrentImageIndex((prev) => (prev === property.images.length - 1 ? 0 : prev + 1))}
                                    className="absolute right-4 top-1/2 -translate-y-1/2 bg-black/50 text-white p-3 rounded-full opacity-0 group-hover:opacity-100 transition hover:bg-black/70"
                                >
                                    <FaChevronRight size={20} />
                                </button>

                                {/* Dots */}
                                <div className="absolute bottom-4 left-0 right-0 flex justify-center gap-2">
                                    {property.images.map((_, idx) => (
                                        <button
                                            key={idx}
                                            onClick={() => setCurrentImageIndex(idx)}
                                            className={`w-3 h-3 rounded-full transition ${currentImageIndex === idx ? 'bg-white scale-110' : 'bg-white/50 hover:bg-white/75'}`}
                                        />
                                    ))}
                                </div>
                            </>
                        )}
                    </div>

                    {/* Property Details Card */}
                    <div className="bg-white p-8 rounded-2xl shadow-lg">
                        <div className="flex justify-between items-start mb-6">
                            <div>
                                <h1 className="text-4xl font-heading font-bold text-primary mb-2">{property.title}</h1>
                                <p className="text-gray-500 text-lg flex items-center gap-2">
                                    📍 {property.location}
                                </p>
                            </div>
                            <div className="text-right">
                                <p className="text-sm text-gray-400 mb-1">Price</p>
                                <span className="text-3xl font-bold text-primary">${property.price.toLocaleString()}</span>
                            </div>
                        </div>

                        {/* Property Features */}
                        {property.bedrooms && (
                            <div className="grid grid-cols-3 gap-4 py-6 border-y border-gray-100">
                                <div className="text-center">
                                    <div className="text-3xl mb-2">🛏️</div>
                                    <p className="text-2xl font-bold text-primary">{property.bedrooms}</p>
                                    <p className="text-sm text-gray-500">Bedrooms</p>
                                </div>
                                <div className="text-center">
                                    <div className="text-3xl mb-2">🛁</div>
                                    <p className="text-2xl font-bold text-primary">{property.bathrooms}</p>
                                    <p className="text-sm text-gray-500">Bathrooms</p>
                                </div>
                                <div className="text-center">
                                    <div className="text-3xl mb-2">📐</div>
                                    <p className="text-2xl font-bold text-primary">{property.area}</p>
                                    <p className="text-sm text-gray-500">Sq Ft</p>
                                </div>
                            </div>
                        )}

                        {/* Description */}
                        <div className="mt-6">
                            <h3 className="text-2xl font-bold mb-4 text-primary">About This Property</h3>
                            <p className="text-gray-600 leading-relaxed whitespace-pre-line">{property.description || 'No description available.'}</p>
                        </div>
                    </div>
                </div>

                {/* Sidebar / Contact Form */}
                <div className="bg-white p-6 rounded-2xl shadow-lg sticky top-24">
                    <h3 className="text-2xl font-bold font-heading text-primary mb-6">Interested?</h3>
                    {(adminInfo || (userInfo && userInfo.role === 'admin')) ? (
                        <div className="bg-yellow-50 p-6 rounded-lg border border-yellow-200 text-center">
                            <div className="text-4xl mb-3">🛡️</div>
                            <p className="text-yellow-800 font-bold mb-2">Admin View</p>
                            <p className="text-sm text-yellow-700">Administrators cannot send inquiries to properties.</p>
                        </div>
                    ) : (
                        userInfo ? (
                            <form onSubmit={submitInquiryHandler} className="space-y-4">
                                <div>
                                    <label className="block text-gray-700 font-bold mb-2">Subject</label>
                                    <input
                                        type="text"
                                        className="w-full px-4 py-3 border rounded-lg focus:outline-none focus:ring-2 focus:ring-secondary bg-gray-50"
                                        value={subject}
                                        onChange={(e) => setSubject(e.target.value)}
                                        readOnly
                                    />
                                </div>
                                <div>
                                    <label className="block text-gray-700 font-bold mb-2">Your Message</label>
                                    <textarea
                                        className="w-full px-4 py-3 border rounded-lg focus:outline-none focus:ring-2 focus:ring-secondary h-32 resize-none"
                                        placeholder="I am interested in this property..."
                                        value={message}
                                        onChange={(e) => setMessage(e.target.value)}
                                        required
                                    ></textarea>
                                </div>
                                <button type="submit" className="w-full bg-primary text-white py-3 rounded-lg font-bold hover:bg-secondary hover:text-primary transition shadow-md">
                                    Send Inquiry
                                </button>
                            </form>
                        ) : (
                            <div className="text-center py-6">
                                <p className="text-gray-600 mb-4">You must be logged in to send an inquiry.</p>
                                <Link to={`/login?redirect=/property/${id}`} className="block w-full bg-secondary text-primary py-3 rounded-lg font-bold hover:bg-opacity-90 transition">
                                    Login Now
                                </Link>
                            </div>
                        )
                    )}

                    {/* Additional Info */}
                    <div className="mt-6 pt-6 border-t border-gray-100">
                        <h4 className="font-bold text-gray-700 mb-3">Property Type</h4>
                        <p className="text-gray-600 mb-4">{property.type === 'Buy' ? 'For Sale' : 'For Rent'}</p>

                        <h4 className="font-bold text-gray-700 mb-3">Location</h4>
                        <p className="text-gray-600">{property.location}</p>
                    </div>
                </div>
            </div>
        </div>

    );
};

export default PropertyDetailScreen;
