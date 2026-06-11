import { Heart } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useAuth } from "@/hooks/useAuth";
import { useIsWishlisted, useToggleWishlist } from "@/hooks/useWishlist";
import { useNavigate } from "react-router-dom";
import { toast } from "sonner";

interface WishlistButtonProps {
  bookId: string;
  variant?: "icon" | "button";
  className?: string;
}

export default function WishlistButton({ bookId, variant = "icon", className = "" }: WishlistButtonProps) {
  const { user } = useAuth();
  const navigate = useNavigate();
  const isWishlisted = useIsWishlisted(bookId);
  const toggleWishlist = useToggleWishlist();

  const handleToggle = (e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();
    if (!user) { navigate("/auth"); return; }

    toggleWishlist.mutate(
      { bookId, isWishlisted },
      {
        onSuccess: () => {
          toast.success(isWishlisted ? "Removed from wishlist" : "Added to wishlist");
        },
        onError: () => {
          toast.error("Failed to update wishlist");
        },
      }
    );
  };

  if (variant === "button") {
    return (
      <Button
        variant="outline"
        size="sm"
        className={`gap-2 ${className}`}
        onClick={handleToggle}
        disabled={toggleWishlist.isPending}
      >
        <Heart className={`h-4 w-4 ${isWishlisted ? "fill-accent text-accent" : ""}`} />
        {isWishlisted ? "Wishlisted" : "Save for Later"}
      </Button>
    );
  }

  // Card-floating heart removed per editorial refinement; render nothing in icon variant.
  return null;
}
