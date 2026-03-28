import asyncHandler from 'express-async-handler';
import User from '../models/userModel.js';
import Property from '../models/propertyModel.js';
import Blog from '../models/blogModel.js';
import Message from '../models/messageModel.js';
import generateToken from '../utils/generateToken.js';
import sendEmail from '../utils/sendEmail.js';
import crypto from 'crypto';

// @desc    Auth user & get token
// @route   POST /api/users/auth
// @access  Public
const authUser = asyncHandler(async (req, res) => {
    const { email, password } = req.body;

    const user = await User.findOne({ email });

    if (user && (await user.matchPassword(password))) {
        generateToken(res, user._id);
        res.status(200).json({
            _id: user._id,
            name: user.name,
            email: user.email,
            role: user.role,
        });
    } else {
        res.status(401);
        throw new Error('Invalid email or password');
    }
});

// @desc    Register a new user
// @route   POST /api/users
// @access  Public
const registerUser = asyncHandler(async (req, res) => {
    const { name, email, password } = req.body;

    const userExists = await User.findOne({ email });

    if (userExists) {
        res.status(400);
        throw new Error('User already exists');
    }

    const user = await User.create({
        name,
        email,
        password,
    });

    if (user) {
        generateToken(res, user._id);
        res.status(201).json({
            _id: user._id,
            name: user.name,
            email: user.email,
            role: user.role,
        });
    } else {
        res.status(400);
        throw new Error('Invalid user data');
    }
});

// @desc    Logout user
// @route   POST /api/users/logout
// @access  Public
const logoutUser = asyncHandler(async (req, res) => {
    res.cookie('jwt', '', {
        httpOnly: true,
        expires: new Date(0),
    });
    res.status(200).json({ message: 'User logged out' });
});

// @desc    Get user profile
// @route   GET /api/users/profile
// @access  Private
const getUserProfile = asyncHandler(async (req, res) => {
    const user = {
        _id: req.user._id,
        name: req.user.name,
        email: req.user.email,
        role: req.user.role,
    };
    res.status(200).json(user);
});

// @desc    Update user profile
// @route   PUT /api/users/profile
// @access  Private
const updateUserProfile = asyncHandler(async (req, res) => {
    const user = await User.findById(req.user._id);

    if (user) {
        user.name = req.body.name || user.name;
        // Email cannot be updated
        // user.email = req.body.email || user.email;

        if (req.body.password) {
            if (!req.body.oldPassword) {
                res.status(400);
                throw new Error('Old password is required to set a new password');
            }
            if (!(await user.matchPassword(req.body.oldPassword))) {
                res.status(401);
                throw new Error('Invalid old password');
            }
            user.password = req.body.password;
        }

        const updatedUser = await user.save();

        res.status(200).json({
            _id: updatedUser._id,
            name: updatedUser.name,
            email: updatedUser.email,
            role: updatedUser.role,
        });
    } else {
        res.status(404);
        throw new Error('User not found');
    }
});

// @desc    Forgot Password
// @route   POST /api/users/forgot-password
// @access  Public
const forgotPassword = asyncHandler(async (req, res) => {
    const { email } = req.body;
    const user = await User.findOne({ email });

    if (!user) {
        res.status(404);
        throw new Error('User not found');
    }

    // Get reset token
    const resetToken = user.getResetPasswordToken();

    await user.save({ validateBeforeSave: false });

    // Create reset url
    // For local dev, frontend is on 5173 usually
    const resetUrl = `http://localhost:5173/reset-password/${resetToken}`;

    let subject = 'Password Reset Token';
    let message = `You are receiving this email because you (or someone else) has requested the reset of a password. Please make a PUT request to: \n\n ${resetUrl}`;

    if (user.role === 'admin') {
        subject = 'K Real Estate - ADMIN Password Reset';
        message = `
*** ADMIN ACCESS RECOVERY ***

A request has been received to reset the password for the Administrator account: ${user.email}

Link: ${resetUrl}

If you did not initiate this request, please investigate immediately as this concerns administrative access.
        `;
    }

    try {
        await sendEmail({
            email: user.email,
            subject,
            message,
        });

        res.status(200).json({ success: true, data: 'Email sent' });
    } catch (error) {
        console.log(error);
        user.resetPasswordToken = undefined;
        user.resetPasswordExpire = undefined;

        await user.save({ validateBeforeSave: false });

        res.status(500);
        throw new Error('Email could not be sent');
    }
});

