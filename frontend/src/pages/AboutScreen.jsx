const AboutScreen = () => {
    return (
        <div className="container mx-auto px-4 py-8">
            {/* Hero */}
            <div className="text-center mb-16">
                <h1 className="text-4xl md:text-5xl font-heading font-bold text-primary mb-4">About K Real Estate</h1>
                <p className="text-xl text-gray-500 max-w-2xl mx-auto">
                    We are more than just a real estate agency. We are your partners in building a future.
                </p>
            </div>

            {/* Our Story */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-12 items-center mb-16">
                <div>
                    <img
                        src="https://images.unsplash.com/photo-1577412647305-991150c7d163?ixlib=rb-4.0.3&auto=format&fit=crop&w=1770&q=80"
                        alt="Office"
                        className="rounded-xl shadow-lg w-full h-auto"
                    />
                </div>
                <div>
                    <h2 className="text-3xl font-heading font-bold text-primary mb-4">Our Story</h2>
                    <p className="text-gray-600 mb-4 leading-relaxed">
                        Founded in 2020, K Real Estate started with a simple mission: to make the process of buying, selling, and renting properties as seamless and transparent as possible. We saw a gap in the market for a service that truly prioritized the client's needs above all else.
                    </p>
                    <p className="text-gray-600 leading-relaxed">
                        Over the years, we have grown from a small team of passionate agents to a leading real estate firm in the region. Our success is built on trust, integrity, and an unwavering commitment to excellence. We leverage the latest technology to provide accurate market insights and ensure our clients make informed decisions.
                    </p>
                </div>
            </div>

            {/* Mission & Vision */}
            <div className="bg-primary text-white rounded-xl p-10 mb-16">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-12">
                    <div>
                        <h3 className="text-2xl font-bold text-secondary mb-4">Our Mission</h3>
                        <p className="text-gray-300">
                            To empower individuals and families to achieve their real estate goals through expert guidance, personalized service, and innovative solutions. We strive to create value in every transaction and build lasting relationships.
                        </p>
                    </div>
                    <div>
                        <h3 className="text-2xl font-bold text-secondary mb-4">Our Vision</h3>
                        <p className="text-gray-300">
                            To be the most trusted and respected real estate agency, known for redefining industry standards and transforming the way people experience real estate.
                        </p>
                    </div>
                </div>
            </div>

            {/* Meet the Team */}
            <div className="text-center">
                <h2 className="text-3xl font-heading font-bold text-primary mb-8">Meet Our Team</h2>
                <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-8">
                    {['John Doe', 'Jane Smith', 'Michael Brown'].map((name, index) => (
                        <div key={index} className="bg-white rounded-xl shadow-md p-6 relative group overflow-hidden transition-all duration-300 hover:shadow-xl">
                            <div className="w-24 h-24 bg-gray-200 rounded-full mx-auto mb-4 overflow-hidden relative z-10 transition-transform duration-300 group-hover:scale-105">
                                <img src={`https://randomuser.me/api/portraits/men/${index + 30}.jpg`} alt={name} className="w-full h-full object-cover" />
                            </div>
                            <h3 className="text-xl font-bold text-primary relative z-10">{name}</h3>
                            <p className="text-secondary text-sm font-semibold mb-2 relative z-10">Senior Agent</p>
                            <p className="text-gray-500 text-sm relative z-10 group-hover:opacity-0 transition-opacity duration-300">Dedicated to finding you the perfect home with passion and expertise.</p>

                            {/* Hover Overlay */}
                            <div className="absolute inset-0 bg-primary bg-opacity-90 flex flex-col items-center justify-center text-white opacity-0 group-hover:opacity-100 transition-opacity duration-300 z-20">
                                <h4 className="font-bold text-secondary mb-2">Contact {name.split(' ')[0]}</h4>
                                <p className="text-sm mb-1">+1 (555) 123-456{index}</p>
                                <p className="text-sm mb-3">{name.toLowerCase().replace(' ', '.')}@krealestate.com</p>
                            </div>
                        </div>
                    ))}
                </div>
            </div>
        </div>
    );
};

export default AboutScreen;
