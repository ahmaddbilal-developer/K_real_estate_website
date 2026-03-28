import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App.jsx'
import './index.css'
import { HelmetProvider } from 'react-helmet-async';
import { BrowserRouter } from 'react-router-dom';
import { AuthProvider } from './context/AuthContext.jsx';

import { GoogleOAuthProvider } from '@react-oauth/google';

ReactDOM.createRoot(document.getElementById('root')).render(
    <React.StrictMode>
        <HelmetProvider>
            <AuthProvider>
                <GoogleOAuthProvider clientId="YOUR_GOOGLE_CLIENT_ID">
                    <BrowserRouter>
                        <App />
                    </BrowserRouter>
                </GoogleOAuthProvider>
            </AuthProvider>
        </HelmetProvider>
    </React.StrictMode>,
)
