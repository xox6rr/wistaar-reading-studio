import { Link } from "react-router-dom";
import type { ApprovedBook } from "@/hooks/useApprovedBooks";

interface ApprovedBookCardProps {
  book: ApprovedBook;
}

const ApprovedBookCard = ({ book }: ApprovedBookCardProps) => {
  const priceLabel =
    book.price === "premium" ? `₹${book.priceAmount}` : "Free";

  return (
    <Link to={`/book/${book.id}`} className="block group">
      <article>
        <div className={`${book.coverColor} aspect-[2/3] rounded-sm mb-4 overflow-hidden relative transition-opacity duration-300 group-hover:opacity-90`}>
          {book.coverImageUrl && (
            <img
              src={book.coverImageUrl}
              alt={book.title}
              className="absolute inset-0 w-full h-full object-cover"
              loading="lazy"
            />
          )}
        </div>

        <div className="space-y-1">
          <h3 className="font-serif text-lg text-foreground leading-snug line-clamp-1 group-hover:text-accent transition-colors duration-200">
            {book.title}
          </h3>
          <p className="text-sm text-muted-foreground line-clamp-1">{book.author}</p>
          <p className="text-sm text-foreground pt-1">{priceLabel}</p>
        </div>
      </article>
    </Link>
  );
};

export default ApprovedBookCard;
