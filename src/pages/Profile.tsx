import DashboardHeader from "@/components/DashboardHeader";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Badge } from "@/components/ui/badge";
import {
  User,
  Mail,
  Calendar,
  Trophy,
  Bot,
  Users,
  Activity,
  Shield,
  Camera,
  Edit3,
  Save,
  X,
  Eye,
  EyeOff,
  Key,
  Clock,
  MapPin,
  Star,
  TrendingUp,
  Zap,
  Target,
  Award,
  Lock,
} from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import { useEffect, useState } from "react";
import axios from "axios";
import { useAuth } from "@/contexts/AuthContext";
import { useNormalToast } from "@/hooks/use-normal-toast";
import { useDestructiveToast } from "@/hooks/use-destructive-toast";
import { useNavigate } from "react-router-dom";

// Mock user data
const mockUser = {
  id: "user_123",
  name: "Alex Chen",
  email: "alex.chen@example.com",
  avatar:
    "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=150&h=150&fit=crop&crop=face",
  bio: "AI enthusiast and developer building the future with intelligent agents. Passionate about multi-agent collaboration and voice interfaces.",
  joinDate: "2024-01-15",
  level: 12,
  xp: 2450,
  nextLevelXp: 3000,
  location: "San Francisco, CA",
  website: "https://alexchen.dev",
};

const mockStats = {
  agentsCreated: 15,
  collaborations: 8,
  totalInteractions: 25420,
  achievementsEarned: 12,
};

const mockRecentActivity = [
  {
    id: 1,
    type: "agent_created",
    title: "Created new agent 'DataAnalyst Pro'",
    timestamp: "2 hours ago",
    icon: <Bot className="w-4 h-4" />,
  },
  {
    id: 2,
    type: "collaboration",
    title: "Started collaboration 'Marketing Team'",
    timestamp: "1 day ago",
    icon: <Users className="w-4 h-4" />,
  },
  {
    id: 3,
    type: "achievement",
    title: "Unlocked 'Voice Pioneer' achievement",
    timestamp: "3 days ago",
    icon: <Trophy className="w-4 h-4" />,
  },
  {
    id: 4,
    type: "agent_created",
    title: "Created new agent 'Customer Support'",
    timestamp: "1 week ago",
    icon: <Bot className="w-4 h-4" />,
  },
];

const mockAchievements = [
  {
    id: 1,
    name: "Agent Creator",
    description: "Created 5+ agents",
    icon: "🤖",
    earned: true,
  },
  {
    id: 2,
    name: "Collaborator",
    description: "Set up team collaboration",
    icon: "🤝",
    earned: true,
  },
  {
    id: 3,
    name: "Voice Pioneer",
    description: "Used voice features",
    icon: "🎤",
    earned: true,
  },
  {
    id: 4,
    name: "Analytics Expert",
    description: "Viewed analytics 10+ times",
    icon: "📊",
    earned: true,
  },
  {
    id: 5,
    name: "Community Builder",
    description: "Shared 3+ templates",
    icon: "🌟",
    earned: false,
  },
  {
    id: 6,
    name: "Power User",
    description: "Reach level 15",
    icon: "⚡",
    earned: false,
  },
];

