import React from 'react';
import { Clock, X } from 'lucide-react';
import { Button } from "@/components/ui/button";

export default function RecentSearches({ searches, onSelect, onClear }) {
  return (
    <div className="mb-10">
      <div className="flex items-center justify-between mb-4">
        <div className="flex items-center gap-2 text-gray-400">
          <Clock className="w-4 h-4" />
          <span className="text-sm font-medium">Recent Searches</span>
        </div>
        <Button 
          variant="ghost" 
          size="sm" 
          onClick={onClear}
          className="text-gray-500 hover:text-gray-300 text-xs"
        >
          Clear all
        </Button>
      </div>
      
      <div className="flex flex-wrap gap-2">
        {searches.map((search, index) => (
          <button
            key={index}
            onClick={() => onSelect(search.title)}
            className="px-4 py-2 bg-gray-800/60 hover:bg-gray-700/60 border border-gray-700/50 hover:border-gray-600 rounded-full text-sm text-gray-300 hover:text-white transition-all duration-200 group"
          >
            <span>{search.title}</span>
          </button>
        ))}
      </div>
    </div>
  );
}