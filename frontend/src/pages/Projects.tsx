
import React from 'react';
import Navbar from '@/components/layout/Navbar';
import Footer from '@/components/layout/Footer';
import Button from '@/components/ui/CustomButton';
import { Search, Filter, Plus, Star, GitFork, Github } from 'lucide-react';

// Sample data for projects
const projects = [
  {
    id: 'proj1',
    name: 'React Component Library',
    description: 'A comprehensive library of reusable React components with TypeScript support, styled with Tailwind CSS.',
    owner: {
      id: 'user1',
      name: 'Alex Morgan',
      avatar: 'https://images.unsplash.com/photo-1494790108377-be9c29b29330?ixlib=rb-1.2.1&auto=format&fit=crop&w=256&q=80',
    },
    stars: 124,
    forks: 18,
    tech: ['React', 'TypeScript', 'Tailwind CSS', 'Storybook'],
    contributors: 3,
    openIssues: 5,
    lastUpdated: '2023-09-10T14:30:00Z',
    isStarred: false,
  },
  {
    id: 'proj2',
    name: 'Weather Dashboard',
    description: 'Real-time weather tracking application with geolocation support and beautiful visualizations.',
    owner: {
      id: 'user3',
      name: 'Sarah Johnson',
      avatar: 'https://images.unsplash.com/photo-1438761681033-6461ffad8d80?ixlib=rb-1.2.1&auto=format&fit=crop&w=256&q=80',
    },
    stars: 87,
    forks: 12,
    tech: ['JavaScript', 'OpenWeather API', 'Mapbox', 'Chart.js'],
    contributors: 2,
    openIssues: 8,
    lastUpdated: '2023-09-05T09:15:00Z',
    isStarred: true,
  },
  {
    id: 'proj3',
    name: 'Task Management API',
    description: 'RESTful API for managing tasks and projects with authentication, authorization, and real-time updates.',
    owner: {
      id: 'user2',
      name: 'Jason Kim',
      avatar: 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?ixlib=rb-1.2.1&auto=format&fit=crop&w=256&q=80',
    },
    stars: 56,
    forks: 8,
    tech: ['Node.js', 'Express', 'MongoDB', 'Socket.io'],
    contributors: 4,
    openIssues: 3,
    lastUpdated: '2023-08-28T11:45:00Z',
    isStarred: false,
  },
  {
    id: 'proj4',
    name: 'E-Commerce Platform',
    description: 'Full-stack e-commerce solution with product management, shopping cart, and payment processing.',
    owner: {
      id: 'user4',
      name: 'Michael Chen',
      avatar: 'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?ixlib=rb-1.2.1&auto=format&fit=crop&w=256&q=80',
    },
    stars: 102,
    forks: 24,
    tech: ['Next.js', 'Prisma', 'PostgreSQL', 'Stripe'],
    contributors: 6,
    openIssues: 12,
    lastUpdated: '2023-09-12T16:20:00Z',
    isStarred: false,
  },
];

// Categories for projects
const categories = [
  { id: 'all', name: 'All Projects' },
  { id: 'web', name: 'Web Development' },
  { id: 'mobile', name: 'Mobile Apps' },
  { id: 'ai', name: 'AI & Machine Learning' },
  { id: 'design', name: 'UI/UX Design' },
  { id: 'backend', name: 'Backend' },
  { id: 'devops', name: 'DevOps' },
];

