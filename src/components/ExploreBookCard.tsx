import { Link } from "react-router-dom";
import type { Book } from "@/data/books";

interface ExploreBookCardProps {
  book: Book;
}

const ExploreBookCard = ({ book }: ExploreBookCardProps) => {
  return (
    <Link to={`/book/${book.id}`} className="block group">
      <article>
        <div className={`${book.coverColor} aspect-[2/3] rounded-sm mb-4 overflow-hidden relative transition-opacity duration-300 group-hover:opacity-90`}>
          <div className="absolute inset-x-0 bottom-0 p-4">
            <span className="text-[10px] text-background/80 uppercase tracking-[0.2em]">
              {book.genre}
            </span>
          </div>
        </div>

        <div className="space-y-1">
          <h3 className="font-serif text-lg text-foreground leading-snug line-clamp-1 group-hover:text-accent transition-colors duration-200">
            {book.title}
          </h3>
          <p className="text-sm text-muted-foreground">{book.author}</p>
          <p className="text-sm text-foreground pt-1">
            {book.price === "premium" ? "Premium" : "Free"}
          </p>
        </div>
      </article>
    </Link>
  );
};

export default ExploreBookCard;
