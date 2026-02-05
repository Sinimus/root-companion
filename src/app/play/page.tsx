import Link from 'next/link';
import { FACTIONS_DATA } from '@/data/factions';
import { ArrowLeft } from 'lucide-react';

export default function PlayDashboard() {
  return (
    <div className="min-h-screen p-6 pb-20 pt-20 relative bg-[#0a0c10]">
      <div className="absolute top-6 left-6 z-40">
          <Link href="/" className="text-gray-500 hover:text-white flex items-center gap-2 transition-colors font-medium">
            <ArrowLeft className="w-5 h-5" /> Menu
          </Link>
      </div>

      <div className="max-w-2xl mx-auto space-y-6">
        <div className="text-center mb-8">
          <h1 className="text-3xl font-bold text-white">Choose Faction</h1>
          <p className="text-gray-500">Launch turn guide</p>
        </div>

        {/* Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          {FACTIONS_DATA.map(f => (
            <Link 
              key={f.id} 
              href={`/play/${f.id}`}
              className={`block p-6 rounded-xl border border-gray-800 hover:border-gray-600 transition-all ${f.color.replace('bg-', 'hover:bg-').replace('/20', '/30')}`}
            >
              <h3 className="font-bold text-xl text-white mb-1">{f.name}</h3>
              <span className="text-xs uppercase tracking-wider opacity-70">{f.type}</span>
            </Link>
          ))}
        </div>
      </div>
    </div>
  );
}