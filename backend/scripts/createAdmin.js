import mongoose from 'mongoose';
import dotenv from 'dotenv';
import User from '../models/userModel.js';
import connectDB from '../config/db.js';

dotenv.config();

const createAdminUser = async () => {
    try {
        await connectDB();

        // Check if admin already exists
        const adminExists = await User.findOne({ email: 'admin@krealestate.com' });

        if (adminExists) {
            console.log('❌ Admin user already exists!');
            console.log('Email:', adminExists.email);
            console.log('Role:', adminExists.role);
            process.exit(0);
        }

        // Create admin user
        const admin = await User.create({
            name: 'Admin',
            email: 'admin@krealestate.com',
            password: 'Admin@123', // Will be hashed automatically by the model
            role: 'admin'
        });

        console.log('✅ Admin user created successfully!');
        console.log('━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━');
        console.log('📧 Email: admin@krealestate.com');
        console.log('🔑 Password: Admin@123');
        console.log('👤 Role: admin');
        console.log('━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━');
        console.log('⚠️  Please change the password after first login!');

        process.exit(0);
    } catch (error) {
        console.error('Error creating admin user:', error);
        process.exit(1);
    }
};

createAdminUser();
