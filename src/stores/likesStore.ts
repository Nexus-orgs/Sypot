import { create } from 'zustand';
import { persist } from 'zustand/middleware';
import { toast } from 'sonner';

interface Like {
  id: string;
  type: 'event' | 'business' | 'post' | 'memory';
  likedAt: string;
}

interface LikesStore {
  likes: Like[];
  isLiked: (id: string, type: Like['type']) => boolean;
  toggleLike: (id: string, type: Like['type'], title?: string) => void;
  getLikeCount: (id: string, type: Like['type']) => number;
  clearLikes: () => void;
}

// Mock like counts - in production, these would come from the backend
const mockLikeCounts: Record<string, number> = {
  'event-1': 234,
  'event-2': 567,
  'event-3': 89,
  'business-1': 1203,
  'business-2': 456,
  'post-1': 78,
  'memory-1': 342
};

export const useLikesStore = create<LikesStore>()(
  persist(
    (set, get) => ({
      likes: [],

      isLiked: (id: string, type: Like['type']) => {
        return get().likes.some(like => like.id === id && like.type === type);
      },

      toggleLike: (id: string, type: Like['type'], title?: string) => {
        const isCurrentlyLiked = get().isLiked(id, type);
        
        if (isCurrentlyLiked) {
          // Unlike
          set(state => ({
            likes: state.likes.filter(like => !(like.id === id && like.type === type))
          }));
          
          // Update mock count
          if (mockLikeCounts[`${type}-${id}`]) {
            mockLikeCounts[`${type}-${id}`]--;
          }
          
          toast.success(`Removed ${title || 'item'} from favorites`);
        } else {
          // Like
          const newLike: Like = {
            id,
            type,
            likedAt: new Date().toISOString()
          };
          
          set(state => ({
            likes: [...state.likes, newLike]
          }));
          
          // Update mock count
          if (!mockLikeCounts[`${type}-${id}`]) {
            mockLikeCounts[`${type}-${id}`] = 1;
          } else {
            mockLikeCounts[`${type}-${id}`]++;
          }
          
          toast.success(`Added ${title || 'item'} to favorites`, {
            action: {
              label: 'View Favorites',
              onClick: () => {
                // Navigate to favorites page
                window.location.href = '/profile?tab=favorites';
              }
            }
          });
        }
        
        // In production, make API call to update backend
        // await updateLike(id, type, !isCurrentlyLiked);
      },

      getLikeCount: (id: string, type: Like['type']) => {
        // Get base count from mock data
        const baseCount = mockLikeCounts[`${type}-${id}`] || 0;
        
        // In production, this would be fetched from the backend
        return baseCount;
      },

      clearLikes: () => {
        set({ likes: [] });
      }
    }),
    {
      name: 'likes-storage'
    }
  )
);