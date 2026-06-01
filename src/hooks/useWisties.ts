import { useEffect, useState } from "react";
import { supabase } from "@/integrations/supabase/client";
import { useAuth } from "@/hooks/useAuth";

export interface WistieTransaction {
  id: string;
  user_id: string;
  amount: number;
  type: "refund" | "purchase_use" | "bonus" | "adjustment";
  description: string;
  reference_id: string | null;
  balance_after: number;
  created_at: string;
}

export const useWisties = () => {
  const { user } = useAuth();
  const [balance, setBalance] = useState<number>(0);
  const [transactions, setTransactions] = useState<WistieTransaction[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (!user) {
      setLoading(false);
      return;
    }

    let active = true;

    const fetchAll = async () => {
      const [{ data: bal }, { data: txs }] = await Promise.all([
        supabase
          .from("wisties_balance")
          .select("balance")
          .eq("user_id", user.id)
          .maybeSingle(),
        supabase
          .from("wisties_transactions")
          .select("*")
          .eq("user_id", user.id)
          .order("created_at", { ascending: false }),
      ]);

      if (!active) return;
      setBalance(Number(bal?.balance ?? 0));
      setTransactions((txs ?? []) as WistieTransaction[]);
      setLoading(false);
    };

    fetchAll();

    const channel = supabase
      .channel(`wisties:${user.id}`)
      .on(
        "postgres_changes",
        { event: "*", schema: "public", table: "wisties_balance", filter: `user_id=eq.${user.id}` },
        () => fetchAll()
      )
      .on(
        "postgres_changes",
        { event: "INSERT", schema: "public", table: "wisties_transactions", filter: `user_id=eq.${user.id}` },
        () => fetchAll()
      )
      .subscribe();

    return () => {
      active = false;
      supabase.removeChannel(channel);
    };
  }, [user]);

  return { balance, transactions, loading };
};
