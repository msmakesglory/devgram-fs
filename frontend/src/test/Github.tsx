import React, { useState, useEffect } from 'react';
import Cookies from 'js-cookie';
import {GithubIcon} from "lucide-react";
import {Button} from "@/components/ui/button.tsx";
import {FaGithub} from "react-icons/fa";

const GitHubOAuth = () => {

    // GitHub OAuth configuration
    const CLIENT_ID = 'Ov23li53P58uwn2DsB2h';
    const REDIRECT_URI = 'http://localhost:8080/auth/github/callback';
    const AUTH_ENDPOINT = 'https://github.com/login/oauth/authorize';
    const SCOPES = 'read:user user:email';

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
        <Button
            variant="outline"
            className="w-full justify-start gap-2 mb-4"
            onClick={initiateLogin}
        >
            <FaGithub className="w-5 h-5" />
            Sign in with GitHub
        </Button>
    );
};

export default GitHubOAuth;
