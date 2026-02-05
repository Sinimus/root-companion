"use client"; // Needs to be client for state (Modals)

import React from 'react';
import { EYRIE_GUIDE } from '@/data/guides/eyrie';
import { MARQUISE_GUIDE } from '@/data/guides/marquise';
import { ALLIANCE_GUIDE } from '@/data/guides/alliance';
import { VAGABOND_GUIDE } from '@/data/guides/vagabond';
import { LIZARD_GUIDE } from '@/data/guides/lizard';
import { RIVERFOLK_GUIDE } from '@/data/guides/riverfolk';
import { DUCHY_GUIDE } from '@/data/guides/duchy';
import { CORVID_GUIDE } from '@/data/guides/corvid';
import { HUNDREDS_GUIDE } from '@/data/guides/hundreds';
import { KEEPERS_GUIDE } from '@/data/guides/keepers';
import { TurnGuide } from '@/components/TurnGuide';
import { VagabondManager } from '@/components/faction/VagabondManager';
import { HundredsHoard } from '@/components/faction/HundredsHoard';
import Link from 'next/link';
import { ArrowLeft, Hammer } from 'lucide-react';
import { IFactionGuide } from '@/types/engine';

const GUIDES: Record<string, IFactionGuide> = {
  eyrie: EYRIE_GUIDE,
  marquise: MARQUISE_GUIDE,
  alliance: ALLIANCE_GUIDE,
  vagabond_1: VAGABOND_GUIDE,
  vagabond_2: VAGABOND_GUIDE,
  cult: LIZARD_GUIDE,
  riverfolk: RIVERFOLK_GUIDE,
  duchy: DUCHY_GUIDE,
  corvid: CORVID_GUIDE,
  hundreds: HUNDREDS_GUIDE,
  keepers: KEEPERS_GUIDE,
};

// Faction ambient background colors
const FACTION_AMBIENT_COLORS: Record<string, string> = {
  marquise: 'from-orange-600/20',
  eyrie: 'from-blue-600/20',
  alliance: 'from-green-600/20',
  vagabond_1: 'from-teal-600/20',
  vagabond_2: 'from-teal-600/20',
  cult: 'from-purple-600/20',
  riverfolk: 'from-cyan-600/20',
  duchy: 'from-yellow-600/20',
  corvid: 'from-gray-600/20',
  hundreds: 'from-red-600/20',
  keepers: 'from-indigo-600/20',
};

// Note: generateStaticParams removed because this is a client component

export default function FactionTurnPage({ params }: { params: { factionId: string } }) {
  const guide = GUIDES[params.factionId];

  if (!guide) {
    return (
      <div className="min-h-screen flex flex-col items-center justify-center p-6 text-center space-y-6 bg-[#0a0c10]">
        <div className="p-6 bg-gray-900 rounded-full border border-gray-800">
          <Hammer className="w-12 h-12 text-gray-600" />
        </div>
        <div>
            <h1 className="text-2xl font-bold text-white mb-2">Error</h1>
            <p className="text-gray-400 max-w-xs mx-auto">Guide not found.</p>
        </div>
        <Link href="/play" className="px-6 py-2 bg-white text-black rounded-full font-bold hover:bg-gray-200 transition">
          Go Back
        </Link>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-[#0a0c10] pb-24 pt-20 relative">
      {/* Ambient Background */}
      <div className="fixed inset-0 z-0 pointer-events-none">
        <div className={`absolute inset-0 bg-[radial-gradient(ellipse_at_top,_var(--tw-gradient-stops))] ${FACTION_AMBIENT_COLORS[params.factionId] || 'from-gray-600/20'} via-gray-900/0 to-gray-900/0`} />
      </div>

       {/* Unified Navigation */}
       <div className="absolute top-6 left-6 z-40">
            <Link href="/" className="text-gray-500 hover:text-white flex items-center gap-2 transition-colors font-medium">
                <ArrowLeft className="w-5 h-5" /> Menu
            </Link>
       </div>

       {/* Faction-Specific Item Trackers */}
       {params.factionId.includes('vagabond') && (
         <VagabondManager factionId={params.factionId} />
       )}
       {params.factionId === 'hundreds' && (
         <HundredsHoard factionId={params.factionId} />
       )}

       <div className="relative z-10">
        <TurnGuide guide={guide} />
      </div>

    </div>
  );
}