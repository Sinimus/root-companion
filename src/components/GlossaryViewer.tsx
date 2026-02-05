"use client";

import React, { useState } from 'react';
import { GLOSSARY_DATA } from '@/data/glossary';
import { Search } from 'lucide-react';

export function GlossaryViewer() {
  const [query, setQuery] = useState('');

  const filtered = GLOSSARY_DATA.filter(item =>
    item.term.toLowerCase().includes(query.toLowerCase()) ||
    item.definition.toLowerCase().includes(query.toLowerCase())
  );

  return (
    <div className="flex flex-col h-full bg-[#0F1115] rounded-xl overflow-hidden border border-gray-800 shadow-2xl">
      <div className="p-4 bg-gray-950 border-b border-gray-800 flex gap-2 shrink-0">
        <div className="relative flex-1">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-500" />
          <input
            type="text"
            placeholder="Search glossary terms..."
            value={query}
            onChange={e => setQuery(e.target.value)}
            className="w-full bg-black/40 border border-gray-700 rounded-lg pl-10 pr-4 py-3 text-white placeholder:text-gray-600 focus:outline-none focus:border-blue-500/50 transition-colors font-mono text-sm"
          />
        </div>
      </div>
      
      <div className="flex-1 overflow-y-auto custom-scrollbar p-4 md:p-8 bg-[#0F1115] relative">
        <div className="max-w-3xl mx-auto space-y-4">
          {filtered.length === 0 ? (
            <p className="text-center text-gray-500 py-8">No results found.</p>
          ) : (
            filtered.map((item, idx) => (
              <div key={idx} className="bg-gray-900/50 p-6 rounded-xl border border-gray-800 hover:border-blue-500/30 transition-colors">
                <div className="flex justify-between items-baseline mb-2">
                  <h4 className="font-bold text-xl text-blue-200">{item.term}</h4>
                  {item.ruleReference && (
                    <span className="text-xs font-mono text-gray-500 bg-black/20 px-2 py-1 rounded">§{item.ruleReference}</span>
                  )}
                </div>
                <p className="text-gray-300 leading-relaxed">{item.definition}</p>
              </div>
            ))
          )}
        </div>
      </div>
    </div>
  );
}
