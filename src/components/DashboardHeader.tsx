import { Button } from "@/components/ui/button";
import {
  Brain,
  Settings,
  LogOut,
  User,
  Bell,
  Search,
  ChevronDown,
  Zap,
  Crown,
} from "lucide-react";
import { useState } from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { motion, AnimatePresence } from "framer-motion";
import { useAuth } from "@/contexts/AuthContext";

// interface DashboardHeaderProps {
//   user?: {
//     username: string;
//     phone_number: string;
//     avatar?: string;
//     email: string;
//   };
// }

const DashboardHeader = () => {
  const [isProfileOpen, setIsProfileOpen] = useState(false);
  const [isNotificationsOpen, setIsNotificationsOpen] = useState(false);
  const location = useLocation();
  const navigate = useNavigate();
  const { logout, user } = useAuth();

  const navigationItems = [
    { name: "Dashboard", href: "/dashboard" },
    { name: "Agents", href: "/agents" },
    { name: "Wallet", href: "/wallet" },
    { name: "Analytics", href: "/analytics" },
    { name: "Marketplace", href: "/marketplace" },
  ];

  const isActiveRoute = (href: string) => {
    if (href === "/dashboard") {
      return location.pathname === "/dashboard";
    }
    return location.pathname.startsWith(href);
  };

  const notifications = [
    {
      id: 1,
      message: "Agent 'DataAnalyst Pro' completed task",
      time: "2 min ago",
      unread: true,
    },
    {
      id: 2,
      message: "New collaboration request from team",
      time: "1 hour ago",
      unread: true,
    },
    {
      id: 3,
      message: "Wallet transaction confirmed",
      time: "3 hours ago",
      unread: false,
    },
  ];

  const handleLogout = () => {
    // Handle logout logic here
    logout();
  };

  return (
    <header className="sticky top-0 z-50 border-b border-border bg-card/20 backdrop-blur-md">
      <div className="container mx-auto max-w-7xl px-6 py-4">
        <div className="flex items-center justify-between">
          {/* Logo and Navigation */}
          <div className="flex items-center gap-8">
            <Link to="/dashboard" className="flex items-center gap-3 group">
              <motion.div
                className="flex items-center justify-center w-10 h-10 bg-gradient-accent rounded-xl shadow-glow-sm group-hover:shadow-glow transition-all duration-300"
                whileHover={{ scale: 1.05, rotate: 5 }}
              >
                <Brain className="w-6 h-6 text-primary-foreground" />
              </motion.div>
              <span className="text-xl font-bold text-foreground group-hover:text-primary transition-colors duration-300">
                ncAGENTS
              </span>
            </Link>

            {/* Main Navigation */}
            <nav className="hidden lg:flex items-center gap-1">
              {navigationItems.map((item) => (
                <Link
                  key={item.name}
                  to={item.href}
                  className={`px-4 py-2 rounded-lg text-sm font-medium transition-all duration-300 relative group ${
                    isActiveRoute(item.href)
                      ? "text-primary bg-primary/10"
                      : "text-muted-foreground hover:text-foreground hover:bg-card/50"
                  }`}
                >
                  {item.name}
                  {isActiveRoute(item.href) && (
                    <motion.div
                      className="absolute bottom-0 left-1/2 transform -translate-x-1/2 w-1 h-1 bg-primary rounded-full"
                      layoutId="activeTab"
                    />
                  )}
                </Link>
              ))}
            </nav>
          </div>

          {/* Search and User Actions */}
          <div className="flex items-center gap-4">
            {/* Search */}
            <div className="hidden md:flex items-center gap-2 bg-card/50 border border-border/50 rounded-lg px-3 py-2 min-w-[200px]">
              <Search className="w-4 h-4 text-muted-foreground" />
              <input
                type="text"
                placeholder="Search agents, teams..."
                className="bg-transparent border-none outline-none text-sm text-foreground placeholder:text-muted-foreground flex-1"
              />
            </div>

            {/* Notifications */}
            <div className="relative">
              <button
                onClick={() => setIsNotificationsOpen(!isNotificationsOpen)}
                className="relative p-2 text-muted-foreground hover:text-foreground transition-colors rounded-lg hover:bg-card/50"
              >
                <Bell className="w-5 h-5" />
                {notifications.some((n) => n.unread) && (
                  <div className="absolute -top-1 -right-1 w-3 h-3 bg-primary rounded-full animate-pulse" />
                )}
              </button>

              <AnimatePresence>
                {isNotificationsOpen && (
                  <motion.div
                    initial={{ opacity: 0, y: 10, scale: 0.95 }}
                    animate={{ opacity: 1, y: 0, scale: 1 }}
                    exit={{ opacity: 0, y: 10, scale: 0.95 }}
                    transition={{ duration: 0.2 }}
                    className="absolute right-0 top-full mt-2 w-80 bg-card border border-border rounded-lg shadow-lg overflow-hidden"
                  >
                    <div className="p-4 border-b border-border">
                      <h3 className="font-semibold text-foreground">
                        Notifications
                      </h3>
                    </div>
                    <div className="max-h-64 overflow-y-auto">
                      {notifications.map((notification) => (
                        <div
                          key={notification.id}
                          className={`p-4 border-b border-border/50 hover:bg-card/50 transition-colors ${
                            notification.unread ? "bg-primary/5" : ""
                          }`}
                        >
                          <p className="text-sm text-foreground mb-1">
                            {notification.message}
                          </p>
                          <p className="text-xs text-muted-foreground">
                            {notification.time}
                          </p>
                        </div>
                      ))}
                    </div>
                    <div className="p-2 border-t border-border">
                      <Link to="/notifications">
                        <Button variant="ghost" size="sm" className="w-full">
                          View All Notifications
                        </Button>
                      </Link>
                    </div>
                  </motion.div>
                )}
              </AnimatePresence>
            </div>

            {/* Upgrade to Pro Button */}
            <Link to="/payment">
              <Button
                variant="outline"
                size="sm"
                className="bg-gradient-to-r from-primary/10 to-accent/10 border-primary/30 hover:from-primary/20 hover:to-accent/20 text-primary hover:text-primary"
              >
                <Crown className="w-4 h-4 mr-2" />
                <span className="hidden sm:inline">Upgrade to Pro</span>
                <span className="sm:hidden">Pro</span>
              </Button>
            </Link>

            {/* User Profile Dropdown */}
            <div className="relative">
              <button
                onClick={() => setIsProfileOpen(!isProfileOpen)}
                className="flex items-center gap-3 p-2 rounded-lg hover:bg-card/50 transition-colors"
              >
                <div className="w-8 h-8 rounded-full overflow-hidden">
                  <img
                    src={
                      user?.avatar ||
                      "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=150&h=150&fit=crop&crop=face"
                    }
                    alt={user?.name || "User"}
                    className="w-full h-full object-cover"
                  />
                </div>
                <div className="hidden sm:block text-left">
                  <div className="text-sm font-medium text-foreground">
                    {user?.username[0] + user?.username[1] || "User"}
                  </div>
                  <div className="text-xs text-muted-foreground">Level 12</div>
                </div>
                <ChevronDown className="w-4 h-4 text-muted-foreground" />
              </button>

              <AnimatePresence>
                {isProfileOpen && (
                  <motion.div
                    initial={{ opacity: 0, y: 10, scale: 0.95 }}
                    animate={{ opacity: 1, y: 0, scale: 1 }}
                    exit={{ opacity: 0, y: 10, scale: 0.95 }}
                    transition={{ duration: 0.2 }}
                    className="absolute right-0 top-full mt-2 w-56 bg-card border border-border rounded-lg shadow-lg overflow-hidden"
                  >
                    <div className="p-4 border-b border-border">
                      <div className="flex items-center gap-3">
                        <div className="w-10 h-10 rounded-full overflow-hidden">
                          <img
                            src={
                              user?.avatar ||
                              "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=150&h=150&fit=crop&crop=face"
                            }
                            alt={user?.username || "User"}
                            className="w-full h-full object-cover"
                          />
                        </div>
                        <div>
                          <div className="font-medium text-foreground">
                            {user?.username || "User"}
                          </div>
                          <div className="text-sm text-muted-foreground">
                            {user?.email || "user@example.com"}
                          </div>
                        </div>
                      </div>
                    </div>

                    <div className="py-2">
                      <button
                        className="flex items-center gap-3 px-4 py-2 text-sm text-foreground hover:bg-card/50 transition-colors w-full text-left"
                        onClick={() => {
                          setIsProfileOpen(false);
                          navigate("/profile");
                        }}
                      >
                        <User className="w-4 h-4" />
                        Profile
                      </button>
                      <button
                        className="flex items-center gap-3 px-4 py-2 text-sm text-foreground hover:bg-card/50 transition-colors w-full text-left"
                        onClick={() => {
                          setIsProfileOpen(false);
                          navigate("/settings");
                        }}
                      >
                        <Settings className="w-4 h-4" />
                        Settings
                      </button>
                    </div>

                    <div className="border-t border-border py-2">
                      <button
                        onClick={handleLogout}
                        className="flex items-center gap-3 px-4 py-2 text-sm text-red-500 hover:bg-red-500/10 transition-colors w-full text-left"
                      >
                        <LogOut className="w-4 h-4" />
                        Logout
                      </button>
                    </div>
                  </motion.div>
                )}
              </AnimatePresence>
            </div>
          </div>
        </div>
      </div>
    </header>
  );
};

export default DashboardHeader;
