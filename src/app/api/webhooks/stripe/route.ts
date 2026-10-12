import { headers } from 'next/headers';
import { stripe } from '@/lib/stripe';
import { getSupabaseAdmin } from '@/utils/supabase/server';

export async function POST(req: Request) {
  const body = await req.text();
  const headersList = await headers();
  const signature = headersList.get('stripe-signature');
  const webhookSecret = process.env.STRIPE_WEBHOOK_SECRET;

  let event: any;

  if (webhookSecret && signature) {
    try {
      event = stripe.webhooks.constructEvent(body, signature, webhookSecret);
    } catch (err: any) {
      console.error(`Webhook signature verification failed: ${err.message}`);
      return new Response(`Webhook Error: ${err.message}`, { status: 400 });
    }
  } else {
    // Development fallback if webhook secret is not set
    try {
      event = JSON.parse(body);
    } catch (e) {
      return new Response('Invalid payload', { status: 400 });
    }
  }

  if (event.type === 'checkout.session.completed') {
    const session = event.data.object;
    const customerEmail = session.customer_details?.email || session.customer_email;
    const customerName = session.customer_details?.name || session.metadata?.customerName;
    const amount = session.amount_total;
    const currency = session.currency;
    const sessionId = session.id;

    console.log(`[Stripe Webhook] Order completed for ${customerEmail} - Session: ${sessionId}`);

    // If Supabase is connected with service role, provision user and update database
    const supabase = getSupabaseAdmin();
    if (supabase && customerEmail) {
      try {
        // 1. Record order in orders table
        await supabase.from('orders').upsert({
          stripe_session_id: sessionId,
          customer_email: customerEmail,
          customer_name: customerName,
          amount: amount,
          currency: currency,
          status: 'COMPLETED',
          created_at: new Date().toISOString()
        }, { onConflict: 'stripe_session_id' });

        // 2. Grant paid status to user if profile exists
        const { data: user } = await supabase
          .from('profiles')
          .select('id')
          .eq('email', customerEmail)
          .single();

        if (user) {
          await supabase.from('user_progress').upsert({
            user_id: user.id,
            is_paid: true,
            updated_at: new Date().toISOString()
          }, { onConflict: 'user_id' });
        }
      } catch (dbErr) {
        console.warn('[Stripe Webhook] Supabase sync notice:', dbErr);
      }
    }
  }

  return Response.json({ received: true });
}
