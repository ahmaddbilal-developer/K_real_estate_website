import { useEffect, useState } from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom';
import luxuryVillaImg from '../assets/images/luxury-villa.png';
import modernAptImg from '../assets/images/modern-apartment.png';
import cozyCottageImg from '../assets/images/cozy-cottage.png';

const PropertiesScreen = () => {
    const [properties, setProperties] = useState([]);
    const [filteredProperties, setFilteredProperties] = useState([]);
    const [filters, setFilters] = useState({
        type: 'All',
        priceRange: 'All',
        search: '',
    });

    // Fetch properties from backend in useEffect
    useEffect(() => {
        const fetchProperties = async () => {
            try {
                const { data } = await axios.get('/api/properties');
                setProperties(data);
                setFilteredProperties(data);
            } catch (error) {
                console.error('Error fetching properties:', error);
                // Fallback mock data with local images
                const mockData = [
                    {
                        _id: '1',
                        title: 'Luxury Villa',
                        location: 'Beverly Hills, CA',
                        price: 2500000,
                        images: [luxuryVillaImg],
                        type: 'Buy',
                        bedrooms: 5,
                        bathrooms: 4,
                        area: 4500
                    },
                    {
                        _id: '2',
                        title: 'Modern Apartment',
                        location: 'New York, NY',
                        price: 850000,
                        images: [modernAptImg],
                        type: 'Rent',
                        bedrooms: 2,
                        bathrooms: 2,
                        area: 1200
                    },
                    {
                        _id: '3',
                        title: 'Cozy Cottage',
                        location: 'Aspen, CO',
                        price: 1200000,
                        images: [cozyCottageImg],
                        type: 'Buy',
                        bedrooms: 3,
                        bathrooms: 2,
                        area: 2000
                    },
                ];
                setProperties(mockData);
                setFilteredProperties(mockData);
            }
        };
        fetchProperties();
    }, []);

    // Filter Logic
    useEffect(() => {
        let result = properties;

        // Type filter
        if (filters.type !== 'All') {
            result = result.filter(p => p.type === filters.type);
        }

        // Price range filter
        if (filters.priceRange !== 'All') {
            result = result.filter(p => {
                if (filters.priceRange === 'low') return p.price < 500000;
                if (filters.priceRange === 'mid') return p.price >= 500000 && p.price <= 1000000;
                if (filters.priceRange === 'high') return p.price > 1000000;
                return true;
            });
        }

        // Search filter
        if (filters.search) {
            result = result.filter(p =>
                p.title.toLowerCase().includes(filters.search.toLowerCase()) ||
                p.location.toLowerCase().includes(filters.search.toLowerCase())
            );
        }

        setFilteredProperties(result);
    }, [filters, properties]);

    return (
        <div className="container mx-auto px-4 py-8">
            {/* Header/Filter Section */}
            <div className="mb-8 bg-white p-6 rounded-xl shadow-lg">
                <h1 className="text-4xl font-heading font-bold text-primary mb-6">Explore Properties</h1>

                <div className="flex flex-col md:flex-row gap-4">
                    {/* Search Input */}
                    <input
                        type="text"
                        placeholder="Search by location or title..."
                        className="flex-grow px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-secondary"
                        onChange={(e) => setFilters({ ...filters, search: e.target.value })}
                    />

                    {/* Type Filter */}
                    <select
                        className="px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-secondary"
                        onChange={(e) => setFilters({ ...filters, type: e.target.value })}
                    >
                        <option value="All">All Types</option>
                        <option value="Buy">For Sale</option>
                        <option value="Rent">For Rent</option>
                    </select>

                    {/* Price Range Filter */}
                    <select
                        className="px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-secondary"
                        onChange={(e) => setFilters({ ...filters, priceRange: e.target.value })}
                    >
                        <option value="All">Any Price</option>
                        <option value="low">Under $500k</option>
                        <option value="mid">$500k - $1M</option>
                        <option value="high">Over $1M</option>
                    </select>
                </div>

                {/* Results Count */}
                <p className="mt-4 text-gray-600">
                    Showing <span className="font-bold text-primary">{filteredProperties.length}</span> {filteredProperties.length === 1 ? 'property' : 'properties'}
                </p>
            </div>

            {/* Properties Grid */}
            {filteredProperties.length === 0 ? (
                <div className="text-center py-20 bg-gray-50 rounded-xl">
                    <p className="text-xl text-gray-500">No properties found matching your criteria.</p>
                    <button
                        onClick={() => setFilters({ type: 'All', priceRange: 'All', search: '' })}
                        className="mt-4 px-6 py-2 bg-secondary text-primary rounded-lg font-bold hover:bg-opacity-90 transition"
                    >
                        Clear Filters
                    </button>
                </div>
            ) : (
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                    {filteredProperties.map((property) => (
                        <div key={property._id} className="bg-white rounded-xl overflow-hidden shadow-lg hover:shadow-2xl transition duration-300 group transform hover:-translate-y-2">
                            <div className="relative overflow-hidden h-64">
                                <img
                                    src={property.images && property.images.length > 0 ? property.images[0] : 'https://via.placeholder.com/400x300'}
                                    alt={property.title}
                                    className="w-full h-full object-cover transform group-hover:scale-110 transition duration-500"
                                />
                                <div className="absolute top-4 left-4 bg-secondary text-primary px-3 py-1 rounded-full font-bold text-sm shadow-lg">
                                    {property.type}
                                </div>
                            </div>

                            <div className="p-6">
                                <h3 className="text-xl font-bold text-primary mb-2 group-hover:text-secondary transition">{property.title}</h3>
                                <p className="text-gray-500 mb-4 flex items-center">
                                    📍 {property.location}
                                </p>

                                {/* Property Details */}
                                {property.bedrooms && (
                                    <div className="flex gap-4 mb-4 text-sm text-gray-600">
                                        <span>🛏️ {property.bedrooms} Beds</span>
                                        <span>🛁 {property.bathrooms} Baths</span>
                                        <span>📐 {property.area} sqft</span>
                                    </div>
                                )}

                                <div className="flex justify-between items-end border-t pt-4 border-gray-100">
                                    <div>
                                        <p className="text-sm text-gray-400">Price</p>
                                        <p className="text-2xl font-bold text-primary">${property.price.toLocaleString()}</p>
                                    </div>
                                    <Link to={`/property/${property._id}`} className="bg-primary text-white px-4 py-2 rounded-lg hover:bg-secondary hover:text-primary transition font-semibold">
                                        View Details
                                    </Link>
                                </div>
                            </div>
                        </div>
                    ))}
                </div>
            )}
        </div>
    );
};

export default PropertiesScreen;
