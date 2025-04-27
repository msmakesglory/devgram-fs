
import React from 'react';
import { ArrowRight, Github } from 'lucide-react';
import Button from '../ui/CustomButton';
import { Link } from 'react-router-dom';
import { useUserContext } from '@/contexts/UserContext';

const CTA = () => {
  const { userId } = useUserContext();
  
  return (
    <section className="py-20 md:py-32 relative overflow-hidden">
      {/* Background elements */}
      <div className="absolute inset-0 bg-gradient-to-b from-background via-background to-secondary/20 dark:to-background/90 -z-10" />
      <div className="absolute -top-40 -right-40 w-96 h-96 bg-blue-400/10 dark:bg-blue-500/5 rounded-full blur-3xl" />
      <div className="absolute -bottom-40 -left-40 w-96 h-96 bg-indigo-400/10 dark:bg-indigo-500/5 rounded-full blur-3xl" />
      
      <div className="max-w-6xl mx-auto px-6 lg:px-8">
        <div className="relative glass-panel rounded-2xl overflow-hidden">
          <div className="absolute inset-0 bg-gradient-to-br from-blue-500/10 to-indigo-500/10 dark:from-blue-900/20 dark:to-indigo-900/20" />
          
          <div className="relative px-6 py-12 md:p-12 lg:p-16">
            <div className="text-center max-w-3xl mx-auto">
              <h2 className="text-3xl md:text-4xl font-bold mb-6 text-balance">
                {userId ? 'Welcome to the developer community!' : 'Ready to join the developer community?'}
              </h2>
              <p className="text-lg text-foreground/80 mb-8 text-balance">
                {userId
                  ? 'Continue exploring projects, connecting with developers, and sharing your knowledge.'
                  : 'Connect with thousands of developers, share your knowledge, collaborate on exciting projects, and advance your career in tech.'}
              </p>
              
              <div className="flex flex-col sm:flex-row justify-center gap-4">
                {userId ? (
                  <Link to="/projects">
                    <Button 
                      variant="primary" 
                      size="lg" 
                      className="group"
                    >
                      Explore Projects
                      <ArrowRight className="ml-2 group-hover:translate-x-1 transition-transform" size={18} />
                    </Button>
                  </Link>
                ) : (
                  <>
                    <Button 
                      variant="outline" 
                      size="lg"
                      icon={<Github size={18} />}
                      className="bg-background/80 backdrop-blur-sm"
                      onClick={() => {
                        // Future GitHub auth integration
                        window.location.href = '/auth';
                      }}
                    >
                      Sign up with GitHub
                    </Button>
                    
                    <Button 
                      variant="outline" 
                      size="lg"
                      icon={<Github size={18} />}
                      className="bg-background/80 backdrop-blur-sm"
                      onClick={() => {
                        // Future GitHub auth integration
                        window.location.href = '/auth';
                      }}
                    >
                      Sign up with GitHub
                    </Button>
                  </>
                )}
              </div>
              
              {!userId && (
                <p className="mt-6 text-sm text-foreground/60">
                  No credit card required. Free to join.
                </p>
              )}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default CTA;
