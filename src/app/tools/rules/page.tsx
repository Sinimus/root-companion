"use client";
import Link from 'next/link';
import React, { useState } from 'react';
import { ArrowLeft, ScrollText, Book } from 'lucide-react';
import { LawViewer } from '@/components/LawViewer';
import { GlossaryViewer } from '@/components/GlossaryViewer';
import { clsx } from 'clsx';

export default function RulesAndGlossaryPage() {
  const [activeTab, setActiveTab] = useState<'law' | 'glossary'>('law');

  return (
    <div className="min-h-screen bg-[#0a0c10] pb-20 pt-6 relative flex flex-col">
      {/* Top Navigation Bar */}
      <div className="px-4 md:px-6 py-4 flex flex-col md:flex-row items-center justify-between sticky top-0 z-40 bg-[#0a0c10]/95 backdrop-blur border-b border-gray-800 gap-4 md:gap-0">
          <div className="w-full md:w-auto flex justify-start">
            <Link href="/" className="text-gray-500 hover:text-white flex items-center gap-2 transition-colors font-medium">
                <ArrowLeft className="w-5 h-5" /> Menu
            </Link>
          </div>
          
          {/* Main Tab Navigation */}
          <div className="flex bg-gray-900 p-1.5 rounded-xl border border-gray-800 w-full md:w-auto">
             <button 
               onClick={() => setActiveTab('law')}
               className={clsx(
                 "flex-1 md:flex-none px-6 py-2.5 rounded-lg text-sm font-bold flex items-center justify-center gap-2 transition-all duration-300",
                 activeTab === 'law' 
                    ? "bg-amber-900/80 text-white shadow-lg shadow-amber-900/20 ring-1 ring-amber-500/50" 
                    : "text-gray-400 hover:text-gray-200 hover:bg-gray-800"
               )}
             >
               <ScrollText className="w-4 h-4" />
               Law of Root
             </button>
             <button 
               onClick={() => setActiveTab('glossary')}
               className={clsx(
                 "flex-1 md:flex-none px-6 py-2.5 rounded-lg text-sm font-bold flex items-center justify-center gap-2 transition-all duration-300",
                 activeTab === 'glossary' 
                    ? "bg-blue-900/80 text-white shadow-lg shadow-blue-900/20 ring-1 ring-blue-500/50" 
                    : "text-gray-400 hover:text-gray-200 hover:bg-gray-800"
               )}
             >
               <Book className="w-4 h-4" />
               Glossary
             </button>
          </div>

          <div className="hidden md:block w-24"></div> {/* Spacer for center alignment */}
      </div>

      <div className="flex-1 p-2 md:p-6 max-w-7xl mx-auto w-full">
         {activeTab === 'law' && (
             <div className="h-[calc(100vh-140px)] animate-in fade-in slide-in-from-bottom-2 duration-300">
                 <LawViewer />
             </div>
         )}

         {activeTab === 'glossary' && (
             <div className="h-[calc(100vh-140px)] animate-in fade-in slide-in-from-bottom-2 duration-300">
                 <GlossaryViewer />
             </div>
         )}
      </div>
    </div>
  );
}
