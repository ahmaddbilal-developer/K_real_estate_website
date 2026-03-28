import mongoose from 'mongoose';

const messageSchema = mongoose.Schema({
    user: {
        type: mongoose.Schema.Types.ObjectId,
        required: true,
        ref: 'User',
    },
    property: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Property', // Optional, if inquiry is about a specific property
    },
    subject: {
        type: String,
        required: true,
    },
    message: {
        type: String,
        required: true,
    },
    replies: [
        {
            sender: { type: String, enum: ['user', 'admin'], required: true },
            message: { type: String, required: true },
            createdAt: { type: Date, default: Date.now },
        }
    ],
    // Keep legacy fields for backward compatibility if needed, or remove them. 
    // For clean upgrade, we can ignore them or rely on replies array length
    isReplied: {
        type: Boolean,
        default: false,
    },
    isRead: {
        type: Boolean,
        default: false,
    },
}, {
    timestamps: true,
});

const Message = mongoose.model('Message', messageSchema);
export default Message;
