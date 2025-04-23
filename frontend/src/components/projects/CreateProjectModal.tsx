// components/CreateProjectModal.tsx
import React, { useState } from 'react';
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle, DialogTrigger } from '@/components/ui/dialog';
import { Input } from '@/components/ui/input';
import  Button  from '@/components/ui/CustomButton';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { Plus } from 'lucide-react';
import api from '@/api/api.ts'; // Import your API client

interface CreateProjectModalProps {
  onCreateSuccess: () => void; // Callback to refresh projects after creation
}

const CreateProjectModal: React.FC<CreateProjectModalProps> = ({ onCreateSuccess }) => {
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [skills, setSkills] = useState<string[]>([]);
  const [isLoading, setIsLoading] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);

    try {
      // Prepare the payload for the backend
      const newProject = {
        title,
        description,
        skills: skills.map((skill) => ({ name: skill })), // Assuming skills are strings
      };

      // Send the POST request to the backend
      await api.post('/api/posts', newProject);

      // Reset form fields
      setTitle('');
      setDescription('');
      setSkills([]);

      // Notify parent component to refresh the project list
      onCreateSuccess();

      console.log('Project created successfully');
    } catch (error) {
      console.error('Error creating project:', error);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <Dialog>
      {/* Trigger Button */}
      <DialogTrigger asChild>
        <Button variant="primary" className="h-12" icon={<Plus size={18} />}>
          Create Project
        </Button>
      </DialogTrigger>

      {/* Modal Content */}
      <DialogContent className="sm:max-w-[425px]">
        <DialogHeader>
          <DialogTitle>Create New Project</DialogTitle>
          <DialogDescription>
            Fill in the details to create a new project. Click save when you're done.
          </DialogDescription>
        </DialogHeader>

        <form onSubmit={handleSubmit} className="space-y-4">
          {/* Title Field */}
          <div className="space-y-1">
            <Label htmlFor="title">Project Title</Label>
            <Input
              id="title"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              placeholder="Enter project title"
              required
            />
          </div>

          {/* Description Field */}
          <div className="space-y-1">
            <Label htmlFor="description">Description</Label>
            <Textarea
              id="description"
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              placeholder="Describe your project..."
              rows={4}
              required
            />
          </div>

          {/* Skills Field */}
          <div className="space-y-1">
            <Label htmlFor="skills">Skills</Label>
            <Input
              id="skills"
              value={skills.join(', ')}
              onChange={(e) => setSkills(e.target.value.split(',').map((s) => s.trim()))}
              placeholder="Enter skills separated by commas (e.g., React, Node.js)"
            />
          </div>

          {/* Submit Button */}
          <div className="flex justify-end">
            <Button type="submit" disabled={isLoading}>
              {isLoading ? 'Creating...' : 'Create Project'}
            </Button>
          </div>
        </form>
      </DialogContent>
    </Dialog>
  );
};

export default CreateProjectModal;