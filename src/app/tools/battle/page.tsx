"use client";
import { BattleWizard } from '@/components/BattleWizard';
import Link from 'next/link';
import { ArrowLeft } from 'lucide-react';
import { useRouter } from 'next/navigation';

export default function BattleToolPage() {
  const router = useRouter();
  return (
    <div className="min-h-screen bg-black p-4 pt-20 relative">
        <div className="absolute top-6 left-6 z-40">
            <Link href="/" className="text-gray-500 hover:text-white flex items-center gap-2 transition-colors font-medium">
                <ArrowLeft className="w-5 h-5" /> Menu
            </Link>
        </div>
        <BattleWizard onClose={() => router.push('/')} />
    </div>
  );
}