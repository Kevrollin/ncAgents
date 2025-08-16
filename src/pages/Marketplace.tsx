import DashboardHeader from "@/components/DashboardHeader";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import {
  Search,
  Filter,
  Star,
  Download,
  Eye,
  Heart,
  TrendingUp,
  Crown,
  Verified,
  Bot,
  Brain,
  Mic,
  Users,
  BarChart3,
  Shield,
  Zap,
  Settings,
} from "lucide-react";
import { motion } from "framer-motion";
import { useState } from "react";

// Mock user data
const mockUser = {
  name: "Alex Chen",
  email: "alex.chen@example.com",
  avatar:
    "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=150&h=150&fit=crop&crop=face",
};

// Mock marketplace agents
const mockMarketplaceAgents = [
  {
    id: "market_1",
    name: "Sales Assistant Pro",
    description:
      "Advanced sales automation agent with CRM integration and lead scoring",
    avatar: "💼",
    category: "Sales",
    price: 15,
    rating: 4.8,
    downloads: 2340,
    author: "SalesForce Inc.",
    verified: true,
    featured: true,
    capabilities: ["memory", "analytics", "collaboration"],
    tags: ["CRM", "Lead Generation", "Sales Automation"],
  },
  {
    id: "market_2",
    name: "Content Creator",
    description:
      "AI-powered content generation for blogs, social media, and marketing",
    avatar: "✍️",
    category: "Content",
    price: 12,
    rating: 4.9,
    downloads: 1890,
    author: "ContentAI",
    verified: true,
    featured: false,
    capabilities: ["creative", "research", "analytics"],
    tags: ["Content Writing", "SEO", "Social Media"],
  },
  {
    id: "market_3",
    name: "Data Scientist",
    description:
      "Advanced data analysis and machine learning model development",
    avatar: "📊",
    category: "Analytics",
    price: 25,
    rating: 4.7,
    downloads: 1560,
    author: "DataLab",
    verified: true,
    featured: true,
    capabilities: ["analytics", "research", "memory"],
    tags: ["Machine Learning", "Data Analysis", "Visualization"],
  },
  {
    id: "market_4",
    name: "Customer Support Bot",
    description: "24/7 multilingual customer support with sentiment analysis",
    avatar: "🎧",
    category: "Support",
    price: 8,
    rating: 4.6,
    downloads: 3200,
    author: "SupportTech",
    verified: false,
    featured: false,
    capabilities: ["voice", "support", "collaboration"],
    tags: ["Customer Service", "Multilingual", "Sentiment Analysis"],
  },
  {
    id: "market_5",
    name: "Code Assistant",
    description:
      "AI pair programmer for code review, debugging, and optimization",
    avatar: "💻",
    category: "Development",
    price: 20,
    rating: 4.9,
    downloads: 1750,
    author: "DevTools Pro",
    verified: true,
    featured: false,
    capabilities: ["research", "analytics", "collaboration"],
    tags: ["Programming", "Code Review", "Debugging"],
  },
  {
    id: "market_6",
    name: "HR Recruiter",
    description: "Intelligent recruitment assistant with candidate screening",
    avatar: "👥",
    category: "HR",
    price: 18,
    rating: 4.5,
    downloads: 980,
    author: "HRTech Solutions",
    verified: true,
    featured: false,
    capabilities: ["analytics", "collaboration", "research"],
    tags: ["Recruitment", "Screening", "HR Analytics"],
  },
];

