import { NextResponse } from 'next/server';
import { stripe } from '@/lib/stripe';

export async function POST(req: Request) {
  try {
    const body = await req.json();
    const { locale = 'es', email, customerName } = body;
    const origin = process.env.NEXT_PUBLIC_APP_URL || req.headers.get('origin') || 'http://localhost:3000';

    const session = await stripe.checkout.sessions.create({
      mode: 'payment',
      customer_email: email || undefined,
      line_items: [
        {
          price_data: {
            currency: 'usd',
            product_data: {
              name: locale === 'es' ? 'La Mente del Guerrero — Diario de 21 Días & Mentoría' : "The Warrior's Mind — 21-Day Journal & Coaching",
              description: locale === 'es' 
                ? 'Acceso de por vida a la plataforma de reprogramación cognitiva de 21 días.'
                : 'Lifetime access to the 21-day cognitive reprogramming platform.',
              images: ['https://images.unsplash.com/photo-1519834785169-98be25ec3f84?auto=format&fit=crop&w=1200&q=80'],
            },
            unit_amount: 4700, // $47.00 USD
          },
          quantity: 1,
        },
      ],
      success_url: `${origin}/${locale}/dashboard?session_id={CHECKOUT_SESSION_ID}&checkout=success`,
      cancel_url: `${origin}/${locale}/checkout?canceled=true`,
      metadata: {
        locale,
        product: 'warriors_mind_21_days',
        customerName: customerName || ''
      }
    });

    return NextResponse.json({ url: session.url });
  } catch (err: any) {
    console.error('Error creating checkout session:', err);
    return NextResponse.json({ error: err.message || 'Internal Server Error' }, { status: 500 });
  }
}
