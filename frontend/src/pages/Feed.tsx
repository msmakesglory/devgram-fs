
import React from 'react';
import Navbar from '@/components/layout/Navbar';
import Footer from '@/components/layout/Footer';
import PostCard from '@/components/posts/PostCard';
import { Search, Filter } from 'lucide-react';

// Sample data - would be replaced by API calls
const posts = [
  {
    id: '1',
    user: {
      id: 'user1',
      name: 'Alex Morgan',
      username: 'alexmorgan',
      avatar: 'https://images.unsplash.com/photo-1494790108377-be9c29b29330?ixlib=rb-1.2.1&auto=format&fit=crop&w=256&q=80',
    },
    content: 'Just launched a new React component library with Typescript support! Check it out and let me know what you think! #React #TypeScript #OpenSource',
    timestamp: '2023-09-15T14:30:00Z',
    likes: 42,
    comments: 8,
    isLiked: false,
  },
  {
    id: '2',
    user: {
      id: 'user2',
      name: 'Jason Kim',
      username: 'jasonk',
      avatar: 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?ixlib=rb-1.2.1&auto=format&fit=crop&w=256&q=80',
    },
    content: 'Looking for a backend developer to collaborate on an API for a mobile app. Preferably someone with Node.js and MongoDB experience. DM me if interested!',
    timestamp: '2023-09-14T09:15:00Z',
    likes: 15,
    comments: 6,
    isLiked: true,
  },
  {
    id: '3',
    user: {
      id: 'user3',
      name: 'Sarah Johnson',
      username: 'sarahcodes',
      avatar: 'https://images.unsplash.com/photo-1438761681033-6461ffad8d80?ixlib=rb-1.2.1&auto=format&fit=crop&w=256&q=80',
    },
    content: 'Just published a new tutorial on building a fullstack app with Next.js and Supabase! Let me know if you have any questions or feedback.\n\nhttps://example.com/tutorial',
    timestamp: '2023-09-13T16:45:00Z',
    likes: 89,
    comments: 12,
    isLiked: false,
    isBookmarked: true,
  },
];

const Feed = () => {
  return (
    <div className="min-h-screen flex flex-col">
      <Navbar />
      
      <main className="flex-grow py-24 px-4 sm:px-6 max-w-screen-xl mx-auto">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Left Sidebar - Profile Summary */}
          <aside className="hidden lg:block lg:col-span-1">
            <div className="glass-card sticky top-24">
              <div className="flex items-center space-x-3 mb-6">
                <div className="h-12 w-12 rounded-full bg-blue-100 dark:bg-blue-900/30" />
                <div>
                  <h3 className="font-medium">Welcome back!</h3>
                  <p className="text-sm text-foreground/60">@username</p>
                </div>
              </div>
              
              <div className="grid grid-cols-2 gap-4 mb-6">
                <div className="text-center p-3 bg-secondary/50 rounded-lg">
                  <p className="text-lg font-semibold">245</p>
                  <p className="text-xs text-foreground/60">Followers</p>
                </div>
                <div className="text-center p-3 bg-secondary/50 rounded-lg">
                  <p className="text-lg font-semibold">3</p>
                  <p className="text-xs text-foreground/60">Projects</p>
                </div>
              </div>
              
              <nav className="space-y-2">
                <a href="#" className="flex items-center space-x-2 p-3 rounded-lg bg-blue-50 dark:bg-blue-900/20 text-blue-600 dark:text-blue-400">
                  <span className="text-sm font-medium">Feed</span>
                </a>
                <a href="#" className="flex items-center space-x-2 p-3 rounded-lg hover:bg-secondary/80 text-foreground/70 hover:text-foreground transition-colors">
                  <span className="text-sm font-medium">Explore</span>
                </a>
                <a href="#" className="flex items-center space-x-2 p-3 rounded-lg hover:bg-secondary/80 text-foreground/70 hover:text-foreground transition-colors">
                  <span className="text-sm font-medium">Bookmarks</span>
                </a>
                <a href="#" className="flex items-center space-x-2 p-3 rounded-lg hover:bg-secondary/80 text-foreground/70 hover:text-foreground transition-colors">
                  <span className="text-sm font-medium">Your Projects</span>
                </a>
              </nav>
            </div>
          </aside>
          
          {/* Main Feed */}
          <div className="lg:col-span-2 space-y-6">
            {/* Search and filters */}
            <div className="flex flex-col sm:flex-row sm:items-center gap-4 mb-8">
              <div className="relative flex-grow">
                <input 
                  type="text" 
                  placeholder="Search posts..." 
                  className="w-full h-12 px-4 pl-10 rounded-lg border border-border bg-background focus:ring-2 focus:ring-blue-500/30 focus:border-blue-500 transition-all duration-200 outline-none"
                />
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-foreground/60" size={18} />
              </div>
              
              <button className="h-12 px-4 flex items-center gap-2 rounded-lg border border-border hover:bg-secondary/80 transition-colors">
                <Filter size={18} />
                <span>Filter</span>
              </button>
            </div>
            
            {/* Create post box */}
            <div className="glass-card mb-8">
              <div className="flex items-center space-x-3 mb-4">
                <div className="h-10 w-10 rounded-full bg-blue-100 dark:bg-blue-900/30" />
                <input 
                  type="text" 
                  placeholder="Share something with the community..." 
                  className="flex-grow h-10 bg-transparent border-none focus:ring-0 outline-none text-foreground/80 placeholder-foreground/50"
                />
              </div>
              
              <div className="flex justify-end pt-3 border-t border-border">
                <button className="px-4 py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600 transition-colors text-sm font-medium">
                  Post
                </button>
              </div>
            </div>
            
            {/* Posts */}
            <div className="space-y-6">
              {posts.map((post) => (
                <PostCard
                  key={post.id}
                  id={post.id}
                  user={post.user}
                  content={post.content}
                  timestamp={post.timestamp}
                  likes={post.likes}
                  comments={post.comments}
                  isLiked={post.isLiked}
                  isBookmarked={post.isBookmarked}
                  className="animate-fade-in"
                />
              ))}
            </div>
          </div>
        </div>
      </main>
      
      <Footer />
    </div>
  );
};

export default Feed;
