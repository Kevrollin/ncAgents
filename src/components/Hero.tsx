import { Button } from "@/components/ui/button";
import { ArrowRight, Sparkles, Brain, Zap, Users, Shield } from "lucide-react";
import { motion } from "framer-motion";
import heroAiBg from "@/assets/hero-ai-bg.jpg";

const Hero = () => {
  return (
    <section className="relative min-h-screen flex items-center justify-center overflow-hidden pt-12 lg:pb-12">
      {/* Enhanced Background with Image */}
      <div className="absolute inset-0 z-0">
        <div
          className="w-full h-full bg-cover bg-center bg-no-repeat"
          style={{ backgroundImage: `url(${heroAiBg})` }}
        />
        {/* Multi-layered overlay for better text readability */}
        <div className="absolute inset-0 bg-gradient-to-br from-background/95 via-background/85 to-background/75" />
        <div className="absolute inset-0 bg-gradient-to-t from-background/90 via-transparent to-background/60" />
        <div
          className="absolute inset-0 bg-dot-pattern animate-float opacity-30"
          style={{ backgroundSize: "20px 20px" }}
        />
        {/* Enhanced animated gradient overlay */}
        <motion.div
          className="absolute inset-0 bg-gradient-to-r from-primary/5 via-transparent to-accent/5"
          animate={{
            background: [
              "linear-gradient(to right, hsl(var(--primary) / 0.05), transparent, hsl(var(--accent) / 0.05))",
              "linear-gradient(to right, hsl(var(--accent) / 0.05), transparent, hsl(var(--primary) / 0.05))",
              "linear-gradient(to right, hsl(var(--primary) / 0.05), transparent, hsl(var(--accent) / 0.05))",
            ],
          }}
          transition={{ duration: 8, repeat: Infinity, ease: "easeInOut" }}
        />
      </div>

      {/* Perfectly Centered Availability Notice */}
      <motion.div
        className="absolute top-24 left-0 right-0 z-30 flex justify-center"
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8, delay: 0.1 }}
      >
        <div className="flex items-center justify-center gap-3 bg-card/40 backdrop-blur-xl border border-green-500/20 rounded-full px-8 py-3 shadow-glow-sm">
          <motion.div
            className="w-2 h-2 bg-green-500 rounded-full flex-shrink-0"
            animate={{
              scale: [1, 1.3, 1],
              opacity: [0.7, 1, 0.7],
            }}
            transition={{ duration: 2, repeat: Infinity, ease: "easeInOut" }}
          />
          <span className="text-sm font-medium text-foreground whitespace-nowrap">
            Available now, only 3 spots left
          </span>
        </div>
      </motion.div>

      {/* Enhanced Floating Decorative Elements */}
      <div className="absolute inset-0 z-5 pointer-events-none overflow-hidden">
        <motion.div
          className="absolute top-1/4 left-1/4 w-2 h-2 bg-primary/30 rounded-full"
          animate={{
            y: [0, -20, 0],
            opacity: [0.3, 0.8, 0.3],
            scale: [1, 1.2, 1],
          }}
          transition={{ duration: 4, repeat: Infinity, ease: "easeInOut" }}
        />
        <motion.div
          className="absolute top-3/4 right-1/4 w-1 h-1 bg-accent/40 rounded-full"
          animate={{
            y: [0, -15, 0],
            x: [0, 10, 0],
            opacity: [0.4, 0.9, 0.4],
            scale: [1, 1.5, 1],
          }}
          transition={{
            duration: 6,
            repeat: Infinity,
            ease: "easeInOut",
            delay: 2,
          }}
        />
        <motion.div
          className="absolute top-1/2 left-1/6 w-1.5 h-1.5 bg-primary/20 rounded-full"
          animate={{
            y: [0, -25, 0],
            opacity: [0.2, 0.6, 0.2],
            scale: [1, 1.3, 1],
          }}
          transition={{
            duration: 5,
            repeat: Infinity,
            ease: "easeInOut",
            delay: 1,
          }}
        />
        <motion.div
          className="absolute top-1/3 right-1/3 w-1 h-1 bg-primary/25 rounded-full"
          animate={{
            y: [0, -18, 0],
            x: [0, -8, 0],
            opacity: [0.25, 0.7, 0.25],
            scale: [1, 1.4, 1],
          }}
          transition={{
            duration: 7,
            repeat: Infinity,
            ease: "easeInOut",
            delay: 3.5,
          }}
        />
        <motion.div
          className="absolute bottom-1/4 left-1/3 w-1.5 h-1.5 bg-accent/20 rounded-full"
          animate={{
            y: [0, -22, 0],
            opacity: [0.2, 0.6, 0.2],
            scale: [1, 1.2, 1],
          }}
          transition={{
            duration: 5.5,
            repeat: Infinity,
            ease: "easeInOut",
            delay: 2.5,
          }}
        />
      </div>

      {/* Enhanced Main Content with Proper Layout */}
      <div className="relative z-10 w-full justify-center">
        <div className="container mx-auto pb-12 lg:pb-8 pt-32 lg:pt-32">
          <div className="relative flex flex-col items-center text-center min-h-[calc(100vh-12rem)] justify-center w-full">
            {/* Main Content Container */}
            <motion.div
              className="max-w-5xl space-y-10 relative z-20"
              initial={{ opacity: 0, y: 40 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.2 }}
            >
              {/* Enhanced Hero Title with Brand Colors */}
              <motion.div
                className="space-y-2"
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8, delay: 0.3 }}
              >
                <motion.h1
                  className="text-2xl md:text-7xl lg:text-8xl xl:text-9xl font-bold tracking-tight leading-none"
                  animate={{
                    scale: [1, 1.02, 1],
                  }}
                  transition={{
                    duration: 6,
                    repeat: Infinity,
                    ease: "easeInOut",
                  }}
                >
                  <motion.span
                    className="text-foreground"
                    animate={{ opacity: [0.9, 1, 0.9] }}
                    transition={{
                      duration: 4,
                      repeat: Infinity,
                      ease: "easeInOut",
                    }}
                  >
                    nc
                  </motion.span>
                  <motion.span
                    className="bg-gradient-to-r from-primary via-accent to-primary bg-clip-text text-transparent"
                    animate={{
                      backgroundPosition: ["0% 50%", "100% 50%", "0% 50%"],
                    }}
                    transition={{
                      duration: 8,
                      repeat: Infinity,
                      ease: "easeInOut",
                    }}
                    style={{ backgroundSize: "200% 200%" }}
                  >
                    AGENTS
                  </motion.span>
                </motion.h1>

                <motion.div
                  className="flex items-center justify-center gap-3"
                  initial={{ opacity: 0, scale: 0.9 }}
                  animate={{ opacity: 1, scale: 1 }}
                  transition={{ duration: 0.6, delay: 0.5 }}
                >
                  <motion.div
                    animate={{
                      rotate: [0, 360],
                      scale: [1, 1.2, 1],
                    }}
                    transition={{
                      rotate: {
                        duration: 20,
                        repeat: Infinity,
                        ease: "linear",
                      },
                      scale: {
                        duration: 2,
                        repeat: Infinity,
                        ease: "easeInOut",
                      },
                    }}
                  >
                    <Sparkles className="w-4 h-4 text-primary" />
                  </motion.div>
                  <motion.p
                    className="text-xl md:text-2xl lg:text-3xl text-foreground font-light"
                    animate={{ opacity: [0.8, 1, 0.8] }}
                    transition={{
                      duration: 3,
                      repeat: Infinity,
                      ease: "easeInOut",
                    }}
                  >
                    Home of intelligent agents
                  </motion.p>
                  <motion.div
                    animate={{
                      rotate: [360, 0],
                      scale: [1, 1.2, 1],
                    }}
                    transition={{
                      rotate: {
                        duration: 20,
                        repeat: Infinity,
                        ease: "linear",
                      },
                      scale: {
                        duration: 2,
                        repeat: Infinity,
                        ease: "easeInOut",
                        delay: 1,
                      },
                    }}
                  >
                    <Sparkles className="w-4 h-4 text-primary" />
                  </motion.div>
                </motion.div>

                <motion.p
                  className="text-lg md:text-xl text-muted-foreground max-w-3xl mx-4 leading-relaxed font-light"
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.6, delay: 0.7 }}
                >
                  Build, deploy, and manage sophisticated AI agents with
                  advanced memory, multi-agent collaboration, and seamless
                  blockchain integration.
                </motion.p>
              </motion.div>

              {/* Enhanced 2x2 Feature Grid with Animations */}
              <motion.div
                className="grid grid-cols-1 lg:grid-cols-2 gap-2 h-44 mx-6"
                initial={{ opacity: 0, y: 40 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8, delay: 0.9 }}
              >
                {[
                  {
                    icon: <Brain className="w-6 h-6 text-primary" />,
                    label: "Smart Memory",
                    desc: "Advanced AI memory",
                  },
                  {
                    icon: <Users className="w-6 h-6 text-primary" />,
                    label: "Multi-Agent",
                    desc: "Team collaboration",
                  },
                  {
                    icon: <Zap className="w-6 h-6 text-primary" />,
                    label: "Fast Deploy",
                    desc: "Instant deployment",
                  },
                  {
                    icon: <Shield className="w-6 h-6 text-primary" />,
                    label: "Secure Web3",
                    desc: "Blockchain ready",
                  },
                ].map(({ icon, label, desc }, i) => (
                  <motion.div
                    key={label}
                    className="group flex items-center gap-2 p-2 rounded-xl bg-card/30 backdrop-blur-sm border border-border/50 hover:border-primary/30 hover:bg-card/50 transition-all duration-300 cursor-pointer"
                    initial={{ opacity: 0, y: 30, scale: 0.9 }}
                    animate={{ opacity: 1, y: 0, scale: 1 }}
                    transition={{
                      delay: 1.1 + i * 0.1,
                      duration: 0.5,
                      type: "spring",
                      stiffness: 100,
                    }}
                    whileHover={{ scale: 1.05, y: -5 }}
                    whileTap={{ scale: 0.95 }}
                  >
                    <motion.div
                      className="flex items-center justify-center w-12 h-12 bg-gradient-to-br from-primary/20 to-accent/20 rounded-xl group-hover:scale-110 transition-transform duration-300"
                      whileHover={{ rotate: 360 }}
                      transition={{ duration: 0.6 }}
                    >
                      {icon}
                    </motion.div>
                    <div className="flex-1 text-left">
                      <span className="block text-xsm font-semibold text-foreground group-hover:text-primary transition-colors duration-300">
                        {label}
                      </span>
                      <span className="block text-sm text-muted-foreground">
                        {desc}
                      </span>
                    </div>
                  </motion.div>
                ))}
              </motion.div>

              {/* Enhanced CTA Buttons with Brand Colors */}
              <motion.div
                className="flex items-center justify-center gap-4 lg:mb-12 pt-24 lg:pt-12"
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: 1.5 }}
              >
                <motion.div
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                >
                  <Button
                    variant="outline"
                    size="xl"
                    className="group bg-card/30 backdrop-blur-sm border-border/50 hover:border-primary/50 hover:bg-card/50 transition-all duration-300 px-4 py-2"
                  >
                    <span className="font-semibold text-sm">Read Docs</span>
                    <ArrowRight className="w-5 h-5 ml-2 group-hover:translate-x-1 transition-transform duration-300" />
                  </Button>
                </motion.div>
                <motion.div
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                >
                  <Button
                    size="xl"
                    className="group bg-gradient-to-r from-primary to-accent hover:from-primary/90 hover:to-accent/90 shadow-glow-sm hover:shadow-glow font-semibold transition-all duration-300 px-8 py-4"
                  >
                    <span className="text-sm">Launch App</span>
                    <ArrowRight className="w-5 h-5 ml-2 group-hover:translate-x-1 transition-transform duration-300" />
                  </Button>
                </motion.div>
              </motion.div>
            </motion.div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Hero;
