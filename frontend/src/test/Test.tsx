import React, { useEffect, useState } from "react";
import { useUserContext } from "@/contexts/UserContext";
import api from '@/api/api';
import User from "@/types/User";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";

interface UserFormProps {
    userId: string;
    onSuccess: () => void;
}

const Test: React.FC<UserFormProps> = ({onSuccess}) => {
   const [userForm, setUserForm] = useState({
        bio: '',
        location: '',
        website: '',
        githubUrl: '',
        linkedinUrl: ''
    })
    const [error, setError] = useState('');
    const { userId } = useUserContext();

    const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
        const {name, value} = e.target;
        setUserForm((prev) => ({...prev, [name] : value}));
    }
    
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
            <Button type="submit">Create Post</Button>
        </form>
    )
};

export default Test;