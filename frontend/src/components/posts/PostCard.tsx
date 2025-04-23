
import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { MessageCircle, Heart, Share2, Bookmark, MoreHorizontal } from 'lucide-react';
import { cn } from '@/lib/utils';

type PostCardProps = {
  id: string;
  user: {
    id: string;
    name: string;
    username: string;
    avatar: string;
  };
  content: string;
  timestamp: string;
  likes: number;
  comments: number;
  isLiked?: boolean;
  isBookmarked?: boolean;
  className?: string;
};

const PostCard = ({
  id,
  user,
  content,
  timestamp,
  likes,
  comments,
  isLiked = false,
  isBookmarked = false,
  className
}: PostCardProps) => {
  const [liked, setLiked] = useState(isLiked);
  const [likeCount, setLikeCount] = useState(likes);
  const [bookmarked, setBookmarked] = useState(isBookmarked);
  
  const handleLike = () => {
    if (liked) {
      setLikeCount(likeCount - 1);
    } else {
      setLikeCount(likeCount + 1);
    }
    setLiked(!liked);
  };
  
  const handleBookmark = () => {
    setBookmarked(!bookmarked);
  };
  
  const formatDate = (dateString: string) => {
    const date = new Date(dateString);
    return new Intl.DateTimeFormat('en-US', { 
      month: 'short', 
      day: 'numeric'
    }).format(date);
  };

  return (
    <div className={cn("glass-card rounded-xl overflow-hidden", className)}>
      {/* Post Header */}
      <div className="flex items-center justify-between mb-4">
        <Link to={`/profile/${user.id}`} className="flex items-center space-x-3 group">
          <img 
            src={user.avatar} 
            alt={user.name} 
            className="w-10 h-10 rounded-full object-cover ring-2 ring-white/10 group-hover:ring-blue-400/50 transition-all duration-300"
            onError={(e) => {
              (e.target as HTMLImageElement).src = '/default-avatar.png'; // fallback image
            }}
          />
          <div>
            <h3 className="font-medium text-foreground group-hover:text-blue-500 transition-colors">
              {user.name}
            </h3>
            <p className="text-sm text-foreground/60">
              @{user.username} • {formatDate(timestamp)}
            </p>
          </div>
        </Link>
        
        <button className="text-foreground/60 hover:text-foreground smooth-transition p-1 rounded-full hover:bg-secondary/80">
          <MoreHorizontal size={18} />
        </button>
      </div>
      
      {/* Post Content */}
      <div className="mb-6">
        <p className="text-foreground/90 whitespace-pre-line">{content}</p>
      </div>
      
      {/* Post Actions */}
      <div className="flex items-center justify-between pt-4 border-t border-border">
        <div className="flex items-center space-x-6">
          <button 
            onClick={handleLike}
            className="flex items-center space-x-1.5 text-foreground/70 hover:text-foreground smooth-transition group"
          >
            <Heart 
              size={18} 
              className={cn(
                'group-hover:scale-110 transition-all duration-300', 
                liked ? 'fill-red-500 text-red-500' : ''
              )} 
            />
            <span className={cn(liked ? 'text-red-500' : '')}>
              {likeCount}
            </span>
          </button>
          
          <Link 
            to={`/posts/${id}`}
            className="flex items-center space-x-1.5 text-foreground/70 hover:text-foreground smooth-transition group"
          >
            <MessageCircle size={18} className="group-hover:scale-110 transition-all duration-300" />
            <span>{comments}</span>
          </Link>
        </div>
        
        <div className="flex items-center space-x-4">
          <button 
            className="text-foreground/70 hover:text-foreground smooth-transition p-1 rounded-full hover:bg-secondary/80"
            aria-label="Share post"
          >
            <Share2 size={18} />
          </button>
          
          <button 
            onClick={handleBookmark}
            className="text-foreground/70 hover:text-foreground smooth-transition p-1 rounded-full hover:bg-secondary/80"
            aria-label={bookmarked ? 'Remove bookmark' : 'Bookmark post'}
          >
            <Bookmark 
              size={18} 
              className={cn(bookmarked ? 'fill-foreground' : '')} 
            />
          </button>
        </div>
      </div>
    </div>
  );
};

export default PostCard;
