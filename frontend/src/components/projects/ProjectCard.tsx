import React from 'react';
import { Star, GitFork, Github } from 'lucide-react';
import Button from '@/components/ui/CustomButton';

interface Skill {
  skillId: number;
  skillName: string | null;
}

interface Project {
  postId: string;
  title: string;
  description: string;
  timestamp: string;
  owner: {
    id: string;
    fullName: string;
    profilePictureUrl: string;
  };
  skillIds?: Skill[]; // Optional detailed skills with names
  collaboratorIds: string[];
  githubUrl?: string;
  stars?: number;
  forks?: number;
  isStarred?: boolean;
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
                src={project.owner.profilePictureUrl}
                alt={project.owner.fullName}
                className="w-8 h-8 rounded-full mr-2 object-cover"
            />
            <span className="text-sm text-foreground/70">{project.owner.fullName}</span>
          </div>

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

        <h3 className="text-xl font-semibold mb-2">{project.title}</h3>
        <p className="text-sm text-foreground/70 mb-4 line-clamp-2">{project.description}</p>

        {/* Tech/Skills */}
        <div className="flex flex-wrap gap-2 mb-4">
          {(project.skillIds ?? [])
              .filter((skill) => skill.skillName !== null)
              .slice(0, 3)
              .map((skill, i) => (
                  <span
                      key={i}
                      className="px-2 py-1 bg-secondary/60 dark:bg-secondary/40 rounded-md text-xs font-medium"
                  >
              {skill.skillName || 'Unknown Skill'}
            </span>
              ))}
          {project.skillIds && project.skillIds.length > 3 && (
              <span className="px-2 py-1 bg-secondary/60 dark:bg-secondary/40 rounded-md text-xs font-medium">
            +{project.skillIds.length - 3}
          </span>
          )}
        </div>

        <div className="flex justify-between items-center text-sm text-foreground/60 pt-3 border-t border-border">
          <div className="flex items-center space-x-3">
          <span className="flex items-center">
            <Star size={14} className="mr-1" />
            {project.stars ?? 0}
          </span>
            <span className="flex items-center">
            <GitFork size={14} className="mr-1" />
              {project.forks ?? 0}
          </span>
          </div>
        </div>

        <div className="mt-4 pt-3 border-t border-border flex items-center justify-between">
          <div className="flex -space-x-2">
            {Array.from({ length: Math.min(3, project.collaboratorIds.length) }).map((_, i) => (
                <div
                    key={i}
                    className="w-8 h-8 rounded-full bg-secondary ring-2 ring-background"
                    style={{ zIndex: 3 - i }}
                />
            ))}
            {project.collaboratorIds.length > 3 && (
                <div className="w-8 h-8 rounded-full bg-blue-100 dark:bg-blue-900/30 ring-2 ring-background flex items-center justify-center text-xs font-medium text-blue-600 dark:text-blue-400">
                  +{project.collaboratorIds.length - 3}
                </div>
            )}
          </div>

          {project.githubUrl && (
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
          )}
        </div>
      </div>
  );
};

export default ProjectCard;
