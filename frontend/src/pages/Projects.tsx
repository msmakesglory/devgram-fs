import React, { useEffect, useState } from 'react';
import Navbar from '@/components/layout/Navbar';
import Footer from '@/components/layout/Footer';
import Button from '@/components/ui/CustomButton';
import { Search, Filter, Plus } from 'lucide-react';
import ProjectCard from '@/components/projects/ProjectCard'; // Import the new ProjectCard component
import api from '@/api/api'; // Import the API client
import CreateProjectModal from '@/components/projects/CreateProjectModal';

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
  const [activeCategory, setActiveCategory] = useState('all');
  const [projects, setProjects] = useState([]); // State to store fetched projects
  const [loading, setLoading] = useState(true); // Loading state for fetching data

  // Fetch projects from the backend
  useEffect(() => {
    const fetchProjects = async () => {
      try {
        const response = await api.get('/api/posts'); // Fetch posts from the backend
        const fetchedProjects = response.data;
  
        // Transform the data to match the expected format
        const formattedProjects = fetchedProjects.map((post) => ({
          postId: post.postId,
          title: post.title,
          description: post.description,
          timestamp: post.timestamp,
          owner: {
            id: post.createdById.id,
            fullName: post.createdById.fullName,
            profilePictureUrl: post.createdById.profilePictureUrl,
          },
          skillIds: post.skillIds || [], // Default to []
          collaboratorIds: Array.isArray(post.collaboratorIds) ? post.collaboratorIds : [],
          githubUrl: post.repoLink || null, // Use repoLink or null if not available
          stars: 0, // Default value since no stars are provided
          forks: 0, // Default value since no forks are provided
          isStarred: false, // Default value
        }));
  
        setProjects(formattedProjects);
        setLoading(false);
      } catch (error) {
        console.error('Error fetching projects:', error);
        setLoading(false);
      }
    };
  
    fetchProjects();
  }, []);

  

  const handleCreateSuccess = () => {
    // Re-fetch projects to include the newly created one
    api.get('/api/posts').then((response) => {
      const fetchedProjects = response.data;
      const formattedProjects = fetchedProjects.map((post) => ({
        postId: post.postId,
        title: post.title,
        description: post.description,
        timestamp: post.timestamp,
        owner: {
          id: post.createdById.id,
          fullName: post.createdById.fullName,
          profilePictureUrl: post.createdById.profilePictureUrl,
        },
        skillIds: post.skillIds || [], // Default to [] if skillIds is invalid
        collaboratorIds: post.collaboratorIds || [],
        githubUrl: post.repoLink || null,
        stars: 0,
        forks: 0,
        isStarred: false,
      }));
      setProjects(formattedProjects);
    });
  };

  const testing = (projects) => {
    projects.forEach((post) => {
      console.log('Post ID:', post.postId);
      console.log('Skill IDs:', post.skillIds);
      console.log('Type of Skill IDs:', typeof post.skillIds);
      console.log('Is Array:', Array.isArray(post.skillIds));
    });
  };
  
  testing(projects);

  return (
    <div className="min-h-screen flex flex-col">
      <Navbar />

      <main className="flex-grow w-full py-24 px-4 sm:px-6 max-w-screen-xl mx-auto">
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

            <CreateProjectModal onCreateSuccess={handleCreateSuccess} />
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
        {loading ? (
          <div className="flex justify-center items-center h-64">
            <p className="text-lg text-foreground/70">Loading projects...</p>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {projects.map((project, index) => (
              <ProjectCard
                key={project.postId}
                project={project}
              />
            ))}
          </div>
        )}
      </main>
    </div>
  );
};

export default Projects;