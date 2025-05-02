import React, { useState, useEffect } from "react";
import Navbar from "@/components/layout/Navbar";
import Footer from "@/components/layout/Footer";
import ProfileCard from "@/components/profile/ProfileCard";
import ProjectCard from "@/components/projects/ProjectCard";
import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuTrigger,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
} from "@/components/ui/dropdown-menu";
import { EditAboutDialog } from "@/components/profile/EditAboutDialog";
import { useParams } from "react-router-dom";
import { useUserContext } from "@/contexts/UserContext";
import api from "@/api/api";
import User from "@/types/User";
import { MoreVertical } from "lucide-react";
import {getProfileData} from "@/lib/utils";

const Profile = () => {
  const { user, userId, allSkills } = useUserContext();
  const [projects, setProjects] = useState([]);
  const [activeTab, setActiveTab] = useState("projects");
  const [loading, setLoading] = useState<boolean>(true);
  const { uid: paramUserID } = useParams();
  const [inspectedUser, setInspectedUser] = useState<User | undefined>(undefined);
  const [editAboutOpen, setEditAboutOpen] = useState(false); // Dialog state

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
          skillIds: post.skillIds || [],
          collaboratorIds: Array.isArray(post.collaboratorIds)
            ? post.collaboratorIds
            : [],
          githubUrl: post.repoLink || null,
        }));

        setProjects(formattedProjects);
        setLoading(false);
      } catch (error) {
        console.error("Error fetching projects:", error);
        setLoading(false);
      }
    };

    fetchProjects();
  }, [paramUserID, userId, user]);

  if (!user) {
    return (
      <div className="min-h-screen flex flex-col items-center justify-center">
        <h1 className="text-2xl font-bold text-foreground/80">Loading...</h1>
        <p className="text-sm text-foreground/60">
          Please wait while we fetch your profile.
        </p>
      </div>
    );
  }

  const profileData = getProfileData(inspectedUser || user);

  return (
    <div className="min-h-screen flex flex-col">
      <Navbar />

      <main className="w-full flex-grow py-24 px-4 sm:px-6 max-w-screen-xl mx-auto">
        {/* Pass the updated profileData to ProfileCard */}
        <ProfileCard {...profileData} className="mb-8" />

        <div className="mb-8">
          <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center border-b border-border mb-6 gap-4">
            {/* Tab Buttons */}
            <div className="flex space-x-6">
              <button
                onClick={() => setActiveTab("projects")}
                className={`font-medium pb-3 ${
                  activeTab === "projects"
                    ? "text-blue-500 border-b-2 border-blue-500"
                    : "text-foreground/60 hover:text-foreground smooth-transition"
                }`}
              >
                Projects
              </button>

              <button
                onClick={() => setActiveTab("about")}
                className={`font-medium pb-3 ${
                  activeTab === "about"
                    ? "text-blue-500 border-b-2 border-blue-500"
                    : "text-foreground/60 hover:text-foreground smooth-transition"
                }`}
              >
                About
              </button>
            </div>

            {/* Search & Actions */}
            <div className="flex items-center space-x-2 w-full sm:w-auto">
              <div className="relative w-full sm:w-64">
                <input
                  type="search"
                  placeholder="Search projects..."
                  className="pl-9 h-9 border-none focus-visible:ring-0 w-full rounded-md bg-muted px-3 py-1 text-sm"
                />
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"
                  />
                </svg>
              </div>

              <DropdownMenu>
                <DropdownMenuTrigger asChild>
                  <Button variant="ghost" className="border-none">
                    <MoreVertical className="h-5 w-5" />
                  </Button>
                </DropdownMenuTrigger>
                <DropdownMenuContent align="end" className="z-[100]">
                  <DropdownMenuItem>Create Project</DropdownMenuItem>
                  <DropdownMenuSeparator />
                  <DropdownMenuItem>Edit Project</DropdownMenuItem>
                  <DropdownMenuItem
                    onClick={(e) => {
                      e.stopPropagation();
                      setEditAboutOpen(true);
                    }}
                  >
                    Edit About
                  </DropdownMenuItem>
                </DropdownMenuContent>
              </DropdownMenu>
            </div>
          </div>

          {/* Tab Content */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="md:col-span-3 space-y-6">
              {activeTab === "projects" && (
                <div className="space-y-6">
                  <h3 className="font-semibold text-lg">Projects</h3>
                  {loading ? (
                    <p className="text-sm text-foreground/70">
                      Loading projects...
                    </p>
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
                    <p className="text-sm text-foreground/70">
                      No projects available.
                    </p>
                  )}
                </div>
              )}

              {activeTab === "about" && (
                <div className="glass-card p-6 space-y-4">
                  <h3 className="font-semibold">About</h3>
                  <p className="text-sm text-foreground/70">
                    <strong>Bio: </strong> {profileData.bio || "Not provided"}
                  </p>
                  <p className="text-sm text-foreground/70">
                    <strong>Location:</strong> {profileData.location || "Not provided"}
                  </p>
                  <p className="text-sm text-foreground/70">
                    <strong>Website:</strong>{" "}
                    {profileData.website ? (
                      <a
                        href={profileData.website}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="text-blue-500 hover:underline"
                      >
                        {profileData.website}
                      </a>
                    ) : (
                      "Not provided"
                    )}
                  </p>
                  <p className="text-sm text-foreground/70">
                    <strong>Joined:</strong>{" "}
                    {new Date(profileData.joinDate).toLocaleDateString()}
                  </p>
                  <p className="text-sm text-foreground/70">
                    <strong>Github: </strong>
                    {profileData.githubUrl ? (
                      <a
                        href={profileData.githubUrl}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="text-blue-500 hover:underline"
                      >
                        {profileData.githubUrl}
                      </a>
                    ) : (
                      "Not provided"
                    )}
                  </p>
                  <p className="text-sm text-foreground/70">
                    <strong>Linkedin: </strong>
                    {profileData.linkedinUrl ? (
                      <a
                        href={profileData.linkedinUrl}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="text-blue-500 hover:underline"
                      >
                        {profileData.linkedinUrl}
                      </a>
                    ) : (
                      "Not provided"
                    )}
                  </p>
                </div>
              )}
            </div>
          </div>
        </div>
      </main>

      <Footer />

      {/* Edit About Dialog - Controlled by external state */}
      <EditAboutDialog
        open={editAboutOpen}
        setOpen={setEditAboutOpen}
        children={<span className="hidden">Edit About Trigger</span>}
      />
    </div>
  );
};

export default Profile;