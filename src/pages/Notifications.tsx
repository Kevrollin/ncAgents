import DashboardHeader from "@/components/DashboardHeader";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Switch } from "@/components/ui/switch";
import {
  Bell,
  Check,
  X,
  Settings,
  Bot,
  Users,
  CreditCard,
  AlertTriangle,
  Info,
  CheckCircle,
  XCircle,
  Clock,
  Star,
  Zap,
  Shield,
  TrendingUp,
  MessageSquare,
  Calendar,
  Filter,
  Mail,
} from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import { useState } from "react";

// Mock user data
const mockUser = {
  name: "Alex Chen",
  email: "alex.chen@example.com",
  avatar:
    "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=150&h=150&fit=crop&crop=face",
};

// Mock notifications
const mockNotifications = [
  {
    id: "notif_1",
    type: "success",
    category: "agent",
    title: "Agent Performance Update",
    message: "DataAnalyst Pro achieved 96% satisfaction rate this week",
    timestamp: "2024-01-20T14:30:00Z",
    read: false,
    actionable: true,
    agentId: "agent_1",
  },
  {
    id: "notif_2",
    type: "info",
    category: "collaboration",
    title: "New Team Invitation",
    message: "Sarah Johnson invited you to join the Marketing Analytics team",
    timestamp: "2024-01-20T12:15:00Z",
    read: false,
    actionable: true,
    teamId: "team_1",
  },
  {
    id: "notif_3",
    type: "warning",
    category: "billing",
    title: "Payment Method Expiring",
    message: "Your credit card ending in 4567 expires in 7 days",
    timestamp: "2024-01-20T09:45:00Z",
    read: true,
    actionable: true,
  },
  {
    id: "notif_4",
    type: "success",
    category: "marketplace",
    title: "Agent Sale Completed",
    message: "Your Sales Assistant template was purchased by 3 users",
    timestamp: "2024-01-19T16:20:00Z",
    read: false,
    actionable: false,
  },
  {
    id: "notif_5",
    type: "info",
    category: "system",
    title: "System Maintenance",
    message: "Scheduled maintenance on Jan 22, 2024 from 2:00 AM - 4:00 AM UTC",
    timestamp: "2024-01-19T14:10:00Z",
    read: true,
    actionable: false,
  },
  {
    id: "notif_6",
    type: "error",
    category: "agent",
    title: "Agent Error Detected",
    message:
      "Customer Support agent encountered an error processing request #12345",
    timestamp: "2024-01-19T11:30:00Z",
    read: false,
    actionable: true,
    agentId: "agent_2",
  },
  {
    id: "notif_7",
    type: "success",
    category: "achievement",
    title: "Milestone Reached",
    message: "Congratulations! You've reached 10,000 total agent interactions",
    timestamp: "2024-01-18T18:45:00Z",
    read: true,
    actionable: false,
  },
  {
    id: "notif_8",
    type: "info",
    category: "feature",
    title: "New Feature Available",
    message: "Voice capabilities are now available for all Pro users",
    timestamp: "2024-01-18T10:20:00Z",
    read: false,
    actionable: true,
  },
];

// Mock notification settings
const mockNotificationSettings = {
  email: {
    agentUpdates: true,
    teamInvitations: true,
    billingAlerts: true,
    marketplaceActivity: false,
    systemNotifications: true,
    weeklyReports: true,
  },
  push: {
    agentUpdates: true,
    teamInvitations: true,
    billingAlerts: true,
    marketplaceActivity: true,
    systemNotifications: false,
    weeklyReports: false,
  },
  inApp: {
    agentUpdates: true,
    teamInvitations: true,
    billingAlerts: true,
    marketplaceActivity: true,
    systemNotifications: true,
    weeklyReports: true,
  },
};

