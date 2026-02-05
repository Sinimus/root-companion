"use client";

import React from 'react';
import { Book, X } from 'lucide-react';
import { LawViewer } from './LawViewer';

interface Props {
  onClose: () => void;
  initialQuery?: string;
}

export function LawViewerModal({ onClose, initialQuery }: Props) {
  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/80 backdrop-blur-sm p-4 animate-in fade-in duration-200">
      <div className="bg-gray-900 border border-gray-700 rounded-2xl w-full max-w-5xl h-[90vh] flex flex-col shadow-2xl overflow-hidden relative">
        
        {/* Header */}
        <div className="p-4 border-b border-gray-800 flex justify-between items-center bg-gray-950 shrink-0">
          <div className="flex items-center gap-3">
             <Book className="w-6 h-6 text-amber-500" />
             <div>
                <h3 className="text-xl font-bold text-white font-serif tracking-wide">The Law of Root</h3>
                <p className="text-xs text-gray-500">Digital Edition • Sept 2024</p>
             </div>
          </div>
          <button onClick={onClose} className="p-2 hover:bg-gray-800 rounded-full text-gray-400">
            <X className="w-6 h-6" />
          </button>
        </div>

        {/* Content */}
        <div className="flex-1 overflow-hidden">
            <LawViewer initialQuery={initialQuery} />
        </div>
      </div>
    </div>
  );
}