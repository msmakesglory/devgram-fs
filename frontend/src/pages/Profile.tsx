import React from 'react';
import Navbar from '@/components/layout/Navbar';
import Footer from '@/components/layout/Footer';
import ProfileCard from '@/components/profile/ProfileCard';
import PostCard from '@/components/posts/PostCard';
import Button from '@/components/ui/CustomButton';

// Sample data - would be replaced by API calls
const profileData = {
  id: 'user1',
  name: 'Alex Morgan',
  username: 'alexmorgan',
  bio: 'Full-stack developer passionate about React, TypeScript, and building beautiful UIs. Currently working at TechInnovate.',
  avatar: 'https://images.unsplash.com/photo-1494790108377-be9c29b29330?ixlib=rb-1.2.1&auto=format&fit=crop&w=256&q=80',
  coverImage: 'https://images.unsplash.com/photo-1566241440091-ec10de8db2e1?ixlib=rb-1.2.1&auto=format&fit=crop&w=1920&q=80',
  location: 'San Francisco, CA',
  website: 'alexmorgan.dev',
  skills: ['React', 'TypeScript', 'Node.js', 'GraphQL', 'UI/UX'],
  joinDate: '2022-03-15T00:00:00Z',
  projectCount: 8,
  followers: 342,
  following: 98,
  isFollowing: true,
};

const posts = [
  {
    id: '1',
    user: {
      id: 'user1',
      name: 'Alex Morgan',
      username: 'alexmorgan',
      avatar: 'https://images.unsplash.com/photo-1494790108377-be9c29b29330?ixlib=rb-1.2.1&auto=format&fit=crop&w=256&q=80',
    },
    content: 'Just launched a new React component library with Typescript support! Check it out and let me know what you think! #React #TypeScript #OpenSource',
    timestamp: '2023-09-15T14:30:00Z',
    likes: 42,
    comments: 8,
    isLiked: false,
  },
  {
    id: '4',
    user: {
      id: 'user1',
      name: 'Alex Morgan',
      username: 'alexmorgan',
      avatar: 'https://images.unsplash.com/photo-1494790108377-be9c29b29330?ixlib=rb-1.2.1&auto=format&fit=crop&w=256&q=80',
    },
    content: 'Working on a new API integration for my portfolio project. Node.js + Express + MongoDB is such a powerful stack!',
    timestamp: '2023-09-10T11:20:00Z',
    likes: 35,
    comments: 4,
    isLiked: true,
  },
];

const projects = [
  {
    id: 'proj1',
    name: 'React Component Library',
    description: 'A collection of reusable React components with TypeScript support.',
    stars: 124,
    tech: ['React', 'TypeScript', 'Storybook'],
  },
  {
    id: 'proj2',
    name: 'Weather Dashboard',
    description: 'Real-time weather tracking application with geolocation support.',
    stars: 87,
    tech: ['JavaScript', 'OpenWeather API', 'Mapbox'],
  },
  {
    id: 'proj3',
    name: 'Task Management API',
    description: 'RESTful API for managing tasks and projects with authentication.',
    stars: 56,
    tech: ['Node.js', 'Express', 'MongoDB'],
  },
];

const Profile = () => {
  return (
    <div className="min-h-screen flex flex-col">
      <Navbar />
      
      <main className="flex-grow py-24 px-4 sm:px-6 max-w-screen-xl mx-auto">
        <ProfileCard {...profileData} className="mb-8" />
        
        <div className="mb-8">
          <div className="flex border-b border-border mb-6">
            <button className="px-4 py-3 text-blue-500 border-b-2 border-blue-500 font-medium">
              Posts
            </button>
            <button className="px-4 py-3 text-foreground/60 hover:text-foreground smooth-transition">
              Projects
            </button>
            <button className="px-4 py-3 text-foreground/60 hover:text-foreground smooth-transition">
              About
            </button>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {/* Main content - Posts */}
            <div className="md:col-span-2 space-y-6">
              {posts.map((post) => (
                <PostCard
                  key={post.id}
                  id={post.id}
                  user={post.user}
                  content={post.content}
                  timestamp={post.timestamp}
                  likes={post.likes}
                  comments={post.comments}
                  isLiked={post.isLiked}
                  className="animate-fade-in"
                />
              ))}
            </div>
            
            {/* Sidebar - Projects */}
            <div className="md:col-span-1">
              <div className="glass-card">
                <div className="flex items-center justify-between mb-4">
                  <h3 className="font-semibold">Projects</h3>
                  <Button 
                    variant="ghost" 
                    size="sm"
                    className="text-sm text-blue-500"
                  >
                    View all
                  </Button>
                </div>
                
                <div className="space-y-4">
                  {projects.map((project) => (
                    <div
                      key={project.id}
                      className="p-4 bg-secondary/40 rounded-lg hover:bg-secondary/60 transition-colors"
                    >
                      <h4 className="font-medium mb-1">{project.name}</h4>
                      <p className="text-sm text-foreground/70 mb-2">{project.description}</p>
                      <div className="flex flex-wrap gap-2">
                        {project.tech.map((tech, i) => (
                          <span 
                            key={i} 
                            className="px-2 py-1 bg-background/60 rounded-md text-xs"
                          >
                            {tech}
                          </span>
                        ))}
                      </div>
                      <div className="mt-2 text-sm text-foreground/60 flex items-center">
                        <span className="flex items-center">
                          <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="w-4 h-4 mr-1">
                            <path d="M12 17.75l-6.172 3.245l1.179 -6.873l-5 -4.867l6.9 -1l3.086 -6.253l3.086 6.253l6.9 1l-5 4.867l1.179 6.873z" />
                          </svg>
                          {project.stars}
                        </span>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </div>
      </main>
      
      <Footer />
    </div>
  );
};

export default Profile;
