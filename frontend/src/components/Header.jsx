import { useState, useEffect } from 'react';
import logo from '../assets/images/logo.png';
import { Link, useNavigate, useLocation } from 'react-router-dom';
import { FaUser, FaBars, FaTimes } from 'react-icons/fa';
import { useAuth } from '../context/AuthContext'; // We'll create this next

const Header = () => {
    const [isOpen, setIsOpen] = useState(false);
    const [isProfileOpen, setIsProfileOpen] = useState(false);
    const { userInfo, adminInfo, logout } = useAuth();
    const navigate = useNavigate();
    const location = useLocation();

    const currentUser = userInfo || adminInfo;

    // Close profile dropdown when clicking outside
    useEffect(() => {
        const handleClickOutside = (event) => {
            if (isProfileOpen && !event.target.closest('.profile-dropdown-container')) {
                setIsProfileOpen(false);
            }
        };

        document.addEventListener('mousedown', handleClickOutside);
        return () => {
            document.removeEventListener('mousedown', handleClickOutside);
        };
    }, [isProfileOpen]);

    const logoutHandler = async () => {
        try {
            await logout();
            navigate('/login');
        } catch (err) {
            console.error(err);
        }
    };

    // Helper function to check if link is active
    const isActive = (path) => {
        if (path === '/') {
            return location.pathname === '/';
        }
        return location.pathname.startsWith(path);
    };

    return (
        <header className="bg-primary text-white sticky top-0 z-50 shadow-md">
            <nav className="container mx-auto px-6 py-1 flex justify-between items-center">

                {/* Logo */}
                <Link to="/" onClick={() => window.scrollTo(0, 0)} className="flex items-center">
                    <img src={logo} alt="K Real Estate" className="h-20 w-auto object-contain" />
                </Link>

                {/* Desktop Menu */}
                <div className="hidden md:flex items-center space-x-6">
                    <Link to="/" onClick={() => window.scrollTo(0, 0)} className={`hover:text-secondary transition ${isActive('/') ? 'text-secondary font-bold border-b-2 border-secondary' : ''}`}>Home</Link>
                    <Link to="/properties" onClick={() => window.scrollTo(0, 0)} className={`hover:text-secondary transition ${isActive('/properties') || isActive('/property/') ? 'text-secondary font-bold border-b-2 border-secondary' : ''}`}>Properties</Link>
                    <Link to="/blogs" onClick={() => window.scrollTo(0, 0)} className={`hover:text-secondary transition ${isActive('/blogs') || isActive('/blog/') ? 'text-secondary font-bold border-b-2 border-secondary' : ''}`}>Blog</Link>
                    <Link to="/about" onClick={() => window.scrollTo(0, 0)} className={`hover:text-secondary transition ${isActive('/about') ? 'text-secondary font-bold border-b-2 border-secondary' : ''}`}>About</Link>
                    {currentUser ? (
                        <div className="relative profile-dropdown-container">
                            <button
                                onClick={() => setIsProfileOpen(!isProfileOpen)}
                                className="flex items-center space-x-2 hover:text-secondary focus:outline-none"
                            >
                                <FaUser />
                                <span>{currentUser.name}</span>
                            </button>
                            {/* Dropdown */}
                            {isProfileOpen && (
                                <div className="absolute right-0 mt-2 w-48 bg-white text-primary rounded-md shadow-lg py-1 border border-gray-100 z-50">
                                    <Link
                                        to="/profile"
                                        className="block px-4 py-2 hover:bg-gray-100"
                                        onClick={() => setIsProfileOpen(false)}
                                    >
                                        Profile
                                    </Link>
                                    {currentUser.role !== 'admin' && (
                                        <Link
                                            to="/my-inquiries"
                                            className="block px-4 py-2 hover:bg-gray-100"
                                            onClick={() => setIsProfileOpen(false)}
                                        >
                                            My Inquiries
                                        </Link>
                                    )}
                                    {currentUser.role === 'admin' && (
                                        <>
                                            <div className="border-t border-gray-100 my-1"></div>
                                            <Link
                                                to="/admin/dashboard"
                                                className="block px-4 py-2 hover:bg-gray-100"
                                                onClick={() => setIsProfileOpen(false)}
                                            >
                                                Admin Dashboard
                                            </Link>
                                        </>
                                    )}
                                    <div className="border-t border-gray-100 my-1"></div>
                                    <button
                                        onClick={() => { logoutHandler(); setIsProfileOpen(false); }}
                                        className="block w-full text-left px-4 py-2 hover:bg-gray-100 text-red-500"
                                    >
                                        Logout
                                    </button>
                                </div>
                            )}
                        </div>
                    ) : (
                        <div className="flex space-x-4">
                            <Link to="/login" className="px-4 py-2 border border-secondary text-secondary rounded hover:bg-secondary hover:text-primary transition">Login</Link>
                            <Link to="/register" className="px-4 py-2 bg-secondary text-primary rounded hover:bg-white transition">Register</Link>
                        </div>
                    )}
                </div>

                {/* Mobile Menu Button */}
                <button onClick={() => setIsOpen(!isOpen)} className="md:hidden text-2xl focus:outline-none">
                    {isOpen ? <FaTimes /> : <FaBars />}
                </button>
            </nav>

            {/* Mobile Menu Dropdown */}
            {isOpen && (
                <div className="md:hidden absolute top-full left-0 right-0 bg-primary border-t border-gray-700 shadow-2xl z-40">
                    <div className="flex flex-col space-y-4 p-6">
                        <Link to="/" onClick={() => { setIsOpen(false); window.scrollTo(0, 0); }} className={`hover:text-secondary ${isActive('/') ? 'text-secondary font-bold' : ''}`}>Home</Link>
                        <Link to="/properties" onClick={() => { setIsOpen(false); window.scrollTo(0, 0); }} className={`hover:text-secondary ${isActive('/properties') || isActive('/property/') ? 'text-secondary font-bold' : ''}`}>Properties</Link>
                        <Link to="/blogs" onClick={() => { setIsOpen(false); window.scrollTo(0, 0); }} className={`hover:text-secondary ${isActive('/blogs') || isActive('/blog/') ? 'text-secondary font-bold' : ''}`}>Blog</Link>
                        <Link to="/about" onClick={() => { setIsOpen(false); window.scrollTo(0, 0); }} className={`hover:text-secondary ${isActive('/about') ? 'text-secondary font-bold' : ''}`}>About</Link>
                        {currentUser ? (
                            <>
                                <Link to="/profile" onClick={() => setIsOpen(false)} className="hover:text-secondary">Profile</Link>
                                <button onClick={() => { logoutHandler(); setIsOpen(false); }} className="text-left text-red-400">Logout</button>
                            </>
                        ) : (
                            <>
                                <Link to="/login" onClick={() => setIsOpen(false)} className="hover:text-secondary">Login</Link>
                                <Link to="/register" onClick={() => setIsOpen(false)} className="hover:text-secondary">Register</Link>
                            </>
                        )}
                    </div>
                </div>
            )}
        </header>
    );
};

export default Header;
