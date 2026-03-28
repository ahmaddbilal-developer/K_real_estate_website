import { useState } from 'react';
import { toast } from 'react-toastify';
import { FaPhone, FaEnvelope, FaMapMarkerAlt } from 'react-icons/fa';

const ContactScreen = () => {
    const [name, setName] = useState('');
    const [email, setEmail] = useState('');
    const [message, setMessage] = useState('');

    const submitHandler = (e) => {
        e.preventDefault();
        // Here we would typically send this to a backend endpoint
        console.log({ name, email, message });
        toast.success('Message sent successfully! We will get back to you soon.');
        setName('');
        setEmail('');
        setMessage('');
    };

    return (
        <div className="container mx-auto px-4 py-8">
            <div className="text-center mb-16">
                <h1 className="text-4xl md:text-5xl font-heading font-bold text-primary mb-4">Contact Us</h1>
                <p className="text-xl text-gray-500 max-w-2xl mx-auto">
                    Have questions? We'd love to hear from you. Reach out to our team today.
                </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-12">
                {/* Contact Info */}
                <div className="bg-white p-8 rounded-xl shadow-lg h-fit">
                    <h2 className="text-2xl font-bold text-primary mb-6">Get In Touch</h2>

                    <div className="space-y-6">
                        <div className="flex items-start space-x-4">
                            <div className="bg-blue-100 p-3 rounded-full text-primary text-xl">
                                <FaMapMarkerAlt />
                            </div>
                            <div>
                                <h4 className="font-bold text-gray-800">Our Office</h4>
                                <p className="text-gray-600">123 Real Estate Ave, Suite 100<br />Business City, ST 12345</p>
                            </div>
                        </div>

                        <div className="flex items-start space-x-4">
                            <div className="bg-blue-100 p-3 rounded-full text-primary text-xl">
                                <FaEnvelope />
                            </div>
                            <div>
                                <h4 className="font-bold text-gray-800">Email Us</h4>
                                <p className="text-gray-600">info@krealestate.com<br />support@krealestate.com</p>
                            </div>
                        </div>

                        <div className="flex items-start space-x-4">
                            <div className="bg-blue-100 p-3 rounded-full text-primary text-xl">
                                <FaPhone />
                            </div>
                            <div>
                                <h4 className="font-bold text-gray-800">Call Us</h4>
                                <p className="text-gray-600">+1 (555) 123-4567<br />Mon-Fri, 9am - 6pm</p>
                            </div>
                        </div>
                    </div>
                </div>

                {/* Contact Form */}
                <div className="bg-white p-8 rounded-xl shadow-lg">
                    <h2 className="text-2xl font-bold text-primary mb-6">Send a Message</h2>
                    <form onSubmit={submitHandler} className="space-y-6">
                        <div>
                            <label className="block text-gray-700 font-bold mb-2">Your Name</label>
                            <input
                                type="text"
                                className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:border-secondary"
                                placeholder="Enter your name"
                                value={name}
                                onChange={(e) => setName(e.target.value)}
                                required
                            />
                        </div>
                        <div>
                            <label className="block text-gray-700 font-bold mb-2">Email Address</label>
                            <input
                                type="email"
                                className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:border-secondary"
                                placeholder="Enter your email"
                                value={email}
                                onChange={(e) => setEmail(e.target.value)}
                                required
                            />
                        </div>
                        <div>
                            <label className="block text-gray-700 font-bold mb-2">Message</label>
                            <textarea
                                className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:border-secondary h-32"
                                placeholder="How can we help you?"
                                value={message}
                                onChange={(e) => setMessage(e.target.value)}
                                required
                            ></textarea>
                        </div>
                        <button type="submit" className="w-full bg-primary text-white py-3 rounded-lg font-bold hover:bg-secondary hover:text-primary transition shadow-md">
                            SendMessage
                        </button>
                    </form>
                </div>
            </div>
        </div>
    );
};

export default ContactScreen;