const Notifications = () => {
  const [activeTab, setActiveTab] = useState("all");
  const [notifications, setNotifications] = useState(mockNotifications);
  const [settings, setSettings] = useState(mockNotificationSettings);
  const [filter, setFilter] = useState("all");

  const filteredNotifications = notifications.filter((notif) => {
    if (activeTab === "unread") return !notif.read;
    if (activeTab === "actionable") return notif.actionable;
    if (filter !== "all") return notif.category === filter;
    return true;
  });

  const unreadCount = notifications.filter((n) => !n.read).length;

  const markAsRead = (id: string) => {
    setNotifications((prev) =>
      prev.map((notif) => (notif.id === id ? { ...notif, read: true } : notif)),
    );
  };

  const markAllAsRead = () => {
    setNotifications((prev) => prev.map((notif) => ({ ...notif, read: true })));
  };

  const deleteNotification = (id: string) => {
    setNotifications((prev) => prev.filter((notif) => notif.id !== id));
  };

  const getNotificationIcon = (type: string) => {
    const icons: Record<string, JSX.Element> = {
      success: <CheckCircle className="w-5 h-5 text-green-500" />,
      error: <XCircle className="w-5 h-5 text-red-500" />,
      warning: <AlertTriangle className="w-5 h-5 text-yellow-500" />,
      info: <Info className="w-5 h-5 text-blue-500" />,
    };
    return icons[type] || <Bell className="w-5 h-5 text-muted-foreground" />;
  };

  const getCategoryIcon = (category: string) => {
    const icons: Record<string, JSX.Element> = {
      agent: <Bot className="w-4 h-4" />,
      collaboration: <Users className="w-4 h-4" />,
      billing: <CreditCard className="w-4 h-4" />,
      marketplace: <Star className="w-4 h-4" />,
      system: <Settings className="w-4 h-4" />,
      achievement: <TrendingUp className="w-4 h-4" />,
      feature: <Zap className="w-4 h-4" />,
    };
    return icons[category] || <Bell className="w-4 h-4" />;
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
            <div className="flex items-center justify-between">
              <div>
                <h1 className="text-4xl font-bold text-foreground mb-2">
                  Notifications
                </h1>
                <p className="text-muted-foreground">
                  Stay updated with your agents and team activities
                  {unreadCount > 0 && (
                    <Badge className="ml-2 bg-primary">
                      {unreadCount} unread
                    </Badge>
                  )}
                </p>
              </div>
              <div className="flex items-center gap-3">
                {unreadCount > 0 && (
                  <Button variant="outline" onClick={markAllAsRead}>
                    <Check className="w-4 h-4 mr-2" />
                    Mark All Read
                  </Button>
                )}
                <Button variant="outline">
                  <Settings className="w-4 h-4 mr-2" />
                  Settings
                </Button>
              </div>
            </div>
          </motion.div>

          {/* Notification Tabs */}
          <motion.div variants={itemVariants}>
            <Tabs
              value={activeTab}
              onValueChange={setActiveTab}
              className="space-y-6"
            >
              <div className="flex items-center justify-between">
                <TabsList className="bg-card/40 backdrop-blur-sm">
                  <TabsTrigger value="all" className="flex items-center gap-2">
                    <Bell className="w-4 h-4" />
                    All ({notifications.length})
                  </TabsTrigger>
                  <TabsTrigger
                    value="unread"
                    className="flex items-center gap-2"
                  >
                    <Mail className="w-4 h-4" />
                    Unread ({unreadCount})
                  </TabsTrigger>
                  <TabsTrigger
                    value="actionable"
                    className="flex items-center gap-2"
                  >
                    <Zap className="w-4 h-4" />
                    Actionable (
                    {notifications.filter((n) => n.actionable).length})
                  </TabsTrigger>
                </TabsList>

                <div className="flex items-center gap-2">
                  <Button variant="outline" size="sm">
                    <Filter className="w-4 h-4 mr-2" />
                    Filter
                  </Button>
                </div>
              </div>

              {/* All Notifications */}
              <TabsContent value="all" className="space-y-4">
                <AnimatePresence>
                  {filteredNotifications.length === 0 ? (
                    <Card className="bg-card/40 backdrop-blur-sm border border-border/50">
                      <CardContent className="p-12 text-center">
                        <div className="w-24 h-24 mx-auto mb-6 bg-gradient-to-br from-primary/20 to-accent/20 rounded-full flex items-center justify-center">
                          <Bell className="w-12 h-12 text-primary" />
                        </div>
                        <h3 className="text-xl font-semibold text-foreground mb-2">
                          No notifications
                        </h3>
                        <p className="text-muted-foreground">
                          You're all caught up! Check back later for updates.
                        </p>
                      </CardContent>
                    </Card>
                  ) : (
                    filteredNotifications.map((notification, index) => (
                      <motion.div
                        key={notification.id}
                        initial={{ opacity: 0, x: -20 }}
                        animate={{ opacity: 1, x: 0 }}
                        exit={{ opacity: 0, x: 20 }}
                        transition={{ duration: 0.3, delay: index * 0.05 }}
                      >
                        <Card
                          className={`bg-card/40 backdrop-blur-sm border transition-all duration-300 hover:border-primary/30 ${
                            !notification.read
                              ? "border-primary/20 bg-primary/5"
                              : "border-border/50"
                          }`}
                        >
                          <CardContent className="p-6">
                            <div className="flex items-start gap-4">
                              <div className="flex-shrink-0">
                                {getNotificationIcon(notification.type)}
                              </div>

                              <div className="flex-1 min-w-0">
                                <div className="flex items-start justify-between mb-2">
                                  <div className="flex items-center gap-2">
                                    <h3 className="font-semibold text-foreground">
                                      {notification.title}
                                    </h3>
                                    {!notification.read && (
                                      <div className="w-2 h-2 bg-primary rounded-full" />
                                    )}
                                  </div>
                                  <div className="flex items-center gap-1">
                                    <Badge
                                      variant="secondary"
                                      className="text-xs"
                                    >
                                      {getCategoryIcon(notification.category)}
                                      <span className="ml-1">
                                        {notification.category}
                                      </span>
                                    </Badge>
                                  </div>
                                </div>

                                <p className="text-muted-foreground mb-3">
                                  {notification.message}
                                </p>

                                <div className="flex items-center justify-between">
                                  <div className="flex items-center gap-2 text-sm text-muted-foreground">
                                    <Clock className="w-4 h-4" />
                                    {new Date(
                                      notification.timestamp,
                                    ).toLocaleString()}
                                  </div>

                                  <div className="flex items-center gap-2">
                                    {notification.actionable && (
                                      <Button size="sm" variant="outline">
                                        Take Action
                                      </Button>
                                    )}
                                    {!notification.read && (
                                      <Button
                                        size="sm"
                                        variant="ghost"
                                        onClick={() =>
                                          markAsRead(notification.id)
                                        }
                                      >
                                        <Check className="w-4 h-4" />
                                      </Button>
                                    )}
                                    <Button
                                      size="sm"
                                      variant="ghost"
                                      onClick={() =>
                                        deleteNotification(notification.id)
                                      }
                                    >
                                      <X className="w-4 h-4" />
                                    </Button>
                                  </div>
                                </div>
                              </div>
                            </div>
                          </CardContent>
                        </Card>
                      </motion.div>
                    ))
                  )}
                </AnimatePresence>
              </TabsContent>

              {/* Unread Notifications */}
              <TabsContent value="unread" className="space-y-4">
                <AnimatePresence>
                  {filteredNotifications.map((notification, index) => (
                    <motion.div
                      key={notification.id}
                      initial={{ opacity: 0, x: -20 }}
                      animate={{ opacity: 1, x: 0 }}
                      exit={{ opacity: 0, x: 20 }}
                      transition={{ duration: 0.3, delay: index * 0.05 }}
                    >
                      <Card className="bg-primary/5 border border-primary/20 hover:border-primary/30 transition-all duration-300">
                        <CardContent className="p-6">
                          <div className="flex items-start gap-4">
                            <div className="flex-shrink-0">
                              {getNotificationIcon(notification.type)}
                            </div>

                            <div className="flex-1 min-w-0">
                              <div className="flex items-start justify-between mb-2">
                                <div className="flex items-center gap-2">
                                  <h3 className="font-semibold text-foreground">
                                    {notification.title}
                                  </h3>
                                  <div className="w-2 h-2 bg-primary rounded-full" />
                                </div>
                                <Badge variant="secondary" className="text-xs">
                                  {getCategoryIcon(notification.category)}
                                  <span className="ml-1">
                                    {notification.category}
                                  </span>
                                </Badge>
                              </div>

                              <p className="text-muted-foreground mb-3">
                                {notification.message}
                              </p>

                              <div className="flex items-center justify-between">
                                <div className="flex items-center gap-2 text-sm text-muted-foreground">
                                  <Clock className="w-4 h-4" />
                                  {new Date(
                                    notification.timestamp,
                                  ).toLocaleString()}
                                </div>

                                <div className="flex items-center gap-2">
                                  {notification.actionable && (
                                    <Button size="sm" variant="outline">
                                      Take Action
                                    </Button>
                                  )}
                                  <Button
                                    size="sm"
                                    variant="ghost"
                                    onClick={() => markAsRead(notification.id)}
                                  >
                                    <Check className="w-4 h-4" />
                                  </Button>
                                  <Button
                                    size="sm"
                                    variant="ghost"
                                    onClick={() =>
                                      deleteNotification(notification.id)
                                    }
                                  >
                                    <X className="w-4 h-4" />
                                  </Button>
                                </div>
                              </div>
                            </div>
                          </div>
                        </CardContent>
                      </Card>
                    </motion.div>
                  ))}
                </AnimatePresence>
              </TabsContent>

              {/* Actionable Notifications */}
              <TabsContent value="actionable" className="space-y-4">
                <AnimatePresence>
                  {filteredNotifications.map((notification, index) => (
                    <motion.div
                      key={notification.id}
                      initial={{ opacity: 0, x: -20 }}
                      animate={{ opacity: 1, x: 0 }}
                      exit={{ opacity: 0, x: 20 }}
                      transition={{ duration: 0.3, delay: index * 0.05 }}
                    >
                      <Card className="bg-card/40 backdrop-blur-sm border border-border/50 hover:border-primary/30 transition-all duration-300">
                        <CardContent className="p-6">
                          <div className="flex items-start gap-4">
                            <div className="flex-shrink-0">
                              {getNotificationIcon(notification.type)}
                            </div>

                            <div className="flex-1 min-w-0">
                              <div className="flex items-start justify-between mb-2">
                                <div className="flex items-center gap-2">
                                  <h3 className="font-semibold text-foreground">
                                    {notification.title}
                                  </h3>
                                  {!notification.read && (
                                    <div className="w-2 h-2 bg-primary rounded-full" />
                                  )}
                                  <Badge className="bg-gradient-to-r from-primary to-accent text-white text-xs">
                                    <Zap className="w-3 h-3 mr-1" />
                                    Action Required
                                  </Badge>
                                </div>
                                <Badge variant="secondary" className="text-xs">
                                  {getCategoryIcon(notification.category)}
                                  <span className="ml-1">
                                    {notification.category}
                                  </span>
                                </Badge>
                              </div>

                              <p className="text-muted-foreground mb-3">
                                {notification.message}
                              </p>

                              <div className="flex items-center justify-between">
                                <div className="flex items-center gap-2 text-sm text-muted-foreground">
                                  <Clock className="w-4 h-4" />
                                  {new Date(
                                    notification.timestamp,
                                  ).toLocaleString()}
                                </div>

                                <div className="flex items-center gap-2">
                                  <Button
                                    size="sm"
                                    className="bg-gradient-to-r from-primary to-accent hover:from-primary/90 hover:to-accent/90"
                                  >
                                    Take Action
                                  </Button>
                                  {!notification.read && (
                                    <Button
                                      size="sm"
                                      variant="ghost"
                                      onClick={() =>
                                        markAsRead(notification.id)
                                      }
                                    >
                                      <Check className="w-4 h-4" />
                                    </Button>
                                  )}
                                  <Button
                                    size="sm"
                                    variant="ghost"
                                    onClick={() =>
                                      deleteNotification(notification.id)
                                    }
                                  >
                                    <X className="w-4 h-4" />
                                  </Button>
                                </div>
                              </div>
                            </div>
                          </div>
                        </CardContent>
                      </Card>
                    </motion.div>
                  ))}
                </AnimatePresence>
              </TabsContent>
            </Tabs>
          </motion.div>
        </motion.div>
      </div>
    </div>
  );
};

export default Notifications;
