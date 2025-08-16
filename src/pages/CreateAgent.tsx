// Helpers
function inferProviderFromModel(modelName?: string): string | undefined {
  if (!modelName) return undefined;
  const m = modelName.toLowerCase();
  if (m.startsWith("gpt") || m.includes("gpt-")) return "openai";
  if (m.includes("claude")) return "anthropic";
  if (m.includes("gemini")) return "gemini";
  if (m.includes("llama") || m.includes("mixtral")) return "groq";
  if (m.includes("mistral")) return "mistral";
  if (m.includes("command")) return "cohere";
  if (m.includes("deepseek")) return "deepseek";
  return undefined;
}
import DashboardHeader from "@/components/DashboardHeader";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Badge } from "@/components/ui/badge";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Switch } from "@/components/ui/switch";
import { Slider } from "@/components/ui/slider";
import { Checkbox } from "@/components/ui/checkbox";
import {
  ArrowLeft,
  ArrowRight,
  Check,
  Bot,
  Brain,
  Mic,
  Users,
  BarChart3,
  Settings,
  Zap,
  Save,
  Play,
  Eye,
  Sparkles,
  Upload,
  Loader2,
} from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import {
  AgentFormData,
  AgentCreationStep,
  AgentCapability,
  MemoryLevel,
  ResponseStyle,
  CollaborationMode,
  mockAgentTemplates,
} from "@/types/agent";
import { agentService } from "@/services/agentService";
import {
  templateService,
  TemplateResponse,
  CategoryResponse,
} from "@/services/templateService";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
} from "@/components/ui/dialog";
import {
  Command,
  CommandEmpty,
  CommandGroup,
  CommandInput,
  CommandItem,
  CommandList,
} from "@/components/ui/command";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Separator } from "@/components/ui/separator";
import { useNormalToast } from "@/hooks/use-normal-toast";
import { useDestructiveToast } from "@/hooks/use-destructive-toast";
import {
  Tooltip,
  TooltipContent,
  TooltipTrigger,
} from "@/components/ui/tooltip";

const steps: AgentCreationStep[] = [
  {
    id: 1,
    title: "Basic Information",
    description: "Name, description, system prompt, and avatar",
    isComplete: false,
    isActive: true,
  },
  {
    id: 2,
    title: "Capabilities",
    description: "Memory, voice, and collaboration settings",
    isComplete: false,
    isActive: false,
  },
  {
    id: 3,
    title: "Personality",
    description: "Tone, expertise, and behavior",
    isComplete: false,
    isActive: false,
  },
  {
    id: 4,
    title: "Integrations",
    description: "API connections and permissions",
    isComplete: false,
    isActive: false,
  },
  {
    id: 5,
    title: "Review & Deploy",
    description: "Test and finalize your agent",
    isComplete: false,
    isActive: false,
  },
];

const avatarOptions = [
  "🤖",
  "🎧",
  "📊",
  "🔍",
  "✍️",
  "💼",
  "🎯",
  "🚀",
  "🌟",
  "⚡",
  "🎨",
  "🔧",
  "📚",
  "🎮",
  "🏆",
  "💡",
];

