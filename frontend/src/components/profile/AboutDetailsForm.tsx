import React, { useEffect, useState } from "react";
import { useUserContext } from "@/contexts/UserContext";
import api from '@/api/api';
import User from "@/types/User";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";

type FormData = {
    bio: string;
    location: string;
    website: string;
    githubUrl: string;
    linkedinUrl: string;
    skillIds: number[];
  };


const AboutDetailsForm = () => {
   const [userForm, setUserForm] = useState({
        bio: '',
        location: '',
        website: '',
        githubUrl: '',
        linkedinUrl: '',
        skillIds: [] as number[],
    })
    const [error, setError] = useState('');
    const { userId, allSkills } = useUserContext();

    const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
        const {name, value} = e.target;
        setUserForm((prev) => ({...prev, [name] : value}));
    }

    const handleSkillToggle = (id: number) => {
        setUserForm((prev) => ({
            ...prev,
            skillIds: prev.skillIds.includes(id)
                ? prev.skillIds.filter((sid) => sid !== id)
                : [...prev.skillIds, id],
        }));
    };
    
    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();

        try {
            const response = await api.post(`/user/${userId}`, userForm, {
                headers: { 'Content-Type': 'application/json' },
            })
            console.log(response.data);
        } catch(err) {
            console.log(err);
            setError(err);
        }
    }

    return (
        <form onSubmit={handleSubmit} className="space-y-6">
            {error && <p className="text-red-500">{error}</p>}
            <div>
                <Label htmlFor="bio">Bio</Label>
                <Input
                    id="bio"
                    name="bio"
                    maxLength={100}
                    value={userForm.bio}
                    onChange={handleChange}
                />
            </div>
            <div>
                <Label htmlFor="location">location</Label>
                <Input
                    id="location"
                    name="location"
                    maxLength={100}
                    value={userForm.location}
                    onChange={handleChange}
                />
            </div>
            <div>
                <Label htmlFor="website">website</Label>
                <Input
                    id="website"
                    name="website"
                    maxLength={100}
                    value={userForm.website}
                    onChange={handleChange}
                />
            </div>
            <div>
                <Label htmlFor="githubUrl">githubUrl</Label>
                <Input
                    id="githubUrl"
                    name="githubUrl"
                    maxLength={100}
                    value={userForm.githubUrl}
                    onChange={handleChange}
                />
            </div>
            <div>
                <Label htmlFor="linkedinUrl">linkedinUrl</Label>
                <Input
                    id="linkedinUrl"
                    name="linkedinUrl"
                    maxLength={100}
                    value={userForm.linkedinUrl}
                    onChange={handleChange}
                />
            </div>
            <div>
                <Label>Existing Skills</Label>
                <div className="flex flex-wrap gap-2 mt-2">
                    {allSkills.map((skill) => (
                        <Button
                            type="button"
                            key={skill.skillId}
                            variant={userForm.skillIds.includes(skill.skillId) ? "default" : "outline"}
                            onClick={() => handleSkillToggle(skill.skillId)}
                            className="text-sm"
                        >
                            {skill.skillName}
                        </Button>
                    ))}
                </div>
            </div>
            <Button type="submit">Update</Button>
        </form>
    )
};

export default AboutDetailsForm;