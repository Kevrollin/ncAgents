import DashboardHeader from "@/components/DashboardHeader";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Switch } from "@/components/ui/switch";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Slider } from "@/components/ui/slider";
import { Badge } from "@/components/ui/badge";
import {
  Settings as SettingsIcon,
  Palette,
  Bell,
  Mic,
  Shield,
  Bot,
  CreditCard,
  Globe,
  Moon,
  Sun,
  Volume2,
  Eye,
  EyeOff,
  Trash2,
  Save,
  AlertTriangle,
  Check,
  X,
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

const Settings = () => {
  const [activeTab, setActiveTab] = useState("general");
  const [hasUnsavedChanges, setHasUnsavedChanges] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  // General Settings State
  const [generalSettings, setGeneralSettings] = useState({
    theme: "system",
    language: "en",
    timezone: "America/Los_Angeles",
  });

  // Notification Settings State
  const [notificationSettings, setNotificationSettings] = useState({
    emailNotifications: true,
    pushNotifications: true,
    collaborationAlerts: true,
    achievementNotifications: true,
    weeklyDigest: false,
    marketingEmails: false,
  });

  // Voice Settings State
  const [voiceSettings, setVoiceSettings] = useState({
    defaultVoice: "alloy",
    speechRate: [1.0],
    voiceOutput: true,
    microphoneGain: [0.8],
  });

  // Privacy Settings State
  const [privacySettings, setPrivacySettings] = useState({
    profileVisibility: "public",
    dataSharing: false,
    analyticsTracking: true,
    sessionTimeout: 30,
  });

  // Agent Default Settings State
  const [agentSettings, setAgentSettings] = useState({
    defaultMemory: "standard",
    collaborationMode: "expert_panel",
    autoSave: true,
    templateSharing: true,
  });

  // Billing Settings State
  const [billingSettings, setBillingSettings] = useState({
    currentPlan: "Pro",
    billingCycle: "monthly",
    autoRenew: true,
  });

  const handleSave = async (section: string) => {
    setIsLoading(true);
    // Simulate API call
    await new Promise((resolve) => setTimeout(resolve, 1500));
    setIsLoading(false);
    setHasUnsavedChanges(false);
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
          <motion.div
            variants={itemVariants}
            className="flex items-center justify-between"
          >
            <div>
              <h1 className="text-4xl font-bold text-foreground mb-2">
                Settings
              </h1>
              <p className="text-muted-foreground">
                Customize your ncAGENTS experience
              </p>
            </div>
            {hasUnsavedChanges && (
              <Badge
                variant="secondary"
                className="bg-yellow-500/20 text-yellow-400 border-yellow-500/30"
              >
                Unsaved Changes
              </Badge>
            )}
          </motion.div>

          {/* Settings Tabs */}
          <motion.div variants={itemVariants}>
            <Tabs
              value={activeTab}
              onValueChange={setActiveTab}
              className="space-y-6"
            >
              <TabsList className="grid w-full grid-cols-3 lg:grid-cols-6 bg-card/40 backdrop-blur-sm">
                <TabsTrigger
                  value="general"
                  className="flex items-center gap-2"
                >
                  <Palette className="w-4 h-4" />
                  <span className="hidden sm:inline">General</span>
                </TabsTrigger>
                <TabsTrigger
                  value="notifications"
                  className="flex items-center gap-2"
                >
                  <Bell className="w-4 h-4" />
                  <span className="hidden sm:inline">Notifications</span>
                </TabsTrigger>
                <TabsTrigger value="voice" className="flex items-center gap-2">
                  <Mic className="w-4 h-4" />
                  <span className="hidden sm:inline">Voice</span>
                </TabsTrigger>
                <TabsTrigger
                  value="privacy"
                  className="flex items-center gap-2"
                >
                  <Shield className="w-4 h-4" />
                  <span className="hidden sm:inline">Privacy</span>
                </TabsTrigger>
                <TabsTrigger value="agents" className="flex items-center gap-2">
                  <Bot className="w-4 h-4" />
                  <span className="hidden sm:inline">Agents</span>
                </TabsTrigger>
                <TabsTrigger
                  value="billing"
                  className="flex items-center gap-2"
                >
                  <CreditCard className="w-4 h-4" />
                  <span className="hidden sm:inline">Billing</span>
                </TabsTrigger>
              </TabsList>

              {/* General Settings */}
              <TabsContent value="general" className="space-y-6">
                <Card className="bg-card/40 backdrop-blur-sm border border-border/50">
                  <CardHeader>
                    <CardTitle className="flex items-center gap-2">
                      <Palette className="w-5 h-5" />
                      General Preferences
                    </CardTitle>
                  </CardHeader>
                  <CardContent className="space-y-6">
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                      <div className="space-y-2">
                        <Label htmlFor="theme">Theme</Label>
                        <Select
                          value={generalSettings.theme}
                          onValueChange={(value) => {
                            setGeneralSettings({
                              ...generalSettings,
                              theme: value,
                            });
                            setHasUnsavedChanges(true);
                          }}
                        >
                          <SelectTrigger className="bg-background/50">
                            <SelectValue />
                          </SelectTrigger>
                          <SelectContent>
                            <SelectItem value="light">
                              <div className="flex items-center gap-2">
                                <Sun className="w-4 h-4" />
                                Light
                              </div>
                            </SelectItem>
                            <SelectItem value="dark">
                              <div className="flex items-center gap-2">
                                <Moon className="w-4 h-4" />
                                Dark
                              </div>
                            </SelectItem>
                            <SelectItem value="system">
                              <div className="flex items-center gap-2">
                                <SettingsIcon className="w-4 h-4" />
                                System
                              </div>
                            </SelectItem>
                          </SelectContent>
                        </Select>
                      </div>

                      <div className="space-y-2">
                        <Label htmlFor="language">Language</Label>
                        <Select
                          value={generalSettings.language}
                          onValueChange={(value) => {
                            setGeneralSettings({
                              ...generalSettings,
                              language: value,
                            });
                            setHasUnsavedChanges(true);
                          }}
                        >
                          <SelectTrigger className="bg-background/50">
                            <SelectValue />
                          </SelectTrigger>
                          <SelectContent>
                            <SelectItem value="en">English</SelectItem>
                            <SelectItem value="es">Español</SelectItem>
                            <SelectItem value="fr">Français</SelectItem>
                            <SelectItem value="de">Deutsch</SelectItem>
                            <SelectItem value="zh">中文</SelectItem>
                          </SelectContent>
                        </Select>
                      </div>

                      <div className="space-y-2">
                        <Label htmlFor="timezone">Timezone</Label>
                        <Select
                          value={generalSettings.timezone}
                          onValueChange={(value) => {
                            setGeneralSettings({
                              ...generalSettings,
                              timezone: value,
                            });
                            setHasUnsavedChanges(true);
                          }}
                        >
                          <SelectTrigger className="bg-background/50">
                            <SelectValue />
                          </SelectTrigger>
                          <SelectContent>
                            <SelectItem value="America/Los_Angeles">
                              Pacific Time (PT)
                            </SelectItem>
                            <SelectItem value="America/New_York">
                              Eastern Time (ET)
                            </SelectItem>
                            <SelectItem value="Europe/London">
                              Greenwich Mean Time (GMT)
                            </SelectItem>
                            <SelectItem value="Europe/Paris">
                              Central European Time (CET)
                            </SelectItem>
                            <SelectItem value="Asia/Tokyo">
                              Japan Standard Time (JST)
                            </SelectItem>
                          </SelectContent>
                        </Select>
                      </div>
                    </div>

                    <div className="flex gap-3 pt-4">
                      <Button
                        onClick={() => handleSave("general")}
                        disabled={isLoading || !hasUnsavedChanges}
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
                    </div>
                  </CardContent>
                </Card>
              </TabsContent>

              {/* Notifications Settings */}
              <TabsContent value="notifications" className="space-y-6">
                <Card className="bg-card/40 backdrop-blur-sm border border-border/50">
                  <CardHeader>
                    <CardTitle className="flex items-center gap-2">
                      <Bell className="w-5 h-5" />
                      Notification Preferences
                    </CardTitle>
                  </CardHeader>
                  <CardContent className="space-y-6">
                    <div className="space-y-4">
                      {[
                        {
                          key: "emailNotifications",
                          label: "Email Notifications",
                          description: "Receive notifications via email",
                        },
                        {
                          key: "pushNotifications",
                          label: "Push Notifications",
                          description: "Browser push notifications",
                        },
                        {
                          key: "collaborationAlerts",
                          label: "Collaboration Alerts",
                          description: "Notifications for team activities",
                        },
                        {
                          key: "achievementNotifications",
                          label: "Achievement Notifications",
                          description: "Celebrate your milestones",
                        },
                        {
                          key: "weeklyDigest",
                          label: "Weekly Digest",
                          description: "Summary of your weekly activity",
                        },
                        {
                          key: "marketingEmails",
                          label: "Marketing Emails",
                          description: "Product updates and tips",
                        },
                      ].map((setting) => (
                        <div
                          key={setting.key}
                          className="flex items-center justify-between p-4 bg-card/30 rounded-lg"
                        >
                          <div>
                            <h4 className="font-medium text-foreground">
                              {setting.label}
                            </h4>
                            <p className="text-sm text-muted-foreground">
                              {setting.description}
                            </p>
                          </div>
                          <Switch
                            checked={
                              notificationSettings[
                                setting.key as keyof typeof notificationSettings
                              ]
                            }
                            onCheckedChange={(checked) => {
                              setNotificationSettings({
                                ...notificationSettings,
                                [setting.key]: checked,
                              });
                              setHasUnsavedChanges(true);
                            }}
                          />
                        </div>
                      ))}
                    </div>

                    <div className="flex gap-3 pt-4">
                      <Button
                        onClick={() => handleSave("notifications")}
                        disabled={isLoading || !hasUnsavedChanges}
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
                    </div>
                  </CardContent>
                </Card>
              </TabsContent>

              {/* Voice Settings */}
              <TabsContent value="voice" className="space-y-6">
                <Card className="bg-card/40 backdrop-blur-sm border border-border/50">
                  <CardHeader>
                    <CardTitle className="flex items-center gap-2">
                      <Mic className="w-5 h-5" />
                      Voice & Audio Settings
                    </CardTitle>
                  </CardHeader>
                  <CardContent className="space-y-6">
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                      <div className="space-y-2">
                        <Label htmlFor="voice">Default Voice</Label>
                        <Select
                          value={voiceSettings.defaultVoice}
                          onValueChange={(value) => {
                            setVoiceSettings({
                              ...voiceSettings,
                              defaultVoice: value,
                            });
                            setHasUnsavedChanges(true);
                          }}
                        >
                          <SelectTrigger className="bg-background/50">
                            <SelectValue />
                          </SelectTrigger>
                          <SelectContent>
                            <SelectItem value="alloy">
                              Alloy (Neutral)
                            </SelectItem>
                            <SelectItem value="echo">Echo (Male)</SelectItem>
                            <SelectItem value="fable">
                              Fable (British)
                            </SelectItem>
                            <SelectItem value="onyx">Onyx (Deep)</SelectItem>
                            <SelectItem value="nova">Nova (Female)</SelectItem>
                            <SelectItem value="shimmer">
                              Shimmer (Soft)
                            </SelectItem>
                          </SelectContent>
                        </Select>
                      </div>

                      <div className="space-y-2">
                        <div className="flex items-center justify-between">
                          <Label>Voice Output</Label>
                          <Switch
                            checked={voiceSettings.voiceOutput}
                            onCheckedChange={(checked) => {
                              setVoiceSettings({
                                ...voiceSettings,
                                voiceOutput: checked,
                              });
                              setHasUnsavedChanges(true);
                            }}
                          />
                        </div>
                      </div>
                    </div>

                    <div className="space-y-4">
                      <div className="space-y-2">
                        <div className="flex items-center justify-between">
                          <Label>Speech Rate</Label>
                          <span className="text-sm text-muted-foreground">
                            {voiceSettings.speechRate[0]}x
                          </span>
                        </div>
                        <Slider
                          value={voiceSettings.speechRate}
                          onValueChange={(value) => {
                            setVoiceSettings({
                              ...voiceSettings,
                              speechRate: value,
                            });
                            setHasUnsavedChanges(true);
                          }}
                          max={2}
                          min={0.5}
                          step={0.1}
                          className="w-full"
                        />
                      </div>

                      <div className="space-y-2">
                        <div className="flex items-center justify-between">
                          <Label>Microphone Gain</Label>
                          <span className="text-sm text-muted-foreground">
                            {Math.round(voiceSettings.microphoneGain[0] * 100)}%
                          </span>
                        </div>
                        <Slider
                          value={voiceSettings.microphoneGain}
                          onValueChange={(value) => {
                            setVoiceSettings({
                              ...voiceSettings,
                              microphoneGain: value,
                            });
                            setHasUnsavedChanges(true);
                          }}
                          max={1}
                          min={0}
                          step={0.1}
                          className="w-full"
                        />
                      </div>
                    </div>

                    <div className="flex gap-3 pt-4">
                      <Button
                        onClick={() => handleSave("voice")}
                        disabled={isLoading || !hasUnsavedChanges}
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
                      <Button variant="outline">
                        <Volume2 className="w-4 h-4 mr-2" />
                        Test Voice
                      </Button>
                    </div>
                  </CardContent>
                </Card>
              </TabsContent>

              {/* Privacy Settings */}
              <TabsContent value="privacy" className="space-y-6">
                <Card className="bg-card/40 backdrop-blur-sm border border-border/50">
                  <CardHeader>
                    <CardTitle className="flex items-center gap-2">
                      <Shield className="w-5 h-5" />
                      Privacy & Security
                    </CardTitle>
                  </CardHeader>
                  <CardContent className="space-y-6">
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                      <div className="space-y-2">
                        <Label htmlFor="visibility">Profile Visibility</Label>
                        <Select
                          value={privacySettings.profileVisibility}
                          onValueChange={(value) => {
                            setPrivacySettings({
                              ...privacySettings,
                              profileVisibility: value,
                            });
                            setHasUnsavedChanges(true);
                          }}
                        >
                          <SelectTrigger className="bg-background/50">
                            <SelectValue />
                          </SelectTrigger>
                          <SelectContent>
                            <SelectItem value="public">
                              <div className="flex items-center gap-2">
                                <Eye className="w-4 h-4" />
                                Public
                              </div>
                            </SelectItem>
                            <SelectItem value="private">
                              <div className="flex items-center gap-2">
                                <EyeOff className="w-4 h-4" />
                                Private
                              </div>
                            </SelectItem>
                          </SelectContent>
                        </Select>
                      </div>

                      <div className="space-y-2">
                        <Label htmlFor="session">
                          Session Timeout (minutes)
                        </Label>
                        <Input
                          id="session"
                          type="number"
                          value={privacySettings.sessionTimeout}
                          onChange={(e) => {
                            setPrivacySettings({
                              ...privacySettings,
                              sessionTimeout: parseInt(e.target.value),
                            });
                            setHasUnsavedChanges(true);
                          }}
                          className="bg-background/50"
                        />
                      </div>
                    </div>

                    <div className="space-y-4">
                      {[
                        {
                          key: "dataSharing",
                          label: "Data Sharing",
                          description:
                            "Share anonymized usage data to improve the platform",
                        },
                        {
                          key: "analyticsTracking",
                          label: "Analytics Tracking",
                          description:
                            "Allow analytics tracking for better user experience",
                        },
                      ].map((setting) => (
                        <div
                          key={setting.key}
                          className="flex items-center justify-between p-4 bg-card/30 rounded-lg"
                        >
                          <div>
                            <h4 className="font-medium text-foreground">
                              {setting.label}
                            </h4>
                            <p className="text-sm text-muted-foreground">
                              {setting.description}
                            </p>
                          </div>
                          <Switch
                            checked={
                              privacySettings[
                                setting.key as keyof typeof privacySettings
                              ] as boolean
                            }
                            onCheckedChange={(checked) => {
                              setPrivacySettings({
                                ...privacySettings,
                                [setting.key]: checked,
                              });
                              setHasUnsavedChanges(true);
                            }}
                          />
                        </div>
                      ))}
                    </div>

                    <div className="flex gap-3 pt-4">
                      <Button
                        onClick={() => handleSave("privacy")}
                        disabled={isLoading || !hasUnsavedChanges}
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
                    </div>
                  </CardContent>
                </Card>
              </TabsContent>

              {/* Agent Defaults */}
              <TabsContent value="agents" className="space-y-6">
                <Card className="bg-card/40 backdrop-blur-sm border border-border/50">
                  <CardHeader>
                    <CardTitle className="flex items-center gap-2">
                      <Bot className="w-5 h-5" />
                      Agent Default Settings
                    </CardTitle>
                  </CardHeader>
                  <CardContent className="space-y-6">
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                      <div className="space-y-2">
                        <Label htmlFor="memory">Default Memory Setting</Label>
                        <Select
                          value={agentSettings.defaultMemory}
                          onValueChange={(value) => {
                            setAgentSettings({
                              ...agentSettings,
                              defaultMemory: value,
                            });
                            setHasUnsavedChanges(true);
                          }}
                        >
                          <SelectTrigger className="bg-background/50">
                            <SelectValue />
                          </SelectTrigger>
                          <SelectContent>
                            <SelectItem value="basic">Basic (1GB)</SelectItem>
                            <SelectItem value="standard">
                              Standard (5GB)
                            </SelectItem>
                            <SelectItem value="advanced">
                              Advanced (25GB)
                            </SelectItem>
                            <SelectItem value="unlimited">Unlimited</SelectItem>
                          </SelectContent>
                        </Select>
                      </div>

                      <div className="space-y-2">
                        <Label htmlFor="collaboration">
                          Default Collaboration Mode
                        </Label>
                        <Select
                          value={agentSettings.collaborationMode}
                          onValueChange={(value) => {
                            setAgentSettings({
                              ...agentSettings,
                              collaborationMode: value,
                            });
                            setHasUnsavedChanges(true);
                          }}
                        >
                          <SelectTrigger className="bg-background/50">
                            <SelectValue />
                          </SelectTrigger>
                          <SelectContent>
                            <SelectItem value="expert_panel">
                              Expert Panel
                            </SelectItem>
                            <SelectItem value="debate">Debate Mode</SelectItem>
                            <SelectItem value="task_chain">
                              Task Chain
                            </SelectItem>
                            <SelectItem value="parallel">
                              Parallel Processing
                            </SelectItem>
                          </SelectContent>
                        </Select>
                      </div>
                    </div>

                    <div className="space-y-4">
                      {[
                        {
                          key: "autoSave",
                          label: "Auto-Save Agent Configurations",
                          description:
                            "Automatically save changes to agent settings",
                        },
                        {
                          key: "templateSharing",
                          label: "Template Sharing",
                          description:
                            "Allow sharing of your agent templates with the community",
                        },
                      ].map((setting) => (
                        <div
                          key={setting.key}
                          className="flex items-center justify-between p-4 bg-card/30 rounded-lg"
                        >
                          <div>
                            <h4 className="font-medium text-foreground">
                              {setting.label}
                            </h4>
                            <p className="text-sm text-muted-foreground">
                              {setting.description}
                            </p>
                          </div>
                          <Switch
                            checked={
                              agentSettings[
                                setting.key as keyof typeof agentSettings
                              ] as boolean
                            }
                            onCheckedChange={(checked) => {
                              setAgentSettings({
                                ...agentSettings,
                                [setting.key]: checked,
                              });
                              setHasUnsavedChanges(true);
                            }}
                          />
                        </div>
                      ))}
                    </div>

                    <div className="flex gap-3 pt-4">
                      <Button
                        onClick={() => handleSave("agents")}
                        disabled={isLoading || !hasUnsavedChanges}
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
                    </div>
                  </CardContent>
                </Card>
              </TabsContent>

              {/* Billing Settings */}
              <TabsContent value="billing" className="space-y-6">
                <Card className="bg-card/40 backdrop-blur-sm border border-border/50">
                  <CardHeader>
                    <CardTitle className="flex items-center gap-2">
                      <CreditCard className="w-5 h-5" />
                      Billing & Subscription
                    </CardTitle>
                  </CardHeader>
                  <CardContent className="space-y-6">
                    {/* Current Plan */}
                    <div className="p-6 bg-gradient-to-r from-primary/10 to-accent/10 rounded-lg border border-primary/20">
                      <div className="flex items-center justify-between mb-4">
                        <div>
                          <h3 className="text-xl font-semibold text-foreground">
                            Current Plan: {billingSettings.currentPlan}
                          </h3>
                          <p className="text-muted-foreground">
                            Billed {billingSettings.billingCycle}
                          </p>
                        </div>
                        <Badge className="bg-green-500/20 text-green-400 border-green-500/30">
                          Active
                        </Badge>
                      </div>
                      <div className="grid grid-cols-1 md:grid-cols-3 gap-4 text-center">
                        <div>
                          <div className="text-2xl font-bold text-primary">
                            Unlimited
                          </div>
                          <div className="text-sm text-muted-foreground">
                            AI Agents
                          </div>
                        </div>
                        <div>
                          <div className="text-2xl font-bold text-accent">
                            50GB
                          </div>
                          <div className="text-sm text-muted-foreground">
                            Memory
                          </div>
                        </div>
                        <div>
                          <div className="text-2xl font-bold text-green-400">
                            Priority
                          </div>
                          <div className="text-sm text-muted-foreground">
                            Support
                          </div>
                        </div>
                      </div>
                    </div>

                    {/* Billing Cycle */}
                    <div className="space-y-4">
                      <div className="flex items-center justify-between p-4 bg-card/30 rounded-lg">
                        <div>
                          <h4 className="font-medium text-foreground">
                            Auto-Renewal
                          </h4>
                          <p className="text-sm text-muted-foreground">
                            Automatically renew your subscription
                          </p>
                        </div>
                        <Switch
                          checked={billingSettings.autoRenew}
                          onCheckedChange={(checked) => {
                            setBillingSettings({
                              ...billingSettings,
                              autoRenew: checked,
                            });
                            setHasUnsavedChanges(true);
                          }}
                        />
                      </div>
                    </div>

                    {/* Payment Method */}
                    <div className="space-y-4">
                      <h4 className="font-medium text-foreground">
                        Payment Method
                      </h4>
                      <div className="p-4 bg-card/30 rounded-lg border border-border/50">
                        <div className="flex items-center justify-between">
                          <div className="flex items-center gap-3">
                            <div className="w-10 h-6 bg-gradient-to-r from-blue-500 to-blue-600 rounded flex items-center justify-center">
                              <span className="text-white text-xs font-bold">
                                VISA
                              </span>
                            </div>
                            <div>
                              <div className="font-medium text-foreground">
                                •••• •••• •••• 4242
                              </div>
                              <div className="text-sm text-muted-foreground">
                                Expires 12/25
                              </div>
                            </div>
                          </div>
                          <Button variant="outline" size="sm">
                            Update
                          </Button>
                        </div>
                      </div>
                    </div>

                    {/* Billing History */}
                    <div className="space-y-4">
                      <div className="flex items-center justify-between">
                        <h4 className="font-medium text-foreground">
                          Recent Invoices
                        </h4>
                        <Button variant="outline" size="sm">
                          View All
                        </Button>
                      </div>
                      <div className="space-y-2">
                        {[
                          {
                            date: "2024-01-01",
                            amount: "$29.00",
                            status: "Paid",
                          },
                          {
                            date: "2023-12-01",
                            amount: "$29.00",
                            status: "Paid",
                          },
                          {
                            date: "2023-11-01",
                            amount: "$29.00",
                            status: "Paid",
                          },
                        ].map((invoice, index) => (
                          <div
                            key={index}
                            className="flex items-center justify-between p-3 bg-card/20 rounded-lg"
                          >
                            <div className="flex items-center gap-3">
                              <div>
                                <div className="font-medium text-foreground">
                                  {invoice.date}
                                </div>
                                <div className="text-sm text-muted-foreground">
                                  Pro Plan
                                </div>
                              </div>
                            </div>
                            <div className="flex items-center gap-3">
                              <span className="font-medium text-foreground">
                                {invoice.amount}
                              </span>
                              <Badge
                                variant="secondary"
                                className="bg-green-500/20 text-green-400 border-green-500/30"
                              >
                                {invoice.status}
                              </Badge>
                            </div>
                          </div>
                        ))}
                      </div>
                    </div>

                    {/* Plan Management */}
                    <div className="flex gap-3 pt-4">
                      <Button variant="outline">Upgrade Plan</Button>
                      <Button variant="outline">Downgrade Plan</Button>
                      <Button
                        variant="outline"
                        className="text-red-500 hover:text-red-400 hover:border-red-500/50"
                      >
                        <Trash2 className="w-4 h-4 mr-2" />
                        Cancel Subscription
                      </Button>
                    </div>
                  </CardContent>
                </Card>
              </TabsContent>

              {/* Danger Zone */}
              <Card className="bg-red-500/5 border-red-500/20">
                <CardHeader>
                  <CardTitle className="flex items-center gap-2 text-red-500">
                    <AlertTriangle className="w-5 h-5" />
                    Danger Zone
                  </CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="flex items-center justify-between p-4 bg-red-500/10 rounded-lg border border-red-500/20">
                    <div>
                      <h4 className="font-medium text-foreground">
                        Delete Account
                      </h4>
                      <p className="text-sm text-muted-foreground">
                        Permanently delete your account and all data
                      </p>
                    </div>
                    <Button
                      variant="outline"
                      className="text-red-500 hover:text-red-400 hover:border-red-500/50"
                    >
                      <Trash2 className="w-4 h-4 mr-2" />
                      Delete Account
                    </Button>
                  </div>
                </CardContent>
              </Card>
            </Tabs>
          </motion.div>
        </motion.div>
      </div>
    </div>
  );
};

export default Settings;
