export default interface User {
    id: string;
    fullName: string;
    username: string;
    email: string;
    profilePictureUrl: string;
    location?: string | null;
    website?: string | null;
    joinDate?: string | null;
    projectCount?: number | null;
    impressionsCount?: number | null;
    bio?: string | null;
    githubUrl?: string | null;
    linkedinUrl?: string | null;
    skillIds?: number[];

}