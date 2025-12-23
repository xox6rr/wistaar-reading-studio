import { Button } from "@/components/ui/button";
import { ArrowRight, BookOpen, Feather } from "lucide-react";
import { Link } from "react-router-dom";

const CTASection = () => {
  return (
    <section className="section-spacing relative overflow-hidden">
      {/* Background */}
      <div className="absolute inset-0 pointer-events-none">
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[700px] h-[700px] bg-teal-light/20 rounded-full blur-3xl" />
        <div className="absolute top-1/3 right-1/4 w-64 h-64 bg-amber-light/30 rounded-full blur-3xl" />
      </div>
      
      <div className="container-editorial relative">
        <div className="max-w-3xl mx-auto text-center">
          {/* Icon */}
          <div className="flex justify-center mb-10">
            <div className="w-20 h-20 rounded-3xl bg-gradient-to-br from-primary to-teal flex items-center justify-center shadow-glow animate-pulse-glow">
              <BookOpen className="w-9 h-9 text-primary-foreground" />
            </div>
          </div>
          
          <h2 className="headline-editorial text-heading lg:text-display-sm text-foreground mb-6 text-balance">
            Begin your journey.
          </h2>
          <p className="text-lg lg:text-xl text-muted-foreground mb-14 max-w-xl mx-auto leading-relaxed">
            Whether you're here to discover your next favorite book or share 
            your stories with the world, Wistaar welcomes you.
          </p>
          
          <div className="flex flex-col sm:flex-row items-center justify-center gap-5 mb-14">
            <Link to="/explore">
              <Button variant="editorial" size="xl" className="group shadow-medium hover:shadow-glow transition-all duration-400">
                <BookOpen className="w-5 h-5" />
                Start Reading
                <ArrowRight className="w-4 h-4 transition-transform duration-300 group-hover:translate-x-1" />
              </Button>
            </Link>
            <Link to="/publish">
              <Button variant="outline" size="xl" className="group hover:bg-accent/40 transition-all duration-300">
                <Feather className="w-5 h-5" />
                Publish Your Book
              </Button>
            </Link>
          </div>
          
          {/* Social proof */}
          <div className="inline-flex items-center gap-4 px-6 py-4 rounded-full bg-accent/50 border border-amber/15">
            <div className="flex -space-x-3">
              {['T', 'A', 'R', 'S'].map((letter, i) => (
                <div 
                  key={i} 
                  className="w-10 h-10 rounded-full bg-gradient-to-br from-secondary to-accent border-2 border-background flex items-center justify-center shadow-soft"
                  style={{ zIndex: 4 - i }}
                >
                  <span className="text-sm font-semibold text-accent-foreground">{letter}</span>
                </div>
              ))}
            </div>
            <p className="text-muted-foreground">
              Join <span className="font-semibold text-foreground">10,000+</span> readers today
            </p>
          </div>
        </div>
      </div>
    </section>
  );
};

export default CTASection;
