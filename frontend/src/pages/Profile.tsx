import React, { useState, useEffect } from 'react';
import Navbar from '@/components/layout/Navbar';
import Footer from '@/components/layout/Footer';
import ProfileCard from '@/components/profile/ProfileCard';
import PostCard from '@/components/posts/PostCard';
import ProjectCard from '@/components/projects/ProjectCard';
import Button from '@/components/ui/CustomButton';
import { useUserContext } from '@/contexts/UserContext';
import api from '@/api/api';
import { useParams } from 'react-router-dom';
import User from '@/types/User';






const Profile = () => {
  const { user, userId, allSkills } = useUserContext();
  const [projects, setProjects] = useState([]);
  const [ activeTab, setActiveTab ] = useState("projects");
  const [loading, setLoading] = useState<boolean>(true);
  const {uid: paramUserID} = useParams();
  const [inspectedUser, setInspectedUser] = useState<User[]>();


  useEffect(() => {
    const fetchProjects = async () => {
      if (!userId && !paramUserID) return;
      try {

        let owner = user;

        if (paramUserID !== userId) {
          const userResponse = await api.get(`/user/${paramUserID}`);
          setInspectedUser(userResponse.data);
          owner = userResponse.data;
        }
        const response = await api.get(`/api/posts/u/${paramUserID}`);
        const fetchedProjects = response.data;
  
        // Transform the data to match the expected format
        const formattedProjects = fetchedProjects.map((post) => ({
          postId: post.postId,
          title: post.title,
          description: post.description,
          timestamp: post.timestamp,
          owner: {
            id: owner.id,
            fullName: owner.fullName,
            profilePictureUrl: owner.profilePictureUrl,
          },
          skillIds: post.skillIds || [], // Default to []
          collaboratorIds: Array.isArray(post.collaboratorIds) ? post.collaboratorIds : [],
          githubUrl: post.repoLink || null, // Use repoLink or null if not available
              }));
  
        setProjects(formattedProjects);
        setLoading(false);
      } catch (error) {
        console.error('Error fetching projects:', error);
        setLoading(false);
      }
    };
  
    fetchProjects(paramUserID);
  }, [ paramUserID]);


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
    ...(inspectedUser || user),
    bio: user.bio || "No bio available.",
    location: user.location || "Location not specified.",
    website: user.website || "",
    joinDate: user.joinDate || new Date().toISOString(), // Default to current date
    projectCount: user.projectCount || 0, // Default to 0
    impressionsCounts: user.impressionsCount || 0, // Default to 0
    skills: user.skills && user.skills.length > 0 ? user.skills : ["No skills added yet."], // Default to placeholder text
    // profilePictureUrl: user.profilePictureUrl || "https://via.placeholder.com/150", // Default placeholder image
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