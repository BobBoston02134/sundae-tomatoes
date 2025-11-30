import React, { useState, useEffect } from 'react';
import { Search, Film, Star, Users, ThumbsUp, ThumbsDown, Loader2, Popcorn, X } from 'lucide-react';
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { base44 } from '@/api/base44Client';
import MovieCard from '@/components/MovieCard';
import RecentSearches from '@/components/RecentSearches';

export default function Home() {
  const [query, setQuery] = useState('');
  const [movie, setMovie] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [recentSearches, setRecentSearches] = useState([]);

  useEffect(() => {
    const saved = localStorage.getItem('recentMovieSearches');
    if (saved) {
      setRecentSearches(JSON.parse(saved));
    }
  }, []);

  const saveToRecent = (movieData) => {
    const newRecent = [
      { title: movieData.title, searchedAt: new Date().toISOString() },
      ...recentSearches.filter(r => r.title.toLowerCase() !== movieData.title.toLowerCase())
    ].slice(0, 8);
    setRecentSearches(newRecent);
    localStorage.setItem('recentMovieSearches', JSON.stringify(newRecent));
  };

  const searchMovie = async (searchQuery) => {
    const movieName = searchQuery || query;
    if (!movieName.trim()) return;

    setLoading(true);
    setError(null);
    setMovie(null);

    try {
      const result = await base44.integrations.Core.InvokeLLM({
        prompt: `Find the Rotten Tomatoes scores and information for the movie "${movieName}". 
        
        I need:
        - The exact movie title
        - Release year
        - Tomatometer score (critics score as a percentage)
        - Audience score (as a percentage)
        - Critics consensus (the summary review from critics)
        - A brief plot synopsis (2-3 sentences)
        - Director name
        - Main cast (top 3-4 actors)
        - Genre
        - Runtime
        - Whether it's "Fresh", "Certified Fresh", or "Rotten" based on the Tomatometer
        
        If you can't find the exact movie, find the closest match. If no movie exists with this name, indicate that.`,
        add_context_from_internet: true,
        response_json_schema: {
          type: "object",
          properties: {
            found: { type: "boolean" },
            title: { type: "string" },
            year: { type: "string" },
            tomatometer: { type: "number" },
            audienceScore: { type: "number" },
            freshStatus: { type: "string" },
            criticsConsensus: { type: "string" },
            synopsis: { type: "string" },
            director: { type: "string" },
            cast: { type: "array", items: { type: "string" } },
            genre: { type: "string" },
            runtime: { type: "string" },
            posterDescription: { type: "string" }
          }
        }
      });

      if (result.found) {
        setMovie(result);
        saveToRecent(result);
      } else {
        setError(`Couldn't find "${movieName}". Try checking the spelling or searching for a different movie.`);
      }
    } catch (err) {
      setError('Something went wrong. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    searchMovie();
  };

  const handleRecentClick = (title) => {
    setQuery(title);
    searchMovie(title);
  };

  const clearRecent = () => {
    setRecentSearches([]);
    localStorage.removeItem('recentMovieSearches');
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-950 via-gray-900 to-gray-950 text-white">
      {/* Ambient glow effects */}
      <div className="fixed inset-0 overflow-hidden pointer-events-none">
        <div className="absolute top-0 left-1/4 w-96 h-96 bg-red-500/10 rounded-full blur-3xl" />
        <div className="absolute bottom-0 right-1/4 w-96 h-96 bg-orange-500/5 rounded-full blur-3xl" />
      </div>

      <div className="relative z-10 max-w-4xl mx-auto px-4 py-12 md:py-20">
        {/* Header */}
        <div className="text-center mb-12">
          <div className="inline-flex items-center justify-center w-16 h-16 rounded-2xl bg-gradient-to-br from-red-500 to-orange-600 mb-6 shadow-lg shadow-red-500/20">
            <Film className="w-8 h-8 text-white" />
          </div>
          <h1 className="text-4xl md:text-5xl font-bold mb-3 bg-gradient-to-r from-white via-gray-100 to-gray-400 bg-clip-text text-transparent">
            Movie Score Lookup
          </h1>
          <p className="text-gray-400 text-lg max-w-md mx-auto">
            Get Rotten Tomatoes scores and reviews for any movie instantly
          </p>
        </div>

        {/* Search Form */}
        <form onSubmit={handleSubmit} className="mb-10">
          <div className="relative group">
            <div className="absolute -inset-1 bg-gradient-to-r from-red-500 via-orange-500 to-red-500 rounded-2xl blur opacity-20 group-hover:opacity-30 transition duration-500" />
            <div className="relative flex gap-3 bg-gray-900/80 backdrop-blur-xl p-2 rounded-2xl border border-gray-800">
              <div className="relative flex-1">
                <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-500" />
                <Input
                  type="text"
                  placeholder="Enter a movie name..."
                  value={query}
                  onChange={(e) => setQuery(e.target.value)}
                  className="w-full pl-12 pr-4 py-4 bg-transparent border-0 text-white placeholder:text-gray-500 text-lg focus-visible:ring-0 focus-visible:ring-offset-0"
                />
              </div>
              <Button 
                type="submit" 
                disabled={loading || !query.trim()}
                className="px-8 py-4 h-auto bg-gradient-to-r from-red-500 to-orange-500 hover:from-red-600 hover:to-orange-600 text-white font-semibold rounded-xl transition-all duration-300 disabled:opacity-50"
              >
                {loading ? (
                  <Loader2 className="w-5 h-5 animate-spin" />
                ) : (
                  'Search'
                )}
              </Button>
            </div>
          </div>
        </form>

        {/* Recent Searches */}
        {recentSearches.length > 0 && !movie && !loading && (
          <RecentSearches 
            searches={recentSearches} 
            onSelect={handleRecentClick}
            onClear={clearRecent}
          />
        )}

        {/* Loading State */}
        {loading && (
          <div className="flex flex-col items-center justify-center py-20">
            <div className="relative">
              <div className="w-16 h-16 border-4 border-red-500/20 rounded-full" />
              <div className="absolute inset-0 w-16 h-16 border-4 border-red-500 rounded-full border-t-transparent animate-spin" />
            </div>
            <p className="mt-6 text-gray-400 animate-pulse">Fetching movie data...</p>
          </div>
        )}

        {/* Error State */}
        {error && (
          <div className="bg-red-500/10 border border-red-500/20 rounded-2xl p-6 text-center">
            <ThumbsDown className="w-12 h-12 text-red-400 mx-auto mb-4" />
            <p className="text-red-300">{error}</p>
          </div>
        )}

        {/* Movie Result */}
        {movie && <MovieCard movie={movie} />}

        {/* Empty State */}
        {!movie && !loading && !error && recentSearches.length === 0 && (
          <div className="text-center py-16">
            <div className="inline-flex items-center justify-center w-20 h-20 rounded-full bg-gray-800/50 mb-6">
              <Popcorn className="w-10 h-10 text-gray-600" />
            </div>
            <p className="text-gray-500 text-lg">Search for a movie to see its scores</p>
          </div>
        )}
      </div>
    </div>
  );
}