const CreateAgent = () => {
  const navigate = useNavigate();
  const [currentStep, setCurrentStep] = useState(1);
  const [loading, setLoading] = useState(false);
  const [templateDialogOpen, setTemplateDialogOpen] = useState(false);
  const [templates, setTemplates] = useState<TemplateResponse[]>([]);
  const [featured, setFeatured] = useState<TemplateResponse[]>([]);
  const [categories, setCategories] = useState<CategoryResponse[]>([]);
  const [templateSearch, setTemplateSearch] = useState("");
  const [templateCategory, setTemplateCategory] = useState<string>("all");
  const [selectedTemplate, setSelectedTemplate] =
    useState<TemplateResponse | null>(null);
  const [previewLoading, setPreviewLoading] = useState(false);
  const [previewData, setPreviewData] = useState<{
    sample_conversation: { role: "user" | "assistant"; content: string }[];
    features: {
      tools_enabled: boolean;
      voice_enabled: boolean;
      temperature: number;
      model_name: string;
    };
  } | null>(null);
  const [formData, setFormData] = useState<AgentFormData>({
    // Step 1: Basic Information
    name: "",
    description: "",
    systemPrompt: "", // Added for proper API mapping
    avatar: "🤖",

    // Step 2: Capabilities
    capabilities: ["memory"],
    config: {
      memory: { level: "standard", size: "10GB", retention: 60 },
      voice: {
        enabled: false,
        voice: "alloy",
        speechRate: 1.0,
        language: "en",
      },
      collaboration: { enabled: false, modes: ["task_chain"], maxTeamSize: 3 },
      analytics: {
        enabled: true,
        trackInteractions: true,
        generateReports: false,
      },
    },

    // Model config defaults
    modelProvider: "gemini",
    modelName: "gemini-pro",
    temperature: 0.7,
    maxTokens: 2048,
    useFallback: true,

    // Step 3: Personality
    personality: {
      tone: "professional",
      expertiseAreas: [],
      responseLength: "detailed",
      creativity: 50,
      formality: 70,
      empathy: 60,
    },

    // Step 4: Integrations
    integrations: {
      apiConnections: [],
      dataSources: [],
      permissions: {
        canAccessInternet: true,
        canModifyData: false,
        canSendEmails: true,
        canScheduleMeetings: false,
      },
    },

    // Step 5: Review
    saveAsDraft: false,
  });

  const [stepsState, setStepsState] = useState(steps);

  const updateStepsState = (
    stepId: number,
    updates: Partial<AgentCreationStep>,
  ) => {
    setStepsState((prev) =>
      prev.map((step) => (step.id === stepId ? { ...step, ...updates } : step)),
    );
  };

  const handleNext = () => {
    if (currentStep < 5) {
      updateStepsState(currentStep, { isComplete: true });
      updateStepsState(currentStep + 1, { isActive: true });
      setCurrentStep(currentStep + 1);
    }
  };

  const handlePrevious = () => {
    if (currentStep > 1) {
      updateStepsState(currentStep, { isActive: false });
      updateStepsState(currentStep - 1, { isActive: true });
      setCurrentStep(currentStep - 1);
    }
  };

  const handleStepClick = (stepId: number) => {
    if (stepId <= currentStep) {
      setCurrentStep(stepId);
      stepsState.forEach((step) => {
        updateStepsState(step.id, {
          isActive: step.id === stepId,
        });
      });
    }
  };

  const handleTemplateSelect = (templateId: string) => {
    const template =
      templates.find((t) => t.id === templateId) ||
      featured.find((t) => t.id === templateId) ||
      null;
    if (!template) return;
    setSelectedTemplate(template);
    // Load preview
    setPreviewLoading(true);
    setPreviewData(null);
    templateService
      .getTemplatePreview(template.id)
      .then((res) => {
        setPreviewData({
          sample_conversation: res.sample_conversation,
          features: res.features,
        });
      })
      .finally(() => setPreviewLoading(false));
    // Pre-fill form with template hints (non-destructive)
    setFormData((prev) => ({
      ...prev,
      name: template.name,
      description: template.description,
      systemPrompt: template.description || "", // Use description as fallback for system prompt; adjust if template has a prompt field
      modelProvider: inferProviderFromModel(template.model_name),
      modelName: template.model_name,
      temperature: template.temperature,
    }));
  };

  const handleSaveDraft = async () => {
    try {
      setLoading(true);
      // Save draft functionality would be implemented here
      useNormalToast("Draft saved successfully");
    } catch (error: any) {
      useDestructiveToast("Failed to save draft");
    } finally {
      setLoading(false);
    }
  };

  const handleDeploy = async () => {
    try {
      setLoading(true);

      let createdAgent;
      if (selectedTemplate) {
        // Create via backend template flow with all required fields populated
        const payload = {
          template_id: selectedTemplate.id,
          custom_prompt:
            formData.systemPrompt || selectedTemplate.description || "", // Required string
          custom_description:
            formData.description || selectedTemplate.description || "", // Required string
          category: selectedTemplate.category || "", // Required string
          tags: selectedTemplate.tags || [], // Required array, default empty
          tools_enabled: previewData?.features.tools_enabled || false, // Required boolean
          temperature:
            formData.temperature || selectedTemplate.temperature || 0, // Required number
          model_name: formData.modelName || selectedTemplate.model_name || "", // Required string
          voice_enabled:
            previewData?.features.voice_enabled ||
            selectedTemplate.voice_enabled ||
            false, // Required boolean
          voice_type: selectedTemplate.voice_type || "", // Required string
        };

        // Log for debugging
        console.log("Sending payload to /templates/{id}/create:", payload);

        const res = await templateService.createFromTemplate(
          selectedTemplate.id,
          payload,
        );
        createdAgent = { id: res.agent_id } as any;
      } else {
        // Transform form data to API format with system_prompt
        const agentData = {
          prompt: formData.name,
          description: formData.description,
          system_prompt: formData.systemPrompt,
          tools_enabled: formData.capabilities.includes("memory"),
          max_memory_length: parseInt(
            formData.config.memory?.size?.replace("GB", "") || "10",
          ),
          temperature: formData.temperature ?? 0.7,
          model_name: formData.modelName ?? "gemini-pro",
          model_provider: formData.modelProvider ?? "gemini",
          use_fallback: formData.useFallback ?? true,
          max_tokens: formData.maxTokens ?? 2048,
        };
        createdAgent = await agentService.createAgent(agentData);
      }

      useNormalToast("Agent created successfully!");
      navigate(`/agents/${createdAgent.id}`);
    } catch (error: any) {
      // Enhanced error handling: Attempt to parse response for details
      let errorMessage = error.message || "Failed to create agent";
      if (error.response) {
        try {
          const errorData = await error.response.json();
          errorMessage = errorData.error || errorData.message || errorMessage;
        } catch {}
      }
      useDestructiveToast(errorMessage);
    } finally {
      setLoading(false);
    }
  };

  const isStepValid = () => {
    switch (currentStep) {
      case 1:
        return (
          formData.name.trim() !== "" &&
          formData.description.trim() !== "" &&
          formData.systemPrompt.trim() !== ""
        );
      case 2:
        return formData.capabilities.length > 0;
      case 3:
        return formData.personality?.expertiseAreas?.length > 0;
      case 4:
        return true; // Integrations are optional
      case 5:
        return true; // Review step
      default:
        return false;
    }
  };

  const getValidationMessage = () => {
    switch (currentStep) {
      case 1:
        if (!formData.name.trim()) return "Agent name is required";
        if (!formData.description.trim())
          return "Agent description is required";
        if (!formData.systemPrompt.trim()) return "System prompt is required";
        return "";
      case 2:
        if (formData.capabilities.length === 0)
          return "Select at least one capability";
        return "";
      case 3:
        if (!formData.personality?.expertiseAreas?.length)
          return "Add at least one expertise area";
        return "";
      default:
        return "";
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

      <div className="container mx-auto max-w-7xl px-4 py-6 sm:px-6 sm:py-8 lg:px-8 lg:py-10">
        <motion.div
          variants={containerVariants}
          initial="hidden"
          animate="visible"
          className="space-y-8"
        >
          {/* Page Header */}
          <motion.div
            variants={itemVariants}
            className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4"
          >
            <div className="flex items-center gap-4">
              <Link to="/agents">
                <Button variant="outline" size="sm">
                  <ArrowLeft className="w-4 h-4 mr-2" />
                  Back to Agents
                </Button>
              </Link>
              <div>
                <h1 className="text-3xl sm:text-4xl font-bold text-foreground mb-2">
                  Create New Agent
                </h1>
                <p className="text-muted-foreground text-sm sm:text-base">
                  Build your intelligent AI assistant step by step
                </p>
              </div>
            </div>
          </motion.div>

          {/* Template Selection */}
          <motion.div variants={itemVariants}>
            <Card className="bg-card/40 backdrop-blur-sm border border-border/50 shadow-sm">
              <CardContent className="p-4 sm:p-6 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
                <div>
                  <div className="text-sm text-muted-foreground mb-1">
                    Kickstart with a prebuilt setup
                  </div>
                  <div className="text-lg font-medium text-foreground">
                    Use a template
                  </div>
                </div>
                <Button
                  variant="outline"
                  onClick={async () => {
                    setTemplateDialogOpen(true);
                    try {
                      const [cats, feats] = await Promise.all([
                        templateService.listCategories(),
                        templateService.listFeatured(),
                      ]);
                      setCategories(cats);
                      setFeatured(feats);
                    } catch {}
                  }}
                >
                  Browse Templates
                </Button>
              </CardContent>
            </Card>
          </motion.div>

          {/* Progress Steps */}
          <motion.div variants={itemVariants}>
            <Card className="bg-card/40 backdrop-blur-sm border border-border/50 shadow-sm">
              <CardContent className="p-4 sm:p-6">
                <div className="flex flex-wrap justify-center gap-4 md:gap-6 lg:gap-8 max-w-4xl mx-auto">
                  {stepsState.map((step, index) => (
                    <Tooltip key={step.id}>
                      <TooltipTrigger asChild>
                        <div className="flex items-center gap-2 sm:gap-3">
                          <button
                            onClick={() => handleStepClick(step.id)}
                            className={`flex items-center justify-center w-8 h-8 sm:w-10 sm:h-10 rounded-full border-2 transition-all text-sm sm:text-base ${
                              step.isComplete
                                ? "bg-primary border-primary text-white"
                                : step.isActive
                                  ? "border-primary text-primary bg-primary/10"
                                  : "border-muted-foreground/30 text-muted-foreground"
                            }`}
                            disabled={step.id > currentStep}
                          >
                            {step.isComplete ? (
                              <Check className="w-4 h-4 sm:w-5 sm:h-5" />
                            ) : (
                              <span className="font-medium">{step.id}</span>
                            )}
                          </button>

                          <div className="hidden md:block">
                            <div
                              className={`text-sm font-medium ${
                                step.isActive
                                  ? "text-foreground"
                                  : "text-muted-foreground"
                              }`}
                            >
                              {step.title}
                            </div>
                            <div className="text-xs text-muted-foreground">
                              {step.description}
                            </div>
                          </div>

                          {index < stepsState.length - 1 && (
                            <div
                              className={`flex-1 min-w-[20px] md:min-w-[40px] h-0.5 ${
                                step.isComplete
                                  ? "bg-primary"
                                  : "bg-muted-foreground/30"
                              }`}
                            />
                          )}
                        </div>
                      </TooltipTrigger>
                      <TooltipContent side="bottom">
                        {step.title}: {step.description}
                      </TooltipContent>
                    </Tooltip>
                  ))}
                </div>
              </CardContent>
            </Card>
          </motion.div>

          {/* Step Content */}
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 lg:gap-8">
            {/* Main Form */}
            <div className="lg:col-span-2 space-y-6">
              <motion.div variants={itemVariants}>
                <Card className="bg-card/40 backdrop-blur-sm border border-border/50 shadow-sm">
                  <CardHeader className="pb-4">
                    <CardTitle className="flex items-center gap-2 text-xl sm:text-2xl">
                      {currentStep === 1 && <Bot className="w-5 h-5" />}
                      {currentStep === 2 && <Settings className="w-5 h-5" />}
                      {currentStep === 3 && <Brain className="w-5 h-5" />}
                      {currentStep === 4 && <Zap className="w-5 h-5" />}
                      {currentStep === 5 && <Eye className="w-5 h-5" />}
                      {stepsState.find((s) => s.id === currentStep)?.title}
                    </CardTitle>
                  </CardHeader>
                  <CardContent className="space-y-6 px-4 sm:px-6">
                    <AnimatePresence mode="wait">
                      {/* Step 1: Basic Information */}
                      {currentStep === 1 && (
                        <motion.div
                          key="step1"
                          initial={{ opacity: 0, x: 20 }}
                          animate={{ opacity: 1, x: 0 }}
                          exit={{ opacity: 0, x: -20 }}
                          transition={{ duration: 0.3 }}
                          className="space-y-6"
                        >
                          <div className="space-y-2">
                            <Label htmlFor="name">Agent Name *</Label>
                            <Input
                              id="name"
                              value={formData.name}
                              onChange={(e) =>
                                setFormData((prev) => ({
                                  ...prev,
                                  name: e.target.value,
                                }))
                              }
                              placeholder="Enter agent name..."
                              className="bg-background/50"
                            />
                          </div>

                          <div className="space-y-2">
                            <Label htmlFor="description">Description *</Label>
                            <Textarea
                              id="description"
                              value={formData.description}
                              onChange={(e) =>
                                setFormData((prev) => ({
                                  ...prev,
                                  description: e.target.value,
                                }))
                              }
                              placeholder="Describe what your agent does..."
                              className="bg-background/50 min-h-[100px]"
                            />
                          </div>

                          <div className="space-y-2">
                            <Label htmlFor="systemPrompt">
                              System Prompt *
                            </Label>
                            <Textarea
                              id="systemPrompt"
                              value={formData.systemPrompt}
                              onChange={(e) =>
                                setFormData((prev) => ({
                                  ...prev,
                                  systemPrompt: e.target.value,
                                }))
                              }
                              placeholder="Define the agent's core instructions, e.g., 'Act as a software engineer and architect... Retain the color design used in this project.'"
                              className="bg-background/50 min-h-[150px]"
                            />
                          </div>

                          <div className="space-y-2">
                            <Label>Avatar</Label>
                            <div className="grid grid-cols-4 sm:grid-cols-6 gap-3">
                              {avatarOptions.map((avatar) => (
                                <button
                                  key={avatar}
                                  onClick={() =>
                                    setFormData((prev) => ({ ...prev, avatar }))
                                  }
                                  className={`w-10 h-10 sm:w-12 sm:h-12 rounded-lg border-2 flex items-center justify-center text-xl transition-all ${
                                    formData.avatar === avatar
                                      ? "border-primary bg-primary/10"
                                      : "border-border hover:border-primary/50"
                                  }`}
                                >
                                  {avatar}
                                </button>
                              ))}
                            </div>
                          </div>

                          <div className="space-y-2">
                            <Label>Custom Avatar Upload</Label>
                            <div className="border-2 border-dashed border-border rounded-lg p-4 sm:p-6 text-center">
                              <Upload className="w-6 h-6 sm:w-8 sm:h-8 mx-auto mb-2 text-muted-foreground" />
                              <p className="text-xs sm:text-sm text-muted-foreground">
                                Drag and drop an image or click to browse
                              </p>
                              <Button
                                variant="outline"
                                size="sm"
                                className="mt-2"
                              >
                                Choose File
                              </Button>
                            </div>
                          </div>
                        </motion.div>
                      )}

                      {/* Step 2: Capabilities */}
                      {currentStep === 2 && (
                        <motion.div
                          key="step2"
                          initial={{ opacity: 0, x: 20 }}
                          animate={{ opacity: 1, x: 0 }}
                          exit={{ opacity: 0, x: -20 }}
                          transition={{ duration: 0.3 }}
                          className="space-y-6"
                        >
                          <div className="space-y-4">
                            {/* Model Selection */}
                            <div className="space-y-4 p-4 bg-card/30 rounded-lg shadow-inner">
                              <h4 className="font-medium text-foreground">
                                Model & Provider
                              </h4>
                              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                                <div className="space-y-2">
                                  <Label>Provider</Label>
                                  <Select
                                    value={formData.modelProvider}
                                    onValueChange={(value) =>
                                      setFormData((prev) => ({
                                        ...prev,
                                        modelProvider: value,
                                        modelName:
                                          value === "gemini"
                                            ? "gemini-pro"
                                            : value === "openai"
                                              ? "gpt-4o-mini"
                                              : value === "anthropic"
                                                ? "claude-3-haiku"
                                                : value === "groq"
                                                  ? "llama3-8b"
                                                  : value === "mistral"
                                                    ? "mistral-small"
                                                    : value === "cohere"
                                                      ? "command-r"
                                                      : value === "deepseek"
                                                        ? "deepseek-chat"
                                                        : value === "ollama"
                                                          ? "llama3"
                                                          : prev.modelName,
                                      }))
                                    }
                                  >
                                    <SelectTrigger className="bg-background/50">
                                      <SelectValue placeholder="Select provider" />
                                    </SelectTrigger>
                                    <SelectContent>
                                      <SelectItem value="gemini">
                                        Gemini
                                      </SelectItem>
                                      <SelectItem value="openai">
                                        OpenAI
                                      </SelectItem>
                                      <SelectItem value="anthropic">
                                        Anthropic
                                      </SelectItem>
                                      <SelectItem value="groq">Groq</SelectItem>
                                      <SelectItem value="mistral">
                                        Mistral
                                      </SelectItem>
                                      <SelectItem value="cohere">
                                        Cohere
                                      </SelectItem>
                                      <SelectItem value="deepseek">
                                        DeepSeek
                                      </SelectItem>
                                      <SelectItem value="ollama">
                                        Ollama
                                      </SelectItem>
                                    </SelectContent>
                                  </Select>
                                </div>
                                <div className="space-y-2">
                                  <Label>Model</Label>
                                  <Select
                                    value={formData.modelName}
                                    onValueChange={(value) =>
                                      setFormData((prev) => ({
                                        ...prev,
                                        modelName: value,
                                      }))
                                    }
                                  >
                                    <SelectTrigger className="bg-background/50">
                                      <SelectValue placeholder="Select model" />
                                    </SelectTrigger>
                                    <SelectContent>
                                      {/* Gemini */}
                                      {formData.modelProvider === "gemini" && (
                                        <>
                                          <SelectItem value="gemini-pro">
                                            Gemini 1.5 Pro
                                          </SelectItem>
                                          <SelectItem value="gemini-flash">
                                            Gemini 1.5 Flash
                                          </SelectItem>
                                        </>
                                      )}
                                      {/* OpenAI */}
                                      {formData.modelProvider === "openai" && (
                                        <>
                                          <SelectItem value="gpt-4o-mini">
                                            GPT-4o-mini
                                          </SelectItem>
                                          <SelectItem value="gpt-4o">
                                            GPT-4o
                                          </SelectItem>
                                          <SelectItem value="gpt-4.1">
                                            GPT-4.1
                                          </SelectItem>
                                        </>
                                      )}
                                      {/* Anthropic */}
                                      {formData.modelProvider ===
                                        "anthropic" && (
                                        <>
                                          <SelectItem value="claude-3-haiku">
                                            Claude 3 Haiku
                                          </SelectItem>
                                          <SelectItem value="claude-3-sonnet">
                                            Claude 3 Sonnet
                                          </SelectItem>
                                          <SelectItem value="claude-3-opus">
                                            Claude 3 Opus
                                          </SelectItem>
                                        </>
                                      )}
                                      {/* Groq */}
                                      {formData.modelProvider === "groq" && (
                                        <>
                                          <SelectItem value="llama3-8b">
                                            Llama3 8B
                                          </SelectItem>
                                          <SelectItem value="llama3-70b">
                                            Llama3 70B
                                          </SelectItem>
                                        </>
                                      )}
                                      {/* Mistral */}
                                      {formData.modelProvider === "mistral" && (
                                        <>
                                          <SelectItem value="mistral-small">
                                            Mistral Small
                                          </SelectItem>
                                          <SelectItem value="mistral-medium">
                                            Mistral Medium
                                          </SelectItem>
                                          <SelectItem value="mistral-large">
                                            Mistral Large
                                          </SelectItem>
                                        </>
                                      )}
                                      {/* Cohere */}
                                      {formData.modelProvider === "cohere" && (
                                        <>
                                          <SelectItem value="command-r">
                                            Command R
                                          </SelectItem>
                                          <SelectItem value="command-r+">
                                            Command R+
                                          </SelectItem>
                                        </>
                                      )}
                                      {/* DeepSeek */}
                                      {formData.modelProvider ===
                                        "deepseek" && (
                                        <>
                                          <SelectItem value="deepseek-chat">
                                            DeepSeek Chat
                                          </SelectItem>
                                          <SelectItem value="deepseek-coder">
                                            DeepSeek Coder
                                          </SelectItem>
                                        </>
                                      )}
                                      {/* Ollama */}
                                      {formData.modelProvider === "ollama" && (
                                        <>
                                          <SelectItem value="llama3">
                                            Llama3 (local)
                                          </SelectItem>
                                          <SelectItem value="phi3">
                                            Phi-3 (local)
                                          </SelectItem>
                                        </>
                                      )}
                                    </SelectContent>
                                  </Select>
                                </div>
                              </div>
                              <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 pt-2">
                                <div className="space-y-2">
                                  <Label>
                                    Temperature:{" "}
                                    {formData.temperature?.toFixed(2)}
                                  </Label>
                                  <Slider
                                    value={[formData.temperature || 0.7]}
                                    onValueChange={([value]) =>
                                      setFormData((prev) => ({
                                        ...prev,
                                        temperature: value,
                                      }))
                                    }
                                    max={2}
                                    min={0}
                                    step={0.05}
                                    className="w-full"
                                  />
                                </div>
                                <div className="space-y-2">
                                  <Label>Max tokens</Label>
                                  <Input
                                    type="number"
                                    value={formData.maxTokens}
                                    onChange={(e) =>
                                      setFormData((prev) => ({
                                        ...prev,
                                        maxTokens:
                                          parseInt(e.target.value || "0") || 0,
                                      }))
                                    }
                                    className="bg-background/50"
                                  />
                                </div>
                                <div className="space-y-2">
                                  <Label>Use fallback models</Label>
                                  <div className="flex items-center gap-2">
                                    <Switch
                                      checked={!!formData.useFallback}
                                      onCheckedChange={(checked) =>
                                        setFormData((prev) => ({
                                          ...prev,
                                          useFallback: checked,
                                        }))
                                      }
                                    />
                                    <span className="text-sm text-muted-foreground">
                                      Try alternatives on failure
                                    </span>
                                  </div>
                                </div>
                              </div>
                            </div>
                            <Label>Select Capabilities *</Label>
                            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                              {[
                                {
                                  id: "memory",
                                  label: "Memory",
                                  icon: <Brain className="w-4 h-4" />,
                                  desc: "Long-term memory and context retention",
                                },
                                {
                                  id: "voice",
                                  label: "Voice",
                                  icon: <Mic className="w-4 h-4" />,
                                  desc: "Text-to-speech and voice interaction",
                                },
                                {
                                  id: "collaboration",
                                  label: "Collaboration",
                                  icon: <Users className="w-4 h-4" />,
                                  desc: "Multi-agent teamwork capabilities",
                                },
                                {
                                  id: "analytics",
                                  label: "Analytics",
                                  icon: <BarChart3 className="w-4 h-4" />,
                                  desc: "Data analysis and reporting",
                                },
                              ].map((capability) => (
                                <div
                                  key={capability.id}
                                  className={`p-4 border rounded-lg cursor-pointer transition-all shadow-sm ${
                                    formData.capabilities.includes(
                                      capability.id as AgentCapability,
                                    )
                                      ? "border-primary bg-primary/5"
                                      : "border-border hover:border-primary/50"
                                  }`}
                                  onClick={() => {
                                    const cap =
                                      capability.id as AgentCapability;
                                    setFormData((prev) => ({
                                      ...prev,
                                      capabilities: prev.capabilities.includes(
                                        cap,
                                      )
                                        ? prev.capabilities.filter(
                                            (c) => c !== cap,
                                          )
                                        : [...prev.capabilities, cap],
                                    }));
                                  }}
                                >
                                  <div className="flex items-start gap-3">
                                    <div className="w-8 h-8 bg-gradient-to-br from-primary/20 to-accent/20 rounded-lg flex items-center justify-center">
                                      {capability.icon}
                                    </div>
                                    <div>
                                      <h4 className="font-medium text-foreground">
                                        {capability.label}
                                      </h4>
                                      <p className="text-sm text-muted-foreground">
                                        {capability.desc}
                                      </p>
                                    </div>
                                  </div>
                                </div>
                              ))}
                            </div>
                          </div>

                          {/* Memory Configuration */}
                          {formData.capabilities.includes("memory") && (
                            <div className="space-y-4 p-4 bg-card/30 rounded-lg shadow-inner">
                              <h4 className="font-medium text-foreground">
                                Memory Configuration
                              </h4>
                              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                                <div className="space-y-2">
                                  <Label>Memory Level</Label>
                                  <Select
                                    value={formData.config.memory?.level}
                                    onValueChange={(value: MemoryLevel) =>
                                      setFormData((prev) => ({
                                        ...prev,
                                        config: {
                                          ...prev.config,
                                          memory: {
                                            ...prev.config.memory!,
                                            level: value,
                                          },
                                        },
                                      }))
                                    }
                                  >
                                    <SelectTrigger className="bg-background/50">
                                      <SelectValue />
                                    </SelectTrigger>
                                    <SelectContent>
                                      <SelectItem value="basic">
                                        Basic (1GB)
                                      </SelectItem>
                                      <SelectItem value="standard">
                                        Standard (10GB)
                                      </SelectItem>
                                      <SelectItem value="advanced">
                                        Advanced (25GB)
                                      </SelectItem>
                                      <SelectItem value="unlimited">
                                        Unlimited
                                      </SelectItem>
                                    </SelectContent>
                                  </Select>
                                </div>
                                <div className="space-y-2">
                                  <Label>Retention (days)</Label>
                                  <Input
                                    type="number"
                                    value={formData.config.memory?.retention}
                                    onChange={(e) =>
                                      setFormData((prev) => ({
                                        ...prev,
                                        config: {
                                          ...prev.config,
                                          memory: {
                                            ...prev.config.memory!,
                                            retention: parseInt(e.target.value),
                                          },
                                        },
                                      }))
                                    }
                                    className="bg-background/50"
                                  />
                                </div>
                              </div>
                            </div>
                          )}

                          {/* Voice Configuration */}
                          {formData.capabilities.includes("voice") && (
                            <div className="space-y-4 p-4 bg-card/30 rounded-lg shadow-inner">
                              <div className="flex items-center justify-between">
                                <h4 className="font-medium text-foreground">
                                  Voice Configuration
                                </h4>
                                <Switch
                                  checked={formData.config.voice?.enabled}
                                  onCheckedChange={(checked) =>
                                    setFormData((prev) => ({
                                      ...prev,
                                      config: {
                                        ...prev.config,
                                        voice: {
                                          ...prev.config.voice!,
                                          enabled: checked,
                                        },
                                      },
                                    }))
                                  }
                                />
                              </div>
                              {formData.config.voice?.enabled && (
                                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                                  <div className="space-y-2">
                                    <Label>Voice</Label>
                                    <Select
                                      value={formData.config.voice?.voice}
                                      onValueChange={(value) =>
                                        setFormData((prev) => ({
                                          ...prev,
                                          config: {
                                            ...prev.config,
                                            voice: {
                                              ...prev.config.voice!,
                                              voice: value,
                                            },
                                          },
                                        }))
                                      }
                                    >
                                      <SelectTrigger className="bg-background/50">
                                        <SelectValue />
                                      </SelectTrigger>
                                      <SelectContent>
                                        <SelectItem value="alloy">
                                          Alloy (Neutral)
                                        </SelectItem>
                                        <SelectItem value="echo">
                                          Echo (Male)
                                        </SelectItem>
                                        <SelectItem value="fable">
                                          Fable (British)
                                        </SelectItem>
                                        <SelectItem value="nova">
                                          Nova (Female)
                                        </SelectItem>
                                      </SelectContent>
                                    </Select>
                                  </div>
                                  <div className="space-y-2">
                                    <Label>
                                      Speech Rate:{" "}
                                      {formData.config.voice?.speechRate}x
                                    </Label>
                                    <Slider
                                      value={[
                                        formData.config.voice?.speechRate ||
                                          1.0,
                                      ]}
                                      onValueChange={([value]) =>
                                        setFormData((prev) => ({
                                          ...prev,
                                          config: {
                                            ...prev.config,
                                            voice: {
                                              ...prev.config.voice!,
                                              speechRate: value,
                                            },
                                          },
                                        }))
                                      }
                                      max={2}
                                      min={0.5}
                                      step={0.1}
                                      className="w-full"
                                    />
                                  </div>
                                </div>
                              )}
                            </div>
                          )}
                        </motion.div>
                      )}

                      {/* Step 3: Personality */}
                      {currentStep === 3 && (
                        <motion.div
                          key="step3"
                          initial={{ opacity: 0, x: 20 }}
                          animate={{ opacity: 1, x: 0 }}
                          exit={{ opacity: 0, x: -20 }}
                          transition={{ duration: 0.3 }}
                          className="space-y-6"
                        >
                          <div className="space-y-4">
                            <div className="space-y-2">
                              <Label>Response Tone</Label>
                              <Select
                                value={formData.personality.tone}
                                onValueChange={(value: ResponseStyle) =>
                                  setFormData((prev) => ({
                                    ...prev,
                                    personality: {
                                      ...prev.personality,
                                      tone: value,
                                    },
                                  }))
                                }
                              >
                                <SelectTrigger className="bg-background/50">
                                  <SelectValue />
                                </SelectTrigger>
                                <SelectContent>
                                  <SelectItem value="professional">
                                    Professional
                                  </SelectItem>
                                  <SelectItem value="casual">Casual</SelectItem>
                                  <SelectItem value="technical">
                                    Technical
                                  </SelectItem>
                                  <SelectItem value="creative">
                                    Creative
                                  </SelectItem>
                                  <SelectItem value="supportive">
                                    Supportive
                                  </SelectItem>
                                </SelectContent>
                              </Select>
                            </div>

                            <div className="space-y-2">
                              <Label>Response Length</Label>
                              <Select
                                value={formData.personality.responseLength}
                                onValueChange={(
                                  value:
                                    | "concise"
                                    | "detailed"
                                    | "comprehensive",
                                ) =>
                                  setFormData((prev) => ({
                                    ...prev,
                                    personality: {
                                      ...prev.personality,
                                      responseLength: value,
                                    },
                                  }))
                                }
                              >
                                <SelectTrigger className="bg-background/50">
                                  <SelectValue />
                                </SelectTrigger>
                                <SelectContent>
                                  <SelectItem value="concise">
                                    Concise
                                  </SelectItem>
                                  <SelectItem value="detailed">
                                    Detailed
                                  </SelectItem>
                                  <SelectItem value="comprehensive">
                                    Comprehensive
                                  </SelectItem>
                                </SelectContent>
                              </Select>
                            </div>

                            <div className="space-y-2">
                              <Label>Expertise Areas *</Label>
                              <div className="space-y-2">
                                <div className="relative">
                                  <Input
                                    placeholder="Type an expertise area and press Enter to add"
                                    onKeyPress={(e) => {
                                      if (e.key === "Enter") {
                                        e.preventDefault();
                                        const value = (
                                          e.target as HTMLInputElement
                                        ).value.trim();
                                        if (
                                          value &&
                                          !formData.personality.expertiseAreas.includes(
                                            value,
                                          )
                                        ) {
                                          setFormData((prev) => ({
                                            ...prev,
                                            personality: {
                                              ...prev.personality,
                                              expertiseAreas: [
                                                ...prev.personality
                                                  .expertiseAreas,
                                                value,
                                              ],
                                            },
                                          }));
                                          (e.target as HTMLInputElement).value =
                                            "";
                                        }
                                      }
                                    }}
                                    className={`bg-background/50 ${
                                      formData.personality.expertiseAreas
                                        .length === 0
                                        ? "border-red-500/50"
                                        : ""
                                    }`}
                                  />
                                  {formData.personality.expertiseAreas
                                    .length === 0 && (
                                    <div className="absolute right-3 top-1/2 -translate-y-1/2">
                                      <span className="text-xs text-red-500">
                                        Required
                                      </span>
                                    </div>
                                  )}
                                </div>

                                {formData.personality.expertiseAreas.length ===
                                  0 && (
                                  <div className="space-y-2">
                                    <p className="text-xs text-muted-foreground">
                                      💡 Quick add common expertise areas:
                                    </p>
                                    <div className="flex flex-wrap gap-2">
                                      {[
                                        "Data Analysis",
                                        "Customer Service",
                                        "Content Writing",
                                        "Software Development",
                                        "Marketing",
                                        "Sales",
                                      ].map((area) => (
                                        <Button
                                          key={area}
                                          variant="outline"
                                          size="sm"
                                          className="text-xs h-7"
                                          onClick={() => {
                                            if (
                                              !formData.personality.expertiseAreas.includes(
                                                area,
                                              )
                                            ) {
                                              setFormData((prev) => ({
                                                ...prev,
                                                personality: {
                                                  ...prev.personality,
                                                  expertiseAreas: [
                                                    ...prev.personality
                                                      .expertiseAreas,
                                                    area,
                                                  ],
                                                },
                                              }));
                                            }
                                          }}
                                        >
                                          + {area}
                                        </Button>
                                      ))}
                                    </div>
                                  </div>
                                )}

                                <div className="flex flex-wrap gap-2">
                                  {formData.personality.expertiseAreas.map(
                                    (area, index) => (
                                      <Badge
                                        key={index}
                                        variant="secondary"
                                        className="text-xs"
                                      >
                                        {area}
                                        <button
                                          onClick={() => {
                                            setFormData((prev) => ({
                                              ...prev,
                                              personality: {
                                                ...prev.personality,
                                                expertiseAreas:
                                                  prev.personality.expertiseAreas.filter(
                                                    (_, i) => i !== index,
                                                  ),
                                              },
                                            }));
                                          }}
                                          className="ml-1 hover:text-red-400"
                                        >
                                          ×
                                        </button>
                                      </Badge>
                                    ),
                                  )}
                                </div>

                                {formData.personality.expertiseAreas.length >
                                  0 && (
                                  <p className="text-xs text-green-600">
                                    ✓{" "}
                                    {formData.personality.expertiseAreas.length}{" "}
                                    expertise area
                                    {formData.personality.expertiseAreas
                                      .length > 1
                                      ? "s"
                                      : ""}{" "}
                                    added
                                  </p>
                                )}
                              </div>
                            </div>

                            <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                              <div className="space-y-2">
                                <Label>
                                  Creativity: {formData.personality.creativity}%
                                </Label>
                                <Slider
                                  value={[
                                    formData.personality.creativity || 50,
                                  ]}
                                  onValueChange={([value]) =>
                                    setFormData((prev) => ({
                                      ...prev,
                                      personality: {
                                        ...prev.personality,
                                        creativity: value,
                                      },
                                    }))
                                  }
                                  max={100}
                                  min={0}
                                  step={10}
                                  className="w-full"
                                />
                              </div>

                              <div className="space-y-2">
                                <Label>
                                  Formality: {formData.personality.formality}%
                                </Label>
                                <Slider
                                  value={[formData.personality.formality || 70]}
                                  onValueChange={([value]) =>
                                    setFormData((prev) => ({
                                      ...prev,
                                      personality: {
                                        ...prev.personality,
                                        formality: value,
                                      },
                                    }))
                                  }
                                  max={100}
                                  min={0}
                                  step={10}
                                  className="w-full"
                                />
                              </div>

                              <div className="space-y-2">
                                <Label>
                                  Empathy: {formData.personality.empathy}%
                                </Label>
                                <Slider
                                  value={[formData.personality.empathy || 60]}
                                  onValueChange={([value]) =>
                                    setFormData((prev) => ({
                                      ...prev,
                                      personality: {
                                        ...prev.personality,
                                        empathy: value,
                                      },
                                    }))
                                  }
                                  max={100}
                                  min={0}
                                  step={10}
                                  className="w-full"
                                />
                              </div>
                            </div>
                          </div>
                        </motion.div>
                      )}

                      {/* Step 4: Integrations */}
                      {currentStep === 4 && (
                        <motion.div
                          key="step4"
                          initial={{ opacity: 0, x: 20 }}
                          animate={{ opacity: 1, x: 0 }}
                          exit={{ opacity: 0, x: -20 }}
                          transition={{ duration: 0.3 }}
                          className="space-y-6"
                        >
                          <div className="space-y-4">
                            <h4 className="font-medium text-foreground">
                              Permissions
                            </h4>
                            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                              {[
                                {
                                  key: "canAccessInternet",
                                  label: "Internet Access",
                                  desc: "Allow agent to access web resources",
                                },
                                {
                                  key: "canModifyData",
                                  label: "Data Modification",
                                  desc: "Allow agent to modify data",
                                },
                                {
                                  key: "canSendEmails",
                                  label: "Send Emails",
                                  desc: "Allow agent to send email notifications",
                                },
                                {
                                  key: "canScheduleMeetings",
                                  label: "Schedule Meetings",
                                  desc: "Allow agent to schedule calendar events",
                                },
                              ].map((permission) => (
                                <div
                                  key={permission.key}
                                  className="flex items-center justify-between p-4 bg-card/30 rounded-lg shadow-inner"
                                >
                                  <div>
                                    <h5 className="font-medium text-foreground">
                                      {permission.label}
                                    </h5>
                                    <p className="text-sm text-muted-foreground">
                                      {permission.desc}
                                    </p>
                                  </div>
                                  <Switch
                                    checked={
                                      formData.integrations.permissions?.[
                                        permission.key as keyof typeof formData.integrations.permissions
                                      ] || false
                                    }
                                    onCheckedChange={(checked) =>
                                      setFormData((prev) => ({
                                        ...prev,
                                        integrations: {
                                          ...prev.integrations,
                                          permissions: {
                                            ...prev.integrations.permissions,
                                            [permission.key]: checked,
                                          },
                                        },
                                      }))
                                    }
                                  />
                                </div>
                              ))}
                            </div>
                          </div>
                        </motion.div>
                      )}

                      {/* Step 5: Review & Deploy */}
                      {currentStep === 5 && (
                        <motion.div
                          key="step5"
                          initial={{ opacity: 0, x: 20 }}
                          animate={{ opacity: 1, x: 0 }}
                          exit={{ opacity: 0, x: -20 }}
                          transition={{ duration: 0.3 }}
                          className="space-y-6"
                        >
                          <div className="space-y-4">
                            <h4 className="font-medium text-foreground">
                              Agent Summary
                            </h4>
                            <div className="p-4 sm:p-6 bg-card/30 rounded-lg space-y-4 shadow-inner">
                              <div className="flex items-center gap-4">
                                <div className="w-12 h-12 sm:w-16 sm:h-16 bg-gradient-to-br from-primary/20 to-accent/20 rounded-2xl flex items-center justify-center text-2xl sm:text-3xl">
                                  {formData.avatar}
                                </div>
                                <div>
                                  <h3 className="text-lg sm:text-xl font-semibold text-foreground">
                                    {formData.name}
                                  </h3>
                                  <p className="text-sm text-muted-foreground">
                                    {formData.description}
                                  </p>
                                </div>
                              </div>

                              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                                <div>
                                  <h5 className="font-medium text-foreground mb-2">
                                    Capabilities
                                  </h5>
                                  <div className="flex flex-wrap gap-1">
                                    {formData.capabilities.map((cap) => (
                                      <Badge
                                        key={cap}
                                        variant="secondary"
                                        className="text-xs"
                                      >
                                        {cap}
                                      </Badge>
                                    ))}
                                  </div>
                                </div>

                                <div>
                                  <h5 className="font-medium text-foreground mb-2">
                                    Personality
                                  </h5>
                                  <div className="text-sm text-muted-foreground">
                                    <p>Tone: {formData.personality.tone}</p>
                                    <p>
                                      Response:{" "}
                                      {formData.personality.responseLength}
                                    </p>
                                    <p>
                                      Expertise:{" "}
                                      {formData.personality.expertiseAreas.join(
                                        ", ",
                                      )}
                                    </p>
                                  </div>
                                </div>
                              </div>
                            </div>

                            <div className="p-4 bg-yellow-500/10 border border-yellow-500/20 rounded-lg shadow-inner">
                              <h5 className="font-medium text-foreground mb-2">
                                Ready to Deploy
                              </h5>
                              <p className="text-sm text-muted-foreground">
                                Your agent is configured and ready to be
                                deployed. You can always modify these settings
                                later.
                              </p>
                            </div>
                          </div>
                        </motion.div>
                      )}
                    </AnimatePresence>
                  </CardContent>
                </Card>
              </motion.div>
            </div>

            {/* Preview Panel */}
            <div className="lg:col-span-1">
              <motion.div variants={itemVariants}>
                <Card className="bg-card/40 backdrop-blur-sm border border-border/50 sticky top-20 sm:top-24 lg:top-28 shadow-sm">
                  <CardHeader className="pb-4">
                    <CardTitle className="flex items-center gap-2 text-xl">
                      <Eye className="w-5 h-5" />
                      Agent Preview
                    </CardTitle>
                  </CardHeader>
                  <CardContent className="space-y-4 px-4 sm:px-6">
                    <div className="text-center">
                      <div className="w-16 h-16 sm:w-20 sm:h-20 mx-auto mb-4 bg-gradient-to-br from-primary/20 to-accent/20 rounded-2xl flex items-center justify-center text-3xl">
                        {formData.avatar}
                      </div>
                      <h3 className="text-lg font-semibold text-foreground">
                        {formData.name || "Unnamed Agent"}
                      </h3>
                      <p className="text-sm text-muted-foreground mt-2 line-clamp-3">
                        {formData.description || "No description provided"}
                      </p>
                    </div>

                    {formData.capabilities.length > 0 && (
                      <div>
                        <h4 className="text-sm font-medium text-foreground mb-2">
                          Capabilities
                        </h4>
                        <div className="flex flex-wrap gap-1">
                          {formData.capabilities.map((capability) => (
                            <Badge
                              key={capability}
                              variant="secondary"
                              className="text-xs"
                            >
                              {capability}
                            </Badge>
                          ))}
                        </div>
                      </div>
                    )}

                    <div className="pt-4 border-t border-border">
                      <div className="flex gap-2">
                        <Button
                          variant="outline"
                          size="sm"
                          onClick={handleSaveDraft}
                          disabled={loading}
                          className="flex-1"
                        >
                          {loading ? (
                            <>
                              <Loader2 className="w-4 h-4 mr-2 animate-spin" />
                              Saving...
                            </>
                          ) : (
                            <>
                              <Save className="w-4 h-4 mr-2" />
                              Save Draft
                            </>
                          )}
                        </Button>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              </motion.div>
            </div>
          </div>

          {/* Navigation */}
          <motion.div variants={itemVariants}>
            <Card className="bg-card/40 backdrop-blur-sm border border-border/50 shadow-sm">
              <CardContent className="p-4 sm:p-6">
                <div className="flex items-center justify-between">
                  <Button
                    variant="outline"
                    onClick={handlePrevious}
                    disabled={currentStep === 1}
                  >
                    <ArrowLeft className="w-4 h-4 mr-2" />
                    Previous
                  </Button>

                  <div className="text-center hidden sm:block">
                    <div className="text-sm text-muted-foreground">
                      Step {currentStep} of {stepsState.length}
                    </div>
                    {getValidationMessage() && (
                      <div className="text-xs text-red-500 mt-1 max-w-xs">
                        {getValidationMessage()}
                      </div>
                    )}
                  </div>

                  {currentStep === 5 ? (
                    <Button
                      onClick={handleDeploy}
                      disabled={loading || !isStepValid()}
                      className="bg-gradient-to-r from-primary to-accent hover:from-primary/90 hover:to-accent/90"
                    >
                      {loading ? (
                        <>
                          <Loader2 className="w-4 h-4 mr-2 animate-spin" />
                          Deploying...
                        </>
                      ) : (
                        <>
                          <Play className="w-4 h-4 mr-2" />
                          Deploy Agent
                        </>
                      )}
                    </Button>
                  ) : (
                    <div className="flex flex-col items-end gap-2">
                      <Button
                        onClick={handleNext}
                        disabled={!isStepValid()}
                        className={
                          !isStepValid() ? "opacity-50 cursor-not-allowed" : ""
                        }
                      >
                        Next
                        <ArrowRight className="w-4 h-4 ml-2" />
                      </Button>
                      {!isStepValid() && getValidationMessage() && (
                        <div className="text-xs text-red-500 text-right max-w-xs">
                          {getValidationMessage()}
                        </div>
                      )}
                    </div>
                  )}
                </div>
              </CardContent>
            </Card>
          </motion.div>

          {/* Template Dialog */}
          <Dialog
            open={templateDialogOpen}
            onOpenChange={setTemplateDialogOpen}
          >
            <DialogContent className="max-w-4xl max-h-[90vh] overflow-y-auto p-4 sm:p-6">
              <DialogHeader className="mb-4">
                <DialogTitle className="text-2xl font-bold">
                  Choose a Template
                </DialogTitle>
                <DialogDescription className="text-muted-foreground">
                  Browse and select from our curated templates to get started
                  quickly.
                </DialogDescription>
              </DialogHeader>
              <div className="grid grid-cols-1 gap-4 md:grid-cols-5 md:gap-6">
                {/* Sidebar: Filters and Categories */}
                <div className="order-2 md:order-1 md:col-span-1">
                  <div className="sticky top-0 space-y-4">
                    <Command className="rounded-lg border shadow-sm">
                      <CommandInput
                        placeholder="Search templates..."
                        value={templateSearch}
                        onValueChange={setTemplateSearch}
                        className="h-10"
                      />
                      <CommandList className="max-h-48 overflow-auto">
                        <CommandEmpty>No templates found.</CommandEmpty>
                        <CommandGroup
                          heading="Categories"
                          className="text-sm font-semibold text-muted-foreground"
                        >
                          <CommandItem
                            onSelect={() => setTemplateCategory("all")}
                            className="cursor-pointer hover:bg-accent"
                          >
                            All
                          </CommandItem>
                          {categories.map((c) => (
                            <CommandItem
                              key={c.name}
                              onSelect={() => setTemplateCategory(c.name)}
                              className="cursor-pointer hover:bg-accent"
                            >
                              {c.name} ({c.template_count})
                            </CommandItem>
                          ))}
                        </CommandGroup>
                      </CommandList>
                    </Command>
                    <Button
                      variant="outline"
                      className="w-full"
                      onClick={async () => {
                        try {
                          const list = await templateService.listTemplates({
                            search: templateSearch || undefined,
                            category:
                              templateCategory !== "all"
                                ? templateCategory
                                : undefined,
                          });
                          setTemplates(list);
                        } catch {}
                      }}
                    >
                      Apply Filters
                    </Button>
                  </div>
                </div>

                {/* Template List */}
                <div className="order-1 md:order-2 md:col-span-2">
                  <ScrollArea className="h-[calc(100vh-200px)] md:h-auto pr-4">
                    <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 md:grid-cols-1 lg:grid-cols-2">
                      {(templateSearch || templateCategory !== "all"
                        ? templates
                        : featured
                      ).map((t) => (
                        <div
                          key={t.id}
                          className="flex flex-col justify-between p-4 transition-all duration-200 border rounded-lg cursor-pointer hover:border-primary hover:shadow-md"
                          onClick={() => handleTemplateSelect(t.id)}
                        >
                          <div>
                            <div className="flex items-start justify-between">
                              <div>
                                <div className="font-semibold text-foreground">
                                  {t.name}
                                </div>
                                <div className="text-xs text-muted-foreground">
                                  {t.category}
                                </div>
                              </div>
                              {t.is_premium && (
                                <Badge variant="secondary">Premium</Badge>
                              )}
                            </div>
                            <div className="mt-2 text-sm text-muted-foreground line-clamp-3">
                              {t.description}
                            </div>
                          </div>
                          <div className="flex items-center gap-2 mt-3 text-xs text-muted-foreground">
                            <span>Model: {t.model_name}</span>
                            <span>•</span>
                            <span>Temp: {t.temperature}</span>
                            {t.voice_enabled && (
                              <>
                                <span>•</span>
                                <span>Voice: {t.voice_type}</span>
                              </>
                            )}
                          </div>
                        </div>
                      ))}
                    </div>
                  </ScrollArea>
                </div>

                {/* Preview Panel */}
                <div className="order-3 md:col-span-2">
                  <Card className="h-full overflow-hidden shadow-lg">
                    <CardHeader className="pb-4">
                      <CardTitle className="text-xl font-semibold">
                        Preview
                      </CardTitle>
                    </CardHeader>
                    <CardContent className="space-y-4">
                      {!selectedTemplate && (
                        <div className="flex items-center justify-center h-32 text-sm text-muted-foreground">
                          Select a template to see a preview.
                        </div>
                      )}
                      {selectedTemplate && previewLoading && (
                        <div className="flex items-center justify-center h-32 text-sm text-muted-foreground">
                          Loading preview…
                        </div>
                      )}
                      {selectedTemplate && previewData && (
                        <div className="space-y-4">
                          <div>
                            <div className="text-lg font-semibold">
                              {selectedTemplate.name}
                            </div>
                            <div className="text-sm text-muted-foreground">
                              {selectedTemplate.description}
                            </div>
                          </div>
                          <Separator />
                          <div>
                            <div className="mb-2 text-sm font-medium">
                              Sample Conversation
                            </div>
                            <ScrollArea className="h-32 p-2 border rounded-md">
                              <div className="space-y-3">
                                {previewData.sample_conversation.map(
                                  (m, idx) => (
                                    <div
                                      key={idx}
                                      className={`text-sm p-2 rounded-md ${
                                        m.role === "user"
                                          ? "bg-accent/50"
                                          : "bg-muted/50"
                                      }`}
                                    >
                                      <span className="font-medium">
                                        {m.role === "user" ? "User" : "Agent"}:
                                      </span>{" "}
                                      {m.content}
                                    </div>
                                  ),
                                )}
                              </div>
                            </ScrollArea>
                          </div>
                          <Separator />
                          <div className="grid grid-cols-2 gap-4 text-xs text-muted-foreground">
                            <div>Model: {previewData.features.model_name}</div>
                            <div>
                              Temperature: {previewData.features.temperature}
                            </div>
                            <div>
                              Tools:{" "}
                              {previewData.features.tools_enabled
                                ? "Enabled"
                                : "Disabled"}
                            </div>
                            <div>
                              Voice:{" "}
                              {previewData.features.voice_enabled
                                ? "Enabled"
                                : "Disabled"}
                            </div>
                          </div>
                          <div className="pt-2">
                            <Button
                              className="w-full"
                              onClick={() => {
                                // Apply selected template and close dialog
                                setTemplateDialogOpen(false);
                              }}
                            >
                              Use this Template
                            </Button>
                          </div>
                        </div>
                      )}
                    </CardContent>
                  </Card>
                </div>
              </div>
            </DialogContent>
          </Dialog>
        </motion.div>
      </div>
    </div>
  );
};

export default CreateAgent;
