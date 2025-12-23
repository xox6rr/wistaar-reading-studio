import { Button } from "@/components/ui/button";
import { ArrowRight, BookOpen, Shield, Users, Sparkles } from "lucide-react";
import { Link } from "react-router-dom";

const features = [
  {
    icon: BookOpen,
    title: "Complete Creative Control",
    description: "Retain full ownership of your work. Set your own pricing and build your readership."
  },
  {
    icon: Users,
    title: "Direct Reader Connection",
    description: "Build meaningful relationships with your readers. No algorithms in between."
  },
  {
    icon: Shield,
    title: "Secure Distribution",
    description: "Your content is protected with industry-leading security. Focus on writing."
  }
];

const AuthorSection = () => {
  return (
    <section className="section-spacing relative overflow-hidden">
      {/* Background */}
      <div className="absolute inset-0 pointer-events-none">
        <div className="absolute top-1/3 right-0 w-96 h-96 bg-accent/30 rounded-full blur-3xl translate-x-1/2" />
        <div className="absolute bottom-1/4 left-0 w-80 h-80 bg-teal-light/25 rounded-full blur-3xl -translate-x-1/2" />
      </div>
      
      <div className="container-editorial relative">
        {/* Section Header - Centered */}
        <div className="text-center max-w-3xl mx-auto mb-20">
          <div className="inline-flex items-center gap-2 px-5 py-2.5 rounded-full bg-teal-light/50 border border-primary/10 mb-8">
            <Sparkles className="w-4 h-4 text-primary" />
            <span className="text-sm font-medium text-primary">For Authors</span>
          </div>
          
          <h2 className="headline-editorial text-heading lg:text-display-sm text-foreground mb-6 text-balance">
            Publish with freedom,
            <span className="text-primary"> reach readers with care.</span>
          </h2>
          <p className="text-lg text-muted-foreground leading-relaxed max-w-2xl mx-auto">
            Wistaar gives independent authors a respectful platform to share their work — 
            whether freely or through premium access. Your stories, your rules.
          </p>
        </div>

        {/* Features Grid - Centered */}
        <div className="grid md:grid-cols-3 gap-8 lg:gap-12 mb-16">
          {features.map((feature, index) => (
            <div 
              key={index} 
              className="text-center p-8 rounded-2xl bg-card/50 border border-border/40 hover:border-primary/20 hover:bg-card transition-all duration-400 group"
            >
              <div className="w-16 h-16 rounded-2xl bg-gradient-to-br from-primary/10 to-teal-light/50 flex items-center justify-center mx-auto mb-6 group-hover:scale-110 transition-transform duration-400">
                <feature.icon className="w-7 h-7 text-primary" />
              </div>
              <h3 className="font-semibold text-lg text-foreground mb-3">
                {feature.title}
              </h3>
              <p className="text-muted-foreground leading-relaxed">
                {feature.description}
              </p>
            </div>
          ))}
        </div>

        {/* Quote Card - Centered */}
        <div className="max-w-2xl mx-auto mb-12">
          <div className="relative bg-gradient-to-br from-card to-cream rounded-2xl border border-border/50 p-10 lg:p-12 shadow-medium text-center">
            <div className="w-12 h-1 bg-gradient-to-r from-primary to-teal rounded-full mx-auto mb-8" />
            
            <blockquote className="headline-editorial text-2xl lg:text-3xl text-foreground leading-relaxed mb-8 italic">
              "Writing is not about being published. It is about finding 
              readers who understand your voice."
            </blockquote>
            
            <footer className="flex items-center justify-center gap-3">
              <div className="w-12 h-12 rounded-full bg-accent flex items-center justify-center">
                <span className="text-base font-semibold text-accent-foreground">W</span>
              </div>
              <div className="text-left">
                <p className="font-medium text-foreground">A Wistaar Author</p>
                <p className="text-sm text-muted-foreground">Published 12 books</p>
              </div>
            </footer>
          </div>
        </div>

        {/* CTA - Centered */}
        <div className="text-center">
          <Link to="/publish">
            <Button variant="editorial" size="xl" className="group shadow-medium hover:shadow-glow transition-all duration-400">
              Start Publishing
              <ArrowRight className="w-4 h-4 transition-transform duration-300 group-hover:translate-x-1" />
            </Button>
          </Link>
        </div>
      </div>
    </section>
  );
};

export default AuthorSection;
