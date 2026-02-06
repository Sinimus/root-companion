/**
 * @author Sinimus <sinimus@noreply>
 * @license AGPL-3.0
 * @description Root Companion App - Master Layout
 *
 * ========================================================
 * COMPREHENSIVE THEMING SYSTEM - READY FOR ACTIVATION
 * ========================================================
 *
 * 🎨 THEME ACTIVATION STATUS: PARTIALLY ACTIVE
 *    ✅ Wood theme container ENABLED (with backdrop blur)
 *    ✅ Root font headings ACTIVE in globals.css
 *    ⏳ Custom assets PENDING (add to /public/assets/ and /public/fonts/)
 *    ⏳ Full theme system PENDING user asset addition
 *
 * 📁 CUSTOM ASSETS INTEGRATION:
 *    =========================================
 *    1. Wood Background: Add `bg-wood.jpg` to `/public/assets/`
 *    2. Custom Fonts: Add `root-font.ttf` to `/public/fonts/`
 *    3. Optional: Add `woodland-font.ttf` and `faction-font.ttf`
 *    4. Result: Automatic theme activation across all pages
 *
 * 🎯 THEME STATES & TRANSITIONS:
 *    =========================================
 *    - Current (Active): Dark mode + Root headings + wood backdrop blur
 *    - Woodland (Ready): Full wood texture + custom fonts when assets added
 *    - Paper (Prepared): Paper texture for rulebooks and materials
 *    - Future: Seasonal themes, faction-specific theming
 *
 * 📱 RESPONSIVE DESIGN & PERFORMANCE:
 *    =========================================
 *    - Mobile-first approach with breakpoint optimization
 *    - iOS safe area insets for notch compatibility
 *    - Fixed background attachment for parallax effect
 *    - Backdrop blur for readability over textures
 *    - Font display: swap for performance optimization
 *
 * 🔧 DEVELOPER CUSTOMIZATION:
 *    =========================================
 *    - Toggle: Comment/uncomment theme-container div for clean dark mode
 *    - Fonts: Update font-family references in tailwind.config.ts
 *    - Assets: All asset paths are configurable and centralized
 *    - Overlays: Prepared for vignette and texture effects
 *    - Debug: Developer visibility aids available (commented below)
 *
 * 🎪 THEME-SPECIFIC FEATURES:
 *    =========================================
 *    - Animated glow effects on themed elements
 *    - Faction color integration throughout UI
 *    - Seasonal animation support (float, glow effects)
 *    - Card styling with wood textures and gradients
 *    - Custom scrollbar styling for themed content
 */

import type { Metadata } from 'next';
import { Inter } from 'next/font/google';
import './globals.css';
import { GlobalTools } from '@/components/GlobalTools';

// Using Inter as fallback font with Root font as primary
const inter = Inter({
  subsets: ['latin'],
  fallback: ['Root', 'serif']
});

export const metadata: Metadata = {
  title: 'Root Companion',
  description: 'Unofficial Helper App for Root Board Game',
  manifest: '/manifest.json',
  appleWebApp: {
    capable: true,
    statusBarStyle: 'black-translucent',
    title: 'Root Companion',
  },
  icons: {
    icon: [
      { url: '/icon-192x192.png', sizes: '192x192', type: 'image/png' },
      { url: '/icon-512x512.png', sizes: '512x512', type: 'image/png' },
    ],
    apple: '/apple-touch-icon.png',
  },
};

export const viewport = {
  width: 'device-width',
  initialScale: 1,
  maximumScale: 1,
  themeColor: '#0a0c10',
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" className="dark">
      <body className={`${inter.className} antialiased selection:bg-orange-500/30 min-h-screen relative`}>
        {/*
          ========================================
          🎨 THEME LAYER ARCHITECTURE - REFACTORED
          ========================================

          Background Layer: Fixed behind content (z-index: -1)
          - Wood theme with backdrop blur
          - Parallax scrolling support
          - Non-interfering with content flow

          Content Layer: Natural document flow
          - Standard HTML scrolling behavior
          - Full footer visibility
          - No height constraints
        */}

        {/* Background Layer - Fixed behind content */}
        <div className="fixed inset-0 z-[-1] theme-container bg-wood-pattern bg-cover bg-fixed bg-center" />

        {/* Content Layer - Natural scroll flow */}
        <div className="min-h-screen bg-black/30 backdrop-blur-[0.5px]">
          {children}
        </div>

        {/* Global Floating Tools */}
        <GlobalTools />

        {/*
          DEVELOPER VISIBILITY AIDS (For development only)
          =================================================
          Uncomment to help with component debugging:

          <div className="fixed top-0 left-0 z-50 bg-red-500 text-white text-xs p-1">
            DEV MODE - Component boundaries visible in inspector
          </div>
        */}

        {/*
          THEME OVERLAY CONTAINERS (Prepared for future use)
          ================================================
          These overlay containers are ready for visual effects:

          <div className="fixed inset-0 pointer-events-none z-50">
            <div className="wood-vignette"></div>
            <div className="paper-texture-overlay"></div>
          </div>
        */}
      </body>
    </html>
  );
}
