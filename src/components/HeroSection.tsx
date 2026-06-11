import { Button } from "@/components/ui/button";
import { Link } from "react-router-dom";

const HeroSection = () => {
  return (
    <section className="min-h-[88vh] flex items-center justify-center pt-20 pb-16">
      <div className="container-main text-center">
        <p className="text-[11px] tracking-[0.3em] uppercase text-muted-foreground mb-8 fade-up">
          A sanctuary for stories
        </p>

        <h1 className="font-serif text-5xl md:text-7xl lg:text-[5.5rem] leading-[1.05] mb-10 fade-up delay-1">
          Where stories are written
          <br />
          <span className="italic text-accent">and read with care.</span>
        </h1>

        <p className="text-base md:text-lg text-muted-foreground max-w-xl mx-auto mb-14 fade-up delay-2 leading-relaxed">
          An independent digital sanctuary for deep reading.
        </p>

        <div className="flex flex-col sm:flex-row items-center justify-center gap-3 fade-up delay-3">
          <Link to="/explore">
            <Button size="lg" className="px-8 rounded-sm">
              Start Reading
            </Button>
          </Link>
          <Link
            to="/publish"
            className="text-sm text-muted-foreground hover:text-foreground transition-colors link-underline px-4 py-2"
          >
            For Authors →
          </Link>
        </div>
      </div>
    </section>
  );
};

export default HeroSection;
