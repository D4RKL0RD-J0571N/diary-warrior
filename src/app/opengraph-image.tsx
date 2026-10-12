import { ImageResponse } from 'next/og';

export const runtime = 'edge';

export const alt = "La Mente del Guerrero — Academia de Reprogramación Mental de 21 Días";

export const size = {
  width: 1200,
  height: 630,
};

export const contentType = 'image/png';

export default async function OpengraphImage() {
  return new ImageResponse(
    (
      <div
        style={{
          height: '100%',
          width: '100%',
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          justifyContent: 'center',
          backgroundColor: '#0A0D0B',
          backgroundImage:
            'radial-gradient(circle at 50% 40%, rgba(6, 78, 59, 0.45) 0%, rgba(10, 13, 11, 0.95) 75%)',
          color: '#F4F1E8',
          fontFamily: 'sans-serif',
          position: 'relative',
          padding: '60px',
        }}
      >
        {/* Border box */}
        <div
          style={{
            position: 'absolute',
            top: '30px',
            bottom: '30px',
            left: '30px',
            right: '30px',
            border: '1px solid rgba(199, 168, 106, 0.35)',
            borderRadius: '24px',
            display: 'flex',
          }}
        />

        {/* Shield Icon */}
        <div
          style={{
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            width: '90px',
            height: '90px',
            borderRadius: '22px',
            background: 'linear-gradient(135deg, #064E3B 0%, #0B1F1A 100%)',
            border: '2px solid rgba(199, 168, 106, 0.8)',
            marginBottom: '28px',
            boxShadow: '0 10px 30px rgba(199, 168, 106, 0.2)',
          }}
        >
          <svg
            width="50"
            height="50"
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

        {/* Badge */}
        <div
          style={{
            fontSize: '15px',
            textTransform: 'uppercase',
            letterSpacing: '5px',
            color: '#C7A86A',
            fontWeight: 700,
            marginBottom: '18px',
          }}
        >
          Método Científico PAUSA · 21 Días
        </div>

        {/* Title */}
        <div
          style={{
            fontSize: '54px',
            fontWeight: 800,
            textAlign: 'center',
            lineHeight: 1.15,
            letterSpacing: '-1px',
            maxWidth: '920px',
            marginBottom: '20px',
            color: '#F4F1E8',
          }}
        >
          LA MENTE DEL GUERRERO
        </div>

        {/* Subtitle */}
        <div
          style={{
            fontSize: '22px',
            textAlign: 'center',
            maxWidth: '780px',
            color: '#A8B0AA',
            lineHeight: 1.45,
            marginBottom: '32px',
          }}
        >
          Destruye quien fuiste. Construye quien serás. Reprogramación cognitiva de alto rendimiento y mentoría activa.
        </div>

        {/* Pill */}
        <div
          style={{
            display: 'flex',
            alignItems: 'center',
            padding: '10px 24px',
            background: 'rgba(6, 78, 59, 0.5)',
            border: '1px solid rgba(199, 168, 106, 0.6)',
            borderRadius: '9999px',
            fontSize: '14px',
            color: '#F4F1E8',
            fontWeight: 600,
            letterSpacing: '1px',
          }}
        >
          Día 1 Gratis · lamentedelguerreromt.com
        </div>
      </div>
    ),
    {
      ...size,
    }
  );
}
