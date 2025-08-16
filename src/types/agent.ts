// Agent data types and interfaces

export type AgentStatus = "draft" | "active" | "inactive" | "archived";
export type AgentCapability =
  | "memory"
  | "voice"
  | "collaboration"
  | "analytics"
  | "research"
  | "creative"
  | "support"
  | "automation";
export type CollaborationMode =
  | "expert_panel"
  | "debate"
  | "task_chain"
  | "parallel";
export type MemoryLevel = "basic" | "standard" | "advanced" | "unlimited";
export type ResponseStyle =
  | "professional"
  | "casual"
  | "technical"
  | "creative"
  | "supportive";

export interface AgentCapabilityConfig {
  memory: {
    level: MemoryLevel;
    size: string;
    retention: number; // days
  };
  voice: {
    enabled: boolean;
    voice: string;
    speechRate: number;
    language: string;
  };
  collaboration: {
    enabled: boolean;
    modes: CollaborationMode[];
    maxTeamSize: number;
  };
  analytics: {
    enabled: boolean;
    trackInteractions: boolean;
    generateReports: boolean;
  };
}

export interface AgentPersonality {
  tone: ResponseStyle;
  expertiseAreas: string[];
  responseLength: "concise" | "detailed" | "comprehensive";
  creativity: number; // 0-100
  formality: number; // 0-100
  empathy: number; // 0-100;
}

export interface AgentIntegration {
  apiConnections: {
    id: string;
    name: string;
    type: string;
    enabled: boolean;
  }[];
  dataSources: {
    id: string;
    name: string;
    type: "database" | "api" | "file" | "web";
    url?: string;
    enabled: boolean;
  }[];
  permissions: {
    canAccessInternet: boolean;
    canModifyData: boolean;
    canSendEmails: boolean;
    canScheduleMeetings: boolean;
  };
}

export interface AgentAnalytics {
  totalInteractions: number;
  averageResponseTime: number; // milliseconds
  userSatisfactionScore: number; // 0-100
  successRate: number; // 0-100
  lastActivity: string;
  dailyInteractions: {
    date: string;
    count: number;
  }[];
  topQueries: {
    query: string;
    count: number;
  }[];
}

export interface ConversationLog {
  id: string;
  timestamp: string;
  userId: string;
  userName: string;
  messages: {
    id: string;
    role: "user" | "agent";
    content: string;
    timestamp: string;
  }[];
  rating?: number; // 1-5
  feedback?: string;
  duration: number; // seconds
}

export interface Agent {
  id: string;
  name: string;
  description: string;
  avatar: string;
  status: AgentStatus;
  capabilities: AgentCapability[];

  // Configuration
  config: AgentCapabilityConfig;
  personality: AgentPersonality;
  integrations: AgentIntegration;

  // Metadata
  createdAt: string;
  updatedAt: string;
  createdBy: string;
  version: string;

  // Analytics
  analytics: AgentAnalytics;

  // Collaboration
  teamId?: string;
  collaborators?: string[];

  // Template info
  isTemplate: boolean;
  templateCategory?: string;

  // Training
  trainingData?: {
    documents: number;
    lastTraining: string;
    accuracy: number;
  };
}

export interface AgentTemplate {
  id: string;
  name: string;
  description: string;
  category: string;
  avatar: string;
  capabilities: AgentCapability[];
  config: Partial<AgentCapabilityConfig>;
  personality: Partial<AgentPersonality>;
  integrations: Partial<AgentIntegration>;
  popularity: number;
  rating: number;
  downloads: number;
  createdBy: string;
  isOfficial: boolean;
}

export interface AgentCreationStep {
  id: number;
  title: string;
  description: string;
  isComplete: boolean;
  isActive: boolean;
}

export interface AgentFormData {
  // Step 1: Basic Information
  name: string;
  description: string;
  systemPrompt: string;
  avatar: string;

  // Step 2: Capabilities
  capabilities: AgentCapability[];
  config: Partial<AgentCapabilityConfig>;

  // Model configuration
  modelProvider?: string;
  modelName?: string;
  temperature?: number;
  maxTokens?: number;
  useFallback?: boolean;

  // Step 3: Personality
  personality: Partial<AgentPersonality>;

  // Step 4: Integrations
  integrations: Partial<AgentIntegration>;

  // Step 5: Review
  templateId?: string;
  saveAsDraft: boolean;
}

