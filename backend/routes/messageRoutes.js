import express from 'express';
import {
    createMessage,
    getMessages,
    getMyMessages,
    replyToMessage,
    replyToMessageUser,
    markMessageAsRead,
} from '../controllers/messageController.js';
import { protect, admin } from '../middleware/authMiddleware.js';

const router = express.Router();

router.route('/')
    .post(protect, createMessage)
    .get(protect, admin, getMessages);

router.get('/my', protect, getMyMessages);
router.put('/:id/reply', protect, admin, replyToMessage);
router.put('/:id/user-reply', protect, replyToMessageUser);
router.put('/:id/read', protect, admin, markMessageAsRead);

export default router;
