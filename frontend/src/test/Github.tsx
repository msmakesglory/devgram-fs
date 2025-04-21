import React, { useState, useEffect } from 'react';
import axios from 'axios';
import Cookies from 'js-cookie';

const GitHubOAuth = () => {
    const [isAuthenticated, setIsAuthenticated] = useState(false);
    const [userInfo, setUserInfo] = useState(null);
    const [error, setError] = useState(null);
    const [loading, setLoading] = useState(false);

    // GitHub OAuth configuration
    const CLIENT_ID = 'Ov23li53P58uwn2DsB2h';
    const REDIRECT_URI = 'http://localhost:8080/auth/github/callback';
    const AUTH_ENDPOINT = 'https://github.com/login/oauth/authorize';
    const SCOPES = 'read:user user:email';

    // Spring Boot backend endpoint
    const BACKEND_USER_INFO_URL = '/auth/user/me';

    useEffect(() => {
        const urlParams = new URLSearchParams(window.location.search);
        const code = urlParams.get('code');

        if (code) {
            window.history.replaceState({}, document.title, window.location.pathname);
            // After GitHub OAuth, the backend directly sets the JWT cookie
            // So we just check for the session
            checkAuthStatus();
        } else {
            checkAuthStatus();
        }
    }, []);
    const checkAuthStatus = async () => {
        try {
            let username = Cookies.get("jwt");
            console.log(Cookies);
        } catch (err) {
            console.error('User not authenticated:', err);
        }
    };

    const initiateLogin = () => {
        const state = Math.random().toString(36).substring(2, 15);
        localStorage.setItem('oauth_state', state);

        const authUrl = `${AUTH_ENDPOINT}?client_id=${CLIENT_ID}`
            + `&redirect_uri=${encodeURIComponent(REDIRECT_URI)}`
            + `&scope=${encodeURIComponent(SCOPES)}`
            + `&state=${state}`
            + `&allow_signup=true`;

        window.location.href = authUrl;
    };



    return (
        <div className="oauth-container">
            <h2>GitHub OAuth Authentication</h2>

            {loading && <div className="loading">Authenticating...</div>}
            {error && <div className="error">{error}</div>}

            {!isAuthenticated ? (
                <button
                    className="login-button"
                    onClick={initiateLogin}
                    disabled={loading}
                >
                    Login with GitHub
                </button>
            ) : (
                <div className="user-profile">
                    <h3>Welcome, {userInfo?.fullName || 'User'}</h3>
                    {userInfo?.email && <p>Email: {userInfo.email}</p>}
                    {userInfo?.profilePictureUrl && (
                        <img
                            src={userInfo.profilePictureUrl}
                            alt="Profile"
                            className="profile-image"
                        />
                    )}
                </div>
            )}
        </div>
    );
};

export default GitHubOAuth;
