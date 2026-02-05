import { ImageResponse } from 'next/og';

export const runtime = 'edge';
export const size = {
  width: 32,
  height: 32,
};
export const contentType = 'image/png';

export default function Icon() {
  return new ImageResponse(
    (
      <div
        style={{
          width: '100%',
          height: '100%',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          background: 'linear-gradient(135deg, #0a0c10 0%, #1a1f2e 100%)',
          borderRadius: '8px',
          position: 'relative',
          overflow: 'hidden',
        }}
      >
        {/* Orange accent shape */}
        <div
          style={{
            position: 'absolute',
            top: '-2px',
            right: '-2px',
            width: '12px',
            height: '12px',
            background: '#ff6b35',
            borderRadius: '0 0 0 12px',
          }}
        />

        {/* Main "R" letter */}
        <div
          style={{
            fontSize: '20px',
            fontWeight: 900,
            color: '#ffffff',
            textShadow: '0 0 8px rgba(255, 107, 53, 0.5)',
            letterSpacing: '-1px',
            fontFamily: 'system-ui, -apple-system, sans-serif',
          }}
        >
          R
        </div>

        {/* Bottom highlight */}
        <div
          style={{
            position: 'absolute',
            bottom: 0,
            left: 0,
            right: 0,
            height: '1px',
            background: 'linear-gradient(90deg, transparent, rgba(255, 107, 53, 0.3), transparent)',
          }}
        />
      </div>
    ),
    {
      ...size,
    }
  );
}