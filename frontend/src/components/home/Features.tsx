
import React from 'react';
import { Users, MessageCircle, FolderGit2, Search, Code, Lock } from 'lucide-react';

const features = [
  {
    icon: <Users />,
    title: 'Developer Profiles',
    description: 'Create a comprehensive profile highlighting your skills, expertise, and projects to connect with like-minded developers.'
  },
  {
    icon: <MessageCircle />,
    title: 'Real-time Messaging',
    description: 'Communicate seamlessly with one-on-one chat functionality to discuss ideas and collaborate effectively.'
  },
  {
    icon: <FolderGit2 />,
    title: 'Project Collaboration',
    description: 'Find collaborators for your projects or join exciting initiatives that align with your interests and skills.'
  },
  {
    icon: <Search />,
    title: 'Skill-based Search',
    description: 'Discover developers based on specific skills or technologies you want to work with or learn from.'
  },
  {
    icon: <Code />,
    title: 'Rich Text Posts',
    description: 'Share code snippets, tutorials, and technical discussions with Markdown support and syntax highlighting.'
  },
  {
    icon: <Lock />,
    title: 'Secure Authentication',
    description: 'Sign in easily and securely with Google or GitHub OAuth integration for a seamless experience.'
  }
];

const Features = () => {
  return (
    <section className="py-20 md:py-32 bg-secondary/50 dark:bg-background/5">
      <div className="max-w-7xl mx-auto px-6 lg:px-8">
        <div className="text-center max-w-3xl mx-auto mb-16 md:mb-24">
          <h2 className="text-3xl md:text-4xl font-bold mb-6 text-balance">
            Everything you need to connect and collaborate
          </h2>
          <p className="text-lg text-foreground/70">
            DevGram provides a comprehensive set of features designed specifically for developers
            to network, share knowledge, and build meaningful projects together.
          </p>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {features.map((feature, index) => (
            <div 
              key={index}
              className="glass-card opacity-0 animate-fade-in-up"
              style={{ animationDelay: `${index * 100}ms`, animationFillMode: 'forwards' }}
            >
              <div className="w-12 h-12 rounded-full flex items-center justify-center bg-blue-100 dark:bg-blue-900/30 text-blue-600 dark:text-blue-400 mb-5">
                {feature.icon}
              </div>
              <h3 className="text-xl font-semibold mb-3">{feature.title}</h3>
              <p className="text-foreground/70">{feature.description}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Features;
