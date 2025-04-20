import React, { useEffect, useState } from 'react';
import {Card, CardDescription, CardHeader, CardTitle} from "@/components/ui/card.tsx";
import {Avatar} from "@radix-ui/react-avatar";
import {AvatarFallback, AvatarImage} from "@/components/ui/avatar.tsx";

const UserPage = () => {
    const [user, setUser] = useState(null);

    useEffect(() => {
        fetch('http://localhost:8080/auth/user/me', {
            method: 'GET',
            credentials: 'include', // this is key to send cookies
        })
            .then(res => {
                if (!res.ok) throw new Error('Unauthorized');
                return res.json();
            })
            .then(data => {
                console.log(data)
                setUser(data)
            })
            .catch(err => console.error('Failed to fetch user', err));
    }, []);

    if (!user) return <p>Loading...</p>;

    return (
        <Card className="w-1/6 mx-auto">
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