const Projects = () => {
  const [activeCategory, setActiveCategory] = React.useState('all');
  
  const formatDate = (dateString: string) => {
    const date = new Date(dateString);
    return new Intl.DateTimeFormat('en-US', { 
      month: 'short', 
      day: 'numeric',
      year: 'numeric'
    }).format(date);
  };

  return (
    <div className="min-h-screen flex flex-col">
      <Navbar />
      
      <main className="flex-grow py-24 px-4 sm:px-6 max-w-screen-xl mx-auto">
        <div className="mb-8">
          <h1 className="text-3xl font-bold mb-2">Explore Projects</h1>
          <p className="text-foreground/70">
            Discover exciting developer projects to collaborate on or get inspired by.
          </p>
        </div>
        
        {/* Search and filters */}
        <div className="flex flex-col md:flex-row md:items-center gap-4 mb-8">
          <div className="relative flex-grow">
            <input 
              type="text" 
              placeholder="Search projects..." 
              className="w-full h-12 px-4 pl-10 rounded-lg border border-border bg-background focus:ring-2 focus:ring-blue-500/30 focus:border-blue-500 transition-all duration-200 outline-none"
            />
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-foreground/60" size={18} />
          </div>
          
          <div className="flex gap-3">
            <button className="h-12 px-4 flex items-center gap-2 rounded-lg border border-border hover:bg-secondary/80 transition-colors">
              <Filter size={18} />
              <span>Filter</span>
            </button>
            
            <Button 
              variant="primary" 
              className="h-12"
              icon={<Plus size={18} />}
            >
              Create Project
            </Button>
          </div>
        </div>
        
        {/* Categories */}
        <div className="mb-8 overflow-x-auto flex space-x-2 pb-2 subtle-scroll">
          {categories.map((category) => (
            <button
              key={category.id}
              onClick={() => setActiveCategory(category.id)}
              className={`px-4 py-2 rounded-full whitespace-nowrap transition-colors ${
                activeCategory === category.id 
                  ? 'bg-blue-100 dark:bg-blue-900/30 text-blue-600 dark:text-blue-400' 
                  : 'bg-secondary/50 text-foreground/70 hover:bg-secondary/70'
              }`}
            >
              {category.name}
            </button>
          ))}
        </div>
        
        {/* Projects Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {projects.map((project, index) => (
            <div 
              key={project.id} 
              className="glass-card opacity-0 animate-fade-in-up"
              style={{ animationDelay: `${index * 100}ms`, animationFillMode: 'forwards' }}
            >
              <div className="flex items-start justify-between mb-3">
                <div className="flex items-center">
                  <img 
                    src={project.owner.avatar} 
                    alt={project.owner.name} 
                    className="w-8 h-8 rounded-full mr-2 object-cover"
                  />
                  <span className="text-sm text-foreground/70">{project.owner.name}</span>
                </div>
                
                <button className={`p-1.5 rounded-full transition-colors ${
                  project.isStarred 
                    ? 'text-yellow-500 bg-yellow-100 dark:bg-yellow-900/20' 
                    : 'text-foreground/60 hover:bg-secondary/70 hover:text-foreground'
                }`}>
                  <Star size={16} className={project.isStarred ? 'fill-yellow-500' : ''} />
                </button>
              </div>
              
              <h3 className="text-xl font-semibold mb-2">{project.name}</h3>
              <p className="text-sm text-foreground/70 mb-4 line-clamp-2">{project.description}</p>
              
              <div className="flex flex-wrap gap-2 mb-4">
                {project.tech.slice(0, 3).map((tech, i) => (
                  <span 
                    key={i} 
                    className="px-2 py-1 bg-secondary/60 dark:bg-secondary/40 rounded-md text-xs font-medium"
                  >
                    {tech}
                  </span>
                ))}
                {project.tech.length > 3 && (
                  <span className="px-2 py-1 bg-secondary/60 dark:bg-secondary/40 rounded-md text-xs font-medium">
                    +{project.tech.length - 3}
                  </span>
                )}
              </div>
              
              <div className="flex justify-between items-center text-sm text-foreground/60 pt-3 border-t border-border">
                <div className="flex items-center space-x-3">
                  <span className="flex items-center">
                    <Star size={14} className="mr-1" />
                    {project.stars}
                  </span>
                  <span className="flex items-center">
                    <GitFork size={14} className="mr-1" />
                    {project.forks}
                  </span>
                </div>
                
                <span>Updated {formatDate(project.lastUpdated)}</span>
              </div>
              
              <div className="mt-4 pt-3 border-t border-border flex items-center justify-between">
                <div className="flex -space-x-2">
                  {/* Simulate contributor avatars */}
                  {Array.from({ length: Math.min(3, project.contributors) }).map((_, i) => (
                    <div 
                      key={i} 
                      className="w-8 h-8 rounded-full bg-secondary ring-2 ring-background"
                      style={{ zIndex: 3 - i }}
                    />
                  ))}
                  {project.contributors > 3 && (
                    <div className="w-8 h-8 rounded-full bg-blue-100 dark:bg-blue-900/30 ring-2 ring-background flex items-center justify-center text-xs font-medium text-blue-600 dark:text-blue-400">
                      +{project.contributors - 3}
                    </div>
                  )}
                </div>
                
                <Button 
                  variant="outline"
                  size="sm"
                  className="text-sm"
                  icon={<Github size={14} />}
                >
                  View Project
                </Button>
              </div>
            </div>
          ))}
        </div>
      </main>
      
      <Footer />
    </div>
  );
};

export default Projects;
