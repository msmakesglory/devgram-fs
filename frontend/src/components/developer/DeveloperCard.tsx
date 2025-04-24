import React from 'react';
import { Link } from 'react-router-dom';

type Developer = {
  id: string;
  name: string;
  avatar: string;
  skills: string[];
  bio: string;
};

const DeveloperCard = ({ developer }: { developer: Developer }) => {
  return (
    <div className="glass-card p-6 rounded-xl transition-transform hover:scale-[1.02]">
      <img
        src={developer.avatar}
        alt={`${developer.name}'s avatar`}
        className="w-24 h-24 rounded-full object-cover mx-auto mb-4"
      />
      <h3 className="text-xl font-bold text-center">{developer.name}</h3>
      <p className="text-sm text-muted-foreground text-center mt-2">{developer.bio}</p>
      <div className="flex flex-wrap gap-2 justify-center mt-4">
        {developer.skills.map((skill, index) => (
          <span
            key={index}
            className="px-3 py-1 bg-secondary/80 dark:bg-secondary/40 rounded-full text-xs font-medium text-foreground/70"
          >
            {skill}
          </span>
        ))}
      </div>
      <div className="mt-6 text-center">
        <Link to={`/profile/${developer.id}`}>
          <button className="bg-blue-500 text-white px-4 py-2 rounded-lg hover:bg-blue-600 transition-colors">
            View Profile
          </button>
        </Link>
      </div>
    </div>
  );
};

export default DeveloperCard;