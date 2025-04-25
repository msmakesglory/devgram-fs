import React, { useState } from 'react';
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import axios from "axios";

interface Skill {
    skillId: number;
    skillName: string;
}

interface PostFormProps {
    availableSkills: Skill[];
    defaultUserId: string;
    onSuccess?: () => void;
}

const PostForm: React.FC<PostFormProps> = ({ availableSkills, defaultUserId, onSuccess }) => {
    const [form, setForm] = useState({
        title: '',
        description: '',
        createdById: null,
        skillIds: [] as number[],
        newSkills: [] as string[],
        repoLink: '',
        collaboratorIds: [] as string[],
    });

    const [newSkillInput, setNewSkillInput] = useState('');
    const [newCollaboratorInput, setNewCollaboratorInput] = useState('');
    const [error, setError] = useState('');

    const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
        const { name, value } = e.target;
        setForm((prev) => ({ ...prev, [name]: value }));
    };

    const handleSkillToggle = (id: number) => {
        setForm((prev) => ({
            ...prev,
            skillIds: prev.skillIds.includes(id)
                ? prev.skillIds.filter((sid) => sid !== id)
                : [...prev.skillIds, id],
        }));
    };

    const handleAddNewSkill = () => {
        if (newSkillInput && !form.newSkills.includes(newSkillInput)) {
            setForm((prev) => ({
                ...prev,
                newSkills: [...prev.newSkills, newSkillInput],
            }));
            setNewSkillInput('');
        }
    };

    const handleAddCollaborator = () => {
        if (newCollaboratorInput && !form.collaboratorIds.includes(newCollaboratorInput)) {
            setForm((prev) => ({
                ...prev,
                collaboratorIds: [...prev.collaboratorIds, newCollaboratorInput],
            }));
            setNewCollaboratorInput('');
        }
    };

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();

        if (form.title.length > 100 || form.description.length > 500) {
            setError("Title or description exceeds allowed length.");
            return;
        }

        try {
            const response = await axios.post('/api/posts', form, {
                headers: { 'Content-Type': 'application/json' },
            });
            console.log(response.data);
            if (onSuccess) onSuccess();
        } catch (err) {
            console.error(err);
            setError("Failed to create post.");
        }
    };

    return (
        <form onSubmit={handleSubmit} className="space-y-6">
            {error && <p className="text-red-500">{error}</p>}

            <div>
                <Label htmlFor="title">Title</Label>
                <Input
                    id="title"
                    name="title"
                    maxLength={100}
                    value={form.title}
                    onChange={handleChange}
                />
            </div>

            <div>
                <Label htmlFor="description">Description</Label>
                <Textarea
                    id="description"
                    name="description"
                    maxLength={500}
                    value={form.description}
                    onChange={handleChange}
                />
            </div>

            <div>
                <Label htmlFor="repoLink">Repository Link</Label>
                <Input
                    id="repoLink"
                    name="repoLink"
                    value={form.repoLink}
                    onChange={handleChange}
                />
            </div>

            <div>
                <Label>Existing Skills</Label>
                <div className="flex flex-wrap gap-2 mt-2">
                    {availableSkills.map((skill) => (
                        <Button
                            type="button"
                            key={skill.skillId}
                            variant={form.skillIds.includes(skill.skillId) ? "default" : "outline"}
                            onClick={() => handleSkillToggle(skill.skillId)}
                            className="text-sm"
                        >
                            {skill.skillName}
                        </Button>
                    ))}
                </div>
            </div>

            <div>
                <Label htmlFor="newSkill">Add New Skill</Label>
                <div className="flex gap-2">
                    <Input
                        id="newSkill"
                        value={newSkillInput}
                        onChange={(e) => setNewSkillInput(e.target.value)}
                    />
                    <Button type="button" onClick={handleAddNewSkill}>Add</Button>
                </div>
                <div className="mt-2 flex flex-wrap gap-2">
                    {form.newSkills.map((skill, i) => (
                        <span key={i} className="bg-secondary rounded-full px-3 py-1 text-xs">
              {skill}
            </span>
                    ))}
                </div>
            </div>


            <Button type="submit">Create Post</Button>
        </form>
    );
};

export default PostForm;
