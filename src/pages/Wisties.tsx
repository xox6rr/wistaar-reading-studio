import { useEffect, useMemo } from "react";
import { useNavigate, Link } from "react-router-dom";
import { motion } from "framer-motion";
import { useAuth } from "@/hooks/useAuth";
import { useWisties } from "@/hooks/useWisties";
import Navigation from "@/components/Navigation";
import Footer from "@/components/Footer";
import WistieCoinIcon from "@/components/WistieCoinIcon";
import { Card, CardContent } from "@/components/ui/card";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Button } from "@/components/ui/button";
import { ArrowLeft, Loader2 } from "lucide-react";
import { cn } from "@/lib/utils";

const formatINR = (n: number) =>
  `${n < 0 ? "−" : "+"}₹${Math.abs(n).toLocaleString("en-IN")}`;

const formatDate = (iso: string) =>
  new Date(iso).toLocaleDateString("en-IN", {
    day: "numeric",
    month: "short",
    year: "numeric",
  });

const Wisties = () => {
  const { user, loading: authLoading } = useAuth();
  const navigate = useNavigate();
  const { balance, transactions, loading } = useWisties();

  useEffect(() => {
    if (!authLoading && !user) navigate("/auth");
  }, [user, authLoading, navigate]);

  const stats = useMemo(() => {
    const earned = transactions
      .filter((t) => t.amount > 0)
      .reduce((s, t) => s + Number(t.amount), 0);
    const spent = transactions
      .filter((t) => t.amount < 0)
      .reduce((s, t) => s + Math.abs(Number(t.amount)), 0);
    const since = transactions.length
      ? transactions[transactions.length - 1].created_at
      : null;
    return { earned, spent, since };
  }, [transactions]);

  if (authLoading || loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <Loader2 className="w-6 h-6 animate-spin text-muted-foreground" />
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-background">
      <Navigation />
      <main className="container-main pt-24 pb-16">
        <div className="max-w-4xl mx-auto space-y-12">
          <Button asChild variant="ghost" size="sm" className="-ml-3">
            <Link to="/profile">
              <ArrowLeft className="w-4 h-4 mr-1.5" />
              Back to profile
            </Link>
          </Button>

          {/* Hero */}
          <motion.div
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            className="flex flex-col items-center text-center gap-5 py-8"
          >
            <motion.div
              initial={{ rotateY: -180, opacity: 0 }}
              animate={{ rotateY: 0, opacity: 1 }}
              transition={{ duration: 0.8, ease: "easeOut" }}
            >
              <WistieCoinIcon size="lg" />
            </motion.div>
            <div>
              <h1 className="font-serif text-5xl md:text-6xl leading-none mb-3 tabular-nums">
                ₹{balance.toLocaleString("en-IN")}
              </h1>
              <p className="text-sm text-muted-foreground max-w-md">
                Your Wisties balance · 1 Wistie = ₹1, never expires, redeemable on any book
              </p>
            </div>
          </motion.div>

          {/* Stats */}
          <div className="grid grid-cols-3 gap-3">
            {[
              { label: "Earned", value: `₹${stats.earned.toLocaleString("en-IN")}` },
              { label: "Spent", value: `₹${stats.spent.toLocaleString("en-IN")}` },
              {
                label: "Active since",
                value: stats.since ? formatDate(stats.since) : "—",
              },
            ].map((s, i) => (
              <motion.div
                key={s.label}
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.1 * i, duration: 0.4 }}
              >
                <Card>
                  <CardContent className="p-4">
                    <p className="text-[10px] uppercase tracking-wider text-muted-foreground mb-1">
                      {s.label}
                    </p>
                    <p className="font-serif text-xl tabular-nums truncate">{s.value}</p>
                  </CardContent>
                </Card>
              </motion.div>
            ))}
          </div>

          {/* Transactions */}
          <div>
            <h2 className="font-serif text-2xl mb-4">Transaction history</h2>

            {transactions.length === 0 ? (
              <Card>
                <CardContent className="py-16 flex flex-col items-center text-center gap-3">
                  <WistieCoinIcon size="md" className="opacity-50" />
                  <p className="text-sm text-muted-foreground max-w-xs">
                    No transactions yet. Refunds and bonus Wisties will appear here.
                  </p>
                </CardContent>
              </Card>
            ) : (
              <Card>
                <Table>
                  <TableHeader>
                    <TableRow>
                      <TableHead>Date</TableHead>
                      <TableHead>Description</TableHead>
                      <TableHead>Reference</TableHead>
                      <TableHead className="text-right">Amount</TableHead>
                      <TableHead className="text-right">Balance</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {transactions.map((t, i) => (
                      <motion.tr
                        key={t.id}
                        initial={{ opacity: 0, y: 6 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: Math.min(i * 0.03, 0.4), duration: 0.3 }}
                        className="border-b transition-colors hover:bg-muted/40"
                      >
                        <TableCell className="text-sm text-muted-foreground whitespace-nowrap">
                          {formatDate(t.created_at)}
                        </TableCell>
                        <TableCell className="text-sm">{t.description}</TableCell>
                        <TableCell className="text-xs text-muted-foreground font-mono">
                          {t.reference_id ? t.reference_id.slice(0, 8) + "…" : "—"}
                        </TableCell>
                        <TableCell
                          className={cn(
                            "text-right tabular-nums text-sm font-medium",
                            t.amount > 0 ? "text-accent" : "text-muted-foreground"
                          )}
                        >
                          {formatINR(Number(t.amount))}
                        </TableCell>
                        <TableCell className="text-right tabular-nums text-sm">
                          ₹{Number(t.balance_after).toLocaleString("en-IN")}
                        </TableCell>
                      </motion.tr>
                    ))}
                  </TableBody>
                </Table>
              </Card>
            )}
          </div>
        </div>
      </main>
      <Footer />
    </div>
  );
};

export default Wisties;
