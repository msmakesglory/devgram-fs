import { ArrowRight, Code, Users, GitBranch } from 'lucide-react';
import Button from '../ui/CustomButton';
import { useUserContext } from '@/contexts/UserContext';
import { useNavigate } from 'react-router-dom';

const Hero = () => {
  const { userId } = useUserContext();
  const navigate = useNavigate();
  return (
    <section className="relative pt-32 pb-20 md:pt-40 md:pb-32 overflow-hidden">
      {/* Background gradient */}
      <div className="absolute inset-0 bg-gradient-to-b from-background to-secondary/30 dark:from-background dark:to-background/95 -z-10" />
      
      {/* Animated circles */}
      <div className="absolute -top-24 -right-24 w-96 h-96 bg-blue-400/10 dark:bg-blue-500/5 rounded-full blur-3xl animate-pulse-subtle" />
      <div className="absolute -bottom-32 -left-32 w-96 h-96 bg-indigo-400/10 dark:bg-indigo-500/5 rounded-full blur-3xl animate-pulse-subtle" style={{ animationDelay: '1s' }} />
      
      <div className="max-w-7xl mx-auto px-6 lg:px-8">
        <div className="mx-auto max-w-3xl text-center">
          <div className="inline-flex items-center px-3 py-1 rounded-full bg-blue-50 dark:bg-blue-900/20 border border-blue-200 dark:border-blue-800 mb-6 glass-panel">
            <span className="text-xs font-medium text-blue-600 dark:text-blue-400">
              Join our developer network
            </span>
          </div>
          
          <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold tracking-tight mb-6 animate-fade-in text-balance">
            Connect. Collaborate.
            <span className="text-blue-600 dark:text-blue-400"> Create Together.</span>
          </h1>
          
          <p className="text-lg md:text-xl text-foreground/70 max-w-2xl mx-auto mb-8 animate-fade-in delay-100 text-balance">
            DevGram brings developers together to share ideas, collaborate on projects, 
            and build meaningful connections in the tech community.
          </p>
          
          <div className="flex flex-col sm:flex-row justify-center gap-4 animate-fade-in delay-200">
            <Button 
              variant="primary" 
              size="lg" 
              
              className="group"
              onClick={userId ? () => 
                navigate(`/u/${userId}`) : () => navigate("/auth")}
            >
              Join the Community
              <ArrowRight className="ml-2 group-hover:translate-x-1 transition-transform" size={18} />
            </Button>
            
            <Button 
              variant="outline" 
              size="lg"
              onClick={userId ? () => navigate("/projects") : () => navigate("/auth")}
            >
              Explore Projects
            </Button>
          </div>
        </div>
        
        {/* Statistics */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 md:gap-12 mt-16 md:mt-24 opacity-0 animate-fade-in-up" style={{ animationDelay: '400ms', animationFillMode: 'forwards' }}>
          <div className="flex flex-col items-center text-center">
            <div className="w-12 h-12 rounded-full flex items-center justify-center glass-panel mb-4">
              <Users className="text-blue-500" size={24} />
            </div>
            <h3 className="text-2xl font-bold mb-2">10,000+</h3>
            <p className="text-foreground/70">Active Developers</p>
          </div>
          
          <div className="flex flex-col items-center text-center">
            <div className="w-12 h-12 rounded-full flex items-center justify-center glass-panel mb-4">
              <Code className="text-blue-500" size={24} />
            </div>
            <h3 className="text-2xl font-bold mb-2">5,000+</h3>
            <p className="text-foreground/70">Projects Created</p>
          </div>
          
          <div className="flex flex-col items-center text-center">
            <div className="w-12 h-12 rounded-full flex items-center justify-center glass-panel mb-4">
              <GitBranch className="text-blue-500" size={24} />
            </div>
            <h3 className="text-2xl font-bold mb-2">20,000+</h3>
            <p className="text-foreground/70">Collaborations</p>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Hero;