// Mock data for development
export const mockAgents: Agent[] = [
  {
    id: "agent_1",
    name: "DataAnalyst Pro",
    description:
      "Advanced data analysis and visualization agent with machine learning capabilities",
    avatar: "🤖",
    status: "active",
    capabilities: ["memory", "analytics", "collaboration", "research"],
    config: {
      memory: { level: "advanced", size: "25GB", retention: 90 },
      voice: { enabled: true, voice: "alloy", speechRate: 1.0, language: "en" },
      collaboration: {
        enabled: true,
        modes: ["expert_panel", "task_chain"],
        maxTeamSize: 5,
      },
      analytics: {
        enabled: true,
        trackInteractions: true,
        generateReports: true,
      },
    },
    personality: {
      tone: "professional",
      expertiseAreas: ["Data Science", "Machine Learning", "Statistics"],
      responseLength: "detailed",
      creativity: 30,
      formality: 80,
      empathy: 60,
    },
    integrations: {
      apiConnections: [
        {
          id: "api_1",
          name: "Google Analytics",
          type: "analytics",
          enabled: true,
        },
        { id: "api_2", name: "Tableau", type: "visualization", enabled: true },
      ],
      dataSources: [
        { id: "ds_1", name: "Sales Database", type: "database", enabled: true },
        {
          id: "ds_2",
          name: "Marketing API",
          type: "api",
          url: "https://api.marketing.com",
          enabled: true,
        },
      ],
      permissions: {
        canAccessInternet: true,
        canModifyData: false,
        canSendEmails: true,
        canScheduleMeetings: false,
      },
    },
    createdAt: "2024-01-15T10:00:00Z",
    updatedAt: "2024-01-20T15:30:00Z",
    createdBy: "user_123",
    version: "1.2.0",
    analytics: {
      totalInteractions: 1250,
      averageResponseTime: 850,
      userSatisfactionScore: 92,
      successRate: 88,
      lastActivity: "2024-01-20T14:30:00Z",
      dailyInteractions: [
        { date: "2024-01-20", count: 45 },
        { date: "2024-01-19", count: 38 },
        { date: "2024-01-18", count: 52 },
      ],
      topQueries: [
        { query: "Analyze sales trends", count: 125 },
        { query: "Generate monthly report", count: 98 },
        { query: "Customer segmentation", count: 76 },
      ],
    },
    isTemplate: false,
    trainingData: {
      documents: 1500,
      lastTraining: "2024-01-18T09:00:00Z",
      accuracy: 94,
    },
  },
  {
    id: "agent_2",
    name: "Customer Support",
    description:
      "24/7 customer service automation agent with multilingual support",
    avatar: "🎧",
    status: "active",
    capabilities: ["voice", "memory", "support", "collaboration"],
    config: {
      memory: { level: "standard", size: "10GB", retention: 60 },
      voice: { enabled: true, voice: "nova", speechRate: 1.1, language: "en" },
      collaboration: { enabled: true, modes: ["task_chain"], maxTeamSize: 3 },
      analytics: {
        enabled: true,
        trackInteractions: true,
        generateReports: false,
      },
    },
    personality: {
      tone: "supportive",
      expertiseAreas: [
        "Customer Service",
        "Product Knowledge",
        "Troubleshooting",
      ],
      responseLength: "concise",
      creativity: 40,
      formality: 60,
      empathy: 95,
    },
    integrations: {
      apiConnections: [
        { id: "api_3", name: "Zendesk", type: "support", enabled: true },
        { id: "api_4", name: "Slack", type: "communication", enabled: true },
      ],
      dataSources: [
        { id: "ds_3", name: "Knowledge Base", type: "database", enabled: true },
        { id: "ds_4", name: "FAQ Documents", type: "file", enabled: true },
      ],
      permissions: {
        canAccessInternet: false,
        canModifyData: true,
        canSendEmails: true,
        canScheduleMeetings: true,
      },
    },
    createdAt: "2024-01-10T08:00:00Z",
    updatedAt: "2024-01-19T12:15:00Z",
    createdBy: "user_123",
    version: "1.1.0",
    analytics: {
      totalInteractions: 890,
      averageResponseTime: 450,
      userSatisfactionScore: 96,
      successRate: 94,
      lastActivity: "2024-01-20T16:45:00Z",
      dailyInteractions: [
        { date: "2024-01-20", count: 32 },
        { date: "2024-01-19", count: 28 },
        { date: "2024-01-18", count: 35 },
      ],
      topQueries: [
        { query: "Password reset help", count: 89 },
        { query: "Billing questions", count: 67 },
        { query: "Feature requests", count: 45 },
      ],
    },
    isTemplate: false,
    trainingData: {
      documents: 800,
      lastTraining: "2024-01-16T14:00:00Z",
      accuracy: 97,
    },
  },
];

export const mockAgentTemplates: AgentTemplate[] = [
  {
    id: "template_1",
    name: "Data Analyst",
    description: "Pre-configured agent for data analysis and reporting",
    category: "Analytics",
    avatar: "📊",
    capabilities: ["memory", "analytics", "research"],
    config: {
      memory: { level: "advanced", size: "25GB", retention: 90 },
      analytics: {
        enabled: true,
        trackInteractions: true,
        generateReports: true,
      },
    },
    personality: {
      tone: "professional",
      expertiseAreas: ["Data Science", "Statistics"],
      responseLength: "detailed",
    },
    integrations: {
      permissions: {
        canAccessInternet: true,
        canModifyData: false,
        canSendEmails: true,
        canScheduleMeetings: false,
      },
    },
    popularity: 95,
    rating: 4.8,
    downloads: 1250,
    createdBy: "ncAGENTS",
    isOfficial: true,
  },
  {
    id: "template_2",
    name: "Customer Support",
    description: "Ready-to-use customer service agent with best practices",
    category: "Support",
    avatar: "🎧",
    capabilities: ["voice", "memory", "support"],
    config: {
      memory: { level: "standard", size: "10GB", retention: 60 },
      voice: { enabled: true, voice: "nova", speechRate: 1.1, language: "en" },
    },
    personality: {
      tone: "supportive",
      expertiseAreas: ["Customer Service"],
      responseLength: "concise",
      empathy: 95,
    },
    integrations: {
      permissions: {
        canAccessInternet: false,
        canModifyData: true,
        canSendEmails: true,
        canScheduleMeetings: true,
      },
    },
    popularity: 88,
    rating: 4.9,
    downloads: 980,
    createdBy: "ncAGENTS",
    isOfficial: true,
  },
];
