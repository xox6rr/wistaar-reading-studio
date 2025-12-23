import { ArrowRight, Star, Crown } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Link } from "react-router-dom";

interface PremiumBookCardProps {
  title: string;
  author: string;
  genre: string;
  rating: number;
  coverGradient?: string;
}

const PremiumBookCard = ({ title, author, genre, rating, coverGradient = "from-amber-light to-secondary" }: PremiumBookCardProps) => {
  return (
    <article className="group cursor-pointer feature-card text-center">
      {/* Book Cover */}
      <div className={`bg-gradient-to-br ${coverGradient} aspect-[4/3] rounded-xl flex items-end justify-center p-5 relative overflow-hidden mb-6`}>
        {/* Premium badge */}
        <div className="absolute top-4 left-1/2 -translate-x-1/2 badge-premium">
          <Crown className="w-3.5 h-3.5" />
          <span>Premium</span>
        </div>
        
        {/* Rating */}
        <div className="absolute top-4 right-4 flex items-center gap-1.5 bg-background/95 px-2.5 py-1.5 rounded-full text-xs shadow-soft">
          <Star className="w-3.5 h-3.5 fill-amber text-amber" />
          <span className="font-semibold">{rating}</span>
        </div>
        
        <span className="text-xs text-foreground/70 uppercase tracking-wider font-medium bg-background/80 px-3 py-1 rounded-full">
          {genre}
        </span>
      </div>
      
      {/* Book Info */}
      <h3 className="font-semibold text-foreground mb-2 group-hover:text-primary transition-colors duration-300 line-clamp-1 text-lg">
        {title}
      </h3>
      <p className="text-sm text-muted-foreground mb-5">
        {author}
      </p>
      
      <Button variant="subtle" size="sm" className="w-full group/btn">
        Read Now
        <ArrowRight className="w-3.5 h-3.5 transition-transform duration-300 group-hover/btn:translate-x-0.5" />
      </Button>
    </article>
  );
};

const premiumBooks = [
  { title: "The Architecture of Dreams", author: "Meera Krishnan", genre: "Psychology", rating: 4.8, coverGradient: "from-teal-light via-accent to-secondary" },
  { title: "Conversations with Time", author: "Siddharth Rao", genre: "Philosophy", rating: 4.9, coverGradient: "from-amber-light via-rose to-amber-light" },
  { title: "The Code of Seasons", author: "Ananya Bhatt", genre: "Science Fiction", rating: 4.7, coverGradient: "from-secondary via-teal-light to-accent" },
];

const PremiumSection = () => {
  return (
    <section className="section-spacing bg-gradient-to-b from-cream/60 via-background to-background relative overflow-hidden">
      {/* Decorative elements */}
      <div className="absolute inset-0 pointer-events-none">
        <div className="absolute top-20 left-[10%] w-72 h-72 bg-amber-light/25 rounded-full blur-3xl" />
        <div className="absolute bottom-20 right-[15%] w-80 h-80 bg-teal-light/20 rounded-full blur-3xl" />
      </div>
      
      <div className="container-editorial relative">
        {/* Section Header - Centered */}
        <div className="text-center max-w-2xl mx-auto mb-16">
          <div className="inline-flex items-center gap-3 mb-5">
            <Crown className="w-5 h-5 text-amber" />
            <p className="text-sm font-semibold text-amber-dark uppercase tracking-widest">
              Curated Collection
            </p>
          </div>
          
          <h2 className="headline-editorial text-heading text-foreground mb-5 text-balance">
            Premium eBooks
          </h2>
          <p className="text-lg text-muted-foreground leading-relaxed">
            Carefully curated, high-quality works from acclaimed authors. 
            Exceptional stories deserve exceptional presentation.
          </p>
        </div>

        {/* Books Grid */}
        <div className="grid md:grid-cols-3 gap-8 lg:gap-10 mb-12">
          {premiumBooks.map((book, index) => (
            <div 
              key={index}
              className="opacity-0 animate-fade-up"
              style={{ animationDelay: `${index * 0.15}s` }}
            >
              <PremiumBookCard {...book} />
            </div>
          ))}
        </div>

        {/* CTA - Centered */}
        <div className="text-center">
          <Link to="/explore?filter=premium">
            <Button variant="text" className="group text-base">
              Explore all premium books
              <ArrowRight className="w-4 h-4 transition-transform duration-300 group-hover:translate-x-1" />
            </Button>
          </Link>
        </div>
      </div>
    </section>
  );
};

export default PremiumSection;
