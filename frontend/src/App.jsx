import { Routes, Route, Navigate } from 'react-router-dom';
import 'react-toastify/dist/ReactToastify.css';
import { ToastContainer } from 'react-toastify';

import MainLayout from './components/MainLayout';
import AdminLayout from './components/AdminLayout';

import HomeScreen from './pages/HomeScreen';
import PropertiesScreen from './pages/PropertiesScreen';

import LoginScreen from './pages/LoginScreen';
import RegisterScreen from './pages/RegisterScreen';
import PropertyDetailScreen from './pages/PropertyDetailScreen';
import AboutScreen from './pages/AboutScreen';
import ContactScreen from './pages/ContactScreen';
import BlogScreen from './pages/BlogScreen';
import BlogDetailScreen from './pages/BlogDetailScreen';

import PrivateRoute from './components/PrivateRoute';
import AdminRoute from './components/AdminRoute';
import AdminDashboard from './pages/admin/AdminDashboard';
import AdminPropertiesScreen from './pages/admin/AdminPropertiesScreen';
import AdminBlogsScreen from './pages/admin/AdminBlogsScreen';
import PropertyEditScreen from './pages/admin/PropertyEditScreen';
import BlogEditScreen from './pages/admin/BlogEditScreen';
import AdminMessagesScreen from './pages/admin/AdminMessagesScreen';
import AdminUsersScreen from './pages/admin/AdminUsersScreen';
import AdminLoginScreen from './pages/admin/AdminLoginScreen';
import AdminForgotPasswordScreen from './pages/admin/AdminForgotPasswordScreen';
import ProfileScreen from './pages/ProfileScreen';
import MyInquiriesScreen from './pages/MyInquiriesScreen';
import ForgotPasswordScreen from './pages/ForgotPasswordScreen';
import ResetPasswordScreen from './pages/ResetPasswordScreen';
import NotFoundScreen from './pages/NotFoundScreen';

import ScrollToTop from './components/ScrollToTop';

function App() {
    return (
        <>
            <ScrollToTop />
            <Routes>
                {/* Public Website Layout */}
                <Route element={<MainLayout />}>
                    <Route path="/" element={<HomeScreen />} />
                    <Route path="/properties" element={<PropertiesScreen />} />
                    <Route path="/property/:id" element={<PropertyDetailScreen />} />
                    <Route path="/blogs" element={<BlogScreen />} />
                    <Route path="/blog/:slug" element={<BlogDetailScreen />} />
                    <Route path="/about" element={<AboutScreen />} />
                    <Route path="/contact" element={<ContactScreen />} />
                    <Route path="/login" element={<LoginScreen />} />
                    <Route path="/register" element={<RegisterScreen />} />
                    <Route path="/forgot-password" element={<ForgotPasswordScreen />} />
                    <Route path="/reset-password/:token" element={<ResetPasswordScreen />} />

                    {/* User Private Routes (Still part of main site) */}
                    <Route element={<PrivateRoute />}>
                        <Route path="/profile" element={<ProfileScreen />} />
                        <Route path="/my-inquiries" element={<MyInquiriesScreen />} />
                    </Route>
                </Route>

                {/* Admin Routes */}
                <Route path="/admin">
                    {/* Public login page */}
                    <Route index element={<AdminLoginScreen />} />
                    <Route path="login" element={<AdminLoginScreen />} />
                    <Route path="forgot-password" element={<AdminForgotPasswordScreen />} />

                    {/* Protected admin routes */}
                    <Route element={<AdminRoute />}>
                        <Route element={<AdminLayout />}>
                            <Route path="dashboard" element={<AdminDashboard />} />
                            <Route path="property" element={<AdminPropertiesScreen />} />
                            <Route path="blog" element={<AdminBlogsScreen />} />
                            <Route path="messages" element={<AdminMessagesScreen />} />
                            <Route path="users" element={<AdminUsersScreen />} />
                            <Route path="property/create" element={<PropertyEditScreen />} />
                            <Route path="property/:id/edit" element={<PropertyEditScreen />} />
                            <Route path="blog/create" element={<BlogEditScreen />} />
                            <Route path="blog/:id/edit" element={<BlogEditScreen />} />
                        </Route>
                    </Route>
                </Route>

                {/* 404 Catch All */}
                <Route path="*" element={<NotFoundScreen />} />
            </Routes>
            <ToastContainer
                position="top-right"
                autoClose={3000}
                hideProgressBar={false}
                newestOnTop={false}
                closeOnClick
                rtl={false}
                pauseOnFocusLoss={false}
                draggable={false}
                pauseOnHover={false}
                theme="light"
            />
        </>
    )
}

export default App
