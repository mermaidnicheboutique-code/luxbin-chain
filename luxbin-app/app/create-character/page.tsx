"use client";

import React, { useState } from 'react';
import { useRouter } from 'next/navigation';

interface Character {
  id: string;
  name: string;
  backstory: string;
  personality: string;
  appearance: string;
  specialAbility: string;
}

export default function CreateCharacter() {
  const router = useRouter();
  const [character, setCharacter] = useState<Character>({
    id: '',
    name: '',
    backstory: '',
    personality: '',
    appearance: '',
    specialAbility: '',
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const newCharacter = { ...character, id: Date.now().toString() };

    // Store in localStorage (in production, use database)
    const existing = JSON.parse(localStorage.getItem('luxbinCharacters') || '[]');
    existing.push(newCharacter);
    localStorage.setItem('luxbinCharacters', JSON.stringify(existing));

    router.push('/chat');
  };

  const handleChange = (field: keyof Character, value: string) => {
    setCharacter(prev => ({ ...prev, [field]: value }));
  };

  return (
    <div className="min-h-screen bg-gray-900 text-white p-8">
      <div className="max-w-2xl mx-auto">
        <h1 className="text-4xl font-bold mb-8 text-center bg-gradient-to-r from-purple-500 to-pink-500 bg-clip-text text-transparent">
          Create Your Luxbin AI Character
        </h1>

        <form onSubmit={handleSubmit} className="space-y-6">
          <div>
            <label className="block text-sm font-medium mb-2">Character Name</label>
            <input
              type="text"
              required
              value={character.name}
              onChange={(e) => handleChange('name', e.target.value)}
              className="w-full bg-gray-800 border border-gray-700 rounded-lg px-4 py-2 focus:outline-none focus:border-purple-500"
              placeholder="E.g., Quantum Weaver"
            />
          </div>

          <div>
            <label className="block text-sm font-medium mb-2">Backstory</label>
            <textarea
              required
              value={character.backstory}
              onChange={(e) => handleChange('backstory', e.target.value)}
              className="w-full bg-gray-800 border border-gray-700 rounded-lg px-4 py-2 focus:outline-none focus:border-purple-500 h-24"
              placeholder="Tell the story of your AI's origin..."
            />
          </div>

          <div>
            <label className="block text-sm font-medium mb-2">Personality Traits</label>
            <textarea
              required
              value={character.personality}
              onChange={(e) => handleChange('personality', e.target.value)}
              className="w-full bg-gray-800 border border-gray-700 rounded-lg px-4 py-2 focus:outline-none focus:border-purple-500 h-24"
              placeholder="E.g., Wise, sarcastic, adventurous..."
            />
          </div>

          <div>
            <label className="block text-sm font-medium mb-2">Appearance</label>
            <textarea
              required
              value={character.appearance}
              onChange={(e) => handleChange('appearance', e.target.value)}
              className="w-full bg-gray-800 border border-gray-700 rounded-lg px-4 py-2 focus:outline-none focus:border-purple-500 h-24"
              placeholder="Describe how your AI looks..."
            />
          </div>

          <div>
            <label className="block text-sm font-medium mb-2">Special Ability (Contract Focus)</label>
            <input
              type="text"
              required
              value={character.specialAbility}
              onChange={(e) => handleChange('specialAbility', e.target.value)}
              className="w-full bg-gray-800 border border-gray-700 rounded-lg px-4 py-2 focus:outline-none focus:border-purple-500"
              placeholder="E.g., DeFi Master, NFT Creator, Staking Expert"
            />
          </div>

          <button
            type="submit"
            className="w-full bg-gradient-to-r from-purple-500 to-pink-500 text-white py-3 rounded-lg font-bold hover:opacity-90 transition-opacity"
          >
            Create AI Character & Start Chatting
          </button>
        </form>
      </div>
    </div>
  );
}