const Marketplace = () => {
  const [searchQuery, setSearchQuery] = useState("");
  const [categoryFilter, setCategoryFilter] = useState("all");
  const [priceFilter, setPriceFilter] = useState("all");
  const [sortBy, setSortBy] = useState("featured");
  const [showFilters, setShowFilters] = useState(false);

  const categories = [
    "all",
    "Sales",
    "Content",
    "Analytics",
    "Support",
    "Development",
    "HR",
  ];
  const priceRanges = ["all", "free", "0-10", "10-20", "20+"];

  const filteredAgents = mockMarketplaceAgents
    .filter((agent) => {
      const matchesSearch =
        agent.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
        agent.description.toLowerCase().includes(searchQuery.toLowerCase()) ||
        agent.tags.some((tag) =>
          tag.toLowerCase().includes(searchQuery.toLowerCase()),
        );
      const matchesCategory =
        categoryFilter === "all" || agent.category === categoryFilter;
      const matchesPrice =
        priceFilter === "all" ||
        (priceFilter === "free" && agent.price === 0) ||
        (priceFilter === "0-10" && agent.price >= 0 && agent.price <= 10) ||
        (priceFilter === "10-20" && agent.price > 10 && agent.price <= 20) ||
        (priceFilter === "20+" && agent.price > 20);
      return matchesSearch && matchesCategory && matchesPrice;
    })
    .sort((a, b) => {
      switch (sortBy) {
        case "featured":
          return (
            (b.featured ? 1 : 0) - (a.featured ? 1 : 0) || b.rating - a.rating
          );
        case "rating":
          return b.rating - a.rating;
        case "downloads":
          return b.downloads - a.downloads;
        case "price-low":
          return a.price - b.price;
        case "price-high":
          return b.price - a.price;
        default:
          return 0;
      }
    });

  const getCapabilityIcon = (capability: string) => {
    const icons: Record<string, JSX.Element> = {
      memory: <Brain className="w-3 h-3" />,
      voice: <Mic className="w-3 h-3" />,
      collaboration: <Users className="w-3 h-3" />,
      analytics: <BarChart3 className="w-3 h-3" />,
      research: <Search className="w-3 h-3" />,
      creative: <Zap className="w-3 h-3" />,
      support: <Shield className="w-3 h-3" />,
      automation: <Settings className="w-3 h-3" />,
    };
    return icons[capability] || <Bot className="w-3 h-3" />;
  };

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

  const itemVariants = {
    hidden: { opacity: 0, y: 30 },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        duration: 0.6,
        type: "spring",
        stiffness: 100,
      },
    },
  };

  return (
    <div className="min-h-screen bg-background">
      <DashboardHeader user={mockUser} />

      <div className="container mx-auto max-w-7xl px-6 py-8">
        <motion.div
          variants={containerVariants}
          initial="hidden"
          animate="visible"
          className="space-y-8"
        >
          {/* Page Header */}
          <motion.div variants={itemVariants}>
            <div className="text-center mb-8">
              <h1 className="text-4xl font-bold text-foreground mb-2">
                Agent Marketplace
              </h1>
              <p className="text-muted-foreground">
                Discover and install powerful AI agents created by the community
              </p>
            </div>
          </motion.div>

          {/* Search and Filters */}
          <motion.div variants={itemVariants}>
            <Card className="bg-card/40 backdrop-blur-sm border border-border/50">
              <CardContent className="p-6">
                <div className="flex flex-col lg:flex-row gap-4">
                  {/* Search */}
                  <div className="flex-1 relative">
                    <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
                    <Input
                      placeholder="Search agents, categories, or tags..."
                      value={searchQuery}
                      onChange={(e) => setSearchQuery(e.target.value)}
                      className="pl-10 bg-background/50"
                    />
                  </div>

                  {/* Filters */}
                  <div className="flex items-center gap-3">
                    <Select
                      value={categoryFilter}
                      onValueChange={setCategoryFilter}
                    >
                      <SelectTrigger className="w-40 bg-background/50">
                        <SelectValue placeholder="Category" />
                      </SelectTrigger>
                      <SelectContent>
                        {categories.map((category) => (
                          <SelectItem key={category} value={category}>
                            {category === "all" ? "All Categories" : category}
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>

                    <Select value={priceFilter} onValueChange={setPriceFilter}>
                      <SelectTrigger className="w-32 bg-background/50">
                        <SelectValue placeholder="Price" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="all">All Prices</SelectItem>
                        <SelectItem value="free">Free</SelectItem>
                        <SelectItem value="0-10">$0 - $10</SelectItem>
                        <SelectItem value="10-20">$10 - $20</SelectItem>
                        <SelectItem value="20+">$20+</SelectItem>
                      </SelectContent>
                    </Select>

                    <Select value={sortBy} onValueChange={setSortBy}>
                      <SelectTrigger className="w-40 bg-background/50">
                        <SelectValue />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="featured">Featured</SelectItem>
                        <SelectItem value="rating">Highest Rated</SelectItem>
                        <SelectItem value="downloads">
                          Most Downloaded
                        </SelectItem>
                        <SelectItem value="price-low">
                          Price: Low to High
                        </SelectItem>
                        <SelectItem value="price-high">
                          Price: High to Low
                        </SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                </div>
              </CardContent>
            </Card>
          </motion.div>

          {/* Featured Section */}
          <motion.div variants={itemVariants}>
            <div className="mb-6">
              <h2 className="text-2xl font-bold text-foreground mb-4 flex items-center gap-2">
                <TrendingUp className="w-6 h-6 text-primary" />
                Featured Agents
              </h2>
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {filteredAgents
                  .filter((agent) => agent.featured)
                  .slice(0, 3)
                  .map((agent, index) => (
                    <motion.div
                      key={agent.id}
                      initial={{ opacity: 0, y: 30 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ duration: 0.6, delay: index * 0.1 }}
                      whileHover={{ y: -5 }}
                    >
                      <Card className="h-full bg-gradient-to-br from-primary/5 to-accent/5 border border-primary/20 hover:border-primary/40 transition-all duration-300">
                        <CardContent className="p-6">
                          <div className="flex items-start justify-between mb-4">
                            <div className="w-16 h-16 bg-gradient-to-br from-primary/20 to-accent/20 rounded-2xl flex items-center justify-center text-2xl">
                              {agent.avatar}
                            </div>
                            <div className="flex items-center gap-1">
                              <Badge className="bg-gradient-to-r from-primary to-accent text-white">
                                <Crown className="w-3 h-3 mr-1" />
                                Featured
                              </Badge>
                            </div>
                          </div>

                          <div className="mb-4">
                            <div className="flex items-center gap-2 mb-2">
                              <h3 className="text-lg font-semibold text-foreground">
                                {agent.name}
                              </h3>
                              {agent.verified && (
                                <Verified className="w-4 h-4 text-blue-500" />
                              )}
                            </div>
                            <p className="text-sm text-muted-foreground mb-3">
                              {agent.description}
                            </p>

                            <div className="flex items-center gap-4 text-sm text-muted-foreground mb-3">
                              <div className="flex items-center gap-1">
                                <Star className="w-4 h-4 fill-yellow-400 text-yellow-400" />
                                <span>{agent.rating}</span>
                              </div>
                              <div className="flex items-center gap-1">
                                <Download className="w-4 h-4" />
                                <span>{agent.downloads.toLocaleString()}</span>
                              </div>
                            </div>

                            <div className="flex flex-wrap gap-1 mb-4">
                              {agent.capabilities
                                .slice(0, 3)
                                .map((capability) => (
                                  <Badge
                                    key={capability}
                                    variant="secondary"
                                    className="text-xs"
                                  >
                                    <span className="mr-1">
                                      {getCapabilityIcon(capability)}
                                    </span>
                                    {capability}
                                  </Badge>
                                ))}
                            </div>
                          </div>

                          <div className="flex items-center justify-between">
                            <div className="text-xl font-bold text-foreground">
                              ${agent.price}/month
                            </div>
                            <div className="flex gap-2">
                              <Button variant="outline" size="sm">
                                <Eye className="w-4 h-4" />
                              </Button>
                              <Button
                                size="sm"
                                className="bg-gradient-to-r from-primary to-accent hover:from-primary/90 hover:to-accent/90"
                              >
                                Install
                              </Button>
                            </div>
                          </div>
                        </CardContent>
                      </Card>
                    </motion.div>
                  ))}
              </div>
            </div>
          </motion.div>

          {/* All Agents */}
          <motion.div variants={itemVariants}>
            <div>
              <h2 className="text-2xl font-bold text-foreground mb-4">
                All Agents
              </h2>
              {filteredAgents.length === 0 ? (
                <div className="col-span-full">
                  <Card className="bg-card/40 backdrop-blur-sm border border-border/50">
                    <CardContent className="p-12 text-center">
                      <div className="w-24 h-24 mx-auto mb-6 bg-gradient-to-br from-primary/20 to-accent/20 rounded-full flex items-center justify-center">
                        <Search className="w-12 h-12 text-primary" />
                      </div>
                      <h3 className="text-xl font-semibold text-foreground mb-2">
                        No agents found
                      </h3>
                      <p className="text-muted-foreground">
                        Try adjusting your search or filter criteria
                      </p>
                    </CardContent>
                  </Card>
                </div>
              ) : (
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
                  {filteredAgents.map((agent, index) => (
                    <motion.div
                      key={agent.id}
                      initial={{ opacity: 0, y: 30 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ duration: 0.6, delay: index * 0.05 }}
                      whileHover={{ y: -5 }}
                    >
                      <Card className="h-full bg-card/40 backdrop-blur-sm border border-border/50 hover:border-primary/30 transition-all duration-300">
                        <CardContent className="p-4">
                          <div className="flex items-start justify-between mb-3">
                            <div className="w-12 h-12 bg-gradient-to-br from-primary/20 to-accent/20 rounded-xl flex items-center justify-center text-lg">
                              {agent.avatar}
                            </div>
                            <div className="flex items-center gap-1">
                              {agent.verified && (
                                <Verified className="w-4 h-4 text-blue-500" />
                              )}
                              <Button
                                variant="ghost"
                                size="sm"
                                className="h-8 w-8 p-0"
                              >
                                <Heart className="w-4 h-4" />
                              </Button>
                            </div>
                          </div>

                          <div className="mb-3">
                            <h3 className="font-semibold text-foreground mb-1">
                              {agent.name}
                            </h3>
                            <p className="text-xs text-muted-foreground mb-2 line-clamp-2">
                              {agent.description}
                            </p>

                            <div className="flex items-center gap-3 text-xs text-muted-foreground mb-2">
                              <div className="flex items-center gap-1">
                                <Star className="w-3 h-3 fill-yellow-400 text-yellow-400" />
                                <span>{agent.rating}</span>
                              </div>
                              <div className="flex items-center gap-1">
                                <Download className="w-3 h-3" />
                                <span>{agent.downloads}</span>
                              </div>
                            </div>

                            <div className="flex flex-wrap gap-1 mb-3">
                              {agent.capabilities
                                .slice(0, 2)
                                .map((capability) => (
                                  <Badge
                                    key={capability}
                                    variant="secondary"
                                    className="text-xs"
                                  >
                                    <span className="mr-1">
                                      {getCapabilityIcon(capability)}
                                    </span>
                                    {capability}
                                  </Badge>
                                ))}
                            </div>
                          </div>

                          <div className="flex items-center justify-between">
                            <div className="font-bold text-foreground">
                              ${agent.price}/mo
                            </div>
                            <Button size="sm" variant="outline">
                              Install
                            </Button>
                          </div>
                        </CardContent>
                      </Card>
                    </motion.div>
                  ))}
                </div>
              )}
            </div>
          </motion.div>
        </motion.div>
      </div>
    </div>
  );
};

export default Marketplace;
