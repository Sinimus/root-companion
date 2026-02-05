"use client";

import React, { useState, useMemo } from 'react';
import { LAW_FULL, LawRule } from '@/data/law_full';
import { Search, X, ListFilter } from 'lucide-react';
import { clsx } from 'clsx';

interface Props {
  initialQuery?: string;
}

export function LawViewer({ initialQuery = '' }: Props) {
  const [query, setQuery] = useState(initialQuery);
  const [selectedSection, setSelectedSection] = useState<string | null>(null);
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);

  // Extract unique sections
  const sections = useMemo(() => {
    const s = new Set<string>();
    LAW_FULL.forEach(r => {
        if (r.section) s.add(r.section);
    });
    return Array.from(s);
  }, []);

  // Filter Logic
  const filteredRules = useMemo(() => {
    let result = LAW_FULL;

    if (selectedSection) {
      result = result.filter(r => r.section === selectedSection);
    }

    if (query.trim()) {
      const lowerQ = query.toLowerCase();
      result = result.filter(r => 
        r.id.toLowerCase().includes(lowerQ) ||
        r.title.toLowerCase().includes(lowerQ) ||
        r.text.toLowerCase().includes(lowerQ) ||
        r.subsection.toLowerCase().includes(lowerQ)
      );
    }

    return result;
  }, [query, selectedSection]);

  const groupedRules = useMemo(() => {
    const groups: Record<string, LawRule[]> = {};
    filteredRules.forEach(r => {
      const key = r.subsection || r.section || 'General';
      if (!groups[key]) groups[key] = [];
      groups[key].push(r);
    });
    return groups;
  }, [filteredRules]);

  return (
    <div className="flex flex-col h-full bg-[#0F1115] rounded-xl overflow-hidden border border-gray-800 shadow-2xl">
        
        {/* Search Bar Area */}
        <div className="p-4 bg-gray-950 border-b border-gray-800 flex gap-2 shrink-0">
           <button 
             onClick={() => setIsSidebarOpen(!isSidebarOpen)}
             className="md:hidden p-3 bg-gray-800 rounded-lg text-gray-300 border border-gray-700 hover:bg-gray-700 transition-colors"
           >
             <ListFilter className="w-5 h-5" />
           </button>
           <div className="relative flex-1">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-500" />
            <input
              type="text"
              placeholder="Search rules (e.g., 'A.1.2', 'ambush', 'setup')..."
              value={query}
              onChange={e => setQuery(e.target.value)}
              className="w-full bg-black/40 border border-gray-700 rounded-lg pl-10 pr-10 py-3 text-white placeholder:text-gray-600 focus:outline-none focus:border-amber-500/50 transition-colors font-mono text-sm"
            />
            {query && (
                <button 
                    onClick={() => setQuery('')}
                    className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-500 hover:text-gray-300 bg-gray-800/50 rounded-full p-1 transition-colors"
                >
                    <X className="w-3 h-3" />
                </button>
            )}
          </div>
        </div>

        <div className="flex flex-1 overflow-hidden relative">
          
          {/* Sidebar */}
          <div className={clsx(
            "w-64 bg-gray-900/90 backdrop-blur border-r border-gray-800 overflow-y-auto custom-scrollbar absolute md:static z-20 h-full transition-transform duration-300",
            isSidebarOpen ? "translate-x-0" : "-translate-x-full md:translate-x-0"
          )}>
             <div className="p-2 space-y-1">
                <button
                  onClick={() => { setSelectedSection(null); setIsSidebarOpen(false); }}
                  className={clsx(
                    "w-full text-left px-4 py-3 rounded-lg text-sm font-bold transition-colors",
                    selectedSection === null ? "bg-amber-900/20 text-amber-400 border border-amber-500/20" : "text-gray-400 hover:bg-gray-800"
                  )}
                >
                  All Sections
                </button>
                {sections.map(section => (
                  <button
                    key={section}
                    onClick={() => { setSelectedSection(section); setIsSidebarOpen(false); }}
                    className={clsx(
                      "w-full text-left px-4 py-3 rounded-lg text-sm transition-colors block truncate",
                      selectedSection === section 
                        ? "bg-amber-900/20 text-amber-400 border border-amber-500/20 font-bold" 
                        : "text-gray-400 hover:bg-gray-800"
                    )}
                    title={section}
                  >
                    {section}
                  </button>
                ))}
             </div>
          </div>

          {/* Content */}
          <div className="flex-1 overflow-y-auto custom-scrollbar p-4 md:p-8 bg-[#0F1115] relative scroll-smooth">
             <div className="max-w-3xl mx-auto space-y-8 relative z-10 pb-20">
                {Object.keys(groupedRules).length === 0 && (
                   <div className="text-center py-20 text-gray-500">
                      <p>No rules found matching &quot;{query}&quot;</p>
                   </div>
                )}

                {Object.entries(groupedRules).map(([sub, rules]) => (
                  <div key={sub} className="space-y-4">
                     <h4 className="text-lg font-bold text-amber-500/80 sticky top-0 bg-[#0F1115]/95 backdrop-blur py-2 border-b border-gray-800 z-10 px-2 md:px-0">
                       {sub}
                     </h4>
                     <div className="space-y-3">
                        {rules.map(rule => (
                           <div key={rule.id} className="group relative pl-4 md:pl-0">
                              <div className="absolute left-0 top-0 md:-left-12 w-16 text-right text-xs font-mono text-gray-600 font-bold opacity-50 group-hover:opacity-100 select-all pt-1">
                                {rule.id}
                              </div>
                              <div className="text-gray-300 leading-relaxed">
                                 <span className="font-bold text-amber-100">{rule.title}.</span>{' '}
                                 <span 
                                   className="whitespace-pre-line"
                                   dangerouslySetInnerHTML={{
                                     __html: rule.text
                                      .replace(/\*\*(.*?)\*\*/g, '<strong class="text-white font-bold">$1</strong>')
                                      .replace(/\*(.*?)\*/g, '<em class="text-gray-400">$1</em>')
                                   }} 
                                 />
                              </div>
                           </div>
                        ))}
                     </div>
                  </div>
                ))}
             </div>
          </div>
        </div>
    </div>
  );
}
