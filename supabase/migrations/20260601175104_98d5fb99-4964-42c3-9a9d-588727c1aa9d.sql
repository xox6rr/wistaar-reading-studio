
-- 1. wisties_balance
CREATE TABLE public.wisties_balance (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id uuid NOT NULL UNIQUE,
  balance numeric NOT NULL DEFAULT 0 CHECK (balance >= 0),
  created_at timestamptz NOT NULL DEFAULT now(),
  updated_at timestamptz NOT NULL DEFAULT now()
);

GRANT SELECT ON public.wisties_balance TO authenticated;
GRANT ALL ON public.wisties_balance TO service_role;

ALTER TABLE public.wisties_balance ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Users view own balance"
  ON public.wisties_balance FOR SELECT
  USING (auth.uid() = user_id);

CREATE TRIGGER update_wisties_balance_updated_at
  BEFORE UPDATE ON public.wisties_balance
  FOR EACH ROW EXECUTE FUNCTION public.update_updated_at_column();

-- 2. wisties_transactions (ledger)
CREATE TABLE public.wisties_transactions (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id uuid NOT NULL,
  amount numeric NOT NULL,
  type text NOT NULL CHECK (type IN ('refund','purchase_use','bonus','adjustment')),
  description text NOT NULL,
  reference_id uuid,
  balance_after numeric NOT NULL,
  created_at timestamptz NOT NULL DEFAULT now()
);

CREATE INDEX idx_wisties_tx_user_created ON public.wisties_transactions(user_id, created_at DESC);

GRANT SELECT ON public.wisties_transactions TO authenticated;
GRANT ALL ON public.wisties_transactions TO service_role;

ALTER TABLE public.wisties_transactions ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Users view own transactions"
  ON public.wisties_transactions FOR SELECT
  USING (auth.uid() = user_id);

-- 3. Atomic apply function
CREATE OR REPLACE FUNCTION public.apply_wisties_change(
  p_user_id uuid,
  p_amount numeric,
  p_type text,
  p_description text,
  p_reference_id uuid DEFAULT NULL
)
RETURNS numeric
LANGUAGE plpgsql
SECURITY DEFINER
SET search_path = public
AS $$
DECLARE
  new_balance numeric;
BEGIN
  INSERT INTO public.wisties_balance (user_id, balance)
  VALUES (p_user_id, 0)
  ON CONFLICT (user_id) DO NOTHING;

  UPDATE public.wisties_balance
  SET balance = balance + p_amount
  WHERE user_id = p_user_id
  RETURNING balance INTO new_balance;

  IF new_balance < 0 THEN
    RAISE EXCEPTION 'Insufficient Wisties balance';
  END IF;

  INSERT INTO public.wisties_transactions (user_id, amount, type, description, reference_id, balance_after)
  VALUES (p_user_id, p_amount, p_type, p_description, p_reference_id, new_balance);

  RETURN new_balance;
END;
$$;

-- 4. Seed balance row on new profile
CREATE OR REPLACE FUNCTION public.seed_wisties_balance()
RETURNS trigger
LANGUAGE plpgsql
SECURITY DEFINER
SET search_path = public
AS $$
BEGIN
  INSERT INTO public.wisties_balance (user_id, balance)
  VALUES (NEW.user_id, 0)
  ON CONFLICT (user_id) DO NOTHING;
  RETURN NEW;
END;
$$;

CREATE TRIGGER seed_wisties_on_profile_insert
  AFTER INSERT ON public.profiles
  FOR EACH ROW EXECUTE FUNCTION public.seed_wisties_balance();

-- 5. Backfill for existing users
INSERT INTO public.wisties_balance (user_id, balance)
SELECT user_id, 0 FROM public.profiles
ON CONFLICT (user_id) DO NOTHING;
