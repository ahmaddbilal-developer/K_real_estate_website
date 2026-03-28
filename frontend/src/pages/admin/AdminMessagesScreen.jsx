import { useState, useEffect } from 'react';
import axios from 'axios';
import { toast } from 'react-toastify';

const AdminMessagesScreen = () => {
    const [messages, setMessages] = useState([]);
    const [replyText, setReplyText] = useState('');
    const [selectedMessage, setSelectedMessage] = useState(null);

    useEffect(() => {
        fetchMessages();
    }, []);

    const fetchMessages = async () => {
        try {
            const { data } = await axios.get('/api/messages');
            setMessages(data);
        } catch (error) {
            console.error(error);
        }
    };

    const submitReplyHandler = async (e) => {
        e.preventDefault();
        try {
            const { data } = await axios.put(`/api/messages/${selectedMessage._id}/reply`, { replyText });
            // toast.success('Reply sent'); // User requested to hide this notification
            setReplyText('');
            // Update the selected message with new data (containing replies)
            setSelectedMessage(data);
            fetchMessages(); // Refresh list list to update 'replied' indicators if needed
        } catch (err) {
            toast.error(err.response?.data?.message || err.message);
        }
    };

    const handleSelectMessage = async (msg) => {
        setSelectedMessage(msg);
        if (!msg.isRead) {
            try {
                await axios.put(`/api/messages/${msg._id}/read`);
                // Update local state to reflect read status immediately
                setMessages(prev => prev.map(m => m._id === msg._id ? { ...m, isRead: true } : m));
            } catch (error) {
                console.error('Failed to mark as read', error);
            }
        }
    };

    return (
        <div className="container mx-auto px-4 py-8">
            <h1 className="text-3xl font-heading font-bold mb-8 text-primary">Inquiries & Messages</h1>

            <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
                {/* Message List */}
                <div className="space-y-4">
                    {messages.map((msg) => (
                        <div
                            key={msg._id}
                            className={`p-4 rounded-xl shadow-md cursor-pointer transition ${selectedMessage?._id === msg._id ? 'bg-blue-50 border-l-4 border-primary' : 'bg-white hover:shadow-lg'} ${!msg.isRead ? 'border-r-4 border-r-green-500' : ''}`}
                            onClick={() => handleSelectMessage(msg)}
                        >
                            <div className="flex justify-between mb-1">
                                <span className="font-bold text-primary">{msg.user?.name || 'Unknown User'}</span>
                                <span className="text-xs text-gray-400">{new Date(msg.createdAt).toLocaleDateString()}</span>
                            </div>
                            <h4 className="font-semibold text-sm mb-1">{msg.subject}</h4>
                            <p className="text-gray-500 text-sm truncate">{msg.message}</p>
                            {msg.isReplied && <span className="text-xs text-green-600 font-bold mt-2 block">✓ Replied</span>}
                        </div>
                    ))}
                </div>

                {/* Chat Panel */}
                <div className="bg-white rounded-xl shadow-lg flex flex-col h-[600px] border border-gray-200">
                    {selectedMessage ? (
                        <>
                            {/* Chat Header */}
                            <div className="p-4 border-b bg-gray-50 rounded-t-xl">
                                <h3 className="text-lg font-bold text-primary">{selectedMessage.subject}</h3>
                                <div className="flex justify-between items-center text-sm text-gray-500 mt-1">
                                    {selectedMessage.user ? (
                                        <span>From: <span className="font-semibold text-gray-800">{selectedMessage.user.name}</span> ({selectedMessage.user.email})</span>
                                    ) : (
                                        <span className="text-red-500 font-bold">User Account Closed (Deleted)</span>
                                    )}
                                </div>
                            </div>

                            {/* Chat Messages Area */}
                            <div className="flex-1 overflow-y-auto p-4 space-y-4 bg-gray-50/50">
                                {/* Initial Inquiry */}
                                <div className="flex justify-start">
                                    <div className="bg-white border border-gray-200 text-gray-800 p-3 rounded-r-lg rounded-bl-lg max-w-[85%] shadow-sm">
                                        <p>{selectedMessage.message}</p>
                                        <span className="text-xs text-gray-400 block mt-1">User • {new Date(selectedMessage.createdAt).toLocaleString()}</span>
                                    </div>
                                </div>

                                {/* Legacy Reply */}
                                {selectedMessage.adminReply && (
                                    <div className="flex justify-end">
                                        <div className="bg-primary text-white p-3 rounded-l-lg rounded-br-lg max-w-[85%] shadow-sm">
                                            <p>{selectedMessage.adminReply}</p>
                                            <span className="text-xs text-blue-200 block mt-1 text-right">You • (Legacy)</span>
                                        </div>
                                    </div>
                                )}

                                {/* Replies */}
                                {selectedMessage.replies?.map((reply, idx) => (
                                    <div key={idx} className={`flex ${reply.sender === 'admin' ? 'justify-end' : 'justify-start'}`}>
                                        <div className={`p-3 rounded-lg max-w-[85%] shadow-sm ${reply.sender === 'admin'
                                            ? 'bg-primary text-white rounded-l-lg rounded-br-lg'
                                            : 'bg-white border border-gray-200 text-gray-800 rounded-r-lg rounded-bl-lg'
                                            }`}>
                                            <p>{reply.message}</p>
                                            <span className={`text-xs block mt-1 ${reply.sender === 'admin' ? 'text-blue-200 text-right' : 'text-gray-400'}`}>
                                                {reply.sender === 'admin' ? 'You' : 'User'} • {new Date(reply.createdAt).toLocaleString()}
                                            </span>
                                        </div>
                                    </div>
                                ))}
                            </div>

                            {/* Reply Input */}
                            {selectedMessage.user ? (
                                <form onSubmit={submitReplyHandler} className="p-4 bg-white border-t rounded-b-xl">
                                    <div className="flex gap-2">
                                        <input
                                            type="text"
                                            className="flex-1 px-4 py-2 border rounded-lg focus:outline-none focus:border-primary focus:ring-1 focus:ring-primary"
                                            placeholder="Type your reply here..."
                                            value={replyText}
                                            onChange={(e) => setReplyText(e.target.value)}
                                            required
                                        />
                                        <button type="submit" className="bg-primary text-white px-6 py-2 rounded-lg font-bold hover:bg-opacity-90 transition shadow-sm">
                                            Send
                                        </button>
                                    </div>
                                </form>
                            ) : (
                                <div className="p-4 bg-gray-100 border-t rounded-b-xl text-center">
                                    <p className="text-red-500 font-bold flex items-center justify-center gap-2">
                                        <span className="text-xl">🚫</span> User Account Closed
                                    </p>
                                    <p className="text-xs text-gray-500 mt-1">Replies are disabled for deleted accounts.</p>
                                </div>
                            )}
                        </>
                    ) : (
                        <div className="flex-1 flex flex-col items-center justify-center text-gray-400">
                            <div className="text-6xl mb-4">📨</div>
                            <p>Select an inquiry to read and reply</p>
                        </div>
                    )}
                </div>
            </div>
        </div>
    );
};

export default AdminMessagesScreen;
