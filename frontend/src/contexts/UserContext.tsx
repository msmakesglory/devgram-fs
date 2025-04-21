import React, {createContext, Dispatch, ReactNode, SetStateAction, useContext, useState, useEffect} from "react";
import User from "@/types/User";
import api from "@/api/api.ts";

interface UserContextType {
    user: User | null;
    setUser: Dispatch<SetStateAction<User | null>>;
}

const UserContext = createContext<UserContextType>({
    user: null,
    setUser: () => {},
})

interface UserProviderProps {
    children: ReactNode;
}

export const UserProvider: React.FC<UserProviderProps> = ({ children }) => {
    const [user, setUser] = useState<User | null>(null);

    useEffect(() => {
        const fetchUserData = async () => {
            try {
                const response = await api.get("/user/me");
                console.log(response.data)
                setUser(response.data); // Set the user data once fetched
            } catch (err) {
                console.error('Failed to fetch user', err);
                // Optionally, you can show a message to the user here
            }
        };

        fetchUserData();
    }, []);

    return (
        <UserContext.Provider value={{user, setUser}} >
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

