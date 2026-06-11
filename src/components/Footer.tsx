import { Link } from "react-router-dom";

const Footer = () => {
  const columns = [
    {
      heading: "Discover",
      links: [
        { to: "/explore", label: "Explore" },
        { to: "/library", label: "Library" },
        { to: "/explore?filter=free", label: "Free Chapters" },
      ],
    },
    {
      heading: "Publish",
      links: [
        { to: "/publish", label: "For Authors" },
        { to: "/author/signup", label: "Submit Your Book" },
        { to: "/publish#guidelines", label: "Guidelines" },
      ],
    },
  ];

  return (
    <footer className="border-t border-border mt-24">
      <div className="container-main py-20">
        <div className="grid grid-cols-1 md:grid-cols-[1.2fr_1fr_1fr] gap-12 md:gap-16">
          <div>
            <Link to="/" className="font-serif text-3xl text-foreground">
              Wistaar
            </Link>
            <p className="mt-4 text-sm text-muted-foreground max-w-xs leading-relaxed">
              An independent digital sanctuary for deep reading.
            </p>
          </div>

          {columns.map((col) => (
            <nav key={col.heading} className="flex flex-col gap-3">
              <h4 className="font-serif text-lg text-foreground mb-1">
                {col.heading}
              </h4>
              {col.links.map((link) => (
                <Link
                  key={link.to}
                  to={link.to}
                  className="text-sm text-muted-foreground hover:text-foreground transition-colors w-fit"
                >
                  {link.label}
                </Link>
              ))}
            </nav>
          ))}
        </div>

        <div className="mt-16 pt-8 border-t border-border flex flex-col md:flex-row items-start md:items-center justify-between gap-4">
          <p className="text-xs text-muted-foreground tracking-wide">
            © {new Date().getFullYear()} Wistaar. All stories belong to their authors.
          </p>
          <p className="text-xs text-muted-foreground tracking-widest uppercase">
            Made with care
          </p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
