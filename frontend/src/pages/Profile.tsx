import React from 'react';
import Navbar from '@/components/layout/Navbar';
import Footer from '@/components/layout/Footer';
import ProfileCard from '@/components/profile/ProfileCard';
import PostCard from '@/components/posts/PostCard';
import Button from '@/components/ui/CustomButton';
import { useUserContext } from '@/contexts/UserContext';

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
  const { user } = useUserContext();

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

      <main className="flex-grow py-24 px-4 sm:px-6 max-w-screen-xl mx-auto">
        {/* Pass the updated profileData to ProfileCard */}
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
                      <p className="text-sm text-foreground/70 mb-2">
                        {project.description}
                      </p>
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
                          <svg
                            xmlns="http://www.w3.org/2000/svg"
                            viewBox="0 0 24 24"
                            fill="none"
                            stroke="currentColor"
                            strokeWidth="2"
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            className="w-4 h-4 mr-1"
                          >
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