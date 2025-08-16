import DashboardHeader from "@/components/DashboardHeader";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import {
  BarChart3,
  TrendingUp,
  TrendingDown,
  Users,
  Bot,
  Activity,
  Clock,
  Star,
  Target,
  Zap,
  Brain,
  MessageSquare,
  Calendar,
  Download,
  Filter,
  Eye,
  Award,
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

// Mock analytics data
const mockAnalytics = {
  overview: {
    totalAgents: 8,
    activeAgents: 6,
    totalInteractions: 12450,
    avgResponseTime: 850,
    userSatisfaction: 94,
    successRate: 89,
  },
  agentPerformance: [
    {
      name: "DataAnalyst Pro",
      interactions: 3200,
      satisfaction: 96,
      responseTime: 750,
      efficiency: 92,
    },
    {
      name: "Customer Support",
      interactions: 2800,
      satisfaction: 98,
      responseTime: 450,
      efficiency: 95,
    },
    {
      name: "Content Creator",
      interactions: 2100,
      satisfaction: 91,
      responseTime: 1200,
      efficiency: 87,
    },
    {
      name: "Sales Assistant",
      interactions: 1900,
      satisfaction: 89,
      responseTime: 980,
      efficiency: 84,
    },
    {
      name: "Code Assistant",
      interactions: 1650,
      satisfaction: 97,
      responseTime: 650,
      efficiency: 94,
    },
    {
      name: "HR Recruiter",
      interactions: 800,
      satisfaction: 85,
      responseTime: 1100,
      efficiency: 78,
    },
  ],
  dailyStats: [
    { date: "2024-01-15", interactions: 145, agents: 6, satisfaction: 92 },
    { date: "2024-01-16", interactions: 167, agents: 6, satisfaction: 94 },
    { date: "2024-01-17", interactions: 189, agents: 7, satisfaction: 91 },
    { date: "2024-01-18", interactions: 203, agents: 7, satisfaction: 95 },
    { date: "2024-01-19", interactions: 178, agents: 8, satisfaction: 93 },
    { date: "2024-01-20", interactions: 195, agents: 8, satisfaction: 96 },
    { date: "2024-01-21", interactions: 212, agents: 8, satisfaction: 94 },
  ],
  topQueries: [
    { query: "Data analysis and reporting", count: 456, category: "Analytics" },
    { query: "Customer support tickets", count: 389, category: "Support" },
    { query: "Content generation", count: 312, category: "Content" },
    { query: "Code review and debugging", count: 278, category: "Development" },
    { query: "Sales lead qualification", count: 234, category: "Sales" },
  ],
  userEngagement: {
    activeUsers: 1250,
    newUsers: 89,
    returningUsers: 1161,
    avgSessionDuration: 18.5,
    bounceRate: 12.3,
  },
};

const Analytics = () => {
  const [activeTab, setActiveTab] = useState("overview");
  const [timeRange, setTimeRange] = useState("7d");
  const [selectedMetric, setSelectedMetric] = useState("interactions");

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
            <div className="flex items-center justify-between">
              <div>
                <h1 className="text-4xl font-bold text-foreground mb-2">
                  Analytics
                </h1>
                <p className="text-muted-foreground">
                  Track performance and insights across your AI agents
                </p>
              </div>
              <div className="flex items-center gap-3">
                <Select value={timeRange} onValueChange={setTimeRange}>
                  <SelectTrigger className="w-32 bg-card/40">
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="24h">Last 24h</SelectItem>
                    <SelectItem value="7d">Last 7 days</SelectItem>
                    <SelectItem value="30d">Last 30 days</SelectItem>
                    <SelectItem value="90d">Last 90 days</SelectItem>
                  </SelectContent>
                </Select>
                <Button variant="outline" size="sm">
                  <Download className="w-4 h-4 mr-2" />
                  Export
                </Button>
              </div>
            </div>
          </motion.div>

          {/* Key Metrics */}
          <motion.div variants={itemVariants}>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-6 gap-6">
              <Card className="bg-card/40 backdrop-blur-sm border border-border/50">
                <CardContent className="p-6">
                  <div className="flex items-center gap-3">
                    <div className="w-12 h-12 bg-blue-500/20 rounded-lg flex items-center justify-center">
                      <Bot className="w-6 h-6 text-blue-500" />
                    </div>
                    <div>
                      <div className="text-2xl font-bold text-foreground">
                        {mockAnalytics.overview.totalAgents}
                      </div>
                      <div className="text-sm text-muted-foreground">
                        Total Agents
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>

              <Card className="bg-card/40 backdrop-blur-sm border border-border/50">
                <CardContent className="p-6">
                  <div className="flex items-center gap-3">
                    <div className="w-12 h-12 bg-green-500/20 rounded-lg flex items-center justify-center">
                      <Activity className="w-6 h-6 text-green-500" />
                    </div>
                    <div>
                      <div className="text-2xl font-bold text-foreground">
                        {mockAnalytics.overview.activeAgents}
                      </div>
                      <div className="text-sm text-muted-foreground">
                        Active Agents
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>

              <Card className="bg-card/40 backdrop-blur-sm border border-border/50">
                <CardContent className="p-6">
                  <div className="flex items-center gap-3">
                    <div className="w-12 h-12 bg-purple-500/20 rounded-lg flex items-center justify-center">
                      <MessageSquare className="w-6 h-6 text-purple-500" />
                    </div>
                    <div>
                      <div className="text-2xl font-bold text-foreground">
                        {mockAnalytics.overview.totalInteractions.toLocaleString()}
                      </div>
                      <div className="text-sm text-muted-foreground">
                        Interactions
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>

              <Card className="bg-card/40 backdrop-blur-sm border border-border/50">
                <CardContent className="p-6">
                  <div className="flex items-center gap-3">
                    <div className="w-12 h-12 bg-orange-500/20 rounded-lg flex items-center justify-center">
                      <Clock className="w-6 h-6 text-orange-500" />
                    </div>
                    <div>
                      <div className="text-2xl font-bold text-foreground">
                        {mockAnalytics.overview.avgResponseTime}ms
                      </div>
                      <div className="text-sm text-muted-foreground">
                        Avg Response
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>

              <Card className="bg-card/40 backdrop-blur-sm border border-border/50">
                <CardContent className="p-6">
                  <div className="flex items-center gap-3">
                    <div className="w-12 h-12 bg-yellow-500/20 rounded-lg flex items-center justify-center">
                      <Star className="w-6 h-6 text-yellow-500" />
                    </div>
                    <div>
                      <div className="text-2xl font-bold text-foreground">
                        {mockAnalytics.overview.userSatisfaction}%
                      </div>
                      <div className="text-sm text-muted-foreground">
                        Satisfaction
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>

              <Card className="bg-card/40 backdrop-blur-sm border border-border/50">
                <CardContent className="p-6">
                  <div className="flex items-center gap-3">
                    <div className="w-12 h-12 bg-red-500/20 rounded-lg flex items-center justify-center">
                      <Target className="w-6 h-6 text-red-500" />
                    </div>
                    <div>
                      <div className="text-2xl font-bold text-foreground">
                        {mockAnalytics.overview.successRate}%
                      </div>
                      <div className="text-sm text-muted-foreground">
                        Success Rate
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </div>
          </motion.div>

          {/* Main Analytics Content */}
          <motion.div variants={itemVariants}>
            <Tabs
              value={activeTab}
              onValueChange={setActiveTab}
              className="space-y-6"
            >
              <TabsList className="grid w-full grid-cols-4 bg-card/40 backdrop-blur-sm">
                <TabsTrigger
                  value="overview"
                  className="flex items-center gap-2"
                >
                  <BarChart3 className="w-4 h-4" />
                  <span className="hidden sm:inline">Overview</span>
                </TabsTrigger>
                <TabsTrigger value="agents" className="flex items-center gap-2">
                  <Bot className="w-4 h-4" />
                  <span className="hidden sm:inline">Agents</span>
                </TabsTrigger>
                <TabsTrigger value="users" className="flex items-center gap-2">
                  <Users className="w-4 h-4" />
                  <span className="hidden sm:inline">Users</span>
                </TabsTrigger>
                <TabsTrigger
                  value="insights"
                  className="flex items-center gap-2"
                >
                  <Brain className="w-4 h-4" />
                  <span className="hidden sm:inline">Insights</span>
                </TabsTrigger>
              </TabsList>

              {/* Overview Tab */}
              <TabsContent value="overview" className="space-y-6">
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                  {/* Daily Activity Chart */}
                  <Card className="bg-card/40 backdrop-blur-sm border border-border/50">
                    <CardHeader>
                      <CardTitle className="flex items-center gap-2">
                        <TrendingUp className="w-5 h-5" />
                        Daily Activity
                      </CardTitle>
                    </CardHeader>
                    <CardContent>
                      <div className="space-y-4">
                        {mockAnalytics.dailyStats.map((day, index) => (
                          <div key={index} className="flex items-center gap-3">
                            <div className="text-sm text-muted-foreground w-20">
                              {new Date(day.date).toLocaleDateString()}
                            </div>
                            <div className="flex-1 bg-muted rounded-full h-2">
                              <div
                                className="bg-gradient-to-r from-primary to-accent h-2 rounded-full"
                                style={{
                                  width: `${(day.interactions / 250) * 100}%`,
                                }}
                              />
                            </div>
                            <div className="text-sm font-medium text-foreground w-12">
                              {day.interactions}
                            </div>
                          </div>
                        ))}
                      </div>
                    </CardContent>
                  </Card>

                  {/* Top Queries */}
                  <Card className="bg-card/40 backdrop-blur-sm border border-border/50">
                    <CardHeader>
                      <CardTitle className="flex items-center gap-2">
                        <MessageSquare className="w-5 h-5" />
                        Top Queries
                      </CardTitle>
                    </CardHeader>
                    <CardContent>
                      <div className="space-y-3">
                        {mockAnalytics.topQueries.map((query, index) => (
                          <div
                            key={index}
                            className="flex items-center justify-between p-3 bg-card/30 rounded-lg"
                          >
                            <div>
                              <div className="font-medium text-foreground text-sm">
                                {query.query}
                              </div>
                              <Badge
                                variant="secondary"
                                className="text-xs mt-1"
                              >
                                {query.category}
                              </Badge>
                            </div>
                            <div className="text-right">
                              <div className="font-bold text-foreground">
                                {query.count}
                              </div>
                              <div className="text-xs text-muted-foreground">
                                queries
                              </div>
                            </div>
                          </div>
                        ))}
                      </div>
                    </CardContent>
                  </Card>
                </div>
              </TabsContent>

              {/* Agents Tab */}
              <TabsContent value="agents" className="space-y-6">
                <Card className="bg-card/40 backdrop-blur-sm border border-border/50">
                  <CardHeader>
                    <CardTitle className="flex items-center gap-2">
                      <Bot className="w-5 h-5" />
                      Agent Performance
                    </CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-4">
                      {mockAnalytics.agentPerformance.map((agent, index) => (
                        <div key={index} className="p-4 bg-card/30 rounded-lg">
                          <div className="flex items-center justify-between mb-3">
                            <h3 className="font-semibold text-foreground">
                              {agent.name}
                            </h3>
                            <Badge variant="secondary">
                              {agent.interactions.toLocaleString()} interactions
                            </Badge>
                          </div>

                          <div className="grid grid-cols-3 gap-4">
                            <div>
                              <div className="text-sm text-muted-foreground mb-1">
                                Satisfaction
                              </div>
                              <div className="flex items-center gap-2">
                                <div className="flex-1 bg-muted rounded-full h-2">
                                  <div
                                    className="bg-green-500 h-2 rounded-full"
                                    style={{ width: `${agent.satisfaction}%` }}
                                  />
                                </div>
                                <span className="text-sm font-medium text-foreground">
                                  {agent.satisfaction}%
                                </span>
                              </div>
                            </div>

                            <div>
                              <div className="text-sm text-muted-foreground mb-1">
                                Response Time
                              </div>
                              <div className="flex items-center gap-2">
                                <div className="flex-1 bg-muted rounded-full h-2">
                                  <div
                                    className="bg-blue-500 h-2 rounded-full"
                                    style={{
                                      width: `${Math.min((1000 / agent.responseTime) * 100, 100)}%`,
                                    }}
                                  />
                                </div>
                                <span className="text-sm font-medium text-foreground">
                                  {agent.responseTime}ms
                                </span>
                              </div>
                            </div>

                            <div>
                              <div className="text-sm text-muted-foreground mb-1">
                                Efficiency
                              </div>
                              <div className="flex items-center gap-2">
                                <div className="flex-1 bg-muted rounded-full h-2">
                                  <div
                                    className="bg-purple-500 h-2 rounded-full"
                                    style={{ width: `${agent.efficiency}%` }}
                                  />
                                </div>
                                <span className="text-sm font-medium text-foreground">
                                  {agent.efficiency}%
                                </span>
                              </div>
                            </div>
                          </div>
                        </div>
                      ))}
                    </div>
                  </CardContent>
                </Card>
              </TabsContent>

              {/* Users Tab */}
              <TabsContent value="users" className="space-y-6">
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
                  <Card className="bg-card/40 backdrop-blur-sm border border-border/50">
                    <CardContent className="p-6 text-center">
                      <div className="w-12 h-12 mx-auto mb-4 bg-blue-500/20 rounded-lg flex items-center justify-center">
                        <Users className="w-6 h-6 text-blue-500" />
                      </div>
                      <div className="text-2xl font-bold text-foreground mb-1">
                        {mockAnalytics.userEngagement.activeUsers.toLocaleString()}
                      </div>
                      <div className="text-sm text-muted-foreground">
                        Active Users
                      </div>
                    </CardContent>
                  </Card>

                  <Card className="bg-card/40 backdrop-blur-sm border border-border/50">
                    <CardContent className="p-6 text-center">
                      <div className="w-12 h-12 mx-auto mb-4 bg-green-500/20 rounded-lg flex items-center justify-center">
                        <TrendingUp className="w-6 h-6 text-green-500" />
                      </div>
                      <div className="text-2xl font-bold text-foreground mb-1">
                        {mockAnalytics.userEngagement.newUsers}
                      </div>
                      <div className="text-sm text-muted-foreground">
                        New Users
                      </div>
                    </CardContent>
                  </Card>

                  <Card className="bg-card/40 backdrop-blur-sm border border-border/50">
                    <CardContent className="p-6 text-center">
                      <div className="w-12 h-12 mx-auto mb-4 bg-purple-500/20 rounded-lg flex items-center justify-center">
                        <Clock className="w-6 h-6 text-purple-500" />
                      </div>
                      <div className="text-2xl font-bold text-foreground mb-1">
                        {mockAnalytics.userEngagement.avgSessionDuration}m
                      </div>
                      <div className="text-sm text-muted-foreground">
                        Avg Session
                      </div>
                    </CardContent>
                  </Card>

                  <Card className="bg-card/40 backdrop-blur-sm border border-border/50">
                    <CardContent className="p-6 text-center">
                      <div className="w-12 h-12 mx-auto mb-4 bg-orange-500/20 rounded-lg flex items-center justify-center">
                        <TrendingDown className="w-6 h-6 text-orange-500" />
                      </div>
                      <div className="text-2xl font-bold text-foreground mb-1">
                        {mockAnalytics.userEngagement.bounceRate}%
                      </div>
                      <div className="text-sm text-muted-foreground">
                        Bounce Rate
                      </div>
                    </CardContent>
                  </Card>
                </div>
              </TabsContent>

              {/* Insights Tab */}
              <TabsContent value="insights" className="space-y-6">
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                  <Card className="bg-card/40 backdrop-blur-sm border border-border/50">
                    <CardHeader>
                      <CardTitle className="flex items-center gap-2">
                        <Brain className="w-5 h-5" />
                        AI Insights
                      </CardTitle>
                    </CardHeader>
                    <CardContent className="space-y-4">
                      <div className="p-4 bg-green-500/10 border border-green-500/20 rounded-lg">
                        <div className="flex items-start gap-3">
                          <TrendingUp className="w-5 h-5 text-green-500 mt-0.5" />
                          <div>
                            <h4 className="font-medium text-foreground">
                              Performance Improvement
                            </h4>
                            <p className="text-sm text-muted-foreground mt-1">
                              Your agents' response time improved by 15% this
                              week
                            </p>
                          </div>
                        </div>
                      </div>

                      <div className="p-4 bg-blue-500/10 border border-blue-500/20 rounded-lg">
                        <div className="flex items-start gap-3">
                          <Award className="w-5 h-5 text-blue-500 mt-0.5" />
                          <div>
                            <h4 className="font-medium text-foreground">
                              Top Performer
                            </h4>
                            <p className="text-sm text-muted-foreground mt-1">
                              Customer Support agent has the highest
                              satisfaction rate at 98%
                            </p>
                          </div>
                        </div>
                      </div>

                      <div className="p-4 bg-yellow-500/10 border border-yellow-500/20 rounded-lg">
                        <div className="flex items-start gap-3">
                          <Zap className="w-5 h-5 text-yellow-500 mt-0.5" />
                          <div>
                            <h4 className="font-medium text-foreground">
                              Optimization Opportunity
                            </h4>
                            <p className="text-sm text-muted-foreground mt-1">
                              Consider upgrading memory for Content Creator to
                              improve performance
                            </p>
                          </div>
                        </div>
                      </div>
                    </CardContent>
                  </Card>

                  <Card className="bg-card/40 backdrop-blur-sm border border-border/50">
                    <CardHeader>
                      <CardTitle className="flex items-center gap-2">
                        <Target className="w-5 h-5" />
                        Recommendations
                      </CardTitle>
                    </CardHeader>
                    <CardContent className="space-y-3">
                      <div className="p-3 bg-card/30 rounded-lg">
                        <h4 className="font-medium text-foreground text-sm mb-1">
                          Scale Popular Agents
                        </h4>
                        <p className="text-xs text-muted-foreground">
                          DataAnalyst Pro is in high demand. Consider creating
                          similar agents.
                        </p>
                      </div>

                      <div className="p-3 bg-card/30 rounded-lg">
                        <h4 className="font-medium text-foreground text-sm mb-1">
                          Improve Response Times
                        </h4>
                        <p className="text-xs text-muted-foreground">
                          Content Creator has slower response times. Optimize
                          its configuration.
                        </p>
                      </div>

                      <div className="p-3 bg-card/30 rounded-lg">
                        <h4 className="font-medium text-foreground text-sm mb-1">
                          User Engagement
                        </h4>
                        <p className="text-xs text-muted-foreground">
                          Peak usage is between 2-4 PM. Consider scheduling
                          maintenance outside these hours.
                        </p>
                      </div>
                    </CardContent>
                  </Card>
                </div>
              </TabsContent>
            </Tabs>
          </motion.div>
        </motion.div>
      </div>
    </div>
  );
};

export default Analytics;
