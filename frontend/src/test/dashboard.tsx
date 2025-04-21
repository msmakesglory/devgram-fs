import React, { useEffect, useState } from 'react';
import {Card, CardDescription, CardHeader, CardTitle} from "@/components/ui/card.tsx";
import {Avatar,AvatarFallback, AvatarImage} from "@/components/ui/avatar.tsx";
import { useUserContext } from '@/contexts/UserContext';

const UserPage = () => {
    
    const { user } = useUserContext();

    if (!user) return <p>Loading...</p>;

    return (
        <Card className="w-1/6 mx-auto flex items-center justify-center gap-2">
            <Avatar>
                <AvatarImage src={user.profilePictureUrl}/>
                <AvatarFallback>MR</AvatarFallback>
            </Avatar>
            <CardHeader>
                <CardTitle>{user.fullName}</CardTitle>
                <CardDescription>{user.email}</CardDescription>
            </CardHeader>
        </Card>
    );
};

export default UserPage;
