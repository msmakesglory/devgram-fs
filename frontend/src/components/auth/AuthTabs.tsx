import React from 'react';
import { useNavigate } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import {Sun, Github, GithubIcon } from 'lucide-react'; // Adjust path if necessary // Assuming you have icons for GitHub and Google
import { useSupabaseClient } from '@supabase/auth-helpers-react';


const Auth = () => {
  const supabase = useSupabaseClient();
  const navigate = useNavigate();

  // Handle GitHub login
  // const handleGitHubLogin = async () => {
  //   const { error } = await supabase.auth.signInWithOAuth({
  //     provider: 'github',
  //     options: {
  //       redirectTo: `${window.location.origin}/auth/callback`, // Redirect after login
  //     },
  //   });

  //   if (error) {
  //     console.error('GitHub login failed:', error.message);
  //   }
  // };

  // // Handle Google login
  // const handleGoogleLogin = async () => {
  //   const { error } = await supabase.auth.signInWithOAuth({
  //     provider: 'google',
  //     options: {
  //       redirectTo: `${window.location.origin}/auth/callback`, // Redirect after login
  //     },
  //   });

  //   if (error) {
  //     console.error('Google login failed:', error.message);
  //   }
  // };

  return (
    <div className="glass-panel rounded-xl p-6 w-full max-w-md mx-auto">
      <h2 className="text-2xl font-bold text-center mb-6">Sign in to your account</h2>

      {/* GitHub Login Button */}
      <Button
        variant="outline"
        className="w-full justify-start gap-2 mb-4"
        onClick={() => navigate('/github')}
      >
        <GithubIcon className="w-5 h-5" />
        Sign in with GitHub
      </Button>

      {/* Google Login Button */}
      <Button
        variant="outline"
        className="w-full justify-start gap-2"
        onClick={() => navigate("/google")}
      >
        <Sun className="w-5 h-5" />
        Sign in with Google
      </Button>

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