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

const Header = () => {
  return (
    <header className="fixed top-0 left-0 right-0 z-50 bg-background/95 backdrop-blur-xl border-b border-border/30 shadow-lg">
      <div className="container mx-auto px-6 py-5 max-w-7xl">
        <nav className="flex items-center justify-between">
          {/* Enhanced Logo */}
          <Link to="/" className="flex items-center gap-4 group">
            <div className="flex items-center justify-center w-12 h-12 bg-gradient-to-br from-primary to-accent rounded-xl shadow-glow-sm group-hover:shadow-glow transition-all duration-300 group-hover:scale-105">
              <Brain className="w-7 h-7 text-primary-foreground" />
            </div>
            <span className="text-2xl font-bold text-foreground tracking-tight group-hover:text-primary transition-colors duration-300">
              nc
              <span className="bg-gradient-to-r from-primary to-accent bg-clip-text text-transparent">
                AGENTS
              </span>
            </span>
          </Link>

          {/* Restructured Navigation Links */}
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
          <div className="flex items-center gap-4">
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
                size="lg"
                className="font-semibold group bg-gradient-to-r from-primary to-accent hover:from-primary/90 hover:to-accent/90 shadow-glow-sm hover:shadow-glow transition-all duration-300 px-6"
              >
                Get Started
                <ArrowRight className="w-4 h-4 ml-2 group-hover:translate-x-1 transition-transform duration-300" />
              </Button>
            </Link>
          </div>
        </nav>
      </div>
    </header>
  );
};

export default Header;
