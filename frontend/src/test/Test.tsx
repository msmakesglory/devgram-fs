import React from "react";
import { useUserContext } from "@/contexts/UserContext";
import Navbar from "@/components/layout/Navbar";

const Test = () => {
    const { allSkills } = useUserContext();

    return (
        <div className="flex">
            <Navbar />
            <ul>
            {allSkills && allSkills.length > 0 ? (
                allSkills.map((skill) => (
                    <li key={skill.skillId}>
                        {skill.skillName}
                        {" "}
                        {skill.skillId}
                    </li>
                ))
            ) : (
                <li>No skills available</li>
            )}
        </ul>
        </div>
    );
};

export default Test;