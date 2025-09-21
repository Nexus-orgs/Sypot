import React from 'react';
import { Button } from '@/components/ui/button';
import { Heart } from 'lucide-react';
import { cn } from '@/lib/utils';
import { useLikesStore } from '@/stores/likesStore';
import { motion, AnimatePresence } from 'framer-motion';

interface LikeButtonProps {
  itemId: string;
  itemType: 'event' | 'business' | 'post' | 'memory';
  itemTitle?: string;
  showCount?: boolean;
  size?: 'sm' | 'md' | 'lg';
  variant?: 'default' | 'ghost' | 'outline';
  className?: string;
}

export const LikeButton: React.FC<LikeButtonProps> = ({
  itemId,
  itemType,
  itemTitle,
  showCount = true,
  size = 'md',
  variant = 'ghost',
  className
}) => {
  const { isLiked, toggleLike, getLikeCount } = useLikesStore();
  const liked = isLiked(itemId, itemType);
  const likeCount = getLikeCount(itemId, itemType);

  const handleClick = (e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();
    toggleLike(itemId, itemType, itemTitle);
  };

  const sizeClasses = {
    sm: 'h-8 px-2 text-xs',
    md: 'h-9 px-3 text-sm',
    lg: 'h-10 px-4 text-base'
  };

  const iconSizes = {
    sm: 'w-3 h-3',
    md: 'w-4 h-4',
    lg: 'w-5 h-5'
  };

  return (
    <Button
      variant={variant}
      size="sm"
      onClick={handleClick}
      className={cn(
        sizeClasses[size],
        'group relative overflow-hidden transition-all',
        liked && 'text-red-600 hover:text-red-700',
        className
      )}
    >
      <AnimatePresence mode="wait">
        {liked ? (
          <motion.div
            key="liked"
            initial={{ scale: 0 }}
            animate={{ scale: 1 }}
            exit={{ scale: 0 }}
            transition={{ type: 'spring', stiffness: 500, damping: 30 }}
            className="flex items-center gap-1.5"
          >
            <Heart className={cn(iconSizes[size], 'fill-current')} />
            {showCount && likeCount > 0 && (
              <span className="font-medium">{formatCount(likeCount)}</span>
            )}
          </motion.div>
        ) : (
          <motion.div
            key="unliked"
            initial={{ scale: 0 }}
            animate={{ scale: 1 }}
            exit={{ scale: 0 }}
            transition={{ type: 'spring', stiffness: 500, damping: 30 }}
            className="flex items-center gap-1.5"
          >
            <Heart className={cn(iconSizes[size], 'group-hover:text-red-600 transition-colors')} />
            {showCount && likeCount > 0 && (
              <span>{formatCount(likeCount)}</span>
            )}
          </motion.div>
        )}
      </AnimatePresence>
      
      {/* Heart animation on click */}
      <AnimatePresence>
        {liked && (
          <motion.div
            initial={{ scale: 0, opacity: 1 }}
            animate={{ scale: 4, opacity: 0 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.5 }}
            className="absolute inset-0 flex items-center justify-center pointer-events-none"
          >
            <Heart className="w-full h-full text-red-500 fill-current" />
          </motion.div>
        )}
      </AnimatePresence>
    </Button>
  );
};

// Format large numbers
function formatCount(count: number): string {
  if (count >= 1000000) {
    return `${(count / 1000000).toFixed(1)}M`;
  } else if (count >= 1000) {
    return `${(count / 1000).toFixed(1)}K`;
  }
  return count.toString();
}