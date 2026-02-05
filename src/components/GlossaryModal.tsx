"use client";

import React, { useState } from 'react';
import { GLOSSARY_DATA } from '@/data/glossary';
import { Search, Book } from 'lucide-react';

interface Props {
  onClose: () => void;
}

export function GlossaryModal({ onClose }: Props) {
  const [query, setQuery] = useState('');

  const filtered = GLOSSARY_DATA.filter(item =>
    item.term.toLowerCase().includes(query.toLowerCase()) ||
    item.definition.toLowerCase().includes(query.toLowerCase())
  );

  return (
    <div className="fixed inset-0 z-50 flex items-start justify-center bg-black/80 backdrop-blur-sm p-4 pt-12 animate-in fade-in duration-200">
      <div className="bg-gray-900 border border-gray-700 rounded-2xl w-full max-w-lg flex flex-col max-h-[80vh] shadow-2xl">
        <div className="p-4 border-b border-gray-800 flex justify-between items-center bg-gray-900 rounded-t-2xl">
          <h3 className="text-xl font-bold text-white flex items-center gap-2">
            <Book className="w-5 h-5 text-blue-400" /> Glossary
          </h3>
          <button onClick={onClose} className="p-2 hover:bg-gray-800 rounded-full text-gray-400">✕</button>
        </div>
        <div className="p-4 border-b border-gray-800 bg-gray-900/50">
          <div className="relative">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-500" />
            <input
              type="text"
              placeholder="Search term..."
              value={query}
              onChange={e => setQuery(e.target.value)}
              className="w-full bg-gray-950 border border-gray-700 rounded-lg pl-10 pr-4 py-2 text-white placeholder:text-gray-600 focus:outline-none focus:border-blue-500"
              autoFocus
            />
          </div>
        </div>
        <div className="overflow-y-auto p-4 space-y-4">
          {filtered.length === 0 ? (
            <p className="text-center text-gray-500 py-8">No results found.</p>
          ) : (
            filtered.map((item, idx) => (
              <div key={idx} className="bg-gray-800/50 p-4 rounded-xl border border-gray-800">
                <div className="flex justify-between items-baseline mb-2">
                  <h4 className="font-bold text-blue-200">{item.term}</h4>
                  {item.ruleReference && (
                    <span className="text-xs font-mono text-gray-500 bg-black/20 px-1.5 py-0.5 rounded">§{item.ruleReference}</span>
                  )}
                </div>
                <p className="text-sm text-gray-300 leading-relaxed">{item.definition}</p>
              </div>
            ))
          )}
        </div>
      </div>
    </div>
  );
}