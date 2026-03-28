import asyncHandler from 'express-async-handler';
import Message from '../models/messageModel.js';
import User from '../models/userModel.js';
import sendEmail from '../utils/sendEmail.js';

// @desc    Create new inquiry/message
// @route   POST /api/messages
// @access  Private (User must be logged in as per request)
const createMessage = asyncHandler(async (req, res) => {
    const { propertyId, subject, message } = req.body;

    // Prevent Admin from creating inquiries
    if (req.user.role === 'admin') {
        res.status(403);
        throw new Error('Admins cannot send inquiries');
    }

    const newMessage = new Message({
        user: req.user._id,
        property: propertyId,
        subject,
        message,
    });

    const createdMessage = await newMessage.save();
    res.status(201).json(createdMessage);
});

// @desc    Get all messages (Admin)
// @route   GET /api/messages
// @access  Private/Admin
const getMessages = asyncHandler(async (req, res) => {
    const messages = await Message.find({}).populate('user', 'name email').populate('property', 'title');
    res.json(messages);
});

// @desc    Get user's messages
// @route   GET /api/messages/my
// @access  Private
const getMyMessages = asyncHandler(async (req, res) => {
    const messages = await Message.find({ user: req.user._id }).populate('property', 'title');
    res.json(messages);
});

// @desc    Reply to message (Admin)
// @route   PUT /api/messages/:id/reply
// @access  Private/Admin
const replyToMessage = asyncHandler(async (req, res) => {
    const { replyText } = req.body;
    const message = await Message.findById(req.params.id).populate('user', 'name email');

    if (message) {
        const reply = {
            sender: 'admin',
            message: replyText,
        };

        message.replies.push(reply);
        message.isReplied = true; // Mark as replied (active thread)

        await message.save();

        if (message.user) {
            // Send Email Notification
            try {
                await sendEmail({
                    email: message.user.email,
                    subject: `New Reply: ${message.subject}`,
                    message: `Hello ${message.user.name},\n\nYou have a new reply on your inquiry:\n\n"${replyText}"\n\nLogin to viewing the full conversation.\n\nBest Regards,\nReal Estate Team`,
                });
            } catch (error) {
                console.error('Email send failed', error);
            }
        } else {
            // If user is deleted
            res.status(400);
            throw new Error('Cannot reply to a deleted user account');
        }

        res.json(message);
    } else {
        res.status(404);
        throw new Error('Message not found');
    }
});

// @desc    Reply to message (User)
// @route   PUT /api/messages/:id/user-reply
// @access  Private
const replyToMessageUser = asyncHandler(async (req, res) => {
    const { replyText } = req.body;
    const message = await Message.findOne({ _id: req.params.id, user: req.user._id });

    if (message) {
        const reply = {
            sender: 'user',
            message: replyText,
        };

        message.replies.push(reply);
        await message.save();
        res.json(message);
    } else {
        res.status(404);
        throw new Error('Message not found');
    }
});

// @desc    Mark message as read
// @route   PUT /api/messages/:id/read
// @access  Private/Admin
const markMessageAsRead = asyncHandler(async (req, res) => {
    const message = await Message.findById(req.params.id);

    if (message) {
        message.isRead = true;
        const updatedMessage = await message.save();
        res.json(updatedMessage);
    } else {
        res.status(404);
        throw new Error('Message not found');
    }
});

export { createMessage, getMessages, getMyMessages, replyToMessage, replyToMessageUser, markMessageAsRead };
