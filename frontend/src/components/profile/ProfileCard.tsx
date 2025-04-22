
import React from 'react';
import { Link } from 'react-router-dom';
import { Mail, GitBranch, MapPin, Calendar, Link as LinkIcon } from 'lucide-react';
import Button from '../ui/CustomButton';
import { cn } from '@/lib/utils';
// import useUserContext from '@/contexts/UserContext.tsx';

type ProfileCardProps = {
  id: string;
  fullName: string;
  email: string;
  username: string;
  bio?: string;
  profilePictureUrl: string;
  location?: string;
  website?: string;
  skills: string[];
  joinDate: string;
  projectCount: number;
  impressionsCounts: number;
  className?: string;
};
const ProfileCard = ({
  id,
  fullName,
  username,
  email,
  bio,
  profilePictureUrl,
  location,
  website,
  skills,
  joinDate,
  projectCount,
  impressionsCounts,
  className,
}: ProfileCardProps) => {
  const formatDate = (dateString: string) => {
    const date = new Date(dateString);
    return new Intl.DateTimeFormat('en-US', {
      year: 'numeric',
      month: 'long',
    }).format(date);
  };

  return (
    <div className={cn("glass-card rounded-xl overflow-hidden", className)}>
      {/* Cover Image */}
      {profilePictureUrl && (
        <div className="h-48 w-full relative -mt-6 -mx-6 mb-4">
          <img
            src={profilePictureUrl}
            alt={`${fullName}'s cover`}
            className="w-full h-full object-cover"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-background to-transparent" />
        </div>
      )}

      {/* Profile Info */}
      <div className="flex flex-col md:flex-row gap-6">
        <div className="flex-shrink-0">
          <img
            src={profilePictureUrl}
            alt={fullName}
            className="w-24 h-24 rounded-xl object-cover ring-4 ring-white/10 shadow-lg"
          />
        </div>

        <div className="flex-grow space-y-3">
          <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
            <div>
              <h2 className="text-2xl font-bold">{fullName}</h2>
              <p className="text-foreground/60">@{username}</p>
            </div>
            <div className="flex gap-2">
              <Button
                variant="outline"
                size="sm"
                icon={<Mail size={16} />}
              >
                Message
              </Button>
            </div>
          </div>

          {bio && (
            <p className="text-foreground/80">{bio}</p>
          )}

          <div className="flex flex-wrap gap-3 pt-2">
            {skills.map((skill, index) => (
              <span
                key={index}
                className="px-3 py-1 bg-secondary/80 dark:bg-secondary/40 rounded-full text-xs font-medium text-foreground/70"
              >
                {skill}
              </span>
            ))}
          </div>

          <div className="flex flex-wrap gap-x-4 gap-y-2 text-sm text-foreground/60 pt-1">
            {location && (
              <div className="flex items-center gap-1">
                <MapPin size={14} />
                <span>{location}</span>
              </div>
            )}

            {website && (
              <div className="flex items-center gap-1">
                <LinkIcon size={14} />
                <a
                  href={website.startsWith('http') ? website : `https://${website}`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-blue-500 hover:underline"
                >
                  {website.replace(/^https?:\/\//, '')}
                </a>
              </div>
            )}

            <div className="flex items-center gap-1">
              <Calendar size={14} />
              <span>Joined {formatDate(joinDate)}</span>
            </div>

            <div className="flex items-center gap-1">
              <GitBranch size={14} />
              <span>{projectCount} projects</span>
            </div>
          </div>
        </div>
      </div>

      {/* Statistics */}
      <div className="grid grid-cols-2 gap-4 mt-6 pt-6 border-t border-border">
        <div className="text-center">
          <p className="text-2xl font-semibold">{impressionsCounts}</p>
          <p className="text-sm text-foreground/60">Impressions</p>
        </div>

        <div className="text-center">
          <p className="text-2xl font-semibold">{projectCount}</p>
          <p className="text-sm text-foreground/60">Projects</p>
        </div>
      </div>
    </div>
  );
};

export default ProfileCard;