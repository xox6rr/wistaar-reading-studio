import { Lock, Eye, Moon, Smartphone, Zap } from "lucide-react";

const features = [
  {
    icon: Eye,
    title: "Distraction-Free",
    description: "Clean, focused interface for deep reading. No ads, no clutter."
  },
  {
    icon: Moon,
    title: "Gentle on Eyes",
    description: "Warm colors and comfortable typography for long sessions."
  },
  {
    icon: Lock,
    title: "Secure Content",
    description: "Your purchased content stays private and accessible only to you."
  },
  {
    icon: Smartphone,
    title: "Read Anywhere",
    description: "Seamlessly sync your progress across all your devices."
  }
];

const ReadingExperienceSection = () => {
  return (
    <section className="section-spacing bg-foreground text-background relative overflow-hidden">
      {/* Background effects */}
      <div className="absolute inset-0 pointer-events-none">
        <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-primary/15 rounded-full blur-3xl" />
        <div className="absolute bottom-1/4 right-1/4 w-80 h-80 bg-teal-glow/10 rounded-full blur-3xl" />
      </div>
      
      <div className="container-editorial relative">
        {/* Section Header - Centered */}
        <div className="text-center max-w-2xl mx-auto mb-20">
          <div className="inline-flex items-center gap-2 px-5 py-2.5 rounded-full bg-background/10 border border-background/20 mb-8">
            <Zap className="w-4 h-4 text-teal-glow" />
            <span className="text-sm font-medium text-background/90">The Reading Experience</span>
          </div>
          
          <h2 className="headline-editorial text-heading lg:text-display-sm text-background mb-6 text-balance">
            Built for readers who value their time.
          </h2>
          <p className="text-lg text-background/70 leading-relaxed">
            Every detail of Wistaar is designed around one goal: 
            helping you get lost in great stories.
          </p>
        </div>

        {/* Features Grid - Centered */}
        <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6 lg:gap-8 mb-24">
          {features.map((feature, index) => (
            <div 
              key={index} 
              className="text-center p-8 rounded-2xl bg-background/5 border border-background/10 backdrop-blur-sm hover:bg-background/10 transition-all duration-400 group"
            >
              <div className="w-16 h-16 rounded-2xl bg-gradient-to-br from-primary/20 to-teal-glow/30 flex items-center justify-center mx-auto mb-6 group-hover:scale-110 transition-transform duration-400">
                <feature.icon className="w-7 h-7 text-teal-glow" />
              </div>
              <h3 className="font-semibold text-background mb-3 text-lg">
                {feature.title}
              </h3>
              <p className="text-background/60 leading-relaxed">
                {feature.description}
              </p>
            </div>
          ))}
        </div>

        {/* Reading Preview - Centered */}
        <div className="relative max-w-3xl mx-auto">
          {/* Glow */}
          <div className="absolute inset-6 bg-teal-glow/15 blur-3xl rounded-3xl" />
          
          <div className="relative bg-background rounded-3xl p-8 md:p-12 shadow-large text-center">
            {/* Book indicator */}
            <div className="flex items-center justify-center gap-4 mb-8 pb-8 border-b border-border">
              <div className="w-10 h-14 rounded-lg bg-gradient-to-br from-teal-light to-accent shadow-soft" />
              <div className="text-left">
                <p className="font-semibold text-foreground">The Silent Garden</p>
                <p className="text-sm text-muted-foreground">Chapter 3 · The Morning Light</p>
              </div>
            </div>
            
            <div className="prose-reading text-foreground max-w-xl mx-auto text-left">
              <p className="first-letter:text-5xl first-letter:font-serif first-letter:font-semibold first-letter:mr-3 first-letter:float-left first-letter:leading-none first-letter:text-primary">
                The morning light filtered through the bamboo blinds, casting 
                long shadows across the worn wooden floor. She had always loved 
                this time of day, when the world seemed to hold its breath 
                between night and morning...
              </p>
            </div>
            
            <div className="flex items-center justify-between mt-10 pt-6 border-t border-border">
              <span className="text-sm text-muted-foreground bg-muted px-4 py-2 rounded-full">
                Page 42 of 286
              </span>
              <div className="flex gap-1.5">
                {[1, 2, 3, 4, 5].map((i) => (
                  <div key={i} className={`w-2 h-2 rounded-full transition-colors ${i <= 3 ? 'bg-primary' : 'bg-muted'}`} />
                ))}
              </div>
              <span className="text-sm text-muted-foreground">
                ~3 min remaining
              </span>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default ReadingExperienceSection;
