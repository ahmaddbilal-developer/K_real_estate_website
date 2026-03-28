import { useState, useEffect } from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom';
import { toast } from 'react-toastify';
import { FaEdit, FaTrash, FaPlus } from 'react-icons/fa';

const AdminPropertiesScreen = () => {
    const [properties, setProperties] = useState([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        fetchProperties();
    }, []);

    const fetchProperties = async () => {
        try {
            const { data } = await axios.get('/api/properties');
            setProperties(data);
            setLoading(false);
        } catch (error) {
            toast.error(error.response?.data?.message || error.message);
            setLoading(false);
        }
    };

    const deleteHandler = async (id) => {
        if (window.confirm('Are you sure you want to delete this property?')) {
            try {
                await axios.delete(`/api/properties/${id}`);
                toast.success('Property deleted');
                fetchProperties();
            } catch (err) {
                toast.error(err.response?.data?.message || err.message);
            }
        }
    };

    return (
        <div className="container mx-auto px-4">
            <div className="flex justify-between items-center mb-6">
                <h1 className="text-3xl font-heading font-bold text-primary">Manage Properties</h1>
                <Link to="/admin/property/create" className="bg-secondary text-primary px-4 py-2 rounded-lg hover:bg-opacity-90 transition font-bold flex items-center gap-2">
                    <FaPlus /> Add New Property
                </Link>
            </div>

            {loading ? (
                <div className="text-center py-20"><div className="text-xl text-gray-500">Loading properties...</div></div>
            ) : properties.length === 0 ? (
                <div className="bg-white rounded-xl shadow p-12 text-center">
                    <p className="text-gray-500 mb-4">No properties found.</p>
                    <Link to="/admin/property/create" className="text-secondary hover:underline">Create your first property listing</Link>
                </div>
            ) : (
                <div className="bg-white rounded-xl shadow-lg overflow-hidden">
                    <div className="overflow-x-auto">
                        <table className="w-full text-left">
                            <thead className="bg-gray-50 text-gray-600 uppercase text-sm border-b">
                                <tr>
                                    <th className="p-4">Image</th>
                                    <th className="p-4">Title</th>
                                    <th className="p-4">Price</th>
                                    <th className="p-4">Location</th>
                                    <th className="p-4">Type</th>
                                    <th className="p-4">Actions</th>
                                </tr>
                            </thead>
                            <tbody className="divide-y divide-gray-100">
                                {properties.map((property) => (
                                    <tr key={property._id} className="hover:bg-gray-50 transition">
                                        <td className="p-4">
                                            <img
                                                src={property.images && property.images.length > 0 ? property.images[0] : 'https://via.placeholder.com/50'}
                                                alt={property.title}
                                                className="w-12 h-12 object-cover rounded"
                                                onError={(e) => { e.target.onerror = null; e.target.src = 'https://via.placeholder.com/50?text=NA'; }}
                                            />
                                        </td>
                                        <td className="p-4 font-bold text-primary">{property.title}</td>
                                        <td className="p-4">${property.price.toLocaleString()}</td>
                                        <td className="p-4 text-gray-600">{property.location}</td>
                                        <td className="p-4">
                                            <span className={`px-2 py-1 rounded text-xs font-bold ${property.type === 'Buy' ? 'bg-blue-100 text-blue-800' : 'bg-green-100 text-green-800'}`}>
                                                {property.type}
                                            </span>
                                        </td>
                                        <td className="p-4">
                                            <div className="flex gap-2">
                                                <Link to={`/admin/property/${property._id}/edit`} className="bg-blue-100 text-blue-600 p-2 rounded hover:bg-blue-200" title="Edit">
                                                    <FaEdit />
                                                </Link>
                                                <button onClick={() => deleteHandler(property._id)} className="bg-red-100 text-red-600 p-2 rounded hover:bg-red-200" title="Delete">
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

export default AdminPropertiesScreen;
