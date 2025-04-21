import axios from 'axios';
import Cookies from 'js-cookie';
import { useEffect, useState } from 'react';

export const Demo = () => {
    const [user, setUser] = useState(null);

    useEffect(() => {
        const token = Cookies.get('jwt');
        console.log("Token from cookie:", token);

        if (!token) return;

        const api = axios.create({
            baseURL: 'http://localhost:8080',
            withCredentials: true,
            headers: {
                Authorization: `Bearer ${token}`,
            },
        });

        api.get('/user/me')
            .then(res => {
                console.log(res.data);
                setUser(res.data);
            })
            .catch(err => {
                console.error('Failed to fetch user', err);
            });

    }, []);

    return <div>{user ? user.email : "Demo"}</div>;
};
