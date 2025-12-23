import { Button } from "@/components/ui/button";
import { ArrowRight, BookOpen, Sparkles } from "lucide-react";
import { Link } from "react-router-dom";

const HeroSection = () => {
  return (
    <section className="relative pt-36 pb-28 lg:pt-48 lg:pb-40 overflow-hidden">
      {/* Elegant background */}
      <div className="absolute inset-0 pointer-events-none">
        {/* Gradient base */}
        <div className="absolute inset-0 bg-gradient-to-b from-background via-background to-cream/40" />
        
        {/* Floating orbs */}
        <div className="absolute top-24 left-[15%] w-80 h-80 rounded-full bg-teal-light/40 blur-3xl animate-float" />
        <div className="absolute top-40 right-[10%] w-64 h-64 rounded-full bg-amber-light/50 blur-3xl animate-float" style={{ animationDelay: '3s' }} />
        <div className="absolute bottom-20 left-[40%] w-72 h-72 rounded-full bg-rose/30 blur-3xl animate-float" style={{ animationDelay: '5s' }} />
        
        {/* Subtle pattern */}
        <div 
          className="absolute inset-0 opacity-[0.015]"
          style={{
            backgroundImage: `radial-gradient(circle at 1px 1px, hsl(var(--foreground)) 1px, transparent 0)`,
            backgroundSize: '48px 48px'
          }}
        />
      </div>

      <div className="container-editorial relative">
        <div className="max-w-4xl mx-auto text-center stagger-children">
          {/* Tagline pill */}
          <div className="inline-flex items-center gap-2 px-5 py-2.5 rounded-full bg-accent/60 border border-amber/20 mb-10 shadow-xs">
            <Sparkles className="w-4 h-4 text-amber" />
            <span className="text-sm font-medium text-amber-dark">
              A sanctuary for stories
            </span>
          </div>

          {/* Main Headline */}
          <h1 className="headline-editorial text-display-sm lg:text-display text-foreground mb-8 text-balance">
            Where stories are written
            <span className="block mt-3 text-primary">— and read with care.</span>
          </h1>

          {/* Subheadline */}
          <p className="text-lg lg:text-xl text-muted-foreground max-w-2xl mx-auto mb-14 leading-relaxed text-balance">
            A secure, distraction-free reading platform where authors publish freely 
            and readers discover exceptional stories across every genre.
          </p>

          {/* CTAs */}
          <div className="flex flex-col sm:flex-row items-center justify-center gap-5">
            <Link to="/explore">
              <Button variant="editorial" size="xl" className="group shadow-medium hover:shadow-glow transition-all duration-400 ease-smooth">
                <BookOpen className="w-5 h-5" />
                Start Reading
                <ArrowRight className="w-4 h-4 transition-transform duration-300 group-hover:translate-x-1" />
              </Button>
            </Link>
            <Link to="/publish">
              <Button variant="outline" size="xl" className="hover:bg-accent/40 transition-all duration-300">
                Publish Your Book
              </Button>
            </Link>
          </div>
        </div>
      </div>

      {/* Elegant bottom divider */}
      <div className="absolute bottom-0 left-0 right-0">
        <div className="container-editorial">
          <div className="divider-ornate">
            <div className="w-2 h-2 rounded-full bg-primary/30" />
          </div>
        </div>
      </div>
    </section>
  );
};

export default HeroSection;
