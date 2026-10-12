import { ImageResponse } from 'next/og';

export const runtime = 'edge';

export const size = {
  width: 64,
  height: 64,
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
          background: 'linear-gradient(135deg, #064E3B 0%, #0A0D0B 100%)',
          borderRadius: '16px',
          border: '2px solid rgba(199, 168, 106, 0.7)',
          padding: '8px',
        }}
      >
        <svg
          width="40"
          height="40"
          viewBox="0 0 24 24"
          fill="none"
          stroke="#C7A86A"
          strokeWidth="2.2"
          strokeLinecap="round"
          strokeLinejoin="round"
        >
          <path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z" />
          <path d="m9 12 2 2 4-4" stroke="#F4F1E8" strokeWidth="2" />
        </svg>
      </div>
    ),
    {
      ...size,
    }
  );
}
