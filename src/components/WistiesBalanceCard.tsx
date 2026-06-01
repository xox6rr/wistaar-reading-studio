import { Link } from "react-router-dom";
import { motion } from "framer-motion";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { ArrowRight, Loader2 } from "lucide-react";
import WistieCoinIcon from "./WistieCoinIcon";
import { useWisties } from "@/hooks/useWisties";

const WistiesBalanceCard = () => {
  const { balance, loading } = useWisties();

  return (
    <Card className="overflow-hidden">
      <CardContent className="p-6 flex items-center gap-5">
        <motion.div
          initial={{ rotateY: -90, opacity: 0 }}
          animate={{ rotateY: 0, opacity: 1 }}
          transition={{ duration: 0.6, ease: "easeOut" }}
        >
          <WistieCoinIcon size="md" />
        </motion.div>

        <div className="flex-1 min-w-0">
          <p className="text-xs uppercase tracking-wider text-muted-foreground mb-1">
            Wisties Balance
          </p>
          {loading ? (
            <Loader2 className="w-4 h-4 animate-spin text-muted-foreground" />
          ) : (
            <p className="font-serif text-3xl leading-none tabular-nums">
              ₹{balance.toLocaleString("en-IN")}
            </p>
          )}
          <p className="text-xs text-muted-foreground mt-1.5">
            Store credit · use on any future purchase
          </p>
        </div>

        <Button asChild variant="ghost" size="sm" className="shrink-0">
          <Link to="/profile/wisties">
            History
            <ArrowRight className="w-3.5 h-3.5 ml-1" />
          </Link>
        </Button>
      </CardContent>
    </Card>
  );
};

export default WistiesBalanceCard;
