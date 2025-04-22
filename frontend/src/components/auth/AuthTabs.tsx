import React from 'react';
import { useNavigate } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import {Sun, Github, GithubIcon, Globe} from 'lucide-react';
import GitHubOAuth from "@/test/Github.tsx";
import Google from "@/test/Google.tsx";


const Auth = () => {
  const navigate = useNavigate();


  return (
    <div className="glass-panel rounded-xl p-6 w-full max-w-md mx-auto">
      <h2 className="text-2xl font-bold text-center mb-6">Sign in to your account</h2>

      {/* GitHub Login Button */}
      <GitHubOAuth/>

      {/* Google Login Button */}
      <Google/>

      <div className="text-center mt-6">
        <p className="text-sm text-muted-foreground">
          By signing in, you agree to our{' '}
          <a href="/terms" className="text-blue-500 hover:underline">
            Terms of Service
          </a>{' '}
          and{' '}
          <a href="/privacy" className="text-blue-500 hover:underline">
            Privacy Policy
          </a>
          .
        </p>
      </div>
    </div>
  );
};

export default Auth;