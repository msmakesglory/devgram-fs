import React, { useState, useEffect } from 'react';
import axios from 'axios';

const Google = () => {
    const [isAuthenticated, setIsAuthenticated] = useState(false);
    const [userInfo, setUserInfo] = useState(null);
    const [error, setError] = useState(null);
    const [loading, setLoading] = useState(false);

    // Configuration - update these values based on your setup
    const CLIENT_ID = '120714316286-90a1ufb13vr7v7blhpmf3eqcca99hc7a.apps.googleusercontent.com';
    const REDIRECT_URI = 'http://localhost:8080/auth/google/callback'; // Must match exactly with what's registered
    const AUTH_ENDPOINT = 'https://accounts.google.com/o/oauth2/v2/auth';
    const SCOPES = 'email profile'; // Adjust based on needed permissions

    // Spring Boot backend endpoints
    const BACKEND_TOKEN_URL = '/api/auth/token';
    const BACKEND_USER_INFO_URL = '/api/auth/user';

    useEffect(() => {
        // Check for auth code in URL when component mounts
        const urlParams = new URLSearchParams(window.location.search);
        const code = urlParams.get('code');

        if (code) {
            // Clear the authorization code from the URL to prevent issues on refresh
            window.history.replaceState({}, document.title, window.location.pathname);
            exchangeCodeForToken(code);
        } else {
            // Check if we have a token in localStorage
            checkAuthStatus();
        }
    }, []);

    const checkAuthStatus = () => {
        const token = localStorage.getItem('jwt_token');
        if (token) {
            // Set up axios default header for all future requests
            axios.defaults.headers.common['Authorization'] = `Bearer ${token}`;

            // Fetch user info with the token
            fetchUserInfo(token);
        }
    };

    const fetchUserInfo = async (token) => {
        try {
            const response = await axios.get(BACKEND_USER_INFO_URL);
            setUserInfo(response.data);
            setIsAuthenticated(true);
        } catch (err) {
            console.error('Failed to fetch user info:', err);
            // Token might be expired or invalid
            handleLogout();
        }
    };

    const initiateLogin = () => {
        // Generate a random state parameter for CSRF protection
        const state = Math.random().toString(36).substring(2, 15);
        localStorage.setItem('oauth_state', state);

        // Build the authorization URL
        const authUrl = `${AUTH_ENDPOINT}?client_id=${CLIENT_ID}`
            + `&redirect_uri=${encodeURIComponent(REDIRECT_URI)}`
            + `&response_type=code`
            + `&state=${state}`
            + `&scope=${encodeURIComponent(SCOPES)}`
            + `&access_type=offline`
            + `&prompt=consent`;

        // Redirect the user to Google's authorization page
        window.location.href = authUrl;
    };

    const exchangeCodeForToken = async (code) => {
        setLoading(true);
        setError(null);

        try {
            // Send the code to your backend, which will exchange it for tokens
            const response = await axios.post(BACKEND_TOKEN_URL, { code });

            // Store the JWT token in localStorage
            const { token, user } = response.data;
            localStorage.setItem('jwt_token', token);

            // Set up axios default header for all future requests
            axios.defaults.headers.common['Authorization'] = `Bearer ${token}`;

            setIsAuthenticated(true);
            setUserInfo(user);
        } catch (err) {
            setError('Failed to authenticate. Please try again.');
            console.error('Authentication error:', err);
        } finally {
            setLoading(false);
        }
    };

    const handleLogout = () => {
        // Remove token from localStorage
        localStorage.removeItem('jwt_token');

        // Remove Authorization header
        delete axios.defaults.headers.common['Authorization'];

        // Update state
        setIsAuthenticated(false);
        setUserInfo(null);
    };

    return (
        <div className="oauth-container">
            <h2>OAuth Authentication</h2>

            {loading && <div className="loading">Authenticating...</div>}

            {error && <div className="error">{error}</div>}

            {!isAuthenticated ? (
                <button
                    className="login-button"
                    onClick={initiateLogin}
                    disabled={loading}
                >
                    Login with Google
                </button>
            ) : (
                <div className="user-profile">
                    <h3>Welcome, {userInfo?.name || 'User'}</h3>
                    {userInfo?.email && <p>Email: {userInfo.email}</p>}
                    {userInfo?.picture && (
                        <img
                            src={userInfo.picture}
                            alt="Profile"
                            className="profile-image"
                        />
                    )}
                    <button
                        className="logout-button"
                        onClick={handleLogout}
                    >
                        Logout
                    </button>
                </div>
            )}
        </div>
    );
};

export default Google;