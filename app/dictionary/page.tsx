'use client';

import { useState, useEffect } from 'react';
import dictionaryData from '../../lib/light-language-dictionary.json';

interface DictionaryEntry {
  symbol: string;
  meaning: string;
  category: string;
}

export default function DictionaryPage() {
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('');
  const [entries, setEntries] = useState<DictionaryEntry[]>(dictionaryData);

  const categories = [...new Set(dictionaryData.map(entry => entry.category))];

  const filteredEntries = entries.filter(entry => {
    const matchesSearch = entry.symbol.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         entry.meaning.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesCategory = selectedCategory === '' || entry.category === selectedCategory;
    return matchesSearch && matchesCategory;
  });

  return (
    <div className="min-h-screen bg-gradient-to-br from-purple-900 via-blue-900 to-indigo-900 text-white p-8">
      <div className="max-w-4xl mx-auto">
        <h1 className="text-4xl font-bold mb-8 text-center bg-gradient-to-r from-yellow-400 to-pink-500 bg-clip-text text-transparent">
          Light Language Dictionary
        </h1>

        <div className="mb-8 space-y-4">
          <input
            type="text"
            placeholder="Search symbols or meanings..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="w-full p-3 rounded-lg bg-white/10 border border-white/20 text-white placeholder-white/50 focus:outline-none focus:ring-2 focus:ring-yellow-400"
          />

          <select
            value={selectedCategory}
            onChange={(e) => setSelectedCategory(e.target.value)}
            className="p-3 rounded-lg bg-white/10 border border-white/20 text-white focus:outline-none focus:ring-2 focus:ring-yellow-400"
          >
            <option value="">All Categories</option>
            {categories.map(category => (
              <option key={category} value={category}>{category}</option>
            ))}
          </select>
        </div>

        <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
          {filteredEntries.map((entry, index) => (
            <div key={index} className="bg-white/10 backdrop-blur-sm rounded-lg p-6 border border-white/20 hover:bg-white/20 transition-all duration-300">
              <h3 className="text-xl font-semibold mb-2 text-yellow-300">{entry.symbol}</h3>
              <p className="text-sm text-purple-300 mb-2">{entry.category}</p>
              <p className="text-white/80">{entry.meaning}</p>
            </div>
          ))}
        </div>

        {filteredEntries.length === 0 && (
          <div className="text-center text-white/60 mt-8">
            No entries found matching your search.
          </div>
        )}
      </div>
    </div>
  );
}