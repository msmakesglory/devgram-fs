
import { supabase } from '@/lib/supabase'; // Use our local client file
import { Database } from '../types/database.types';

type Profile = Database['public']['Tables']['profiles']['Row'];
type Post = Database['public']['Tables']['posts']['Row'];
type Project = Database['public']['Tables']['projects']['Row'];

// Profile functions
export const getProfile = async (id: string) => {
  const { data, error } = await supabase
    .from('profiles')
    .select('*')
    .eq('id', id)
    .single();
    
  if (error) {
    console.error('Error fetching profile:', error);
    throw error;
  }
  
  return data;
};

export const updateProfile = async (id: string, updates: Partial<Profile>) => {
  const { data, error } = await supabase
    .from('profiles')
    .update({
      ...updates,
      updated_at: new Date().toISOString(),
    })
    .eq('id', id)
    .select();
    
  if (error) {
    console.error('Error updating profile:', error);
    throw error;
  }
  
  return data;
};

// Post functions
export const getPosts = async () => {
  const { data, error } = await supabase
    .from('posts')
    .select(`
      *,
      profiles:user_id (id, username, full_name, avatar_url)
    `)
    .order('created_at', { ascending: false });
    
  if (error) {
    console.error('Error fetching posts:', error);
    throw error;
  }
  
  return data;
};

export const getUserPosts = async (userId: string) => {
  const { data, error } = await supabase
    .from('posts')
    .select(`
      *,
      profiles:user_id (id, username, full_name, avatar_url)
    `)
    .eq('user_id', userId)
    .order('created_at', { ascending: false });
    
  if (error) {
    console.error('Error fetching user posts:', error);
    throw error;
  }
  
  return data;
};

export const createPost = async (userId: string, content: string) => {
  const { data, error } = await supabase
    .from('posts')
    .insert({
      user_id: userId,
      content,
      created_at: new Date().toISOString(),
    })
    .select();
    
  if (error) {
    console.error('Error creating post:', error);
    throw error;
  }
  
  return data;
};

// Project functions
export const getProjects = async () => {
  const { data, error } = await supabase
    .from('projects')
    .select(`
      *,
      profiles:user_id (id, username, full_name, avatar_url)
    `)
    .order('created_at', { ascending: false });
    
  if (error) {
    console.error('Error fetching projects:', error);
    throw error;
  }
  
  return data;
};

export const getUserProjects = async (userId: string) => {
  const { data, error } = await supabase
    .from('projects')
    .select(`
      *,
      profiles:user_id (id, username, full_name, avatar_url)
    `)
    .eq('user_id', userId)
    .order('created_at', { ascending: false });
    
  if (error) {
    console.error('Error fetching user projects:', error);
    throw error;
  }
  
  return data;
};

export const createProject = async (
  userId: string, 
  name: string, 
  description: string, 
  techStack: string[] = [],
  repositoryUrl?: string,
  demoUrl?: string
) => {
  const { data, error } = await supabase
    .from('projects')
    .insert({
      user_id: userId,
      name,
      description,
      tech_stack: techStack,
      repository_url: repositoryUrl,
      demo_url: demoUrl,
      created_at: new Date().toISOString(),
    })
    .select();
    
  if (error) {
    console.error('Error creating project:', error);
    throw error;
  }
  
  return data;
};

// Social functions
export const likePost = async (userId: string, postId: string) => {
  const { error } = await supabase
    .from('likes')
    .insert({
      user_id: userId,
      post_id: postId,
      created_at: new Date().toISOString(),
    });
    
  if (error) {
    console.error('Error liking post:', error);
    throw error;
  }
  
  return true;
};

export const unlikePost = async (userId: string, postId: string) => {
  const { error } = await supabase
    .from('likes')
    .delete()
    .eq('user_id', userId)
    .eq('post_id', postId);
    
  if (error) {
    console.error('Error unliking post:', error);
    throw error;
  }
  
  return true;
};

export const followUser = async (followerId: string, followingId: string) => {
  const { error } = await supabase
    .from('follows')
    .insert({
      follower_id: followerId,
      following_id: followingId,
      created_at: new Date().toISOString(),
    });
    
  if (error) {
    console.error('Error following user:', error);
    throw error;
  }
  
  return true;
};

export const unfollowUser = async (followerId: string, followingId: string) => {
  const { error } = await supabase
    .from('follows')
    .delete()
    .eq('follower_id', followerId)
    .eq('following_id', followingId);
    
  if (error) {
    console.error('Error unfollowing user:', error);
    throw error;
  }
  
  return true;
};
