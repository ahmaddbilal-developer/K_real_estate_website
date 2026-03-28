import { useState } from 'react';
import { FaCommentDots, FaPaperPlane, FaTimes } from 'react-icons/fa';
import { toast } from 'react-toastify';
import axios from 'axios';
import { useAuth } from '../context/AuthContext';

const FloatingChat = () => {
    const { userInfo } = useAuth();
    const [isOpen, setIsOpen] = useState(false);
    const [subject, setSubject] = useState('');
    const [message, setMessage] = useState('');
    const [loading, setLoading] = useState(false);

    // Only show if user is logged in
    if (!userInfo) return null;

    const submitHandler = async (e) => {
        e.preventDefault();
        setLoading(true);
        try {
            await axios.post('/api/messages', {
                subject,
                message,
                propertyId: null // General inquiry
            }, {
                withCredentials: true // Important for cookies
            });
            toast.success('Message sent to Admin!');
            setSubject('');
            setMessage('');
            setIsOpen(false);
        } catch (err) {
            toast.error(err?.response?.data?.message || err.message);
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="fixed bottom-6 right-6 z-50 flex flex-col items-end">
            {/* Chat Box */}
            {isOpen && (
                <div className="bg-white w-80 rounded-lg shadow-2xl mb-4 overflow-hidden border border-gray-200 animate-fade-in-up">
                    <div className="bg-primary text-white p-4 flex justify-between items-center">
                        <h3 className="font-bold">Contact Admin</h3>
                        <button onClick={() => setIsOpen(false)} className="hover:text-secondary">
                            <FaTimes />
                        </button>
                    </div>
                    <form onSubmit={submitHandler} className="p-4 space-y-3">
                        <div>
                            <input
                                type="text"
                                placeholder="Subject"
                                className="w-full border border-gray-300 rounded px-3 py-2 text-sm focus:outline-none focus:border-primary"
                                value={subject}
                                onChange={(e) => setSubject(e.target.value)}
                                required
                            />
                        </div>
                        <div>
                            <textarea
                                placeholder="How can we help?"
                                rows="3"
                                className="w-full border border-gray-300 rounded px-3 py-2 text-sm focus:outline-none focus:border-primary"
                                value={message}
                                onChange={(e) => setMessage(e.target.value)}
                                required
                            ></textarea>
                        </div>
                        <button
                            type="submit"
                            disabled={loading}
                            className="w-full bg-secondary text-primary font-bold py-2 rounded text-sm hover:bg-yellow-400 transition flex justify-center items-center gap-2"
                        >
                            {loading ? 'Sending...' : <><FaPaperPlane /> Send Message</>}
                        </button>
                    </form>
                </div>
            )}

            {/* Toggle Button */}
            <button
                onClick={() => setIsOpen(!isOpen)}
                className="bg-primary text-secondary p-4 rounded-full shadow-lg hover:bg-secondary hover:text-primary transition transform hover:scale-110 duration-300 flex items-center justify-center"
            >
                <FaCommentDots className="text-2xl" />
            </button>
        </div>
    );
};

export default FloatingChat;
