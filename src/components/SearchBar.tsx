import { useState, useEffect, useRef } from 'react';
import { useNavigate } from 'react-router-dom';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Card, CardContent } from '@/components/ui/card';
import { 
  Search, MapPin, Calendar, Filter, X, 
  TrendingUp, Clock, Users, Star 
} from 'lucide-react';
import { useDebounce } from '@/hooks/useDebounce';
import { eventsService } from '@/services/events.service';
import { format } from 'date-fns';

interface SearchResult {
  id: string;
  title: string;
  category: string;
  venue_name: string;
  start_date: string;
  cover_image_url?: string;
  is_free: boolean;
  min_price?: number;
  trending_score?: number;
}

interface SearchBarProps {
  placeholder?: string;
  showFilters?: boolean;
  onSearch?: (query: string, filters?: any) => void;
  className?: string;
}

export const SearchBar = ({ 
  placeholder = "Search events, venues, or categories...",
  showFilters = true,
  onSearch,
  className = ""
}: SearchBarProps) => {
  const [query, setQuery] = useState('');
  const [results, setResults] = useState<SearchResult[]>([]);
  const [isSearching, setIsSearching] = useState(false);
  const [showResults, setShowResults] = useState(false);
  const [selectedFilters, setSelectedFilters] = useState({
    category: '',
    date: '',
    location: '',
    priceRange: ''
  });
  
  const searchRef = useRef<HTMLDivElement>(null);
  const debouncedQuery = useDebounce(query, 300);
  const navigate = useNavigate();

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (searchRef.current && !searchRef.current.contains(event.target as Node)) {
        setShowResults(false);
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  useEffect(() => {
    if (debouncedQuery.length >= 2) {
      performSearch();
    } else {
      setResults([]);
      setShowResults(false);
    }
  }, [debouncedQuery]);

  const performSearch = async () => {
    setIsSearching(true);
    try {
      const searchResults = await eventsService.getEvents({
        search: debouncedQuery,
        limit: 5,
        ...selectedFilters
      });
      setResults(searchResults || []);
      setShowResults(true);
    } catch (error) {
      console.error('Search error:', error);
      setResults([]);
    } finally {
      setIsSearching(false);
    }
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (onSearch) {
      onSearch(query, selectedFilters);
    } else {
      navigate(`/events?search=${encodeURIComponent(query)}`);
    }
    setShowResults(false);
  };

  const handleResultClick = (result: SearchResult) => {
    navigate(`/event/${result.id}`);
    setShowResults(false);
    setQuery('');
  };

  const clearSearch = () => {
    setQuery('');
    setResults([]);
    setShowResults(false);
  };

  const popularSearches = [
    'Music festivals',
    'Food & Wine',
    'Comedy shows',
    'Tech meetups',
    'Art exhibitions'
  ];

  return (
    <div ref={searchRef} className={`relative ${className}`}>
      <form onSubmit={handleSubmit} className="relative">
        <div className="relative flex items-center">
          <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground w-5 h-5" />
          <Input
            type="text"
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            onFocus={() => query.length >= 2 && setShowResults(true)}
            placeholder={placeholder}
            className="pl-10 pr-10 h-12 text-base"
          />
          {query && (
            <Button
              type="button"
              variant="ghost"
              size="icon"
              onClick={clearSearch}
              className="absolute right-2"
            >
              <X className="w-4 h-4" />
            </Button>
          )}
        </div>

        {showFilters && (
          <div className="flex gap-2 mt-2">
            <Button
              type="button"
              variant="outline"
              size="sm"
              className="gap-1"
            >
              <MapPin className="w-3 h-3" />
              Location
            </Button>
            <Button
              type="button"
              variant="outline"
              size="sm"
              className="gap-1"
            >
              <Calendar className="w-3 h-3" />
              Date
            </Button>
            <Button
              type="button"
              variant="outline"
              size="sm"
              className="gap-1"
            >
              <Filter className="w-3 h-3" />
              Filters
            </Button>
          </div>
        )}
      </form>

      {/* Search Results Dropdown */}
      {showResults && (
        <Card className="absolute top-full mt-2 w-full z-50 max-h-[500px] overflow-auto">
          <CardContent className="p-4">
            {isSearching ? (
              <div className="text-center py-4">
                <div className="inline-block animate-spin rounded-full h-6 w-6 border-b-2 border-primary"></div>
                <p className="text-sm text-muted-foreground mt-2">Searching...</p>
              </div>
            ) : results.length > 0 ? (
              <div className="space-y-3">
                <p className="text-xs text-muted-foreground font-medium">
                  SEARCH RESULTS
                </p>
                {results.map((result) => (
                  <div
                    key={result.id}
                    onClick={() => handleResultClick(result)}
                    className="flex items-start gap-3 p-2 rounded-lg hover:bg-muted cursor-pointer transition-colors"
                  >
                    {result.cover_image_url ? (
                      <img
                        src={result.cover_image_url}
                        alt={result.title}
                        className="w-16 h-16 rounded object-cover"
                      />
                    ) : (
                      <div className="w-16 h-16 rounded bg-muted flex items-center justify-center">
                        <Calendar className="w-6 h-6 text-muted-foreground" />
                      </div>
                    )}
                    <div className="flex-1 min-w-0">
                      <h4 className="font-medium text-sm truncate">{result.title}</h4>
                      <div className="flex items-center gap-2 mt-1">
                        <Badge variant="outline" className="text-xs">
                          {result.category}
                        </Badge>
                        {result.is_free && (
                          <Badge variant="secondary" className="text-xs">
                            FREE
                          </Badge>
                        )}
                        {result.trending_score && result.trending_score > 80 && (
                          <Badge variant="default" className="text-xs">
                            <TrendingUp className="w-3 h-3 mr-1" />
                            Trending
                          </Badge>
                        )}
                      </div>
                      <div className="flex items-center gap-3 text-xs text-muted-foreground mt-1">
                        <span className="flex items-center gap-1">
                          <MapPin className="w-3 h-3" />
                          {result.venue_name}
                        </span>
                        <span className="flex items-center gap-1">
                          <Clock className="w-3 h-3" />
                          {format(new Date(result.start_date), 'MMM d')}
                        </span>
                      </div>
                    </div>
                  </div>
                ))}
                <Button
                  variant="ghost"
                  className="w-full mt-2"
                  onClick={() => {
                    navigate(`/events?search=${encodeURIComponent(query)}`);
                    setShowResults(false);
                  }}
                >
                  View all results
                </Button>
              </div>
            ) : query.length >= 2 ? (
              <div className="text-center py-8">
                <Search className="w-12 h-12 text-muted-foreground mx-auto mb-3" />
                <p className="text-sm font-medium">No results found</p>
                <p className="text-xs text-muted-foreground mt-1">
                  Try adjusting your search or filters
                </p>
              </div>
            ) : (
              <div className="space-y-3">
                <p className="text-xs text-muted-foreground font-medium">
                  POPULAR SEARCHES
                </p>
                <div className="flex flex-wrap gap-2">
                  {popularSearches.map((term) => (
                    <Badge
                      key={term}
                      variant="secondary"
                      className="cursor-pointer hover:bg-primary hover:text-primary-foreground transition-colors"
                      onClick={() => {
                        setQuery(term);
                        performSearch();
                      }}
                    >
                      {term}
                    </Badge>
                  ))}
                </div>
              </div>
            )}
          </CardContent>
        </Card>
      )}
    </div>
  );
};