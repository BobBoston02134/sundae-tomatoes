import React from 'react';
import { Star, Users, Clock, Clapperboard, User, Tag } from 'lucide-react';

export default function MovieCard({ movie }) {
  const getTomatometerColor = (score) => {
    if (score >= 75) return 'from-green-400 to-green-600';
    if (score >= 60) return 'from-yellow-400 to-orange-500';
    return 'from-red-400 to-red-600';
  };

  const getAudienceColor = (score) => {
    if (score >= 75) return 'from-green-400 to-green-600';
    if (score >= 60) return 'from-yellow-400 to-orange-500';
    return 'from-red-400 to-red-600';
  };

  const getFreshBadge = (status) => {
    const statusLower = status?.toLowerCase() || '';
    if (statusLower.includes('certified')) {
      return { text: 'Certified Fresh', color: 'bg-green-500', icon: '🍅' };
    }
    if (statusLower.includes('fresh')) {
      return { text: 'Fresh', color: 'bg-green-500', icon: '🍅' };
    }
    return { text: 'Rotten', color: 'bg-red-500', icon: '🤢' };
  };

  const badge = getFreshBadge(movie.freshStatus);

  return (
    <div className="relative group">
      {/* Glow effect */}
      <div className="absolute -inset-1 bg-gradient-to-r from-red-500/20 via-orange-500/20 to-red-500/20 rounded-3xl blur-xl opacity-50 group-hover:opacity-70 transition duration-500" />
      
      <div className="relative bg-gray-900/90 backdrop-blur-xl rounded-3xl border border-gray-800 overflow-hidden">
        {/* Header with title and badge */}
        <div className="p-6 md:p-8 border-b border-gray-800/50">
          <div className="flex flex-wrap items-start justify-between gap-4">
            <div>
              <div className="flex items-center gap-3 mb-2">
                <span className={`${badge.color} px-3 py-1 rounded-full text-xs font-bold text-white flex items-center gap-1`}>
                  <span>{badge.icon}</span>
                  {badge.text}
                </span>
              </div>
              <h2 className="text-2xl md:text-3xl font-bold text-white mb-1">
                {movie.title}
              </h2>
              <p className="text-gray-400">{movie.year}</p>
            </div>
          </div>
        </div>

        {/* Scores Section */}
        <div className="grid grid-cols-2 divide-x divide-gray-800/50">
          {/* Tomatometer */}
          <div className="p-6 md:p-8 text-center">
            <div className="flex items-center justify-center gap-2 mb-3">
              <span className="text-2xl">🍅</span>
              <span className="text-sm font-medium text-gray-400 uppercase tracking-wide">Tomatometer</span>
            </div>
            <div className="relative inline-flex items-center justify-center">
              <svg className="w-28 h-28 transform -rotate-90">
                <circle
                  cx="56"
                  cy="56"
                  r="48"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="8"
                  className="text-gray-800"
                />
                <circle
                  cx="56"
                  cy="56"
                  r="48"
                  fill="none"
                  stroke="url(#tomatometer-gradient)"
                  strokeWidth="8"
                  strokeLinecap="round"
                  strokeDasharray={`${(movie.tomatometer / 100) * 301.6} 301.6`}
                  className="transition-all duration-1000"
                />
                <defs>
                  <linearGradient id="tomatometer-gradient" x1="0%" y1="0%" x2="100%" y2="0%">
                    <stop offset="0%" className={movie.tomatometer >= 60 ? 'text-green-400' : 'text-red-400'} stopColor="currentColor" />
                    <stop offset="100%" className={movie.tomatometer >= 60 ? 'text-green-600' : 'text-red-600'} stopColor="currentColor" />
                  </linearGradient>
                </defs>
              </svg>
              <span className="absolute text-3xl font-bold text-white">{movie.tomatometer}%</span>
            </div>
            <p className="mt-3 text-sm text-gray-500">Critics Score</p>
          </div>

          {/* Audience Score */}
          <div className="p-6 md:p-8 text-center">
            <div className="flex items-center justify-center gap-2 mb-3">
              <span className="text-2xl">🍿</span>
              <span className="text-sm font-medium text-gray-400 uppercase tracking-wide">Audience</span>
            </div>
            <div className="relative inline-flex items-center justify-center">
              <svg className="w-28 h-28 transform -rotate-90">
                <circle
                  cx="56"
                  cy="56"
                  r="48"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="8"
                  className="text-gray-800"
                />
                <circle
                  cx="56"
                  cy="56"
                  r="48"
                  fill="none"
                  stroke="url(#audience-gradient)"
                  strokeWidth="8"
                  strokeLinecap="round"
                  strokeDasharray={`${(movie.audienceScore / 100) * 301.6} 301.6`}
                  className="transition-all duration-1000"
                />
                <defs>
                  <linearGradient id="audience-gradient" x1="0%" y1="0%" x2="100%" y2="0%">
                    <stop offset="0%" className={movie.audienceScore >= 60 ? 'text-green-400' : 'text-red-400'} stopColor="currentColor" />
                    <stop offset="100%" className={movie.audienceScore >= 60 ? 'text-green-600' : 'text-red-600'} stopColor="currentColor" />
                  </linearGradient>
                </defs>
              </svg>
              <span className="absolute text-3xl font-bold text-white">{movie.audienceScore}%</span>
            </div>
            <p className="mt-3 text-sm text-gray-500">Audience Score</p>
          </div>
        </div>

        {/* Critics Consensus */}
        {movie.criticsConsensus && (
          <div className="p-6 md:p-8 border-t border-gray-800/50">
            <h3 className="text-sm font-medium text-gray-400 uppercase tracking-wide mb-3">Critics Consensus</h3>
            <p className="text-gray-200 leading-relaxed italic">"{movie.criticsConsensus}"</p>
          </div>
        )}

        {/* Synopsis */}
        {movie.synopsis && (
          <div className="p-6 md:p-8 border-t border-gray-800/50 bg-gray-800/20">
            <h3 className="text-sm font-medium text-gray-400 uppercase tracking-wide mb-3">Synopsis</h3>
            <p className="text-gray-300 leading-relaxed">{movie.synopsis}</p>
          </div>
        )}

        {/* Movie Details */}
        <div className="p-6 md:p-8 border-t border-gray-800/50">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
            {movie.director && (
              <div>
                <div className="flex items-center gap-2 mb-2">
                  <Clapperboard className="w-4 h-4 text-gray-500" />
                  <span className="text-xs font-medium text-gray-500 uppercase">Director</span>
                </div>
                <p className="text-gray-200 text-sm">{movie.director}</p>
              </div>
            )}
            
            {movie.genre && (
              <div>
                <div className="flex items-center gap-2 mb-2">
                  <Tag className="w-4 h-4 text-gray-500" />
                  <span className="text-xs font-medium text-gray-500 uppercase">Genre</span>
                </div>
                <p className="text-gray-200 text-sm">{movie.genre}</p>
              </div>
            )}
            
            {movie.runtime && (
              <div>
                <div className="flex items-center gap-2 mb-2">
                  <Clock className="w-4 h-4 text-gray-500" />
                  <span className="text-xs font-medium text-gray-500 uppercase">Runtime</span>
                </div>
                <p className="text-gray-200 text-sm">{movie.runtime}</p>
              </div>
            )}

            {movie.cast && movie.cast.length > 0 && (
              <div className="col-span-2 md:col-span-1">
                <div className="flex items-center gap-2 mb-2">
                  <Users className="w-4 h-4 text-gray-500" />
                  <span className="text-xs font-medium text-gray-500 uppercase">Cast</span>
                </div>
                <p className="text-gray-200 text-sm">{movie.cast.slice(0, 3).join(', ')}</p>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}