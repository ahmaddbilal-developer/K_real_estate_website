import { useState, useEffect } from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom';
import { toast } from 'react-toastify';
import { FaPaperPlane } from 'react-icons/fa';

const MyInquiriesScreen = () => {
    const [messages, setMessages] = useState([]);
    const [selectedThread, setSelectedThread] = useState(null);
    const [replyText, setReplyText] = useState('');

    useEffect(() => {
        fetchMessages();
    }, []);

    const fetchMessages = async () => {
        try {
            const { data } = await axios.get('/api/messages/my');
            setMessages(data);
        } catch (error) {
            console.error(error);
        }
    };

    const handleSendReply = async (e) => {
        e.preventDefault();
        try {
            const { data } = await axios.put(`/api/messages/${selectedThread._id}/user-reply`, { replyText });
            // Update the local message in the list
            const updatedMessages = messages.map(msg => msg._id === data._id ? data : msg);
            setMessages(updatedMessages);
            setSelectedThread(data); // Update active thread view
            setReplyText('');
        } catch (error) {
            toast.error('Failed to send reply');
        }
    };

    return (
        <div className="container mx-auto px-4 py-8 h-[calc(100vh-100px)] flex flex-col">
            <h1 className="text-3xl font-heading font-bold mb-6 text-primary">My Inquiries</h1>

            <div className="flex-1 flex gap-6 overflow-hidden bg-gray-50 rounded-xl border border-gray-200">
                {/* List Sidebar */}
                <div className={`w-full md:w-1/3 bg-white border-r border-gray-200 flex flex-col ${selectedThread ? 'hidden md:flex' : 'flex'}`}>
                    <div className="p-4 border-b">
                        <h2 className="font-bold text-gray-700">Conversations</h2>
                    </div>
                    <div className="flex-1 overflow-y-auto">
                        {messages.length === 0 ? (
                            <div className="p-6 text-center text-gray-400">No inquiries yet.</div>
                        ) : (
                            messages.map((msg) => (
                                <div
                                    key={msg._id}
                                    onClick={() => setSelectedThread(msg)}
                                    className={`p-4 border-b cursor-pointer hover:bg-gray-50 transition ${selectedThread?._id === msg._id ? 'bg-blue-50 border-l-4 border-l-primary' : ''}`}
                                >
                                    <h3 className="font-bold text-primary truncate">{msg.subject}</h3>
                                    <p className="text-xs text-gray-500 mb-1">{new Date(msg.createdAt).toLocaleDateString()}</p>
                                    <p className="text-sm text-gray-600 truncate">{msg.message}</p>
                                    <div className="flex justify-between items-center mt-2">
                                        <span className={`text-xs px-2 py-0.5 rounded ${msg.isReplied ? 'bg-green-100 text-green-800' : 'bg-yellow-100 text-yellow-800'}`}>
                                            {msg.isReplied ? 'Active' : 'Pending'}
                                        </span>
                                    </div>
                                </div>
                            ))
                        )}
                    </div>
                </div>

                {/* Chat Area */}
                <div className={`w-full md:w-2/3 flex flex-col bg-gray-50 ${!selectedThread ? 'hidden md:flex' : 'flex'}`}>
                    {selectedThread ? (
                        <>
                            {/* Header */}
                            <div className="bg-white p-4 border-b flex justify-between items-center">
                                <div>
                                    <button onClick={() => setSelectedThread(null)} className="md:hidden text-gray-500 mr-2">← Back</button>
                                    <span className="font-bold text-lg text-primary">{selectedThread.subject}</span>
                                    {selectedThread.property && <span className="text-xs ml-2 bg-gray-200 px-2 py-1 rounded">Property Ref</span>}
                                </div>
                            </div>

                            {/* Messages Stream */}
                            <div className="flex-1 overflow-y-auto p-4 space-y-4">
                                {/* Original Message */}
                                <div className="flex justify-end">
                                    <div className="bg-primary text-white p-3 rounded-l-lg rounded-br-lg max-w-[80%]">
                                        <p>{selectedThread.message}</p>
                                        <span className="text-xs opacity-70 block text-right mt-1">{new Date(selectedThread.createdAt).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })} (Initial)</span>
                                    </div>
                                </div>

                                {/* Legacy Reply (Backward Compatibility) */}
                                {selectedThread.adminReply && (
                                    <div className="flex justify-start">
                                        <div className="bg-white border border-gray-200 text-gray-800 p-3 rounded-r-lg rounded-bl-lg max-w-[80%]">
                                            <p>{selectedThread.adminReply}</p>
                                            <span className="text-xs text-gray-400 block mt-1">Admin • (Legacy)</span>
                                        </div>
                                    </div>
                                )}

                                {/* Replies Stream */}
                                {selectedThread.replies?.map((reply, idx) => (
                                    <div key={idx} className={`flex ${reply.sender === 'user' ? 'justify-end' : 'justify-start'}`}>
                                        <div className={`p-3 rounded-lg max-w-[80%] ${reply.sender === 'user' ? 'bg-primary text-white rounded-l-lg rounded-br-lg' : 'bg-white border border-gray-200 text-gray-800 rounded-r-lg rounded-bl-lg'}`}>
                                            <p>{reply.message}</p>
                                            <span className={`text-xs block mt-1 ${reply.sender === 'user' ? 'text-blue-100 text-right' : 'text-gray-400'}`}>
                                                {reply.sender === 'admin' && <span className="font-bold mr-1">Admin •</span>}
                                                {new Date(reply.createdAt).toLocaleString()}
                                            </span>
                                        </div>
                                    </div>
                                ))}
                            </div>

                            {/* Input Area */}
                            <form onSubmit={handleSendReply} className="p-4 bg-white border-t">
                                <div className="flex gap-2">
                                    <input
                                        type="text"
                                        value={replyText}
                                        onChange={(e) => setReplyText(e.target.value)}
                                        placeholder="Type your reply..."
                                        className="flex-1 border border-gray-300 rounded-lg px-4 py-2 focus:outline-none focus:border-primary"
                                        required
                                    />
                                    <button type="submit" className="bg-secondary text-primary px-6 py-2 rounded-lg font-bold hover:bg-opacity-90 transition">
                                        <FaPaperPlane />
                                    </button>
                                </div>
                            </form>
                        </>
                    ) : (
                        <div className="flex-1 flex flex-col items-center justify-center text-gray-400">
                            <div className="text-6xl mb-4">💬</div>
                            <p>Select a conversation to view messages</p>
                        </div>
                    )}
                </div>
            </div>
        </div>
    );
};

export default MyInquiriesScreen;
