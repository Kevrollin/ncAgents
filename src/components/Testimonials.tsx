import { Card, CardContent } from "@/components/ui/card";
import { Star, Quote, ChevronLeft, ChevronRight } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import { useState, useEffect } from "react";

const Testimonials = () => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isAutoPlaying, setIsAutoPlaying] = useState(true);
  const [itemsPerView, setItemsPerView] = useState(3);

  const testimonials = [
    {
      id: 1,
      name: "Sarah Chen",
      title: "AI Research Director",
      company: "TechCorp",
      avatar:
        "https://images.unsplash.com/photo-1494790108755-2616b612b786?w=150&h=150&fit=crop&crop=face",
      content:
        "ncAGENTS has revolutionized how we approach AI agent development. The multi-agent collaboration features are game-changing for complex problem-solving.",
      rating: 5,
    },
    {
      id: 2,
      name: "Marcus Rodriguez",
      title: "CTO",
      company: "InnovateLabs",
      avatar:
        "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=150&h=150&fit=crop&crop=face",
      content:
        "The seamless blockchain integration and advanced memory capabilities have accelerated our development timeline by months. Absolutely incredible platform.",
      rating: 5,
    },
    {
      id: 3,
      name: "Dr. Emily Watson",
      title: "Lead Data Scientist",
      company: "FutureAI",
      avatar:
        "https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=150&h=150&fit=crop&crop=face",
      content:
        "The intelligent agent coordination and expert panel features have transformed our research capabilities. This is the future of AI development.",
      rating: 5,
    },
    {
      id: 4,
      name: "James Park",
      title: "Blockchain Developer",
      company: "CryptoSolutions",
      avatar:
        "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=150&h=150&fit=crop&crop=face",
      content:
        "Outstanding Web3 integration and security features. The Stellar wallet functionality works flawlessly with our existing infrastructure.",
      rating: 5,
    },
    {
      id: 5,
      name: "Lisa Thompson",
      title: "Product Manager",
      company: "AgentFlow",
      avatar:
        "https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=150&h=150&fit=crop&crop=face",
      content:
        "Fast deployment and intuitive interface make ncAGENTS perfect for both technical and non-technical team members. Highly recommended!",
      rating: 5,
    },
    {
      id: 6,
      name: "David Kumar",
      title: "Software Architect",
      company: "NextGen Systems",
      avatar:
        "https://images.unsplash.com/photo-1506794778202-cad84cf45f1d?w=150&h=150&fit=crop&crop=face",
      content:
        "The platform's reliability and 99.9% uptime have been crucial for our production deployments. Exceptional performance and support.",
      rating: 5,
    },
  ];

  // Responsive items per view
  useEffect(() => {
    const updateItemsPerView = () => {
      if (window.innerWidth < 768) {
        setItemsPerView(1);
      } else if (window.innerWidth < 1024) {
        setItemsPerView(2);
      } else {
        setItemsPerView(3);
      }
    };

    updateItemsPerView();
    window.addEventListener("resize", updateItemsPerView);
    return () => window.removeEventListener("resize", updateItemsPerView);
  }, []);

  // Auto-play functionality
  useEffect(() => {
    if (!isAutoPlaying) return;

    const interval = setInterval(() => {
      setCurrentIndex((prev) =>
        prev + itemsPerView >= testimonials.length ? 0 : prev + 1,
      );
    }, 4000);

    return () => clearInterval(interval);
  }, [currentIndex, isAutoPlaying, itemsPerView, testimonials.length]);

  const nextSlide = () => {
    setCurrentIndex((prev) =>
      prev + itemsPerView >= testimonials.length ? 0 : prev + 1,
    );
  };

  const prevSlide = () => {
    setCurrentIndex((prev) =>
      prev === 0 ? Math.max(0, testimonials.length - itemsPerView) : prev - 1,
    );
  };

  const goToSlide = (index: number) => {
    setCurrentIndex(index);
  };

  const maxIndex = Math.max(0, testimonials.length - itemsPerView);
  const visibleTestimonials = testimonials.slice(
    currentIndex,
    currentIndex + itemsPerView,
  );

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1,
        delayChildren: 0.2,
      },
    },
  };

  const cardVariants = {
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
    <section className="py-24 bg-background relative overflow-hidden">
      {/* Background Elements */}
      <div
        className="absolute inset-0 bg-dot-pattern opacity-20"
        style={{ backgroundSize: "20px 20px" }}
      />
      <div className="absolute inset-0 bg-gradient-to-b from-transparent via-background/50 to-transparent" />

      <div className="container mx-auto px-6 max-w-7xl relative z-10">
        {/* Section Header */}
        <motion.div
          className="text-center mb-16"
          initial={{ opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          viewport={{ once: true }}
        >
          <motion.h2
            className="text-4xl md:text-5xl lg:text-6xl font-bold text-foreground mb-6"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
            viewport={{ once: true }}
          >
            What Our{" "}
            <span className="bg-gradient-to-r from-primary via-accent to-primary bg-clip-text text-transparent">
              Users Say
            </span>
          </motion.h2>
          <motion.p
            className="text-xl text-muted-foreground max-w-3xl mx-auto"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.4 }}
            viewport={{ once: true }}
          >
            Join thousands of developers and organizations who trust ncAGENTS
            for their AI agent development needs
          </motion.p>
        </motion.div>

        {/* Testimonials Carousel */}
        <div
          className="relative"
          onMouseEnter={() => setIsAutoPlaying(false)}
          onMouseLeave={() => setIsAutoPlaying(true)}
        >
          {/* Navigation Arrows */}
          <button
            onClick={prevSlide}
            className="absolute left-0 top-1/2 -translate-y-1/2 -translate-x-4 z-10 w-12 h-12 bg-card/80 backdrop-blur-sm border border-border/50 rounded-full flex items-center justify-center hover:bg-card hover:border-primary/30 transition-all duration-300 group"
            disabled={currentIndex === 0}
          >
            <ChevronLeft className="w-5 h-5 text-foreground group-hover:text-primary transition-colors" />
          </button>

          <button
            onClick={nextSlide}
            className="absolute right-0 top-1/2 -translate-y-1/2 translate-x-4 z-10 w-12 h-12 bg-card/80 backdrop-blur-sm border border-border/50 rounded-full flex items-center justify-center hover:bg-card hover:border-primary/30 transition-all duration-300 group"
            disabled={currentIndex >= maxIndex}
          >
            <ChevronRight className="w-5 h-5 text-foreground group-hover:text-primary transition-colors" />
          </button>

          {/* Carousel Container */}
          <div className="overflow-hidden">
            <AnimatePresence mode="wait">
              <motion.div
                key={currentIndex}
                className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8"
                initial={{ opacity: 0, x: 100 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: -100 }}
                transition={{ duration: 0.5, ease: "easeInOut" }}
              >
                {visibleTestimonials.map((testimonial, index) => (
                  <motion.div
                    key={`${testimonial.id}-${currentIndex}`}
                    initial={{ opacity: 0, y: 30, scale: 0.9 }}
                    animate={{ opacity: 1, y: 0, scale: 1 }}
                    transition={{ duration: 0.6, delay: index * 0.1 }}
                    whileHover={{ scale: 1.02, y: -5 }}
                    className="group"
                  >
                    <Card
                      className={`h-full bg-card/40 backdrop-blur-sm border transition-all duration-300 relative overflow-hidden ${
                        index === Math.floor(itemsPerView / 2)
                          ? "border-primary/50 shadow-glow-sm scale-105"
                          : "border-border/50 hover:border-primary/30 hover:bg-card/60"
                      }`}
                    >
                      {/* Quote Icon */}
                      <div className="absolute top-4 right-4 opacity-10 group-hover:opacity-20 transition-opacity duration-300">
                        <Quote className="w-8 h-8 text-primary" />
                      </div>

                      <CardContent className="p-6 h-full flex flex-col">
                        {/* Rating */}
                        <div className="flex items-center gap-1 mb-4">
                          {[...Array(testimonial.rating)].map((_, i) => (
                            <Star
                              key={i}
                              className="w-4 h-4 fill-primary text-primary"
                            />
                          ))}
                        </div>

                        {/* Testimonial Content */}
                        <blockquote className="text-foreground/90 leading-relaxed mb-6 flex-grow">
                          "{testimonial.content}"
                        </blockquote>

                        {/* User Info */}
                        <div className="flex items-center gap-4">
                          <motion.div
                            className="w-12 h-12 rounded-full overflow-hidden flex-shrink-0"
                            whileHover={{ scale: 1.1 }}
                            transition={{ duration: 0.3 }}
                          >
                            <img
                              src={testimonial.avatar}
                              alt={testimonial.name}
                              className="w-full h-full object-cover"
                            />
                          </motion.div>
                          <div className="flex-1">
                            <h4 className="font-semibold text-foreground group-hover:text-primary transition-colors duration-300">
                              {testimonial.name}
                            </h4>
                            <p className="text-sm text-muted-foreground">
                              {testimonial.title} at {testimonial.company}
                            </p>
                          </div>
                        </div>
                      </CardContent>
                    </Card>
                  </motion.div>
                ))}
              </motion.div>
            </AnimatePresence>
          </div>

          {/* Dot Indicators */}
          <div className="flex justify-center gap-2 mt-8">
            {Array.from({ length: maxIndex + 1 }).map((_, index) => (
              <button
                key={index}
                onClick={() => goToSlide(index)}
                className={`w-3 h-3 rounded-full transition-all duration-300 ${
                  index === currentIndex
                    ? "bg-primary scale-125"
                    : "bg-muted-foreground/30 hover:bg-muted-foreground/50"
                }`}
              />
            ))}
          </div>
        </div>

        {/* Bottom Stats */}
        <motion.div
          className="mt-16 text-center"
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.6 }}
          viewport={{ once: true }}
        >
          <div className="flex flex-wrap items-center justify-center gap-8 p-8 bg-card/20 backdrop-blur-sm rounded-2xl border border-border/30">
            <div className="flex items-center gap-3">
              <div className="w-3 h-3 bg-primary rounded-full animate-pulse" />
              <span className="text-primary font-bold text-2xl">4.9/5</span>
              <span className="text-muted-foreground">average rating</span>
            </div>
            <div className="w-px h-8 bg-border/50" />
            <div className="flex items-center gap-3">
              <div className="w-3 h-3 bg-accent rounded-full animate-pulse" />
              <span className="text-accent font-bold text-2xl">10,000+</span>
              <span className="text-muted-foreground">happy users</span>
            </div>
            <div className="w-px h-8 bg-border/50" />
            <div className="flex items-center gap-3">
              <div className="w-3 h-3 bg-green-400 rounded-full animate-pulse" />
              <span className="text-green-400 font-bold text-2xl">500+</span>
              <span className="text-muted-foreground">companies trust us</span>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
};

export default Testimonials;
