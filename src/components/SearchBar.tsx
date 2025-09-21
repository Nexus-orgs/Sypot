import React, { useState, useCallback, useRef, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Card, CardContent } from '@/components/ui/card';
import { 
  Search, 
  X, 
  MapPin, 
  Calendar, 
  TrendingUp, 
  Clock,
  Users,
  Building2,
  Music,
  Utensils,
  PartyPopper,
  Briefcase,
  Heart,
  Star
} from 'lucide-react';
import { cn } from '@/lib/utils';
import { motion, AnimatePresence } from 'framer-motion';

interface SearchResult {
  id: string;
  type: 'event' | 'business' | 'category' | 'location';
  title: string;
  subtitle?: string;
  icon?: React.ReactNode;
  url: string;
  category?: string;
  trending?: boolean;
}

interface SearchBarProps {
  placeholder?: string;
  className?: string;
  autoFocus?: boolean;
  onSearch?: (query: string) => void;
}

export const SearchBar: React.FC<SearchBarProps> = ({
  placeholder = "Search events, venues, or activities...",
  className,
  autoFocus = false,
  onSearch
}) => {
  const [query, setQuery] = useState('');
  const [isOpen, setIsOpen] = useState(false);
  const [results, setResults] = useState<SearchResult[]>([]);
  const [recentSearches, setRecentSearches] = useState<string[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const searchRef = useRef<HTMLDivElement>(null);
  const inputRef = useRef<HTMLInputElement>(null);
  const navigate = useNavigate();

  // Load recent searches from localStorage
  useEffect(() => {
    const saved = localStorage.getItem('recentSearches');
    if (saved) {
      setRecentSearches(JSON.parse(saved));
    }
  }, []);

  // Close dropdown when clicking outside
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (searchRef.current && !searchRef.current.contains(event.target as Node)) {
        setIsOpen(false);
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  // Mock search function - replace with actual API call
  const performSearch = useCallback(async (searchQuery: string) => {
    if (!searchQuery.trim()) {
      setResults([]);
      return;
    }

    setIsLoading(true);
    
    // Simulate API delay
    await new Promise(resolve => setTimeout(resolve, 300));

    // Mock results - replace with actual search logic
    const mockResults: SearchResult[] = [
      {
        id: '1',
        type: 'category',
        title: 'Music Events',
        subtitle: '234 events this week',
        icon: <Music className="w-4 h-4" />,
        url: '/events?category=music',
        trending: true
      },
      {
        id: '2',
        type: 'event',
        title: 'Afrobeat Night at The Alchemist',
        subtitle: 'Tomorrow, 8:00 PM • Westlands',
        icon: <Calendar className="w-4 h-4" />,
        url: '/event/afrobeat-night',
        category: 'Music'
      },
      {
        id: '3',
        type: 'business',
        title: 'The Alchemist Bar',
        subtitle: 'Westlands, Nairobi • 4.5★',
        icon: <Building2 className="w-4 h-4" />,
        url: '/business/alchemist-bar'
      },
      {
        id: '4',
        type: 'location',
        title: 'Events in Westlands',
        subtitle: '56 upcoming events',
        icon: <MapPin className="w-4 h-4" />,
        url: '/events?location=westlands'
      }
    ].filter(result => 
      result.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      result.subtitle?.toLowerCase().includes(searchQuery.toLowerCase())
    );

    setResults(mockResults);
    setIsLoading(false);
  }, []);

  // Debounced search
  useEffect(() => {
    const timer = setTimeout(() => {
      performSearch(query);
    }, 300);

    return () => clearTimeout(timer);
  }, [query, performSearch]);

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    if (query.trim()) {
      // Save to recent searches
      const newRecent = [query, ...recentSearches.filter(s => s !== query)].slice(0, 5);
      setRecentSearches(newRecent);
      localStorage.setItem('recentSearches', JSON.stringify(newRecent));
      
      // Perform search
      if (onSearch) {
        onSearch(query);
      } else {
        navigate(`/events?search=${encodeURIComponent(query)}`);
      }
      
      setIsOpen(false);
    }
  };

  const handleResultClick = (result: SearchResult) => {
    // Save search term
    const searchTerm = result.title;
    const newRecent = [searchTerm, ...recentSearches.filter(s => s !== searchTerm)].slice(0, 5);
    setRecentSearches(newRecent);
    localStorage.setItem('recentSearches', JSON.stringify(newRecent));
    
    // Navigate to result
    navigate(result.url);
    setIsOpen(false);
    setQuery('');
  };

  const clearSearch = () => {
    setQuery('');
    setResults([]);
    inputRef.current?.focus();
  };

  const removeRecentSearch = (search: string) => {
    const newRecent = recentSearches.filter(s => s !== search);
    setRecentSearches(newRecent);
    localStorage.setItem('recentSearches', JSON.stringify(newRecent));
  };

  const popularSearches = [
    { text: 'Live Music', icon: <Music className="w-3 h-3" /> },
    { text: 'Happy Hour', icon: <PartyPopper className="w-3 h-3" /> },
    { text: 'Restaurants', icon: <Utensils className="w-3 h-3" /> },
    { text: 'This Weekend', icon: <Calendar className="w-3 h-3" /> },
    { text: 'Free Events', icon: <Heart className="w-3 h-3" /> }
  ];

  return (
    <div ref={searchRef} className={cn("relative", className)}>
      <form onSubmit={handleSearch}>
        <div className="relative">
          <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
          <Input
            ref={inputRef}
            type="text"
            placeholder={placeholder}
            value={query}
            onChange={(e) => {
              setQuery(e.target.value);
              setIsOpen(true);
            }}
            onFocus={() => setIsOpen(true)}
            autoFocus={autoFocus}
            className="pl-10 pr-10"
          />
          {query && (
            <button
              type="button"
              onClick={clearSearch}
              className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400 hover:text-gray-600"
            >
              <X className="w-4 h-4" />
            </button>
          )}
        </div>
      </form>

      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -10 }}
            className="absolute top-full left-0 right-0 mt-2 z-50"
          >
            <Card className="shadow-lg">
              <CardContent className="p-0">
                {/* Loading State */}
                {isLoading && (
                  <div className="p-4 text-center text-gray-500">
                    <div className="animate-pulse">Searching...</div>
                  </div>
                )}

                {/* Search Results */}
                {!isLoading && query && results.length > 0 && (
                  <div className="py-2">
                    <div className="px-3 py-2 text-xs font-semibold text-gray-500">Search Results</div>
                    {results.map((result) => (
                      <button
                        key={result.id}
                        onClick={() => handleResultClick(result)}
                        className="w-full px-3 py-2 flex items-start gap-3 hover:bg-gray-50 dark:hover:bg-gray-800 transition-colors"
                      >
                        <div className="mt-0.5 text-gray-400">
                          {result.icon}
                        </div>
                        <div className="flex-1 text-left">
                          <div className="flex items-center gap-2">
                            <span className="font-medium text-sm">{result.title}</span>
                            {result.trending && (
                              <Badge variant="secondary" className="text-xs">
                                <TrendingUp className="w-3 h-3 mr-1" />
                                Trending
                              </Badge>
                            )}
                          </div>
                          {result.subtitle && (
                            <div className="text-xs text-gray-500">{result.subtitle}</div>
                          )}
                        </div>
                        {result.category && (
                          <Badge variant="outline" className="text-xs">
                            {result.category}
                          </Badge>
                        )}
                      </button>
                    ))}
                  </div>
                )}

                {/* No Results */}
                {!isLoading && query && results.length === 0 && (
                  <div className="p-4 text-center text-gray-500">
                    No results found for "{query}"
                  </div>
                )}

                {/* Recent Searches */}
                {!query && recentSearches.length > 0 && (
                  <div className="py-2">
                    <div className="px-3 py-2 text-xs font-semibold text-gray-500 flex items-center justify-between">
                      Recent Searches
                      <Clock className="w-3 h-3" />
                    </div>
                    {recentSearches.map((search, index) => (
                      <div
                        key={index}
                        className="px-3 py-2 flex items-center justify-between hover:bg-gray-50 dark:hover:bg-gray-800 group"
                      >
                        <button
                          onClick={() => setQuery(search)}
                          className="flex-1 text-left text-sm"
                        >
                          {search}
                        </button>
                        <button
                          onClick={() => removeRecentSearch(search)}
                          className="opacity-0 group-hover:opacity-100 transition-opacity"
                        >
                          <X className="w-3 h-3 text-gray-400 hover:text-gray-600" />
                        </button>
                      </div>
                    ))}
                  </div>
                )}

                {/* Popular Searches */}
                {!query && (
                  <div className="py-2 border-t">
                    <div className="px-3 py-2 text-xs font-semibold text-gray-500 flex items-center justify-between">
                      Popular Searches
                      <Star className="w-3 h-3" />
                    </div>
                    <div className="px-3 pb-2">
                      <div className="flex flex-wrap gap-2">
                        {popularSearches.map((search, index) => (
                          <Button
                            key={index}
                            variant="outline"
                            size="sm"
                            onClick={() => setQuery(search.text)}
                            className="h-7 text-xs"
                          >
                            {search.icon}
                            {search.text}
                          </Button>
                        ))}
                      </div>
                    </div>
                  </div>
                )}
              </CardContent>
            </Card>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};