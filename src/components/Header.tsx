import { Button } from "@/components/ui/button";
import {
  Brain,
  Zap,
  FileText,
  DollarSign,
  Users,
  ArrowRight,
} from "lucide-react";
import { Link } from "react-router-dom";
import { useState } from "react";

const Header = () => {
  const [isMobileNavOpen, setIsMobileNavOpen] = useState(false);

  return (
    <header className="fixed top-0 left-0 right-0 z-50 bg-background/95 backdrop-blur-xl border-b border-border/30 shadow-lg">
      <div className="container mx-auto px-2 sm:px-6 py-2 max-w-7xl">
        <nav className="flex items-center justify-between">
          {/* Enhanced Logo */}
          <Link to="/" className="flex items-center gap-2 group">
            <div className="flex items-center justify-center w-8 h-8 sm:w-10 sm:h-10 bg-gradient-to-br from-primary to-accent rounded-xl shadow-glow-sm group-hover:shadow-glow transition-all duration-300 group-hover:scale-105">
              <Brain className="w-5 h-5 sm:w-6 sm:h-6 text-primary-foreground" />
            </div>
            <span className="text-sm sm:text-base font-bold text-foreground tracking-tight group-hover:text-primary transition-colors duration-300">
              nc
              <span className="bg-gradient-to-r from-primary to-accent bg-clip-text text-transparent">
                AGENTS
              </span>
            </span>
          </Link>

          {/* Hamburger for Mobile 
          <button
            className="md:hidden flex items-center p-2 rounded-md hover:bg-card/50"
            aria-label="Open navigation menu"
            onClick={() => setIsMobileNavOpen(true)}
          >
            <svg
              width="24"
              height="24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
              className="text-foreground"
            >
              <line x1="3" y1="12" x2="21" y2="12" />
              <line x1="3" y1="6" x2="21" y2="6" />
              <line x1="3" y1="18" x2="21" y2="18" />
            </svg>
          </button> */}

          {/* Navigation Links - Desktop */}
          <div className="hidden md:flex items-center gap-2">
            {[
              {
                icon: Zap,
                label: "Features",
                href: "#features",
                isExternal: true,
              },
              {
                icon: FileText,
                label: "Docs",
                href: "#docs",
                isExternal: true,
              },
              {
                icon: DollarSign,
                label: "Pricing",
                href: "/pricing",
                isExternal: false,
              },
              {
                icon: Users,
                label: "About",
                href: "/about",
                isExternal: false,
              },
            ].map(({ icon: Icon, label, href, isExternal }) =>
              isExternal ? (
                <a
                  key={label}
                  href={href}
                  className="flex items-center gap-3 px-4 py-2 rounded-xl text-muted-foreground hover:text-foreground hover:bg-card/50 transition-all duration-300 group"
                >
                  <Icon className="w-4 h-4 group-hover:scale-110 group-hover:text-primary transition-all duration-300" />
                  <span className="relative font-medium">
                    {label}
                    <span className="absolute -bottom-1 left-0 w-0 h-0.5 bg-gradient-to-r from-primary to-accent transition-all duration-300 group-hover:w-full"></span>
                  </span>
                </a>
              ) : (
                <Link
                  key={label}
                  to={href}
                  className="flex items-center gap-3 px-4 py-2 rounded-xl text-muted-foreground hover:text-foreground hover:bg-card/50 transition-all duration-300 group"
                >
                  <Icon className="w-4 h-4 group-hover:scale-110 group-hover:text-primary transition-all duration-300" />
                  <span className="relative font-medium">
                    {label}
                    <span className="absolute -bottom-1 left-0 w-0 h-0.5 bg-gradient-to-r from-primary to-accent transition-all duration-300 group-hover:w-full"></span>
                  </span>
                </Link>
              ),
            )}
          </div>

          {/* Enhanced CTA Buttons */}
          <div className="flex items-center gap-2 sm:gap-4">
            <Link to="/signin" className="hidden sm:block">
              <Button
                variant="ghost"
                size="sm"
                className="hover:bg-card/50 hover:text-primary transition-all duration-300 font-medium"
              >
                Sign In
              </Button>
            </Link>
            <Link to="/signup">
              <Button
                size="sm"
                className="font-semibold group bg-gradient-to-r from-primary to-accent hover:from-primary/90 hover:to-accent/90 shadow-glow-sm hover:shadow-glow transition-all duration-300 px-4 w-full sm:w-auto"
              >
                Get Started
                <ArrowRight className="w-4 h-4 ml-2 group-hover:translate-x-1 transition-transform duration-300" />
              </Button>
            </Link>
          </div>
        </nav>
      </div>
      {/* Mobile Navigation Drawer 
      {isMobileNavOpen && (
        <div
          className="fixed inset-0 z-[100] bg-black/40 md:hidden"
          onClick={() => setIsMobileNavOpen(false)}
        >
          <nav
            className="absolute left-0 top-0 h-full w-64 bg-card shadow-lg p-6 flex flex-col gap-4"
            onClick={(e) => e.stopPropagation()}
          >
            <button
              className="self-end mb-4 p-2 rounded-md hover:bg-card/50"
              aria-label="Close navigation menu"
              onClick={() => setIsMobileNavOpen(false)}
            >
              <svg
                width="24"
                height="24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
                className="text-foreground"
              >
                <line x1="18" y1="6" x2="6" y2="18" />
                <line x1="6" y1="6" x2="18" y2="18" />
              </svg>
            </button>
             Navigation Links - Mobile 
            {[
              {
                icon: Zap,
                label: "Features",
                href: "#features",
                isExternal: true,
              },
              {
                icon: FileText,
                label: "Docs",
                href: "#docs",
                isExternal: true,
              },
              {
                icon: DollarSign,
                label: "Pricing",
                href: "/pricing",
                isExternal: false,
              },
              {
                icon: Users,
                label: "About",
                href: "/about",
                isExternal: false,
              },
            ].map(({ icon: Icon, label, href, isExternal }) =>
              isExternal ? (
                <a
                  key={label}
                  href={href}
                  className="flex items-center gap-3 px-4 py-2 rounded-xl text-muted-foreground hover:text-foreground hover:bg-card/50 transition-all duration-300 group"
                >
                  <Icon className="w-4 h-4 group-hover:scale-110 group-hover:text-primary transition-all duration-300" />
                  <span className="relative font-medium">{label}</span>
                </a>
              ) : (
                <Link
                  key={label}
                  to={href}
                  className="flex items-center gap-3 px-4 py-2 rounded-xl text-muted-foreground hover:text-foreground hover:bg-card/50 transition-all duration-300 group"
                  onClick={() => setIsMobileNavOpen(false)}
                >
                  <Icon className="w-4 h-4 group-hover:scale-110 group-hover:text-primary transition-all duration-300" />
                  <span className="relative font-medium">{label}</span>
                </Link>
              )
            )}
            <Link to="/signin" onClick={() => setIsMobileNavOpen(false)}>
              <Button
                variant="ghost"
                size="sm"
                className="hover:bg-card/50 hover:text-primary transition-all duration-300 font-medium w-full mt-2"
              >
                Sign In
              </Button>
            </Link>
            <Link to="/signup" onClick={() => setIsMobileNavOpen(false)}>
              <Button
                size="sm"
                className="font-semibold group bg-gradient-to-r from-primary to-accent hover:from-primary/90 hover:to-accent/90 shadow-glow-sm hover:shadow-glow transition-all duration-300 px-4 w-full mt-2"
              >
                Get Started
                <ArrowRight className="w-4 h-4 ml-2 group-hover:translate-x-1 transition-transform duration-300" />
              </Button>
            </Link>
          </nav>
        </div> 
      )} */}
    </header>
  );
};

export default Header;
