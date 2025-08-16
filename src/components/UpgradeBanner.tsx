import { Button } from "@/components/ui/button";
import { X, Zap, ArrowRight } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import { useState } from "react";
import { Link } from "react-router-dom";

const UpgradeBanner = () => {
  const [isVisible, setIsVisible] = useState(true);

  if (!isVisible) return null;

  return (
    <AnimatePresence>
      <motion.div
        initial={{ height: 0, opacity: 0 }}
        animate={{ height: "auto", opacity: 1 }}
        exit={{ height: 0, opacity: 0 }}
        transition={{ duration: 0.3 }}
        className="bg-gradient-to-r from-primary via-accent to-primary text-white overflow-hidden"
      >
        <div className="container mx-auto max-w-7xl px-6 py-3">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-3">
              <div className="w-8 h-8 bg-white/20 rounded-full flex items-center justify-center">
                <Zap className="w-4 h-4 text-white" />
              </div>
              <div className="flex items-center gap-2">
                <span className="font-medium">
                  Unlock unlimited agents and advanced features with Pro!
                </span>
                <span className="hidden sm:inline text-white/80">
                  Get 50% off your first month.
                </span>
              </div>
            </div>

            <div className="flex items-center gap-3">
              <Link to="/payment">
                <Button
                  variant="secondary"
                  size="sm"
                  className="bg-white text-primary hover:bg-white/90 font-medium"
                >
                  Upgrade Now
                  <ArrowRight className="w-4 h-4 ml-2" />
                </Button>
              </Link>

              <button
                onClick={() => setIsVisible(false)}
                className="w-6 h-6 flex items-center justify-center text-white/80 hover:text-white transition-colors"
              >
                <X className="w-4 h-4" />
              </button>
            </div>
          </div>
        </div>
      </motion.div>
    </AnimatePresence>
  );
};

export default UpgradeBanner;
