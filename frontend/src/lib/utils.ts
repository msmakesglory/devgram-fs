import { clsx, type ClassValue } from "clsx"
import { twMerge } from "tailwind-merge"

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}

export function getProfileData(userOrInspected) {
  return {
    ...userOrInspected,
    bio: userOrInspected?.bio ?? "No bio available.",
    location: userOrInspected?.location ?? "Location not specified.",
    website: userOrInspected?.website ?? "",
    joinDate: userOrInspected?.joinDate ?? new Date().toISOString(),
    projectCount: userOrInspected?.projectCount ?? 0,
    impressionsCounts: userOrInspected?.impressionsCount ?? 0,
    skills:
      userOrInspected?.skills && userOrInspected.skills.length > 0
        ? userOrInspected.skills
        : ["No skills added yet."],
  };
}