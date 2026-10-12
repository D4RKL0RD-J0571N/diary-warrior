# Deployment & Operations Guide — The Warrior's Mind (La Mente del Guerrero)

## 1. Environment Variables Configuration (`.env.production`)

Configure the following variables in your **Vercel Project Settings > Environment Variables**:

```env
# Database & Supabase
NEXT_PUBLIC_SUPABASE_URL=https://your-project.supabase.co
NEXT_PUBLIC_SUPABASE_ANON_KEY=eyJhbGciOi...
SUPABASE_SERVICE_ROLE_KEY=eyJhbGciOi...

# Application Domain
NEXT_PUBLIC_APP_URL=https://yourbrand.com

# Stripe Payments & Webhooks
NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY=pk_live_...
STRIPE_SECRET_KEY=sk_live_...
STRIPE_WEBHOOK_SECRET=whsec_...

# Lemon Squeezy (Alternative / Multi-Gateway)
NEXT_PUBLIC_LEMON_SQUEEZY_CHECKOUT_URL=https://yourbrand.lemonsqueezy.com/checkout/buy/...
LEMON_SQUEEZY_WEBHOOK_SECRET=your_lemon_webhook_secret
```

---

## 2. Vercel Custom Domain Configuration

1. In the Vercel Dashboard, navigate to your project: **Settings > Domains**.
2. Add your custom domain (e.g. `yourbrand.com` and `www.yourbrand.com`).
3. Set the following DNS records at your domain registrar (GoDaddy, Namecheap, Cloudflare, etc.):
   - **Apex domain (`yourbrand.com`)**:
     - Type: `A`
     - Name: `@`
     - Value: `76.76.21.21`
   - **Subdomain (`www.yourbrand.com`)**:
     - Type: `CNAME`
     - Name: `www`
     - Value: `cname.vercel-dns.com`
4. Vercel will automatically provision and renew the **Let's Encrypt SSL/TLS Certificate** once DNS propagation completes (typically 2–15 minutes).

---

## 3. Stripe Webhook Endpoint Setup

1. Go to **Stripe Dashboard > Developers > Webhooks**.
2. Click **Add endpoint**.
3. Endpoint URL: `https://yourbrand.com/api/webhooks/stripe`
4. Select the following event to listen for:
   - `checkout.session.completed`
5. Reveal the **Signing secret** (`whsec_...`) and paste it as `STRIPE_WEBHOOK_SECRET` in Vercel.

---

## 4. Database Setup & Mentor Admin Seeding

1. Open the **SQL Editor** in your Supabase or PostgreSQL dashboard.
2. Run the provided [`schema.sql`](file:///d:/Development/WEB%20Development/Jafeth%20Web/schema.sql) file.
3. To assign your brother as the initial **ADMIN / MENTOR**:
   ```sql
   -- Update role for your brother's registered email
   UPDATE public.profiles
   SET role = 'ADMIN'
   WHERE email = 'jafeth.mentor@yourbrand.com';
   ```
4. Verify by navigating to `https://yourbrand.com/es/admin/dashboard`.
