import React, { useState, useEffect } from 'react';
import Navbar from '@/components/layout/Navbar';
import Footer from '@/components/layout/Footer';
import ProfileCard from '@/components/profile/ProfileCard';
import PostCard from '@/components/posts/PostCard';
import ProjectCard from '@/components/projects/ProjectCard';
import Button from '@/components/ui/CustomButton';
import { useUserContext } from '@/contexts/UserContext';
import api from '@/api/api';

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
];

const projects = [
  {
    id: 'proj1',
    name: 'React Component Library',
    description: 'A collection of reusable React components with TypeScript support.',
    stars: 124,
    tech: ['React', 'TypeScript', 'Storybook'],
  },
];




const Profile = () => {
  const { user, allSkills } = useUserContext();
  const [projects, setProjects] = useState([]);
  const [ activeTab, setActiveTab ] = useState("projects");
  const [loading, setLoading] = useState<boolean>(true);
  const [log, setLog] = useState(false);

  useEffect(() => {
    const fetchProjects = async () => {
      if (!user.id) return;
      try {
        const response = await api.get(`/api/posts/u/${user.id}`);
        const fetchedProjects = response.data;
  
        // Transform the data to match the expected format
        const formattedProjects = fetchedProjects.map((post) => ({
          postId: post.postId,
          title: post.title,
          description: post.description,
          timestamp: post.timestamp,
          owner: {
            id: user.id,
            fullName: user.fullName,
            profilePictureUrl: user.profilePictureUrl,
          },
          skillIds: post.skillIds || [], // Default to []
          collaboratorIds: Array.isArray(post.collaboratorIds) ? post.collaboratorIds : [],
          githubUrl: post.repoLink || null, // Use repoLink or null if not available
          stars: 0, // Default value since no stars are provided
          forks: 0, // Default value since no forks are provided
          isStarred: false, // Default value
        }));
  
        setProjects(formattedProjects);
        setLog(true);
        setLoading(false);
      } catch (error) {
        console.error('Error fetching projects:', error);
        setLoading(false);
      }
    };
  
    fetchProjects();
  }, [user]);


  // Handle case where user is null
  if (!user) {
    return (
      <div className="min-h-screen flex flex-col items-center justify-center">
        <h1 className="text-2xl font-bold text-foreground/80">Loading...</h1>
        <p className="text-sm text-foreground/60">Please wait while we fetch your profile.</p>
      </div>
    );
  }

  // Preprocess the user data to include default values for missing fields
  const profileData = {
    ...user,
    bio: user.bio || "No bio available.",
    location: user.location || "Location not specified.",
    website: user.website || "",
    joinDate: user.joinDate || new Date().toISOString(), // Default to current date
    projectCount: user.projectCount || 0, // Default to 0
    impressionsCounts: user.impressionsCount || 0, // Default to 0
    skills: user.skills && user.skills.length > 0 ? user.skills : ["No skills added yet."], // Default to placeholder text
    profilePictureUrl: user.profilePictureUrl || "https://via.placeholder.com/150", // Default placeholder image
  };

  

  return (
    <div className="min-h-screen flex flex-col">
      <Navbar />

      <main className="w-full flex-grow py-24 px-4 sm:px-6 max-w-screen-xl mx-auto">
        {/* Pass the updated profileData to ProfileCard */}
        <ProfileCard {...profileData} className="mb-8" />

        <div className='mb-8'>
          <div className='flex border-b border-border mb-6'>
            {/* Tab Buttons */}
            <button
              onClick={() => setActiveTab('projects')}
              className={`px-4 py-3 font-medium ${
                activeTab === 'projects'
                  ? 'text-blue-500 border-b-2 border-blue-500'
                  : 'text-foreground/60 hover:text-foreground smooth-transition'
              }`}
            >
              Projects
            </button>

            <button
              onClick={() => setActiveTab('about')}
              className={`px-4 py-3 font-medium ${
                activeTab === 'about'
                  ? 'text-blue-500 border-b-2 border-blue-500'
                  : 'text-foreground/60 hover:text-foreground smooth-transition'
              }`}
            >
              About
            </button>
          </div>

          {/* Tab Content */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {/* Main content - Conditional Rendering */}
            <div className="md:col-span-3 space-y-6">
              {activeTab === 'projects' && (
                <div className="space-y-6">
                  <h3 className="font-semibold text-lg">Projects</h3>
                  {loading ? (
                    <p className="text-sm text-foreground/70">Loading projects...</p>
                  ) : projects.length > 0 ? (
                    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
                      {projects.map((project) => (
                        <ProjectCard
                          key={project.postId}
                          project={{ ...project, allSkills }}
                        />
                      ))}
                    </div>
                  ) : (
                    <p className="text-sm text-foreground/70">No projects available.</p>
                  )}
                </div>
              )}

              {activeTab === 'about' && (
                <div className="glass-card p-6 space-y-4">
                  <h3 className="font-semibold">About</h3>
                  <p className="text-sm text-foreground/70">{profileData.bio}</p>
                  <p className="text-sm text-foreground/70">
                    <strong>Location:</strong> {profileData.location}
                  </p>
                  <p className="text-sm text-foreground/70">
                    <strong>Website:</strong>{' '}
                    {profileData.website ? (
                      <a href={profileData.website} target="_blank" rel="noopener noreferrer" className="text-blue-500 hover:underline">
                        {profileData.website}
                      </a>
                    ) : (
                      'Not provided'
                    )}
                  </p>
                  <p className="text-sm text-foreground/70">
                    <strong>Joined:</strong> {new Date(profileData.joinDate).toLocaleDateString()}
                  </p>
                  <p className="text-sm text-foreground/70">
                    <strong>Skills:</strong> {profileData.skills.join(', ')}
                  </p>
                </div>
              )}
            </div>
          </div>
        </div>

      </main>

      <Footer />
    </div>
  );
};

export default Profile;