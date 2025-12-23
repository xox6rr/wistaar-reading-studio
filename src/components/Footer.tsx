import { Link } from "react-router-dom";
import { BookOpen, Twitter, Instagram, Mail, Heart } from "lucide-react";

const Footer = () => {
  return (
    <footer className="bg-gradient-to-b from-background to-cream/60 border-t border-border py-20 lg:py-24">
      <div className="container-editorial">
        {/* Main Footer Content */}
        <div className="grid md:grid-cols-2 lg:grid-cols-5 gap-12 lg:gap-8 mb-16">
          {/* Brand */}
          <div className="lg:col-span-2">
            <Link to="/" className="inline-flex items-center gap-3 mb-5 group">
              <div className="w-11 h-11 rounded-xl bg-gradient-to-br from-primary to-teal flex items-center justify-center shadow-soft transition-transform group-hover:scale-105">
                <BookOpen className="w-5 h-5 text-primary-foreground" />
              </div>
              <span className="text-2xl font-semibold tracking-tight text-foreground headline-editorial">
                Wistaar
              </span>
            </Link>
            <p className="text-muted-foreground leading-relaxed max-w-sm mb-8">
              A secure platform for authors to publish freely and readers 
              to enjoy exceptional stories from India and beyond.
            </p>
            
            {/* Social links */}
            <div className="flex items-center gap-3">
              {[
                { icon: Twitter, label: 'Twitter' },
                { icon: Instagram, label: 'Instagram' },
                { icon: Mail, label: 'Email' }
              ].map(({ icon: Icon, label }) => (
                <a 
                  key={label}
                  href="#" 
                  aria-label={label}
                  className="w-11 h-11 rounded-xl bg-accent/70 hover:bg-primary hover:text-primary-foreground flex items-center justify-center transition-all duration-300 hover:-translate-y-0.5"
                >
                  <Icon className="w-5 h-5" />
                </a>
              ))}
            </div>
          </div>

          {/* Links */}
          {[
            {
              title: 'For Readers',
              links: [
                { to: '/explore', label: 'Explore Books' },
                { to: '/explore?filter=free', label: 'Free Reading' },
                { to: '/explore?filter=premium', label: 'Premium Access' },
                { to: '/library', label: 'My Library' },
              ]
            },
            {
              title: 'For Authors',
              links: [
                { to: '/publish', label: 'Start Publishing' },
                { to: '/pricing', label: 'Pricing' },
                { to: '/resources', label: 'Author Resources' },
                { to: '/success', label: 'Success Stories' },
              ]
            },
            {
              title: 'Company',
              links: [
                { to: '/about', label: 'About Us' },
                { to: '/security', label: 'Security' },
                { to: '/privacy', label: 'Privacy Policy' },
                { to: '/terms', label: 'Terms of Service' },
              ]
            },
          ].map((section) => (
            <div key={section.title}>
              <h4 className="text-sm font-semibold text-foreground mb-5 uppercase tracking-wider">
                {section.title}
              </h4>
              <ul className="space-y-3.5">
                {section.links.map((link) => (
                  <li key={link.to}>
                    <Link 
                      to={link.to} 
                      className="text-muted-foreground hover:text-primary transition-colors duration-200 link-animated"
                    >
                      {link.label}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>

        {/* Bottom divider */}
        <div className="divider-ornate mb-8">
          <Heart className="w-4 h-4 text-rose-dark" />
        </div>

        {/* Bottom bar */}
        <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4 text-center md:text-left">
          <p className="text-sm text-muted-foreground">
            © {new Date().getFullYear()} Wistaar. All rights reserved.
          </p>
          <p className="text-sm text-muted-foreground flex items-center justify-center md:justify-start gap-2">
            Made with <Heart className="w-4 h-4 text-rose-dark fill-rose-dark" /> in India 🇮🇳
          </p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
