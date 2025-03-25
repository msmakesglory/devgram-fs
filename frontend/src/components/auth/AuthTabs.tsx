
import React, { useState } from 'react';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { SignInForm } from './SignInForm';
import { SignUpForm } from './SignUpForm';

const AuthTabs = () => {
  const [activeTab, setActiveTab] = useState<string>('signin');

  return (
    <div className="glass-panel rounded-xl p-6 w-full max-w-md mx-auto">
      <Tabs defaultValue="signin" value={activeTab} onValueChange={setActiveTab}>
        <TabsList className="grid grid-cols-2 w-full mb-6">
          <TabsTrigger value="signin">Sign In</TabsTrigger>
          <TabsTrigger value="signup">Sign Up</TabsTrigger>
        </TabsList>
        
        <TabsContent value="signin">
          <SignInForm onSuccess={() => {}} />
          <div className="text-center mt-4">
            <p className="text-sm text-muted-foreground">
              Don't have an account?{' '}
              <button 
                onClick={() => setActiveTab('signup')} 
                className="text-blue-500 hover:underline"
              >
                Sign up
              </button>
            </p>
          </div>
        </TabsContent>
        
        <TabsContent value="signup">
          <SignUpForm onSuccess={() => setActiveTab('signin')} />
          <div className="text-center mt-4">
            <p className="text-sm text-muted-foreground">
              Already have an account?{' '}
              <button 
                onClick={() => setActiveTab('signin')} 
                className="text-blue-500 hover:underline"
              >
                Sign in
              </button>
            </p>
          </div>
        </TabsContent>
      </Tabs>
    </div>
  );
};

export default AuthTabs;
