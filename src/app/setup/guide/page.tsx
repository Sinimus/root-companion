"use client";

import React, { useState } from 'react';
import { SETUP_GUIDE_DATA, SetupVariant } from '@/data/setup_guide';
import Link from 'next/link';
import { ArrowLeft, ArrowRight, CheckCircle2, RefreshCw } from 'lucide-react';
import { clsx } from 'clsx';

export default function SetupGuidePage() {
  const [variant, setVariant] = useState<SetupVariant>('advanced'); // Default to AdSet as requested
  const [step, setStep] = useState(0);

  const steps = SETUP_GUIDE_DATA[variant];
  const current = steps[step];
  const isLast = step === steps.length - 1;

  const toggleVariant = () => {
    setVariant(v => v === 'standard' ? 'advanced' : 'standard');
    setStep(0);
  };

  return (
    <div className="min-h-screen bg-[#0a0c10] p-6 flex flex-col items-center justify-center relative">
       <div className="absolute top-6 left-6 right-6 flex justify-between items-center">
         <Link href="/" className="text-gray-500 hover:text-white flex items-center gap-2"><ArrowLeft className="w-5 h-5"/> Menu</Link>

         <button
            onClick={toggleVariant}
            className="text-xs font-bold uppercase tracking-wider bg-gray-800 px-3 py-1.5 rounded border border-gray-700 hover:bg-gray-700 flex items-center gap-2"
         >
            <RefreshCw className="w-3 h-3" />
            {variant === 'advanced' ? 'Advanced Setup (AdSet)' : 'Standard Setup'}
         </button>
       </div>

       <div className="max-w-lg w-full space-y-8 mt-10">
          {/* Progress */}
          <div className="flex justify-between px-1">
             {steps.map((s, i) => (
                <div key={i} className={clsx("h-1.5 rounded-full flex-1 mx-1 transition-colors", i <= step ? "bg-orange-500" : "bg-gray-800")} />
             ))}
          </div>

          {/* Content */}
          <div className="bg-gray-900/50 border border-gray-800 p-8 rounded-2xl min-h-[350px] flex flex-col shadow-2xl relative overflow-hidden">
             <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-orange-500 to-red-500 opacity-50" />

             <h2 className="text-2xl font-bold text-white mb-6">{current.title}</h2>
             <p className="text-lg text-gray-300 leading-relaxed mb-6">{current.content}</p>

             {current.substeps && (
                <ul className="space-y-3 text-left bg-black/20 p-4 rounded-xl border border-white/5">
                    {current.substeps.map((sub, i) => (
                        <li key={i} className="text-sm text-gray-400 flex items-start gap-2">
                            <span className="text-orange-500 mt-1">•</span> {sub}
                        </li>
                    ))}
                </ul>
             )}
          </div>

          {/* Controls */}
          <div className="flex gap-3">
              <button
                onClick={() => setStep(Math.max(0, step - 1))}
                disabled={step === 0}
                className="px-6 py-4 rounded-xl font-bold text-gray-500 bg-gray-900 border border-gray-800 disabled:opacity-30 hover:bg-gray-800"
              >
                <ArrowLeft className="w-5 h-5" />
              </button>

              <button
                onClick={() => isLast ? null : setStep(s => s + 1)}
                className={clsx(
                    "flex-1 py-4 rounded-xl font-bold text-lg flex items-center justify-center gap-3 shadow-lg transition-transform active:scale-95",
                    isLast ? "bg-green-600 text-white" : "bg-white text-black hover:bg-gray-200"
                )}
              >
                {isLast ? (
                    <Link href="/play" className="flex items-center gap-2 w-full h-full justify-center">
                        Start Game <CheckCircle2 className="w-6 h-6"/>
                    </Link>
                ) : (
                    <>Next <ArrowRight className="w-6 h-6"/></>
                )}
              </button>
          </div>
       </div>
    </div>
  );
}