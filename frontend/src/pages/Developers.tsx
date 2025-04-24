import React, { useState } from 'react';
import Navbar from '@/components/layout/Navbar';
import Footer from '@/components/layout/Footer';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import  DeveloperCard  from '@/components/developer/DeveloperCard';

// Mock data for developers
const mockDevelopers = [
  {
    id: '1',
    name: 'John Doe',
    avatar: 'https://via.placeholder.com/150',
    skills: ['React', 'TypeScript', 'Node.js'],
    bio: 'Full-stack developer specializing in modern web applications.',
  },
  {
    id: '2',
    name: 'Jane Smith',
    avatar: 'https://via.placeholder.com/150',
    skills: ['Python', 'Django', 'Flask'],
    bio: 'Backend developer with expertise in Python frameworks.',
  },
  {
    id: '3',
    name: 'Alex Morgan',
    avatar: 'https://via.placeholder.com/150',
    skills: ['JavaScript', 'Vue.js', 'GraphQL'],
    bio: 'Frontend developer passionate about building scalable UIs.',
  },
];

const Developers = () => {
  const [searchTerm, setSearchTerm] = useState('');

  // Filter developers based on search term
  const filteredDevelopers = mockDevelopers.filter((developer) =>
    developer.skills.some((skill) =>
      skill.toLowerCase().includes(searchTerm.toLowerCase())
    )
  );

  return (
    <div className="min-h-screen flex flex-col">
      <Navbar />

      <main className="flex-grow py-24 px-4 sm:px-6 max-w-screen-xl mx-auto">
        {/* Header Section */}
        <div className="text-center mb-12">
          <h1 className="text-4xl font-bold text-foreground">Find Developers by Skills</h1>
          <p className="mt-2 text-muted-foreground">
            Discover talented developers based on their expertise.
          </p>

          {/* Search Bar */}
          <div className="mt-8 w-full max-w-md mx-auto">
            <Input
              type="text"
              placeholder="Search by skill (e.g., React, Python)"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="w-full"
            />
          </div>
        </div>

        {/* Developer List Section */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {filteredDevelopers.length > 0 ? (
            filteredDevelopers.map((developer) => (
              <DeveloperCard key={developer.id} developer={developer} />
            ))
          ) : (
            <p className="col-span-full text-center text-muted-foreground">
              No developers found with the selected skills.
            </p>
          )}
        </div>
      </main>

      <Footer />
    </div>
  );
};

export default Developers;