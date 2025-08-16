import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Brain, Wallet, Users, BarChart3, Mic, Zap } from "lucide-react";
import { motion } from "framer-motion";

const Features = () => {
  const features = [
    {
      icon: Brain,
      title: "AI Agent Management",
      description:
        "Create, customize, and deploy intelligent AI agents with advanced memory systems and function calling capabilities.",
      image:
        "https://images.unsplash.com/photo-1677442136019-21780ecad995?w=400&h=300&fit=crop&crop=center",
    },
    {
      icon: Wallet,
      title: "Stellar Wallet Integration",
      description:
        "Seamless cryptocurrency wallet functionality with secure transactions and advanced portfolio management.",
      image:
        "https://images.unsplash.com/photo-1639762681485-074b7f938ba0?w=400&h=300&fit=crop&crop=center",
    },
    {
      icon: Users,
      title: "Multi-Agent Collaboration",
      description:
        "Coordinate multiple agents for complex tasks with expert panels, debates, and chain-of-thought patterns.",
      image:
        "https://images.unsplash.com/photo-1552664730-d307ca884978?w=400&h=300&fit=crop&crop=center",
    },
    {
      icon: BarChart3,
      title: "Advanced Analytics",
      description:
        "Comprehensive usage tracking, performance insights, and collaboration analytics for individual and group activities.",
      image:
        "https://images.unsplash.com/photo-1551288049-bebda4e38f71?w=400&h=300&fit=crop&crop=center",
    },
    {
      icon: Mic,
      title: "Voice Capabilities",
      description:
        "Integrated text-to-speech and speech-to-text functionality powered by ElevenLabs for natural conversations.",
      image:
        "https://images.unsplash.com/photo-1589254065878-42c9da997008?w=400&h=300&fit=crop&crop=center",
    },
    {
      icon: Zap,
      title: "Smart Functions",
      description:
        "Intelligent function selection based on context with custom function calling to extend agent capabilities.",
      image:
        "https://images.unsplash.com/photo-1518709268805-4e9042af2176?w=400&h=300&fit=crop&crop=center",
    },
  ];

  return (
    <section className="py-24 px-6">
      <div className="container mx-auto max-w-7xl">
        <div className="text-center mb-16">
          <h2 className="text-4xl md:text-5xl font-bold text-foreground mb-6">
            Powerful Features for Modern AI
          </h2>
          <p className="text-xl text-muted-foreground max-w-3xl mx-auto">
            Everything you need to build, deploy, and manage sophisticated AI
            agents with advanced memory, collaboration, and blockchain
            integration.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {features.map((feature, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: index * 0.1 }}
              viewport={{ once: true }}
              whileHover={{ y: -5 }}
            >
              <Card className="group hover:border-primary/30 transition-all duration-300 hover:shadow-glow-sm bg-card/50 backdrop-blur-sm h-full overflow-hidden">
                {/* Feature Image */}
                <div className="relative h-48 overflow-hidden">
                  <motion.img
                    src={feature.image}
                    alt={feature.title}
                    className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
                    whileHover={{ scale: 1.05 }}
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-card/80 to-transparent" />
                  <div className="absolute bottom-4 left-4">
                    <div className="flex items-center justify-center w-12 h-12 bg-gradient-accent rounded-lg shadow-lg">
                      <feature.icon className="w-6 h-6 text-primary-foreground" />
                    </div>
                  </div>
                </div>

                <CardHeader>
                  <CardTitle className="text-xl text-foreground group-hover:text-primary transition-colors">
                    {feature.title}
                  </CardTitle>
                </CardHeader>

                <CardContent>
                  <CardDescription className="text-muted-foreground leading-relaxed">
                    {feature.description}
                  </CardDescription>
                </CardContent>
              </Card>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Features;
