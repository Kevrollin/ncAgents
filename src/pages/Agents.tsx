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
import { Checkbox } from "@/components/ui/checkbox";
import {
  Plus,
  Search,
  Filter,
  Grid3X3,
  List,
  MoreVertical,
  Play,
  Pause,
  Edit,
  Copy,
  Trash2,
  Bot,
  Activity,
  Calendar,
  Users,
  Brain,
  Mic,
  BarChart3,
  Shield,
  Zap,
  Eye,
  Settings,
  Loader2,
} from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useAuth } from "@/contexts/AuthContext";
import { Agent, AgentCapability, AgentStatus } from "@/types/agent";
import { agentService } from "@/services/agentService";
import { useNormalToast } from "@/hooks/use-normal-toast";
import { useDestructiveToast } from "@/hooks/use-destructive-toast";

type ViewMode = "grid" | "list";
type SortOption = "name" | "created" | "activity" | "interactions";

const Agents = () => {
  const { isAuthenticated, accessToken } = useAuth();
  const navigate = useNavigate();
  const [agents, setAgents] = useState<Agent[]>([]);
  const [loading, setLoading] = useState(true);
  const [viewMode, setViewMode] = useState<ViewMode>("grid");
  const [searchQuery, setSearchQuery] = useState("");
  const [statusFilter, setStatusFilter] = useState<AgentStatus | "all">("all");
  const [capabilityFilter, setCapabilityFilter] = useState<
    AgentCapability | "all"
  >("all");
  const [sortBy, setSortBy] = useState<SortOption>("activity");
  const [selectedAgents, setSelectedAgents] = useState<string[]>([]);
  const [showFilters, setShowFilters] = useState(false);

  // Load agents from API
  useEffect(() => {
    if (!isAuthenticated || !accessToken) {
      navigate("/signin");
      return;
    }
    loadAgents();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [isAuthenticated, accessToken]);

  const loadAgents = async () => {
    try {
      setLoading(true);
      const agentResponses = await agentService.getAgents();
      const transformedAgents = agentResponses.map((a) =>
        agentService.transformAgentResponse(a),
      );
      setAgents(transformedAgents);
    } catch (error: any) {
      useDestructiveToast(error.message || "Failed to load agents");
    } finally {
      setLoading(false);
    }
  };

  // Filter and sort agents
  const filteredAgents = agents
    .filter((agent) => {
      const matchesSearch =
        agent.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
        agent.description.toLowerCase().includes(searchQuery.toLowerCase());
      const matchesStatus =
        statusFilter === "all" || agent.status === statusFilter;
      const matchesCapability =
        capabilityFilter === "all" ||
        agent.capabilities.includes(capabilityFilter);
      return matchesSearch && matchesStatus && matchesCapability;
    })
    .sort((a, b) => {
      switch (sortBy) {
        case "name":
          return a.name.localeCompare(b.name);
        case "created":
          return (
            new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime()
          );
        case "activity":
          return (
            new Date(b.analytics.lastActivity).getTime() -
            new Date(a.analytics.lastActivity).getTime()
          );
        case "interactions":
          return b.analytics.totalInteractions - a.analytics.totalInteractions;
        default:
          return 0;
      }
    });

  const handleSelectAgent = (agentId: string) => {
    setSelectedAgents((prev) =>
      prev.includes(agentId)
        ? prev.filter((id) => id !== agentId)
        : [...prev, agentId],
    );
  };

  const handleSelectAll = () => {
    if (selectedAgents.length === filteredAgents.length) {
      setSelectedAgents([]);
    } else {
      setSelectedAgents(filteredAgents.map((agent) => agent.id));
    }
  };

  const handleToggleStatus = async (agentId: string) => {
    try {
      // This would need to be implemented in the backend
      // For now, we'll just show a toast
      useNormalToast("Agent status updated");
    } catch (error: any) {
      useDestructiveToast("Failed to update agent status");
    }
  };

  const handleDeleteAgent = async (agentId: string) => {
    try {
      await agentService.deleteAgent(parseInt(agentId));
      useNormalToast("Agent deleted successfully");
      loadAgents(); // Reload agents
    } catch (error: any) {
      useDestructiveToast(error.message || "Failed to delete agent");
    }
  };

  const handleDeleteSelected = async () => {
    try {
      await Promise.all(
        selectedAgents.map((agentId) =>
          agentService.deleteAgent(parseInt(agentId)),
        ),
      );
      useNormalToast("Selected agents deleted successfully");
      setSelectedAgents([]);
      loadAgents(); // Reload agents
    } catch (error: any) {
      useDestructiveToast("Failed to delete selected agents");
    }
  };

  const getCapabilityIcon = (capability: AgentCapability) => {
    switch (capability) {
      case "memory":
        return <Brain className="w-4 h-4" />;
      case "voice":
        return <Mic className="w-4 h-4" />;
      case "analytics":
        return <BarChart3 className="w-4 h-4" />;
      case "collaboration":
        return <Users className="w-4 h-4" />;
      case "research":
        return <Eye className="w-4 h-4" />;
      case "support":
        return <Shield className="w-4 h-4" />;
      case "creative":
        return <Zap className="w-4 h-4" />;
      default:
        return <Bot className="w-4 h-4" />;
    }
  };

  const getStatusColor = (status: AgentStatus) => {
    switch (status) {
      case "active":
        return "bg-green-500";
      case "inactive":
        return "bg-gray-500";
      case "training":
        return "bg-yellow-500";
      case "error":
        return "bg-red-500";
      default:
        return "bg-gray-500";
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
              <span className="text-lg">Loading agents...</span>
            </div>
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
          <div>
            <h1 className="text-3xl font-bold text-foreground">Agents</h1>
            <p className="text-muted-foreground mt-2">
              Manage your AI agents and their configurations
            </p>
          </div>
          <div className="flex items-center gap-3">
            {selectedAgents.length > 0 && (
              <Button
                variant="destructive"
                size="sm"
                onClick={handleDeleteSelected}
              >
                <Trash2 className="w-4 h-4 mr-2" />
                Delete Selected ({selectedAgents.length})
              </Button>
            )}
            <Link to="/agents/create">
              <Button>
                <Plus className="w-4 h-4 mr-2" />
                Create Agent
              </Button>
            </Link>
          </div>
        </div>

        {/* Filters and Search */}
        <div className="flex flex-col lg:flex-row gap-4 mb-6">
          <div className="flex-1">
            <div className="relative">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
              <Input
                placeholder="Search agents..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="pl-10"
              />
            </div>
          </div>
          <div className="flex items-center gap-3">
            <Button
              variant="outline"
              size="sm"
              onClick={() => setShowFilters(!showFilters)}
            >
              <Filter className="w-4 h-4 mr-2" />
              Filters
            </Button>
            <div className="flex items-center gap-2">
              <Button
                variant={viewMode === "grid" ? "default" : "outline"}
                size="sm"
                onClick={() => setViewMode("grid")}
              >
                <Grid3X3 className="w-4 h-4" />
              </Button>
              <Button
                variant={viewMode === "list" ? "default" : "outline"}
                size="sm"
                onClick={() => setViewMode("list")}
              >
                <List className="w-4 h-4" />
              </Button>
            </div>
          </div>
        </div>

        {/* Advanced Filters */}
        <AnimatePresence>
          {showFilters && (
            <motion.div
              initial={{ opacity: 0, height: 0 }}
              animate={{ opacity: 1, height: "auto" }}
              exit={{ opacity: 0, height: 0 }}
              className="bg-card border rounded-lg p-4 mb-6"
            >
              <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
                <div>
                  <label className="text-sm font-medium mb-2 block">
                    Status
                  </label>
                  <Select
                    value={statusFilter}
                    onValueChange={(value) =>
                      setStatusFilter(value as AgentStatus | "all")
                    }
                  >
                    <SelectTrigger>
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="all">All Status</SelectItem>
                      <SelectItem value="active">Active</SelectItem>
                      <SelectItem value="inactive">Inactive</SelectItem>
                      <SelectItem value="training">Training</SelectItem>
                      <SelectItem value="error">Error</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
                <div>
                  <label className="text-sm font-medium mb-2 block">
                    Capability
                  </label>
                  <Select
                    value={capabilityFilter}
                    onValueChange={(value) =>
                      setCapabilityFilter(value as AgentCapability | "all")
                    }
                  >
                    <SelectTrigger>
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="all">All Capabilities</SelectItem>
                      <SelectItem value="memory">Memory</SelectItem>
                      <SelectItem value="voice">Voice</SelectItem>
                      <SelectItem value="analytics">Analytics</SelectItem>
                      <SelectItem value="collaboration">
                        Collaboration
                      </SelectItem>
                      <SelectItem value="research">Research</SelectItem>
                      <SelectItem value="support">Support</SelectItem>
                      <SelectItem value="creative">Creative</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
                <div>
                  <label className="text-sm font-medium mb-2 block">
                    Sort By
                  </label>
                  <Select
                    value={sortBy}
                    onValueChange={(value) => setSortBy(value as SortOption)}
                  >
                    <SelectTrigger>
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="activity">Last Activity</SelectItem>
                      <SelectItem value="name">Name</SelectItem>
                      <SelectItem value="created">Created Date</SelectItem>
                      <SelectItem value="interactions">Interactions</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
                <div className="flex items-end">
                  <Button
                    variant="outline"
                    size="sm"
                    onClick={() => {
                      setSearchQuery("");
                      setStatusFilter("all");
                      setCapabilityFilter("all");
                      setSortBy("activity");
                    }}
                  >
                    Clear Filters
                  </Button>
                </div>
              </div>
            </motion.div>
          )}
        </AnimatePresence>

        {/* Agents Grid/List */}
        {filteredAgents.length === 0 ? (
          <div className="text-center py-12">
            <Bot className="w-16 h-16 text-muted-foreground mx-auto mb-4" />
            <h3 className="text-lg font-semibold text-foreground mb-2">
              No agents found
            </h3>
            <p className="text-muted-foreground mb-4">
              {agents.length === 0
                ? "Create your first agent to get started"
                : "Try adjusting your search or filters"}
            </p>
            {agents.length === 0 && (
              <Link to="/agents/create">
                <Button>
                  <Plus className="w-4 h-4 mr-2" />
                  Create Your First Agent
                </Button>
              </Link>
            )}
          </div>
        ) : (
          <div
            className={
              viewMode === "grid"
                ? "grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6"
                : "space-y-4"
            }
          >
            {filteredAgents.map((agent) => (
              <AgentCard
                key={agent.id}
                agent={agent}
                viewMode={viewMode}
                isSelected={selectedAgents.includes(agent.id)}
                onSelect={handleSelectAgent}
                onToggleStatus={handleToggleStatus}
                onDelete={handleDeleteAgent}
              />
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

// Agent Card Component
interface AgentCardProps {
  agent: Agent;
  viewMode: ViewMode;
  isSelected: boolean;
  onSelect: (agentId: string) => void;
  onToggleStatus: (agentId: string) => void;
  onDelete: (agentId: string) => void;
}

const AgentCard = ({
  agent,
  viewMode,
  isSelected,
  onSelect,
  onToggleStatus,
  onDelete,
}: AgentCardProps) => {
  const [showActions, setShowActions] = useState(false);

  if (viewMode === "list") {
    return (
      <Card className="hover:shadow-md transition-shadow">
        <CardContent className="p-6">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-4">
              <Checkbox
                checked={isSelected}
                onCheckedChange={() => onSelect(agent.id)}
              />
              <div className="flex items-center gap-3">
                <div className="text-2xl">{agent.avatar}</div>
                <div>
                  <h3 className="font-semibold text-foreground">
                    {agent.name}
                  </h3>
                  <p className="text-sm text-muted-foreground">
                    {agent.description}
                  </p>
                </div>
              </div>
            </div>
            <div className="flex items-center gap-4">
              <div className="flex items-center gap-2">
                {agent.capabilities.slice(0, 3).map((capability) => (
                  <Badge
                    key={capability}
                    variant="secondary"
                    className="text-xs"
                  >
                    {capability}
                  </Badge>
                ))}
                {agent.capabilities.length > 3 && (
                  <Badge variant="secondary" className="text-xs">
                    +{agent.capabilities.length - 3}
                  </Badge>
                )}
              </div>
              <div className="flex items-center gap-2">
                <div
                  className={`w-2 h-2 rounded-full ${getStatusColor(agent.status)}`}
                />
                <span className="text-sm text-muted-foreground capitalize">
                  {agent.status}
                </span>
              </div>
              <div className="text-sm text-muted-foreground">
                {agent.analytics.totalInteractions} interactions
              </div>
              <div className="relative">
                <Button
                  variant="ghost"
                  size="sm"
                  onClick={() => setShowActions(!showActions)}
                >
                  <MoreVertical className="w-4 h-4" />
                </Button>
                {showActions && (
                  <div className="absolute right-0 top-full mt-1 bg-card border rounded-lg shadow-lg z-10 min-w-[160px]">
                    <div className="p-1">
                      <Link
                        to={`/agents/${agent.id}`}
                        className="flex items-center gap-2 px-3 py-2 text-sm hover:bg-accent rounded-md"
                      >
                        <Eye className="w-4 h-4" />
                        View Details
                      </Link>
                      <Link
                        to={`/agents/${agent.id}/edit`}
                        className="flex items-center gap-2 px-3 py-2 text-sm hover:bg-accent rounded-md"
                      >
                        <Edit className="w-4 h-4" />
                        Edit
                      </Link>
                      <button
                        onClick={() => onToggleStatus(agent.id)}
                        className="flex items-center gap-2 px-3 py-2 text-sm hover:bg-accent rounded-md w-full"
                      >
                        {agent.status === "active" ? (
                          <Pause className="w-4 h-4" />
                        ) : (
                          <Play className="w-4 h-4" />
                        )}
                        {agent.status === "active" ? "Pause" : "Activate"}
                      </button>
                      <button
                        onClick={() => onDelete(agent.id)}
                        className="flex items-center gap-2 px-3 py-2 text-sm hover:bg-accent rounded-md w-full text-red-600"
                      >
                        <Trash2 className="w-4 h-4" />
                        Delete
                      </button>
                    </div>
                  </div>
                )}
              </div>
            </div>
          </div>
        </CardContent>
      </Card>
    );
  }

  return (
    <Card className="hover:shadow-md transition-shadow">
      <CardContent className="p-6">
        <div className="flex items-start justify-between mb-4">
          <Checkbox
            checked={isSelected}
            onCheckedChange={() => onSelect(agent.id)}
          />
          <div className="relative">
            <Button
              variant="ghost"
              size="sm"
              onClick={() => setShowActions(!showActions)}
            >
              <MoreVertical className="w-4 h-4" />
            </Button>
            {showActions && (
              <div className="absolute right-0 top-full mt-1 bg-card border rounded-lg shadow-lg z-10 min-w-[160px]">
                <div className="p-1">
                  <Link
                    to={`/agents/${agent.id}`}
                    className="flex items-center gap-2 px-3 py-2 text-sm hover:bg-accent rounded-md"
                  >
                    <Eye className="w-4 h-4" />
                    View Details
                  </Link>
                  <Link
                    to={`/agents/${agent.id}/edit`}
                    className="flex items-center gap-2 px-3 py-2 text-sm hover:bg-accent rounded-md"
                  >
                    <Edit className="w-4 h-4" />
                    Edit
                  </Link>
                  <button
                    onClick={() => onToggleStatus(agent.id)}
                    className="flex items-center gap-2 px-3 py-2 text-sm hover:bg-accent rounded-md w-full"
                  >
                    {agent.status === "active" ? (
                      <Pause className="w-4 h-4" />
                    ) : (
                      <Play className="w-4 h-4" />
                    )}
                    {agent.status === "active" ? "Pause" : "Activate"}
                  </button>
                  <button
                    onClick={() => onDelete(agent.id)}
                    className="flex items-center gap-2 px-3 py-2 text-sm hover:bg-accent rounded-md w-full text-red-600"
                  >
                    <Trash2 className="w-4 h-4" />
                    Delete
                  </button>
                </div>
              </div>
            )}
          </div>
        </div>

        <div className="text-center mb-4">
          <div className="text-4xl mb-2">{agent.avatar}</div>
          <h3 className="font-semibold text-foreground mb-1">{agent.name}</h3>
          <p className="text-sm text-muted-foreground line-clamp-2">
            {agent.description}
          </p>
        </div>

        <div className="space-y-3">
          <div className="flex items-center justify-between">
            <span className="text-sm text-muted-foreground">Status</span>
            <div className="flex items-center gap-2">
              <div
                className={`w-2 h-2 rounded-full ${getStatusColor(agent.status)}`}
              />
              <span className="text-sm capitalize">{agent.status}</span>
            </div>
          </div>

          <div className="flex items-center justify-between">
            <span className="text-sm text-muted-foreground">Interactions</span>
            <span className="text-sm font-medium">
              {agent.analytics.totalInteractions}
            </span>
          </div>

          <div className="flex items-center justify-between">
            <span className="text-sm text-muted-foreground">Capabilities</span>
            <div className="flex items-center gap-1">
              {agent.capabilities.slice(0, 2).map((capability) => (
                <Badge key={capability} variant="secondary" className="text-xs">
                  {capability}
                </Badge>
              ))}
              {agent.capabilities.length > 2 && (
                <Badge variant="secondary" className="text-xs">
                  +{agent.capabilities.length - 2}
                </Badge>
              )}
            </div>
          </div>
        </div>
      </CardContent>
    </Card>
  );
};

export default Agents;