// @desc    Reset Password
// @route   PUT /api/users/reset-password/:token
// @access  Public
const resetPassword = asyncHandler(async (req, res) => {
    // Get hashed token
    const resetPasswordToken = crypto
        .createHash('sha256')
        .update(req.params.token)
        .digest('hex');

    const user = await User.findOne({
        resetPasswordToken,
        resetPasswordExpire: { $gt: Date.now() },
    });

    if (!user) {
        res.status(400);
        throw new Error('Invalid token');
    }

    // Set new password
    user.password = req.body.password;
    user.resetPasswordToken = undefined;
    user.resetPasswordExpire = undefined;

    await user.save();

    res.status(200).json({
        success: true,
        data: 'Password reset success',
    });
});

// @desc    Get dashboard stats
// @route   GET /api/users/stats
// @access  Private/Admin
const getDashboardStats = asyncHandler(async (req, res) => {
    const userCount = await User.countDocuments({ role: { $ne: 'admin' } });
    const propertyCount = await Property.countDocuments();
    const blogCount = await Blog.countDocuments();
    const messageCount = await Message.countDocuments({ isRead: false });

    res.status(200).json({
        users: userCount,
        properties: propertyCount,
        blogs: blogCount,
        messages: messageCount,
    });
});

// @desc    Get all users (non-admins)
// @route   GET /api/users
// @access  Private/Admin
const getUsers = asyncHandler(async (req, res) => {
    const users = await User.find({ role: { $ne: 'admin' } }).select('-password').sort({ createdAt: -1 });
    res.json(users);
});



// @desc    Delete user profile (Close Account)
// @route   DELETE /api/users/profile
// @access  Private
const deleteUserProfile = asyncHandler(async (req, res) => {
    const user = await User.findById(req.user._id);

    if (user) {
        const { password } = req.body;
        if (!password) {
            res.status(400);
            throw new Error('Password is required to delete account');
        }

        if (await user.matchPassword(password)) {
            await User.deleteOne({ _id: user._id });
            res.cookie('jwt', '', {
                httpOnly: true,
                expires: new Date(0),
            });
            res.status(200).json({ message: 'User deleted successfully' });
        } else {
            res.status(401);
            throw new Error('Incorrect password');
        }
    } else {
        res.status(404);
        throw new Error('User not found');
    }
});

// @desc    Google Login
// @route   POST /api/users/google
// @access  Public
const googleLogin = asyncHandler(async (req, res) => {
    const { email, name, googleId, picture } = req.body;
    // Simple implementation: Trusts client (for demo). 
    // Secure way: Verify idToken with google-auth-library backend side.

    let user = await User.findOne({ email });

    if (user) {
        // User exists, login
        generateToken(res, user._id);
        res.json({
            _id: user._id,
            name: user.name,
            email: user.email,
            role: user.role,
        });
    } else {
        // User doesn't exist, create new
        const password = email + process.env.JWT_SECRET; // Dummy password for oauth users
        user = await User.create({
            name,
            email,
            password,
        });

        if (user) {
            generateToken(res, user._id);
            res.status(201).json({
                _id: user._id,
                name: user.name,
                email: user.email,
                role: user.role,
            });
        } else {
            res.status(400);
            throw new Error('Invalid user data');
        }
    }
});

// @desc    Facebook Login
// @route   POST /api/users/facebook
// @access  Public
const facebookLogin = asyncHandler(async (req, res) => {
    const { email, name, userID, picture } = req.body;

    let user = await User.findOne({ email });

    if (user) {
        generateToken(res, user._id);
        res.json({
            _id: user._id,
            name: user.name,
            email: user.email,
            role: user.role,
        });
    } else {
        const password = email + process.env.JWT_SECRET;
        user = await User.create({
            name,
            email,
            password,
        });

        if (user) {
            generateToken(res, user._id);
            res.status(201).json({
                _id: user._id,
                name: user.name,
                email: user.email,
                role: user.role,
            });
        } else {
            res.status(400);
            throw new Error('Invalid user data');
        }
    }
});

export {
    authUser,
    registerUser,
    logoutUser,
    getUserProfile,
    updateUserProfile,
    forgotPassword,
    resetPassword,
    getDashboardStats,
    getUsers,
    deleteUserProfile,
    googleLogin,
    facebookLogin
};