const Profile = () => {
  const [isEditing, setIsEditing] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [showPasswordChange, setShowPasswordChange] = useState(false);
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [formData, setFormData] = useState({
    username: "",
    email: "",
    phone_number: "",
    // bio: "",
  });
  const [userStats, setUserStats] = useState({
    total_agents: 0,
    total_conversations: 0,
    total_multi_agent_groups: 0,
    total_multi_agent_sessions: 0,
    has_wallet: false,
    last_activity: "1 day ago",
    collaboration_patterns_used: [],
    most_active_group: {
      additionalProp1: {},
    },
  });
  const { user, accessToken } = useAuth();
  const navigate = useNavigate();

  useEffect(() => {
    getUser();
    getUserStats();
  }, []);

  const handleSave = async () => {
    setIsLoading(true);
    const response = await axios.put("/api/users/profile", formData, {
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${accessToken}`,
      },
      withCredentials: true,
    });
    if (response.status === 200) {
      useNormalToast("Profile updated successfully");
    } else {
      useDestructiveToast("Profile update failed");
    }
    setIsLoading(false);
    setIsEditing(false);
  };

  const getUser = async () => {
    const res = await axios.get("/api/users/profile");
    setFormData({
      username: res.data.username,
      email: res.data.email,
      phone_number: res.data.phone_number,
      // bio: res.data.bio,
    });
  };

  const getUserStats = async () => {
    const res = await axios.get("/api/users/stats");
    if (res.status === 200) {
      setUserStats(res.data);
    } else {
      useDestructiveToast("Failed to fetch user stats");
    }
  };

  const handleCancel = () => {
    setFormData({
      username: "",
      email: "",
      phone_number: "",
      // bio: "",
    });
    setIsEditing(false);
  };

  const handlePasswordReset = async () => {
    const response = await axios.post("/api/auth/reset-password", {
      token: accessToken,
      new_password: password,
      confirm_password: confirmPassword,
    });
    if (response.status === 200) {
      useNormalToast("Password reset email sent");
      setShowPasswordChange(false);
    } else {
      useDestructiveToast("Failed to send password reset email");
      setShowPasswordChange(false);
    }
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
      <DashboardHeader />

      <div className="container mx-auto max-w-7xl px-6 py-8">
        <motion.div
          variants={containerVariants}
          initial="hidden"
          animate="visible"
          className="space-y-8"
        >
          {/* Page Header */}
          <motion.div
            variants={itemVariants}
            className="flex items-center justify-between"
          >
            <div>
              <h1 className="text-4xl font-bold text-foreground mb-2">
                Profile
              </h1>
              <p className="text-muted-foreground">
                Manage your account information and preferences
              </p>
            </div>
          </motion.div>

          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            {/* Left Column - Profile Info */}
            <div className="lg:col-span-2 space-y-6">
              {/* Profile Information Card */}
              <motion.div variants={itemVariants}>
                <Card className="bg-card/40 backdrop-blur-sm border border-border/50">
                  <CardHeader className="flex flex-row items-center justify-between">
                    <CardTitle className="flex items-center gap-2">
                      <User className="w-5 h-5" />
                      Profile Information
                    </CardTitle>
                    <Button
                      variant={isEditing ? "ghost" : "outline"}
                      size="sm"
                      onClick={() => setIsEditing(!isEditing)}
                    >
                      {isEditing ? (
                        <>
                          <X className="w-4 h-4 mr-2" />
                          Cancel
                        </>
                      ) : (
                        <>
                          <Edit3 className="w-4 h-4 mr-2" />
                          Edit Profile
                        </>
                      )}
                    </Button>
                  </CardHeader>
                  <CardContent className="space-y-6">
                    {/* Avatar Section */}
                    <div className="flex items-center gap-6">
                      <div className="relative">
                        <div className="w-24 h-24 rounded-full overflow-hidden">
                          <img
                            src={mockUser.avatar}
                            alt={user?.username}
                            className="w-full h-full object-cover"
                          />
                        </div>
                        {isEditing && (
                          <button className="absolute -bottom-2 -right-2 w-8 h-8 bg-primary rounded-full flex items-center justify-center hover:bg-primary/90 transition-colors">
                            <Camera className="w-4 h-4 text-white" />
                          </button>
                        )}
                      </div>
                      <div>
                        <h3 className="text-xl font-semibold text-foreground">
                          {user?.username}
                        </h3>
                        <p className="text-muted-foreground">
                          Level {mockUser.level} • {mockUser.xp} XP
                        </p>
                        <div className="flex items-center gap-2 mt-2">
                          <Calendar className="w-4 h-4 text-muted-foreground" />
                          <span className="text-sm text-muted-foreground">
                            Joined{" "}
                            {new Date(user?.created_at).toLocaleDateString()}
                          </span>
                        </div>
                      </div>
                    </div>

                    {/* Form Fields */}
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      <div className="space-y-2">
                        <Label htmlFor="username">Username</Label>
                        <Input
                          id="username"
                          value={formData.username}
                          onChange={(e) =>
                            setFormData({
                              ...formData,
                              username: e.target.value,
                            })
                          }
                          disabled={!isEditing}
                          className="bg-background/50"
                        />
                      </div>
                      <div className="space-y-2">
                        <Label htmlFor="email">Email Address</Label>
                        <Input
                          id="email"
                          type="email"
                          value={formData.email}
                          onChange={(e) =>
                            setFormData({ ...formData, email: e.target.value })
                          }
                          disabled={!isEditing}
                          className="bg-background/50"
                        />
                      </div>
                      <div className="space-y-2">
                        <Label htmlFor="phone_number">Phone Number</Label>
                        <Input
                          id="phone_number"
                          value={formData.phone_number}
                          onChange={(e) =>
                            setFormData({
                              ...formData,
                              phone_number: e.target.value,
                            })
                          }
                          disabled={!isEditing}
                          className="bg-background/50"
                          placeholder="Enter your phone number"
                        />
                      </div>

                      {/*
                      <div className="space-y-2">
                        <Label htmlFor="location">Location</Label>
                        <Input
                          id="location"
                          value={formData.location}
                          onChange={(e) =>
                            setFormData({
                              ...formData,
                              location: e.target.value,
                            })
                          }
                          disabled={!isEditing}
                          className="bg-background/50"
                          placeholder="City, Country"
                        />
                      </div>
                      <div className="space-y-2">
                        <Label htmlFor="website">Website</Label>
                        <Input
                          id="website"
                          value={formData.website}
                          onChange={(e) =>
                            setFormData({
                              ...formData,
                              website: e.target.value,
                            })
                          }
                          disabled={!isEditing}
                          className="bg-background/50"
                          placeholder="https://yourwebsite.com"
                        />
                      </div>
                    </div>

                    </div>

                    <div className="space-y-2">
                      <Label htmlFor="bio">Bio</Label>
                      <Textarea
                        id="bio"
                        value={formData.bio}
                        onChange={(e) =>
                          setFormData({ ...formData, bio: e.target.value })
                        }
                        disabled={!isEditing}
                        className="bg-background/50 min-h-[100px]"
                        placeholder="Tell us about yourself..."
                      />
                      */}
                    </div>

                    {isEditing && (
                      <div className="flex gap-3 pt-4">
                        <Button
                          onClick={handleSave}
                          disabled={isLoading}
                          className="bg-gradient-to-r from-primary to-accent hover:from-primary/90 hover:to-accent/90"
                        >
                          {isLoading ? (
                            <>
                              <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin mr-2" />
                              Saving...
                            </>
                          ) : (
                            <>
                              <Save className="w-4 h-4 mr-2" />
                              Save Changes
                            </>
                          )}
                        </Button>
                        <Button variant="outline" onClick={handleCancel}>
                          Cancel
                        </Button>
                      </div>
                    )}
                  </CardContent>
                </Card>
              </motion.div>

              {/* Account Security */}
              <motion.div variants={itemVariants}>
                <Card className="bg-card/40 backdrop-blur-sm border border-border/50">
                  <CardHeader>
                    <CardTitle className="flex items-center gap-2">
                      <Shield className="w-5 h-5" />
                      Account Security
                    </CardTitle>
                  </CardHeader>
                  <CardContent className="space-y-4">
                    <div className="flex items-center justify-between p-4 bg-card/30 rounded-lg">
                      <div className="flex items-center gap-3">
                        <Key className="w-5 h-5 text-muted-foreground" />
                        <div>
                          <h4 className="font-medium text-foreground">
                            Password
                          </h4>
                          <p className="text-sm text-muted-foreground">
                            Last changed 3 months ago
                          </p>
                        </div>
                      </div>
                      <Button
                        variant="outline"
                        size="sm"
                        onClick={() =>
                          setShowPasswordChange(!showPasswordChange)
                        }
                      >
                        Change Password
                      </Button>
                    </div>

                    <AnimatePresence>
                      {showPasswordChange && (
                        <motion.div
                          initial={{ height: 0, opacity: 0 }}
                          animate={{ height: "auto", opacity: 1 }}
                          exit={{ height: 0, opacity: 0 }}
                          transition={{ duration: 0.3 }}
                          className="overflow-hidden"
                        >
                          <div className="space-y-4 p-4 bg-card/20 rounded-lg">
                            {/*
                            <div className="space-y-2">
                              <Label htmlFor="current-password">
                                Current Password
                              </Label>
                              <Input
                                id="current-password"
                                type="password"
                                className="bg-background/50"
                              />
                            </div>
                            */}
                            <div className="space-y-2">
                              <Label htmlFor="new-password">New Password</Label>
                              <Input
                                id="new-password"
                                type="password"
                                value={password}
                                onChange={(e) => setPassword(e.target.value)}
                                className="bg-background/50"
                              />
                            </div>
                            <div className="space-y-2">
                              <Label htmlFor="confirm-password">
                                Confirm New Password
                              </Label>
                              <Input
                                id="confirm-password"
                                type="password"
                                value={confirmPassword}
                                onChange={(e) =>
                                  setConfirmPassword(e.target.value)
                                }
                                className="bg-background/50"
                              />
                            </div>
                            <div className="flex gap-2">
                              <Button size="sm">Update Password</Button>
                              <Button
                                variant="outline"
                                size="sm"
                                onClick={handlePasswordReset}
                              >
                                Cancel
                              </Button>
                            </div>
                          </div>
                        </motion.div>
                      )}
                    </AnimatePresence>

                    <div className="flex items-center justify-between p-4 bg-card/30 rounded-lg">
                      <div className="flex items-center gap-3">
                        <Lock className="w-5 h-5 text-muted-foreground" />
                        <div>
                          <h4 className="font-medium text-foreground">
                            Two-Factor Authentication
                          </h4>
                          <p className="text-sm text-muted-foreground">
                            Add an extra layer of security
                          </p>
                        </div>
                      </div>
                      <Button variant="outline" size="sm">
                        Enable 2FA
                      </Button>
                    </div>

                    <div className="flex items-center justify-between p-4 bg-card/30 rounded-lg">
                      <div className="flex items-center gap-3">
                        <Clock className="w-5 h-5 text-muted-foreground" />
                        <div>
                          <h4 className="font-medium text-foreground">
                            Login History
                          </h4>
                          <p className="text-sm text-muted-foreground">
                            View recent login activity
                          </p>
                        </div>
                      </div>
                      <Button variant="outline" size="sm">
                        View History
                      </Button>
                    </div>
                  </CardContent>
                </Card>
              </motion.div>
            </div>

            {/* Right Column - Stats and Activity */}
            <div className="space-y-6">
              {/* User Statistics */}
              <motion.div variants={itemVariants}>
                <Card className="bg-card/40 backdrop-blur-sm border border-border/50">
                  <CardHeader>
                    <CardTitle className="flex items-center gap-2">
                      <TrendingUp className="w-5 h-5" />
                      Statistics
                    </CardTitle>
                  </CardHeader>
                  <CardContent className="space-y-4">
                    <div className="grid grid-cols-2 gap-4">
                      <div className="text-center p-4 bg-card/30 rounded-lg">
                        <div className="text-2xl font-bold text-primary">
                          {userStats.total_agents}
                        </div>
                        <div className="text-sm text-muted-foreground">
                          Agents Created
                        </div>
                      </div>
                      <div className="text-center p-4 bg-card/30 rounded-lg">
                        <div className="text-2xl font-bold text-accent">
                          {userStats.total_multi_agent_groups}
                        </div>
                        <div className="text-sm text-muted-foreground">
                          Collaborations
                        </div>
                      </div>
                      <div className="text-center p-4 bg-card/30 rounded-lg">
                        <div className="text-2xl font-bold text-green-400">
                          {(userStats.total_conversations / 1000).toFixed(1)}K
                        </div>
                        <div className="text-sm text-muted-foreground">
                          Interactions
                        </div>
                      </div>
                      <div className="text-center p-4 bg-card/30 rounded-lg">
                        <div className="text-2xl font-bold text-yellow-400">
                          {mockStats.achievementsEarned}
                        </div>
                        <div className="text-sm text-muted-foreground">
                          Achievements
                        </div>
                      </div>
                    </div>

                    {/* XP Progress */}
                    <div className="space-y-2">
                      <div className="flex justify-between text-sm">
                        <span className="text-muted-foreground">
                          Level {mockUser.level} Progress
                        </span>
                        <span className="text-foreground font-medium">
                          {mockUser.xp}/{mockUser.nextLevelXp} XP
                        </span>
                      </div>
                      <div className="w-full bg-muted rounded-full h-3">
                        <motion.div
                          className="bg-gradient-to-r from-primary to-accent h-3 rounded-full"
                          initial={{ width: 0 }}
                          animate={{
                            width: `${(mockUser.xp / mockUser.nextLevelXp) * 100}%`,
                          }}
                          transition={{ duration: 1, delay: 0.5 }}
                        />
                      </div>
                    </div>
                  </CardContent>
                </Card>
              </motion.div>

              {/* Achievements */}
              <motion.div variants={itemVariants}>
                <Card className="bg-card/40 backdrop-blur-sm border border-border/50">
                  <CardHeader>
                    <CardTitle className="flex items-center gap-2">
                      <Trophy className="w-5 h-5" />
                      Achievements
                    </CardTitle>
                  </CardHeader>
                  <CardContent className="space-y-3">
                    {mockAchievements.map((achievement) => (
                      <motion.div
                        key={achievement.id}
                        className={`flex items-center gap-3 p-3 rounded-lg transition-all duration-300 ${
                          achievement.earned
                            ? "bg-card/30 border border-primary/20"
                            : "bg-card/10 opacity-60"
                        }`}
                        whileHover={achievement.earned ? { scale: 1.02 } : {}}
                      >
                        <div className="text-2xl">{achievement.icon}</div>
                        <div className="flex-1">
                          <div
                            className={`font-medium text-sm ${
                              achievement.earned
                                ? "text-foreground"
                                : "text-muted-foreground"
                            }`}
                          >
                            {achievement.name}
                          </div>
                          <div className="text-xs text-muted-foreground">
                            {achievement.description}
                          </div>
                        </div>
                        {achievement.earned && (
                          <Badge variant="secondary">Earned</Badge>
                        )}
                      </motion.div>
                    ))}
                  </CardContent>
                </Card>
              </motion.div>

              {/* Recent Activity */}
              <motion.div variants={itemVariants}>
                <Card className="bg-card/40 backdrop-blur-sm border border-border/50">
                  <CardHeader>
                    <CardTitle className="flex items-center gap-2">
                      <Activity className="w-5 h-5" />
                      Recent Activity
                    </CardTitle>
                  </CardHeader>
                  <CardContent className="space-y-3">
                    {mockRecentActivity.map((activity) => (
                      <motion.div
                        key={activity.id}
                        className="flex items-start gap-3 p-3 bg-card/30 rounded-lg hover:bg-card/40 transition-colors"
                        whileHover={{ x: 5 }}
                      >
                        <div
                          className={`w-8 h-8 rounded-full flex items-center justify-center ${
                            activity.type === "achievement"
                              ? "bg-yellow-500/20 text-yellow-400"
                              : activity.type === "collaboration"
                                ? "bg-blue-500/20 text-blue-400"
                                : "bg-green-500/20 text-green-400"
                          }`}
                        >
                          {activity.icon}
                        </div>
                        <div className="flex-1">
                          <div className="text-sm font-medium text-foreground">
                            {activity.title}
                          </div>
                          <div className="text-xs text-muted-foreground">
                            {activity.timestamp}
                          </div>
                        </div>
                      </motion.div>
                    ))}

                    <Button variant="outline" className="w-full mt-4">
                      View All Activity
                    </Button>
                  </CardContent>
                </Card>
              </motion.div>
            </div>
          </div>
        </motion.div>
      </div>
    </div>
  );
};

export default Profile;
