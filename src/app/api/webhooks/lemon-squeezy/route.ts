import { NextRequest, NextResponse } from "next/server";
import crypto from "crypto";
import { createServiceClient } from "@/utils/supabase/server";

/**
 * Lemon Squeezy Webhook Handler
 *
 * Receives payment events from Lemon Squeezy and grants access.
 * The webhook payload contains a `custom_data.user_id` field that we
 * pass through the checkout URL, linking the payment to a Supabase user.
 *
 * Flow:
 * 1. User clicks "Buy" → redirected to Lemon Squeezy checkout
 * 2. Checkout URL includes `?checkout[custom][user_id]=<supabase_uid>`
 * 3. On payment success, Lemon Squeezy POSTs here
 * 4. We verify the HMAC signature, extract user_id, and call grant_paid_access
 */

/** Verify the webhook signature from Lemon Squeezy */
function verifySignature(rawBody: string, signature: string): boolean {
  const secret = process.env.LEMON_SQUEEZY_WEBHOOK_SECRET;
  if (!secret) {
    console.error("LEMON_SQUEEZY_WEBHOOK_SECRET not configured");
    return false;
  }

  const hmac = crypto.createHmac("sha256", secret);
  hmac.update(rawBody);
  const digest = hmac.digest("hex");

  return crypto.timingSafeEqual(
    Buffer.from(digest),
    Buffer.from(signature)
  );
}

export async function POST(request: NextRequest) {
  try {
    const rawBody = await request.text();
    const signature = request.headers.get("x-signature") || "";

    // Verify HMAC signature
    if (!verifySignature(rawBody, signature)) {
      console.error("Invalid webhook signature");
      return NextResponse.json({ error: "Invalid signature" }, { status: 401 });
    }

    const payload = JSON.parse(rawBody);
    const eventName = payload.meta?.event_name;

    // We only care about successful order events
    if (eventName !== "order_created") {
      return NextResponse.json({ received: true });
    }

    // Extract the user_id from custom_data
    const userId = payload.meta?.custom_data?.user_id;

    if (!userId) {
      console.error("No user_id in webhook custom_data:", payload.meta);
      return NextResponse.json(
        { error: "Missing user_id in custom_data" },
        { status: 400 }
      );
    }

    // Verify payment status
    const orderStatus = payload.data?.attributes?.status;
    if (orderStatus !== "paid") {
      console.log(`Order not paid yet. Status: ${orderStatus}`);
      return NextResponse.json({ received: true, status: orderStatus });
    }

    // Grant access via Supabase service client (bypasses RLS)
    const supabase = createServiceClient();
    if (!supabase) {
      console.warn("Supabase credentials not available for lemon squeezy sync");
      return NextResponse.json({ success: true, user_id: userId, note: "db_unconfigured" });
    }
    const { error } = await supabase.rpc("grant_paid_access", {
      p_user_id: userId,
    });

    if (error) {
      console.error("Error granting access:", error);
      return NextResponse.json(
        { error: "Failed to grant access" },
        { status: 500 }
      );
    }

    console.log(`Access granted for user: ${userId}`);
    return NextResponse.json({ success: true, user_id: userId });
  } catch (err) {
    console.error("Webhook processing error:", err);
    return NextResponse.json(
      { error: "Internal server error" },
      { status: 500 }
    );
  }
}
