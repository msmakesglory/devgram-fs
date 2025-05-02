import React, {createContext, Dispatch, ReactNode, SetStateAction, useContext, useState, useEffect} from "react";
import User from "@/types/User";
import api from "@/api/api.ts";
import { UserContextType, Skill } from "@/types/types";

const UserContext = createContext<UserContextType>({
    user: null,
    setUser: (value: SetStateAction<User | null>) => {},
    userId: null,
    allSkills: [],
})

interface UserProviderProps {
    children: ReactNode;
}

export const UserProvider: React.FC<UserProviderProps> = ({ children }) => {
    const [user, setUser] = useState<User | null>(null);
    const [userId, setUserId] = useState<string | null>(null);
    const [allSkills, setAllSkills] = useState<Skill[] | null>([]);

    useEffect(() => {
        const fetchUserData = async () => {
            try {
                const response = await api.get("/user/me");
                // console.log(response.data)
                const {skills, ...restData} = response.data;
                setUser(restData); // Set the user data once fetched
                setUserId(restData.id);
            } catch (err) {
                console.error('Failed to fetch user', err);
                // Optionally, you can show a message to the user here
            }
        };

        fetchUserData();
    }, []);

    useEffect(() => {
        const fetchAllSkills = async () => {
            try {
                const res = await api.get("/api/skills");
                // console.log(res.data, res.status);
                setAllSkills(res.data);
            } catch (err) {
                console.error('Failed to fetch "skills" from server', err);
            }
        }
        fetchAllSkills();
    }, []);

    
    

    return (
        <UserContext.Provider value={{user, setUser, userId, allSkills}} >
            {children}
        </UserContext.Provider>
    )
}

export const useUserContext = () => {
    const context = useContext(UserContext);

    if (!context) {
        throw new Error('useUserContext must be used within a UserProvider');
    }
    
    return context;
}

