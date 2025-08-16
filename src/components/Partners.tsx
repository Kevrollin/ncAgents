import { motion } from "framer-motion";
import { Card } from "@/components/ui/card";

const Partners = () => {
  const partners = [
    { name: "BLASTER", logo: "🚀", description: "Space Technology" },
    { name: "Hyperlock", logo: "🔒", description: "Security Solutions" },
    { name: "Ring", logo: "⭕", description: "Communication Platform" },
    { name: "THRUSTER", logo: "⚡", description: "Performance Optimization" },
  ];

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.2,
        delayChildren: 0.3,
      },
    },
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 30, scale: 0.9 },
    visible: {
      opacity: 1,
      y: 0,
      scale: 1,
      transition: {
        duration: 0.6,
        type: "spring",
        stiffness: 100,
      },
    },
  };

  return (
    <section className="py-32 px-6 relative overflow-hidden">
      {/* Background Elements */}
      <div className="absolute inset-0 bg-gradient-to-b from-background via-card/10 to-background" />
      <div
        className="absolute inset-0 bg-dot-pattern opacity-10"
        style={{ backgroundSize: "30px 30px" }}
      />

      <div className="container mx-auto max-w-7xl relative z-10">
        {/* Enhanced Header */}
        <motion.div
          className="text-center mb-20"
          initial={{ opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          viewport={{ once: true }}
        >
          <motion.div
            className="inline-flex items-center gap-2 bg-card/40 backdrop-blur-sm border border-border/50 rounded-full px-6 py-2 mb-8"
            initial={{ opacity: 0, scale: 0.9 }}
            whileInView={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.6, delay: 0.2 }}
            viewport={{ once: true }}
          >
            <div className="w-2 h-2 bg-primary rounded-full animate-pulse" />
            <span className="text-sm font-medium text-muted-foreground">
              Ecosystem Partners
            </span>
          </motion.div>

          <motion.h2
            className="text-3xl md:text-4xl lg:text-5xl font-bold text-foreground mb-6"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.4 }}
            viewport={{ once: true }}
          >
            Trusted by{" "}
            <span className="bg-gradient-to-r from-primary via-accent to-primary bg-clip-text text-transparent">
              Leading Partners
            </span>
          </motion.h2>

          <motion.p
            className="text-xl text-muted-foreground max-w-2xl mx-auto"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.6 }}
            viewport={{ once: true }}
          >
            Collaborating with innovative companies across the AI ecosystem to
            build the future of intelligent agents
          </motion.p>
        </motion.div>

        {/* Enhanced Partners Grid */}
        <motion.div
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8"
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
        >
          {partners.map((partner, index) => (
            <motion.div
              key={index}
              variants={itemVariants}
              whileHover={{ y: -10, scale: 1.02 }}
              className="group"
            >
              <Card className="p-8 text-center bg-card/40 backdrop-blur-sm border border-border/50 hover:border-primary/30 hover:bg-card/60 transition-all duration-300 h-full">
                <motion.div
                  className="mb-6"
                  whileHover={{ scale: 1.2, rotate: 5 }}
                  transition={{ duration: 0.3 }}
                >
                  <div className="w-16 h-16 mx-auto bg-gradient-to-br from-primary/20 to-accent/20 rounded-2xl flex items-center justify-center group-hover:shadow-glow-sm transition-all duration-300">
                    <span className="text-3xl">{partner.logo}</span>
                  </div>
                </motion.div>

                <h3 className="text-xl font-bold text-foreground mb-2 group-hover:text-primary transition-colors duration-300">
                  {partner.name}
                </h3>

                <p className="text-sm text-muted-foreground">
                  {partner.description}
                </p>

                {/* Hover indicator */}
                <motion.div
                  className="mt-4 w-0 h-0.5 bg-gradient-to-r from-primary to-accent mx-auto group-hover:w-12 transition-all duration-300"
                  initial={{ width: 0 }}
                  whileHover={{ width: 48 }}
                />
              </Card>
            </motion.div>
          ))}
        </motion.div>

        {/* Bottom Stats */}
        <motion.div
          className="mt-20 text-center"
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.8 }}
          viewport={{ once: true }}
        >
          <div className="flex flex-wrap items-center justify-center gap-12 p-8 bg-card/20 backdrop-blur-sm rounded-2xl border border-border/30">
            <div className="flex items-center gap-3">
              <div className="w-3 h-3 bg-primary rounded-full animate-pulse" />
              <span className="text-primary font-bold text-2xl">50+</span>
              <span className="text-muted-foreground">Active Partners</span>
            </div>
            <div className="w-px h-8 bg-border/50 hidden sm:block" />
            <div className="flex items-center gap-3">
              <div className="w-3 h-3 bg-accent rounded-full animate-pulse" />
              <span className="text-accent font-bold text-2xl">15+</span>
              <span className="text-muted-foreground">Countries</span>
            </div>
            <div className="w-px h-8 bg-border/50 hidden sm:block" />
            <div className="flex items-center gap-3">
              <div className="w-3 h-3 bg-green-400 rounded-full animate-pulse" />
              <span className="text-green-400 font-bold text-2xl">100%</span>
              <span className="text-muted-foreground">Satisfaction</span>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
};

export default Partners;
