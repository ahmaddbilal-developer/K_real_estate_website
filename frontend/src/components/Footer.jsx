import { FaFacebook, FaTwitter, FaInstagram, FaLinkedin } from 'react-icons/fa';
import { Link } from 'react-router-dom';
import logo from '../assets/images/logo.png';

const Footer = () => {
    return (
        <footer className="bg-primary text-white py-12 mt-auto">
            <div className="container mx-auto px-6 grid grid-cols-1 md:grid-cols-4 gap-8">

                {/* Brand Info */}
                <div>
                    <Link to="/" onClick={() => window.scrollTo(0, 0)} className="inline-block mb-4">
                        <img src={logo} alt="K Real Estate" className="h-24 w-auto object-contain" />
                    </Link>
                    <p className="text-gray-400 text-sm leading-relaxed">
                        Your trusted partner in finding the perfect property. We bring professionalism, transparency, and integrity to every transaction.
                    </p>
                </div>

                {/* Quick Links */}
                <div>
                    <h4 className="text-lg font-bold mb-4">Quick Links</h4>
                    <ul className="space-y-2 text-gray-300">
                        <li><Link to="/" onClick={() => window.scrollTo(0, 0)} className="hover:text-secondary visited:text-gray-400 transition">Home</Link></li>
                        <li><Link to="/properties" onClick={() => window.scrollTo(0, 0)} className="hover:text-secondary visited:text-gray-400 transition">Properties</Link></li>
                        <li><Link to="/blogs" onClick={() => window.scrollTo(0, 0)} className="hover:text-secondary visited:text-gray-400 transition">Latest News</Link></li>
                        <li><Link to="/about" onClick={() => window.scrollTo(0, 0)} className="hover:text-secondary visited:text-gray-400 transition">About Us</Link></li>
                    </ul>
                </div>

                {/* Contact Info */}
                <div>
                    <h4 className="text-lg font-bold mb-4">Contact Us</h4>
                    <ul className="space-y-2 text-gray-300">
                        <li>123 Real Estate Ave, Business City</li>
                        <li>+1 (555) 123-4567</li>
                        <li>info@krealestate.com</li>
                    </ul>
                </div>

                {/* Social Media */}
                <div>
                    <h4 className="text-lg font-bold mb-4">Follow Us</h4>
                    <div className="flex space-x-4">
                        <a href="https://www.facebook.com/" className="text-2xl hover:text-secondary transition" target='_blank'><FaFacebook /></a>
                        <a href="https://twitter.com/" className="text-2xl hover:text-secondary transition" target='_blank'><FaTwitter /></a>
                        <a href="https://www.instagram.com/" className="text-2xl hover:text-secondary transition" target='_blank'><FaInstagram /></a>
                        <a href="https://www.linkedin.com/" className="text-2xl hover:text-secondary transition" target='_blank'><FaLinkedin /></a>
                    </div>
                </div>
            </div>

            <div className="border-t border-gray-700 mt-10 pt-6 text-center text-gray-500 text-sm">
                &copy; {new Date().getFullYear()} K Real Estate. All rights reserved.
            </div>
        </footer>
    );
};

export default Footer;
