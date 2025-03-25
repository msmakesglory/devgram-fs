
import React from 'react';
import { Navigate } from 'react-router-dom';
import Navbar from '@/components/layout/Navbar';
import Footer from '@/components/layout/Footer';
import AuthTabs from '@/components/auth/AuthTabs';
import { useAuth } from '@/contexts/AuthContext';

const Auth = () => {
  const { user, loading } = useAuth();
  
  // Redirect if already logged in
  if (!loading && user) {
    return <Navigate to="/feed" />;
  }

  return (
    <div className="min-h-screen flex flex-col">
      <Navbar />
      
      <main className="flex-grow py-24 px-4 sm:px-6">
        <div className="max-w-lg mx-auto">
          <h1 className="text-3xl font-bold text-center mb-8">
            Join the Developer Community
          </h1>
          
          <AuthTabs />
          
          <p className="text-center text-sm text-muted-foreground mt-8">
            By signing up, you agree to our Terms of Service and Privacy Policy.
          </p>
        </div>
      </main>
      
      <Footer />
    </div>
  );
};

export default Auth;
