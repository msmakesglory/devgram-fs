import React, {createContext, Dispatch, ReactNode, SetStateAction, useContext, useState, useEffect} from "react";
import User from "@/types/User";

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

