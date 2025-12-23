import { ArrowRight } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Link } from "react-router-dom";

interface BookCardProps {
  title: string;
  author: string;
  genre: string;
  coverGradient?: string;
}

const BookCard = ({ title, author, genre, coverGradient = "from-teal-light to-accent" }: BookCardProps) => {
  return (
    <article className="group cursor-pointer text-center">
      {/* Book Cover */}
      <div className={`book-cover bg-gradient-to-br ${coverGradient} aspect-[2/3] mb-5 relative shadow-soft`}>
        {/* Spine highlight */}
        <div className="absolute left-0 top-0 bottom-0 w-3 bg-foreground/5 rounded-l-lg" />
        
        {/* Genre badge */}
        <div className="absolute bottom-4 left-4 right-4">
          <span className="inline-block px-3 py-1.5 text-xs font-medium uppercase tracking-wider rounded-full bg-background/90 text-foreground/80 shadow-xs">
            {genre}
          </span>
        </div>
      </div>
      
      {/* Book Info */}
      <h3 className="font-semibold text-foreground mb-1.5 group-hover:text-primary transition-colors duration-300 line-clamp-1">
        {title}
      </h3>
      <p className="text-sm text-muted-foreground">
        {author}
      </p>
    </article>
  );
};

const freeBooks = [
  { title: "The Silent Garden", author: "Priya Sharma", genre: "Literary Fiction", coverGradient: "from-teal-light via-accent to-teal-light" },
  { title: "Beyond the Horizon", author: "Arjun Mehta", genre: "Adventure", coverGradient: "from-amber-light via-secondary to-amber-light" },
  { title: "Letters to Myself", author: "Kavya Nair", genre: "Poetry", coverGradient: "from-rose via-accent to-rose" },
  { title: "The Last Monsoon", author: "Vikram Das", genre: "Drama", coverGradient: "from-secondary via-teal-light to-secondary" },
];

const FreeReadingSection = () => {
  return (
    <section className="section-spacing relative overflow-hidden">
      {/* Background accent */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[800px] bg-teal-light/15 rounded-full blur-3xl pointer-events-none" />
      
      <div className="container-editorial relative">
        {/* Section Header - Centered */}
        <div className="text-center max-w-2xl mx-auto mb-16">
          <div className="inline-flex items-center gap-3 mb-5">
            <div className="w-12 h-px bg-gradient-to-r from-transparent to-primary" />
            <p className="text-sm font-semibold text-primary uppercase tracking-widest">
              Open Access
            </p>
            <div className="w-12 h-px bg-gradient-to-l from-transparent to-primary" />
          </div>
          
          <h2 className="headline-editorial text-heading text-foreground mb-5 text-balance">
            Free Reading
          </h2>
          <p className="text-lg text-muted-foreground leading-relaxed">
            Stories shared freely by authors who believe in open access to literature.
          </p>
        </div>

        {/* Books Grid */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-8 lg:gap-10 mb-12">
          {freeBooks.map((book, index) => (
            <div 
              key={index} 
              className="opacity-0 animate-fade-up"
              style={{ animationDelay: `${index * 0.1}s` }}
            >
              <BookCard {...book} />
            </div>
          ))}
        </div>

        {/* CTA - Centered */}
        <div className="text-center">
          <Link to="/explore?filter=free">
            <Button variant="text" className="group text-base">
              Browse all free books
              <ArrowRight className="w-4 h-4 transition-transform duration-300 group-hover:translate-x-1" />
            </Button>
          </Link>
        </div>
      </div>
    </section>
  );
};

export default FreeReadingSection;
