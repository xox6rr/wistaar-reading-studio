## Wisties — Credit Store System

Refund-as-store-credit instead of cash. 1 Wistie = ₹1. User ke profile pe coin-themed balance card, aur dedicated `/profile/wisties` page detailed transaction table ke saath.

---

### 1. Visual Language (design system ke andar)

- **Coin icon**: Circular badge, `bg-accent` (terracotta), `text-accent-foreground`, serif 'W' embossed centre mein. Subtle inner shadow for depth. 3 sizes: `sm` (16px nav), `md` (32px card), `lg` (64px hero balance).
- **Balance display**: Instrument Serif, large numeric, accent color. `1,247 Wisties` format.
- **Colors**: Credit (+) → `text-accent` (terracotta), Debit (−) → `text-muted-foreground`. No green/red — monochrome+accent only.
- **Motion**: Framer Motion — coin spin on balance update, staggered fade-up on transaction rows.

---

### 2. Database Schema

Two new tables (migration step):

**`wisties_balance`** — current balance per user
- `user_id` (uuid, unique), `balance` (numeric, default 0), timestamps
- RLS: user reads own; service_role writes
- GRANTs: authenticated SELECT, service_role ALL

**`wisties_transactions`** — append-only ledger
- `user_id`, `amount` (signed numeric), `type` (`'refund' | 'purchase_use' | 'bonus' | 'adjustment'`), `description` (text), `reference_id` (uuid, nullable — links to `book_purchases.id`), `balance_after` (numeric), `created_at`
- RLS: user reads own; service_role inserts
- GRANTs: authenticated SELECT, service_role ALL

**DB function** `apply_wisties_change(p_user_id, p_amount, p_type, p_description, p_reference_id)` — security definer, atomic: updates balance + inserts ledger row + returns new balance.

**Trigger** on profile creation → seed `wisties_balance` row with 0.

---

### 3. Profile Page — Balance Card

New card above "Edit Profile":

```text
┌─────────────────────────────────────────┐
│  ◉W   Wisties Balance                   │
│       ₹1,247                            │
│       Available for any future purchase │
│                                         │
│       [ View History → ]                │
└─────────────────────────────────────────┘
```

- Coin icon (md size) left, balance + label right
- "View History" → links to `/profile/wisties`
- Skeleton loader while fetching

---

### 4. Dedicated Page — `/profile/wisties`

Route: `/profile/wisties` (lazy-loaded, added to `AnimatedRoutes.tsx`)

**Header block**:
- Large coin icon (lg) + serif heading "Your Wisties"
- Huge balance number (Instrument Serif, 5xl)
- Subtext: "1 Wistie = ₹1. Use on any book purchase."

**Stats row** (3 mini cards):
- Total earned (lifetime credits)
- Total spent (lifetime debits)
- Active since (first transaction date)

**Transaction table** (shadcn `Table`):

| Date | Description | Reference | Amount | Balance |
|------|------------|-----------|--------|---------|
| 1 Jun 2026 | Refund — *Midnight Library* | TXN…f4a2 | +₹99 | ₹1,247 |
| 28 May 2026 | Used on *Atomic Habits* | — | −₹49 | ₹1,148 |

- Pagination (20 rows/page)
- Empty state: coin icon + "No transactions yet. Refunds and bonuses will appear here."
- Sticky header row, monospace `tabular-nums` for amounts

---

### 5. Refund Flow Changes

When user requests refund on a `book_purchases` row (within 36h):
1. Mark purchase `payment_status = 'refunded_to_wisties'`
2. Call `apply_wisties_change(user, +amount, 'refund', 'Refund — {book title}', purchase_id)`
3. Toast: "₹99 added to your Wisties"
4. In-app notification

(Refund UI itself is out of scope for this prompt — only the credit-adding plumbing.)

---

### 6. Refund Policy Page Update

Update `/refund-policy` stub copy (or create if missing):
- Headline: "Refunds are issued as Wisties (store credit)"
- 36-hour window, eligible only if <20% read
- Wisties never expire, no cash conversion
- Link to `/profile/wisties`

---

### 7. Files to Touch

**New**
- `supabase/migrations/<ts>_wisties.sql` — tables, RLS, GRANTs, function, trigger
- `src/components/WisticoinIcon.tsx` — reusable coin SVG with size variants
- `src/components/WistiesBalanceCard.tsx` — profile card
- `src/pages/Wisties.tsx` — full page with table
- `src/hooks/useWisties.ts` — balance + transactions fetcher, realtime sub

**Modified**
- `src/pages/Profile.tsx` — mount `<WistiesBalanceCard />`
- `src/components/AnimatedRoutes.tsx` — add `/profile/wisties` route
- `src/pages/RefundPolicy.tsx` (or create) — Wisties messaging

---

### 8. Out of Scope (separate prompts later)

- Actual refund request UI on Library / purchase rows
- Razorpay-side refund mechanics (we only mutate ledger)
- Admin tool to manually adjust balances
- Bonus campaigns / promo Wisties

---

### Acceptance

- New user signs up → balance row auto-created at 0
- Profile shows coin card with current balance
- `/profile/wisties` lists every transaction in table form, running balance correct
- Mock insert via service role updates UI in realtime
- All colors via design tokens, zero hardcoded hex
