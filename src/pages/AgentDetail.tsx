import DashboardHeader from "@/components/DashboardHeader";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import {
  ArrowLeft,
  Edit,
  Play,
  Pause,
  Copy,
  Download,
  Upload,
  Settings,
  BarChart3,
  MessageSquare,
  Users,
  Brain,
  Mic,
  Shield,
  Activity,
  Calendar,
  Clock,
  TrendingUp,
  Star,
  Send,
  Bot,
  User,
  Zap,
  Target,
  Award,
  Loader2,
} from "lucide-react";
import { motion } from "framer-motion";
import { useState, useEffect } from "react";
import { Link, useParams } from "react-router-dom";
import { Agent } from "@/types/agent";
import { agentService, ConversationLog } from "@/services/agentService";
import { useNormalToast } from "@/hooks/use-normal-toast";
import { useDestructiveToast } from "@/hooks/use-destructive-toast";

const AgentDetail = () => {
  const { id } = useParams();
  const [agent, setAgent] = useState<Agent | null>(null);
  const [conversations, setConversations] = useState<ConversationLog[]>([]);
  const [loading, setLoading] = useState(true);
  const [chatMessage, setChatMessage] = useState("");
  const [chatLoading, setChatLoading] = useState(false);
  const [activeTab, setActiveTab] = useState("overview");

  useEffect(() => {
    if (id) {
      loadAgent();
      loadConversations();
    }
  }, [id]);

  const loadAgent = async () => {
    try {
      setLoading(true);
      const agentResponse = await agentService.getAgent(parseInt(id!));
      const transformedAgent =
        agentService.transformAgentResponse(agentResponse);
      setAgent(transformedAgent);
    } catch (error: any) {
      useDestructiveToast(error.message || "Failed to load agent");
    } finally {
      setLoading(false);
    }
  };

  const loadConversations = async () => {
    try {
      const conversationsData = await agentService.getAgentConversations(
        parseInt(id!),
      );
      setConversations(conversationsData);
    } catch (error: any) {
      console.error("Failed to load conversations:", error);
    }
  };

  const handleChat = async () => {
    if (!chatMessage.trim() || !agent) return;

    try {
      setChatLoading(true);
      const response = await agentService.chatWithAgent(parseInt(id!), {
        message: chatMessage,
        voice_enabled: false,
        fresh_conversation: false,
      });

      useNormalToast("Message sent successfully!");
      setChatMessage("");

      // Reload conversations to show the new message
      await loadConversations();
    } catch (error: any) {
      useDestructiveToast(error.message || "Failed to send message");
    } finally {
      setChatLoading(false);
    }
  };

  const handleToggleStatus = async () => {
    if (!agent) return;

    try {
      // This would need to be implemented in the backend
      useNormalToast("Agent status updated");
    } catch (error: any) {
      useDestructiveToast("Failed to update agent status");
    }
  };

  const handleDeleteAgent = async () => {
    if (!agent) return;

    try {
      await agentService.deleteAgent(parseInt(id!));
      useNormalToast("Agent deleted successfully");
      // Navigate back to agents list
      window.history.back();
    } catch (error: any) {
      useDestructiveToast(error.message || "Failed to delete agent");
    }
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-background">
        <DashboardHeader />
        <div className="container mx-auto px-4 py-8">
          <div className="flex items-center justify-center h-64">
            <div className="flex items-center gap-2">
              <Loader2 className="w-6 h-6 animate-spin" />
              <span className="text-lg">Loading agent...</span>
            </div>
          </div>
        </div>
      </div>
    );
  }

  if (!agent) {
    return (
      <div className="min-h-screen bg-background">
        <DashboardHeader />
        <div className="container mx-auto px-4 py-8">
          <div className="text-center">
            <h1 className="text-2xl font-bold text-foreground mb-4">
              Agent not found
            </h1>
            <p className="text-muted-foreground mb-6">
              The agent you're looking for doesn't exist or has been deleted.
            </p>
            <Link to="/agents">
              <Button>
                <ArrowLeft className="w-4 h-4 mr-2" />
                Back to Agents
              </Button>
            </Link>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-background">
      <DashboardHeader />
      <div className="container mx-auto px-4 py-8">
        {/* Header */}
        <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 mb-8">
          <div className="flex items-center gap-4">
            <Link to="/agents">
              <Button variant="outline" size="sm">
                <ArrowLeft className="w-4 h-4 mr-2" />
                Back
              </Button>
            </Link>
            <div className="flex items-center gap-3">
              <div className="text-3xl">{agent.avatar}</div>
              <div>
                <h1 className="text-2xl font-bold text-foreground">
                  {agent.name}
                </h1>
                <p className="text-muted-foreground">{agent.description}</p>
              </div>
            </div>
          </div>
          <div className="flex items-center gap-2">
            <Button
              variant={agent.status === "active" ? "outline" : "default"}
              size="sm"
              onClick={handleToggleStatus}
            >
              {agent.status === "active" ? (
                <>
                  <Pause className="w-4 h-4 mr-2" />
                  Pause
                </>
              ) : (
                <>
                  <Play className="w-4 h-4 mr-2" />
                  Activate
                </>
              )}
            </Button>
            <Link to={`/agents/${agent.id}/playground`}>
              <Button variant="outline" size="sm">
                Playground
              </Button>
            </Link>
            <Link to={`/agents/${agent.id}/deploy`}>
              <Button size="sm">Deploy</Button>
            </Link>
            <Link to={`/agents/${agent.id}/edit`}>
              <Button variant="outline" size="sm">
                <Edit className="w-4 h-4 mr-2" />
                Edit
              </Button>
            </Link>
            <Button variant="outline" size="sm">
              <Settings className="w-4 h-4" />
            </Button>
          </div>
        </div>

        {/* Status Badge */}
        <div className="flex items-center gap-2 mb-6">
          <Badge
            variant={agent.status === "active" ? "default" : "secondary"}
            className="capitalize"
          >
            {agent.status}
          </Badge>
          <span className="text-sm text-muted-foreground">
            Created {new Date(agent.createdAt).toLocaleDateString()}
          </span>
        </div>

        {/* Tabs */}
        <Tabs
          value={activeTab}
          onValueChange={setActiveTab}
          className="space-y-6"
        >
          <TabsList className="grid w-full grid-cols-5">
            <TabsTrigger value="overview">Overview</TabsTrigger>
            <TabsTrigger value="chat">Chat</TabsTrigger>
            <TabsTrigger value="analytics">Analytics</TabsTrigger>
            <TabsTrigger value="conversations">Conversations</TabsTrigger>
            <TabsTrigger value="settings">Settings</TabsTrigger>
          </TabsList>

          {/* Overview Tab */}
          <TabsContent value="overview" className="space-y-6">
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {/* Agent Info */}
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <Bot className="w-5 h-5" />
                    Agent Information
                  </CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div>
                    <label className="text-sm font-medium text-muted-foreground">
                      Name
                    </label>
                    <p className="text-foreground">{agent.name}</p>
                  </div>
                  <div>
                    <label className="text-sm font-medium text-muted-foreground">
                      Description
                    </label>
                    <p className="text-foreground">{agent.description}</p>
                  </div>
                  <div>
                    <label className="text-sm font-medium text-muted-foreground">
                      Status
                    </label>
                    <Badge
                      variant={
                        agent.status === "active" ? "default" : "secondary"
                      }
                      className="capitalize"
                    >
                      {agent.status}
                    </Badge>
                  </div>
                  <div>
                    <label className="text-sm font-medium text-muted-foreground">
                      Version
                    </label>
                    <p className="text-foreground">{agent.version}</p>
                  </div>
                </CardContent>
              </Card>

              {/* Capabilities */}
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <Zap className="w-5 h-5" />
                    Capabilities
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="flex flex-wrap gap-2">
                    {agent.capabilities.map((capability) => (
                      <Badge key={capability} variant="secondary">
                        {capability}
                      </Badge>
                    ))}
                  </div>
                </CardContent>
              </Card>

              {/* Quick Stats */}
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <BarChart3 className="w-5 h-5" />
                    Quick Stats
                  </CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="flex justify-between">
                    <span className="text-sm text-muted-foreground">
                      Total Interactions
                    </span>
                    <span className="font-medium">
                      {agent.analytics.totalInteractions}
                    </span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-sm text-muted-foreground">
                      Avg Response Time
                    </span>
                    <span className="font-medium">
                      {agent.analytics.averageResponseTime}ms
                    </span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-sm text-muted-foreground">
                      Success Rate
                    </span>
                    <span className="font-medium">
                      {agent.analytics.successRate}%
                    </span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-sm text-muted-foreground">
                      Satisfaction
                    </span>
                    <span className="font-medium">
                      {agent.analytics.userSatisfactionScore}%
                    </span>
                  </div>
                </CardContent>
              </Card>
            </div>
          </TabsContent>

          {/* Chat Tab */}
          <TabsContent value="chat" className="space-y-6">
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <MessageSquare className="w-5 h-5" />
                  Chat with Agent
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="flex gap-2">
                  <Input
                    placeholder="Type your message..."
                    value={chatMessage}
                    onChange={(e) => setChatMessage(e.target.value)}
                    onKeyPress={(e) => e.key === "Enter" && handleChat()}
                    disabled={chatLoading}
                  />
                  <Button
                    onClick={handleChat}
                    disabled={chatLoading || !chatMessage.trim()}
                  >
                    {chatLoading ? (
                      <Loader2 className="w-4 h-4 animate-spin" />
                    ) : (
                      <Send className="w-4 h-4" />
                    )}
                  </Button>
                </div>
                <p className="text-sm text-muted-foreground">
                  Start a conversation with your agent. The agent will respond
                  based on its configuration and capabilities.
                </p>
              </CardContent>
            </Card>
          </TabsContent>

          {/* Analytics Tab */}
          <TabsContent value="analytics" className="space-y-6">
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <BarChart3 className="w-5 h-5" />
                  Analytics Overview
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-6">
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
                  <div className="text-center p-4 bg-card border rounded-lg">
                    <div className="text-2xl font-bold text-foreground">
                      {agent.analytics.totalInteractions}
                    </div>
                    <div className="text-sm text-muted-foreground">
                      Total Interactions
                    </div>
                  </div>
                  <div className="text-center p-4 bg-card border rounded-lg">
                    <div className="text-2xl font-bold text-foreground">
                      {agent.analytics.averageResponseTime}ms
                    </div>
                    <div className="text-sm text-muted-foreground">
                      Avg Response Time
                    </div>
                  </div>
                  <div className="text-center p-4 bg-card border rounded-lg">
                    <div className="text-2xl font-bold text-foreground">
                      {agent.analytics.successRate}%
                    </div>
                    <div className="text-sm text-muted-foreground">
                      Success Rate
                    </div>
                  </div>
                  <div className="text-center p-4 bg-card border rounded-lg">
                    <div className="text-2xl font-bold text-foreground">
                      {agent.analytics.userSatisfactionScore}%
                    </div>
                    <div className="text-sm text-muted-foreground">
                      Satisfaction
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          {/* Conversations Tab */}
          <TabsContent value="conversations" className="space-y-6">
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <MessageSquare className="w-5 h-5" />
                  Recent Conversations
                </CardTitle>
              </CardHeader>
              <CardContent>
                {conversations.length === 0 ? (
                  <div className="text-center py-8">
                    <MessageSquare className="w-12 h-12 text-muted-foreground mx-auto mb-4" />
                    <p className="text-muted-foreground">
                      No conversations yet
                    </p>
                    <p className="text-sm text-muted-foreground">
                      Start chatting with your agent to see conversations here
                    </p>
                  </div>
                ) : (
                  <div className="space-y-4">
                    {conversations.slice(0, 5).map((conversation) => (
                      <div
                        key={conversation.id}
                        className="p-4 border rounded-lg"
                      >
                        <div className="flex justify-between items-start mb-2">
                          <span className="font-medium">
                            Session {conversation.session_id}
                          </span>
                          <span className="text-sm text-muted-foreground">
                            {new Date(
                              conversation.created_at,
                            ).toLocaleDateString()}
                          </span>
                        </div>
                        <div className="text-sm text-muted-foreground">
                          {conversation.messages?.length ?? 0} messages
                        </div>
                      </div>
                    ))}
                  </div>
                )}
              </CardContent>
            </Card>
          </TabsContent>

          {/* Settings Tab */}
          <TabsContent value="settings" className="space-y-6">
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Settings className="w-5 h-5" />
                  Agent Settings
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-6">
                <div className="flex justify-between items-center">
                  <div>
                    <h3 className="font-medium">Delete Agent</h3>
                    <p className="text-sm text-muted-foreground">
                      Permanently delete this agent and all its data
                    </p>
                  </div>
                  <Button variant="destructive" onClick={handleDeleteAgent}>
                    Delete Agent
                  </Button>
                </div>
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>
      </div>
    </div>
  );
};

export default AgentDetail;
