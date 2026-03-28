import { Link, Outlet, useNavigate, useLocation } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import { FaHome, FaBuilding, FaBlog, FaEnvelope, FaSignOutAlt, FaUserCircle, FaBars, FaTimes } from 'react-icons/fa';
import { useState } from 'react';

const AdminLayout = () => {
    const { adminInfo, adminLogout } = useAuth();
    const navigate = useNavigate();
    const location = useLocation();
    const [isSidebarOpen, setIsSidebarOpen] = useState(false);

    const logoutHandler = async () => {
        try {
            await adminLogout();
            navigate('/admin/login');
        } catch (err) {
            console.error(err);
        }
    };

    const isActive = (path) => {
        return location.pathname.startsWith(path);
    };

    const navLinks = [
        { path: '/admin/dashboard', icon: FaHome, label: 'Dashboard' },
        { path: '/admin/property', icon: FaBuilding, label: 'Properties' },
        { path: '/admin/blog', icon: FaBlog, label: 'Blogs' },
        { path: '/admin/messages', icon: FaEnvelope, label: 'Messages' },
        { path: '/admin/users', icon: FaUserCircle, label: 'Users' },
    ];

    return (
        <div className="flex min-h-screen bg-gray-100 font-body">
            {/* Mobile Menu Button */}
            <button
                onClick={() => setIsSidebarOpen(!isSidebarOpen)}
                className="md:hidden fixed top-4 left-4 z-50 bg-primary text-white p-3 rounded-lg shadow-lg"
            >
                {isSidebarOpen ? <FaTimes /> : <FaBars />}
            </button>

            {/* Sidebar */}
            <aside className={`w-64 bg-primary text-white flex-shrink-0 flex flex-col fixed md:static h-full z-40 transition-transform duration-300 ${isSidebarOpen ? 'translate-x-0' : '-translate-x-full md:translate-x-0'}`}>
                <div className="p-6 text-2xl font-heading font-bold text-secondary border-b border-gray-700">
                    K Real Estate
                    <span className="block text-xs text-gray-400 font-sans mt-1">Admin Panel</span>
                </div>

                <nav className="flex-grow p-4 space-y-2">
                    {navLinks.map((link) => {
                        const Icon = link.icon;
                        const active = isActive(link.path);
                        return (
                            <Link
                                key={link.path}
                                to={link.path}
                                onClick={() => setIsSidebarOpen(false)}
                                className={`flex items-center space-x-3 px-4 py-3 rounded transition ${active
                                    ? 'bg-secondary text-primary font-bold'
                                    : 'hover:bg-white/10'
                                    }`}
                            >
                                <Icon /> <span>{link.label}</span>
                            </Link>
                        );
                    })}
                </nav>

                <div className="p-4 border-t border-gray-700">
                    <button
                        onClick={logoutHandler}
                        className="flex items-center space-x-3 px-4 py-3 w-full text-left rounded hover:bg-red-600 transition text-red-300 hover:text-white"
                    >
                        <FaSignOutAlt /> <span>Logout</span>
                    </button>
                    <Link to="/" className="block text-center text-sm text-gray-500 mt-4 hover:text-white">Back to Website &rarr;</Link>
                </div>
            </aside>

            {/* Overlay for mobile */}
            {isSidebarOpen && (
                <div
                    className="md:hidden fixed inset-0 bg-black/50 z-30"
                    onClick={() => setIsSidebarOpen(false)}
                ></div>
            )}

            {/* Main Content Area */}
            <div className="flex-grow flex flex-col w-full">
                {/* Admin Header */}
                <header className="bg-white shadow-sm p-4 flex justify-between items-center">
                    <h2 className="text-xl font-bold text-gray-800 ml-16 md:ml-0">Admin Control Panel</h2>
                    <div className="flex items-center space-x-4">
                        <div className="flex items-center space-x-2 text-primary">
                            <FaUserCircle className="text-2xl" />
                            <span className="font-semibold hidden sm:inline">{adminInfo?.name || 'Admin'}</span>
                        </div>
                    </div>
                </header>

                {/* Content */}
                <main className="p-6 overflow-y-auto h-full">
                    <Outlet />
                </main>
            </div>
        </div>
    );
};

export default AdminLayout;
