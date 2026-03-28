import express from 'express';
import {
    authUser,
    registerUser,
    logoutUser,
    getUserProfile,
    updateUserProfile,
    forgotPassword,
    resetPassword,
    getDashboardStats,
    deleteUserProfile,
    getUsers,
    googleLogin,
    facebookLogin,
} from '../controllers/userController.js';
import { protect, admin } from '../middleware/authMiddleware.js';

const router = express.Router();

router.post('/', registerUser);
router.post('/auth', authUser);
router.post('/logout', logoutUser);
router.post('/google', googleLogin);
router.post('/facebook', facebookLogin);
router.post('/forgot-password', forgotPassword);
router.put('/reset-password/:token', resetPassword);

router.get('/stats', protect, admin, getDashboardStats);
router.get('/', protect, admin, getUsers);

router.route('/profile')
    .get(protect, getUserProfile)
    .put(protect, updateUserProfile)
    .delete(protect, deleteUserProfile);

export default router;
