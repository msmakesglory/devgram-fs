import { Dispatch, SetStateAction } from "react";
import User from "./User";

export interface Skill{
    skillId: number;
    skillName: string;
}

export interface UserContextType {
    user: User | null;
    setUser: Dispatch<SetStateAction<User | null>>;
    userId: string | null;
    allSkills: Array<Skill> | null;
}