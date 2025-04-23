// components/ProjectCard.tsx
import React from 'react';
import { Star, GitFork, Github } from 'lucide-react';
import Button from '@/components/ui/CustomButton';

interface Skill {
  skillId: number;
  skillName: string | null; // Allow null in case the backend doesn't provide a name
}

interface Project {
  id: string;
  name: string;
  description: string;
  owner: {
    id: string;
    name: string;
    avatar: string;
  };
  stars: number;
  forks: number;
  tech: string[];
  contributors: number;
  lastUpdated: string;
  isStarred: boolean;
  githubUrl: string; // New field for GitHub URL
  skills?: Skill[]; // Make skills optional
}

interface ProjectCardProps {
  project: Project;
}

const ProjectCard: React.FC<ProjectCardProps> = ({ project }) => {
  const formatDate = (dateString: string) => {
    const date = new Date(dateString);
    return new Intl.DateTimeFormat('en-US', {
      month: 'short',
      day: 'numeric',
      year: 'numeric',
    }).format(date);
  };

  return (
    <div className="glass-card bg-background rounded-lg shadow-md overflow-hidden p-6 transition-transform hover:scale-[1.02]">
      {/* Owner Info */}
      <div className="flex items-start justify-between mb-3">
        <div className="flex items-center">
          <img
            src={project.owner.avatar}
            alt={project.owner.name}
            className="w-8 h-8 rounded-full mr-2 object-cover"
          />
          <span className="text-sm text-foreground/70">{project.owner.name}</span>
        </div>

        {/* Star Button */}
        <button
          className={`p-1.5 rounded-full transition-colors ${
            project.isStarred
              ? 'text-yellow-500 bg-yellow-100 dark:bg-yellow-900/20'
              : 'text-foreground/60 hover:bg-secondary/70 hover:text-foreground'
          }`}
        >
          <Star size={16} className={project.isStarred ? 'fill-yellow-500' : ''} />
        </button>
      </div>

      {/* Project Title */}
      <h3 className="text-xl font-semibold mb-2">{project.name}</h3>

      {/* Description */}
      <p className="text-sm text-foreground/70 mb-4 line-clamp-2">{project.description}</p>

      {/* Tech Stack */}
      <div className="flex flex-wrap gap-2 mb-4">
        {(project.skills ?? []) // Provide a fallback empty array
          .filter((skill) => skill.skillName !== null) // Filter out null skillNames
          .slice(0, 3) // Show up to 3 skills
          .map((skill, i) => (
            <span
              key={i}
              className="px-2 py-1 bg-secondary/60 dark:bg-secondary/40 rounded-md text-xs font-medium"
            >
              {skill.skillName || 'Unknown Skill'}
            </span>
          ))}
        {project.skills && project.skills.length > 3 && (
          <span className="px-2 py-1 bg-secondary/60 dark:bg-secondary/40 rounded-md text-xs font-medium">
            +{project.skills.length - 3}
          </span>
        )}
      </div>

      {/* Stats (Stars, Forks, Last Updated) */}
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
{/* 
        <span>Updated {formatDate(project.lastUpdated)}</span> */}
      </div>

      {/* Contributors and GitHub Link */}
      <div className="mt-4 pt-3 border-t border-border flex items-center justify-between">
        {/* Contributor Avatars */}
        <div className="flex -space-x-2">
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

        {/* GitHub Button */}
        <a href={project.githubUrl} target="_blank" rel="noopener noreferrer">
          <Button
            variant="outline"
            size="sm"
            className="text-sm"
            icon={<Github size={14} />}
          >
            View on GitHub
          </Button>
        </a>
      </div>
    </div>
  );
};

export default ProjectCard;