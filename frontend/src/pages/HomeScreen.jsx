import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { FaStar, FaStarHalfAlt, FaRegStar, FaUserCircle, FaQuoteLeft } from 'react-icons/fa';

import luxuryVillaImg from '../assets/images/luxury-villa.png';
import modernAptImg from '../assets/images/modern-apartment.png';
import cozyCottageImg from '../assets/images/cozy-cottage.png';
import heroBackgroundImg from '../assets/images/hero-background.png';

// Mock data for featured properties (until we connect backend)
const featuredProperties = [
    { id: 1, title: 'Luxury Villa', location: 'Beverly Hills, CA', price: '$2,500,000', image: luxuryVillaImg },
    { id: 2, title: 'Modern Apartment', location: 'New York, NY', price: '$850,000', image: modernAptImg },
    { id: 3, title: 'Cozy Cottage', location: 'Aspen, CO', price: '$1,200,000', image: cozyCottageImg },
];

const HomeScreen = () => {
    return (
        <div className="space-y-16">
            {/* Hero Section */}
            <section className="relative h-[80vh] flex items-center justify-center text-white overflow-hidden">
                {/* Background Image with Parallax-like fixed attachment */}
                <div
                    className="absolute inset-0 bg-cover bg-center bg-no-repeat"
                    style={{
                        backgroundImage: `url(${heroBackgroundImg})`
                    }}
                ></div>

                {/* Gradient Overlay */}
                <div className="absolute inset-0 bg-gradient-to-b from-black/60 via-black/40 to-black/70 z-0"></div>

                <div className="relative z-10 text-center px-4 max-w-5xl mx-auto">
                    <motion.div
                        initial={{ opacity: 0, y: 30 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.8 }}
                        className="backdrop-blur-sm bg-white/10 p-8 md:p-12 rounded-3xl border border-white/20 shadow-2xl"
                    >
                        <h1 className="text-4xl md:text-7xl font-heading font-extrabold mb-6 tracking-tight">
                            Discover Your <span className="text-secondary">Perfect Sanctuary</span>
                        </h1>
                        <p className="text-lg md:text-2xl text-gray-100 mb-10 max-w-3xl mx-auto font-light leading-relaxed">
                            Explore an exclusive collection of premium properties designed for your modern lifestyle.
                        </p>

                        {/* Search Bar */}
                        <div className="flex flex-col md:flex-row gap-4 bg-white p-2 rounded-2xl shadow-lg max-w-3xl mx-auto">
                            <input
                                type="text"
                                placeholder="Search by location, price, or keyword..."
                                className="flex-grow px-6 py-4 rounded-xl text-gray-800 focus:outline-none focus:ring-2 focus:ring-secondary text-lg"
                            />
                            <Link to="/properties" className="bg-secondary text-primary px-8 py-4 rounded-xl font-bold text-lg hover:bg-opacity-90 transition shadow-md whitespace-nowrap flex items-center justify-center">
                                Search Now
                            </Link>
                        </div>
                    </motion.div>
                </div>
            </section>

            {/* Featured Properties */}
            <section className="container mx-auto px-4">
                <div className="text-center mb-12">
                    <h2 className="text-3xl md:text-4xl font-heading font-bold text-primary mb-4">Featured Properties</h2>
                    <p className="text-gray-600 max-w-2xl mx-auto">Handpicked properties just for you. Discover the best real estate opportunities in the market.</p>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                    {featuredProperties.map((property) => (
                        <div key={property.id} className="bg-white rounded-xl overflow-hidden shadow-lg hover:shadow-2xl transition duration-300 transform hover:-translate-y-1">
                            <img src={property.image} alt={property.title} className="w-full h-56 object-cover" />
                            <div className="p-6">
                                <h3 className="text-xl font-bold text-primary mb-2">{property.title}</h3>
                                <p className="text-gray-500 mb-4">{property.location}</p>
                                <div className="flex justify-between items-center">
                                    <span className="text-secondary font-bold text-lg">{property.price}</span>
                                    <Link to={`/property/${property.id}`} className="text-primary font-semibold hover:text-secondary">Details &rarr;</Link>
                                </div>
                            </div>
                        </div>
                    ))}
                </div>
                <div className="text-center mt-12">
                    <Link to="/properties" className="inline-block border-2 border-primary text-primary px-8 py-2 rounded-full font-semibold hover:bg-primary hover:text-white transition">
                        View All Properties
                    </Link>
                </div>
            </section>

            {/* Achievement Stats */}
            <section className="py-12 bg-primary text-white rounded-xl">
                <div className="container mx-auto px-4 grid grid-cols-2 md:grid-cols-4 gap-8 text-center">
                    <div>
                        <div className="text-4xl font-bold text-secondary mb-2">1,200+</div>
                        <p className="text-gray-300">Properties Sold</p>
                    </div>
                    <div>
                        <div className="text-4xl font-bold text-secondary mb-2">98%</div>
                        <p className="text-gray-300">Customer Satisfaction</p>
                    </div>
                    <div>
                        <div className="text-4xl font-bold text-secondary mb-2">50+</div>
                        <p className="text-gray-300">Awards Won</p>
                    </div>
                    <div>
                        <div className="text-4xl font-bold text-secondary mb-2">24h</div>
                        <p className="text-gray-300">Avg. Response Time</p>
                    </div>
                </div>
            </section>

            {/* Property Types */}
            <section className="container mx-auto px-4 py-16">
                <div className="text-center mb-12">
                    <h2 className="text-3xl md:text-4xl font-heading font-bold text-primary mb-4">Property Types We Offer</h2>
                    <p className="text-gray-600 max-w-2xl mx-auto">From residential to commercial, we have the perfect property for every need.</p>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
                    <div className="bg-white p-6 rounded-xl shadow-lg hover:shadow-2xl transition duration-300 group cursor-pointer">
                        <div className="text-5xl mb-4 text-center group-hover:scale-110 transition duration-300">🏠</div>
                        <h3 className="text-xl font-bold text-primary mb-2 text-center">Residential</h3>
                        <p className="text-gray-600 text-center text-sm">Houses, apartments, and condos for comfortable living</p>
                    </div>

                    <div className="bg-white p-6 rounded-xl shadow-lg hover:shadow-2xl transition duration-300 group cursor-pointer">
                        <div className="text-5xl mb-4 text-center group-hover:scale-110 transition duration-300">🏢</div>
                        <h3 className="text-xl font-bold text-primary mb-2 text-center">Commercial</h3>
                        <p className="text-gray-600 text-center text-sm">Office spaces and retail locations for your business</p>
                    </div>

                    <div className="bg-white p-6 rounded-xl shadow-lg hover:shadow-2xl transition duration-300 group cursor-pointer">
                        <div className="text-5xl mb-4 text-center group-hover:scale-110 transition duration-300">🏡</div>
                        <h3 className="text-xl font-bold text-primary mb-2 text-center">Luxury Estates</h3>
                        <p className="text-gray-600 text-center text-sm">Premium properties with exclusive amenities</p>
                    </div>

                    <div className="bg-white p-6 rounded-xl shadow-lg hover:shadow-2xl transition duration-300 group cursor-pointer">
                        <div className="text-5xl mb-4 text-center group-hover:scale-110 transition duration-300">🌴</div>
                        <h3 className="text-xl font-bold text-primary mb-2 text-center">Vacation Homes</h3>
                        <p className="text-gray-600 text-center text-sm">Perfect getaways and investment properties</p>
                    </div>
                </div>
            </section>

            {/* Our Services */}
            <section className="bg-gradient-to-br from-gray-50 to-gray-100 py-16 rounded-xl">
                <div className="container mx-auto px-4">
                    <div className="text-center mb-12">
                        <h2 className="text-3xl md:text-4xl font-heading font-bold text-primary mb-4">Our Services</h2>
                        <p className="text-gray-600 max-w-2xl mx-auto">Comprehensive real estate solutions tailored to your needs</p>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                        <div className="bg-white p-8 rounded-xl shadow-md hover:shadow-xl transition duration-300">
                            <div className="w-16 h-16 bg-secondary rounded-full flex items-center justify-center mb-4 mx-auto">
                                <span className="text-3xl">🔑</span>
                            </div>
                            <h3 className="text-xl font-bold text-primary mb-3 text-center">Property Sales</h3>
                            <p className="text-gray-600 text-center">Expert guidance through the entire buying and selling process with market insights and negotiation support.</p>
                        </div>

                        <div className="bg-white p-8 rounded-xl shadow-md hover:shadow-xl transition duration-300">
                            <div className="w-16 h-16 bg-secondary rounded-full flex items-center justify-center mb-4 mx-auto">
                                <span className="text-3xl">📋</span>
                            </div>
                            <h3 className="text-xl font-bold text-primary mb-3 text-center">Property Management</h3>
                            <p className="text-gray-600 text-center">Full-service property management including tenant screening, maintenance, and rent collection.</p>
                        </div>

                        <div className="bg-white p-8 rounded-xl shadow-md hover:shadow-xl transition duration-300">
                            <div className="w-16 h-16 bg-secondary rounded-full flex items-center justify-center mb-4 mx-auto">
                                <span className="text-3xl">💰</span>
                            </div>
                            <h3 className="text-xl font-bold text-primary mb-3 text-center">Investment Consulting</h3>
                            <p className="text-gray-600 text-center">Strategic advice on real estate investments to maximize your returns and build wealth.</p>
                        </div>

                        <div className="bg-white p-8 rounded-xl shadow-md hover:shadow-xl transition duration-300">
                            <div className="w-16 h-16 bg-secondary rounded-full flex items-center justify-center mb-4 mx-auto">
                                <span className="text-3xl">📊</span>
                            </div>
                            <h3 className="text-xl font-bold text-primary mb-3 text-center">Market Analysis</h3>
                            <p className="text-gray-600 text-center">Detailed market reports and property valuations to help you make informed decisions.</p>
                        </div>

                        <div className="bg-white p-8 rounded-xl shadow-md hover:shadow-xl transition duration-300">
                            <div className="w-16 h-16 bg-secondary rounded-full flex items-center justify-center mb-4 mx-auto">
                                <span className="text-3xl">🏗️</span>
                            </div>
                            <h3 className="text-xl font-bold text-primary mb-3 text-center">New Construction</h3>
                            <p className="text-gray-600 text-center">Access to pre-construction opportunities and new development projects in prime locations.</p>
                        </div>

                        <div className="bg-white p-8 rounded-xl shadow-md hover:shadow-xl transition duration-300">
                            <div className="w-16 h-16 bg-secondary rounded-full flex items-center justify-center mb-4 mx-auto">
                                <span className="text-3xl">🤝</span>
                            </div>
                            <h3 className="text-xl font-bold text-primary mb-3 text-center">Relocation Services</h3>
                            <p className="text-gray-600 text-center">Comprehensive support for clients moving to new areas, including neighborhood tours and local insights.</p>
                        </div>
                    </div>
                </div>
            </section>

            {/* Why Choose Us */}
            <section className="bg-white py-16 rounded-xl shadow-inner">
                <div className="container mx-auto px-4 text-center">
                    <h2 className="text-3xl font-heading font-bold text-primary mb-12">Why Choose Us?</h2>
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                        <div className="p-6">
                            <div className="text-4xl text-secondary mb-4 flex justify-center">🏛️</div>
                            <h3 className="text-xl font-bold mb-2">Trusted Agency</h3>
                            <p className="text-gray-600">Over 10 years of experience in the real estate market with a proven track record.</p>
                        </div>
                        <div className="p-6">
                            <div className="text-4xl text-secondary mb-4 flex justify-center">🤝</div>
                            <h3 className="text-xl font-bold mb-2">Transparency</h3>
                            <p className="text-gray-600">We believe in full transparency and honesty in every transaction we handle.</p>
                        </div>
                        <div className="p-6">
                            <div className="text-4xl text-secondary mb-4 flex justify-center">📞</div>
                            <h3 className="text-xl font-bold mb-2">24/7 Support</h3>
                            <p className="text-gray-600">Our dedicated team is available around the clock to assist you with your queries.</p>
                        </div>
                    </div>
                </div>
            </section>

            {/* Testimonials */}
            <section className="container mx-auto px-4 py-16">
                <div className="text-center mb-12">
                    <h2 className="text-3xl font-heading font-bold text-primary mb-4">Client Testimonials</h2>
                    <p className="text-gray-600 max-w-2xl mx-auto">Read honest reviews from our satisfied clients.</p>
                </div>
                <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                    {[{
                        name: "Sarah Jenkins",
                        role: "Home Buyer",
                        location: "Beverly Hills",
                        text: "K Real Estate made my dream come true! They found me a villa that was exactly what I was looking for. Highly recommended!",
                        rating: 5
                    },
                    {
                        name: "James Wilson",
                        role: "Property Investor",
                        location: "New York",
                        text: "Professional, transparent, and incredibly efficient. The team handled my investment portfolio with utmost care.",
                        rating: 4.5
                    },
                    {
                        name: "Emily Thompson",
                        role: "First-time Buyer",
                        location: "San Francisco",
                        text: "I was nervous about buying my first home, but their team guided me through every step. I couldn't be happier!",
                        rating: 4.8
                    }
                    ].map((review, i) => (
                        <div key={i} className="bg-white p-8 rounded-xl shadow-lg border border-gray-100 relative hover:-translate-y-2 transition duration-300">
                            <FaQuoteLeft className="text-4xl text-secondary absolute top-6 left-6 opacity-20" />

                            <p className="text-gray-600 mb-6 italic relative z-10 pt-4">
                                "{review.text}"
                            </p>

                            <div className="flex items-center border-t border-gray-100 pt-4">
                                <FaUserCircle className="text-4xl text-gray-300 mr-3" />
                                <div>
                                    <h4 className="font-bold text-primary">{review.name}</h4>

                                    {/* Stars Positioned Below Name */}
                                    <div className="flex text-yellow-400 my-1 text-sm">
                                        {[...Array(5)].map((_, index) => {
                                            const ratingValue = index + 1;
                                            return (
                                                <span key={index}>
                                                    {review.rating >= ratingValue ? (
                                                        <FaStar />
                                                    ) : review.rating >= ratingValue - 0.5 ? (
                                                        <FaStarHalfAlt />
                                                    ) : (
                                                        <FaRegStar />
                                                    )}
                                                </span>
                                            );
                                        })}
                                    </div>

                                    <p className="text-xs text-secondary font-semibold">{review.role} - {review.location}</p>
                                </div>
                            </div>
                        </div>
                    ))}
                </div>
                <div className="mb-12"></div>
            </section>

            {/* Map Location Section */}
            <section className="container mx-auto px-4 py-16">
                <div className="text-center mb-12">
                    <h2 className="text-3xl font-heading font-bold text-primary mb-4">Visit Our Office</h2>
                    <p className="text-gray-600 max-w-2xl mx-auto">Find us at our convenient location. We're here to help you find your dream property.</p>
                </div>

                <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
                    {/* Map */}
                    <div className="rounded-2xl overflow-hidden shadow-lg h-[400px]">
                        <iframe
                            src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3151.835434509374!2d144.95373531531654!3d-37.817209979751654!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x6ad65d4c2b349649%3A0xb6899234e561db11!2sEnvato!5e0!3m2!1sen!2sus!4v1234567890123!5m2!1sen!2sus"
                            width="100%"
                            height="100%"
                            style={{ border: 0 }}
                            allowFullScreen=""
                            loading="lazy"
                            referrerPolicy="no-referrer-when-downgrade"
                            title="Office Location"
                        ></iframe>
                    </div>

                    {/* Contact Info */}
                    <div className="bg-white p-8 rounded-2xl shadow-lg flex flex-col justify-center">
                        <h3 className="text-2xl font-bold text-primary mb-6">Contact Information</h3>

                        <div className="space-y-4">
                            <div className="flex items-start gap-4">
                                <div className="text-2xl text-secondary">📍</div>
                                <div>
                                    <h4 className="font-bold text-gray-700 mb-1">Address</h4>
                                    <p className="text-gray-600">123 Real Estate Ave<br />Business City, ST 12345</p>
                                </div>
                            </div>

                            <div className="flex items-start gap-4">
                                <div className="text-2xl text-secondary">📞</div>
                                <div>
                                    <h4 className="font-bold text-gray-700 mb-1">Phone</h4>
                                    <p className="text-gray-600">+1 (555) 123-4567</p>
                                </div>
                            </div>

                            <div className="flex items-start gap-4">
                                <div className="text-2xl text-secondary">✉️</div>
                                <div>
                                    <h4 className="font-bold text-gray-700 mb-1">Email</h4>
                                    <p className="text-gray-600">info@krealestate.com</p>
                                </div>
                            </div>

                            <div className="flex items-start gap-4">
                                <div className="text-2xl text-secondary">🕒</div>
                                <div>
                                    <h4 className="font-bold text-gray-700 mb-1">Business Hours</h4>
                                    <p className="text-gray-600">
                                        Mon - Fri: 9:00 AM - 6:00 PM<br />
                                        Sat: 10:00 AM - 4:00 PM<br />
                                        Sun: Closed
                                    </p>
                                </div>
                            </div>
                        </div>

                        <Link to="/properties" className="mt-8 bg-primary text-white px-6 py-3 rounded-lg font-bold hover:bg-secondary hover:text-primary transition text-center">
                            Browse Properties
                        </Link>
                    </div>
                </div>
            </section>


        </div>
    );
};

export default HomeScreen;
