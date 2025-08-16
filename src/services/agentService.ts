import axios from "axios";

// Types for API responses
export interface AgentCreateRequest {
  prompt: string;
  description: string;
  system_prompt?: string;
  tools_enabled?: boolean;
  max_memory_length?: number;
  temperature?: number;
  model_name?: string;
  model_provider?: string;
  use_fallback?: boolean;
  max_tokens?: number;
}

export interface AgentUpdateRequest {
  prompt?: string;
  description?: string;
  system_prompt?: string;
  tools_enabled?: boolean;
  max_memory_length?: number;
  temperature?: number;
  model_name?: string;
  model_provider?: string;
  use_fallback?: boolean;
  max_tokens?: number;
}

export interface AgentResponse {
  id: number;
  creator_id: number;
  prompt: string;
  description: string;
  created_at: string;
  system_prompt?: string;
  tools_enabled?: boolean;
  max_memory_length?: number;
  temperature?: number;
  model_name?: string;
  model_provider?: string;
  use_fallback?: boolean;
  max_tokens?: number;
  category?: string;
  tags?: string;
  is_template?: boolean;
  template_id?: number;
  is_public?: boolean;
  usage_count?: number;
  rating?: number;
  rating_count?: number;
  last_used?: string;
  deep_research_enabled?: boolean;
  deep_research_threshold?: number;
  deep_research_max_chunks?: number;
}

export interface ChatRequest {
  message: string;
  session_id?: string;
  voice_enabled?: boolean;
  voice_type?: string;
  input_type?: string;
  audio_base64?: string;
}

export interface ChatResponse {
  response: string;
  session_id: string;
  conversation_id: number;
  voice_audio?: string;
  voice_enabled: boolean;
  input_text?: string;
  voice_provider?: string;
}

export interface SimpleChatRequest {
  message: string;
  voice_enabled?: boolean;
  voice_type?: string;
  fresh_conversation?: boolean;
  audio_base64?: string;
  session_id?: string;
}

export interface SimpleChatResponse {
  response: string;
  session_id: string;
  conversation_id: number;
  voice_audio?: string;
  voice_enabled: boolean;
}

export interface ConversationLog {
  id: number;
  agent_id: number;
  user_id: number;
  session_id: string;
  created_at: string;
  updated_at: string;
  messages: ConversationMessage[];
}

export interface ConversationMessage {
  id: number;
  conversation_id: number;
  role: "user" | "assistant";
  content: string;
  timestamp: string;
  voice_audio?: string;
  input_type?: string;
}

class AgentService {
  private baseURL = "/api/agents";

  // Get auth token from session storage (explicit header to avoid timing issues)
  private getAuthHeaders() {
    const token = sessionStorage.getItem("access_token");
    const headers: Record<string, string> = {
      "Content-Type": "application/json",
    };
    if (token) {
      headers["Authorization"] = `Bearer ${token}`;
    }
    return headers;
  }

  // Create a new agent
  async createAgent(agentData: AgentCreateRequest): Promise<AgentResponse> {
    try {
      const response = await axios.post(`${this.baseURL}/`, agentData, {
        headers: this.getAuthHeaders(),
      });
      return response.data;
    } catch (error: any) {
      throw new Error(error.response?.data?.detail || "Failed to create agent");
    }
  }

  // Get all agents for the current user
  async getAgents(
    skip: number = 0,
    limit: number = 100,
  ): Promise<AgentResponse[]> {
    try {
      const response = await axios.get(
        `${this.baseURL}/?skip=${skip}&limit=${limit}`,
        {
          headers: this.getAuthHeaders(),
        },
      );
      return response.data;
    } catch (error: any) {
      throw new Error(error.response?.data?.detail || "Failed to fetch agents");
    }
  }

  // Get a specific agent by ID
  async getAgent(agentId: number): Promise<AgentResponse> {
    try {
      const response = await axios.get(`${this.baseURL}/${agentId}`, {
        headers: this.getAuthHeaders(),
      });
      return response.data;
    } catch (error: any) {
      throw new Error(error.response?.data?.detail || "Failed to fetch agent");
    }
  }

  // Update an agent
  async updateAgent(
    agentId: number,
    agentData: AgentUpdateRequest,
  ): Promise<AgentResponse> {
    try {
      const response = await axios.put(
        `${this.baseURL}/${agentId}`,
        agentData,
        {
          headers: this.getAuthHeaders(),
        },
      );
      return response.data;
    } catch (error: any) {
      throw new Error(error.response?.data?.detail || "Failed to update agent");
    }
  }

  // Delete an agent
  async deleteAgent(agentId: number): Promise<void> {
    try {
      await axios.delete(`${this.baseURL}/${agentId}`, {
        headers: this.getAuthHeaders(),
      });
    } catch (error: any) {
      throw new Error(error.response?.data?.detail || "Failed to delete agent");
    }
  }

  // Chat with an agent (simple chat)
  async chatWithAgent(
    agentId: number,
    chatData: SimpleChatRequest,
  ): Promise<SimpleChatResponse> {
    try {
      const response = await axios.post(
        `${this.baseURL}/${agentId}/chat-simple`,
        chatData,
        {
          headers: this.getAuthHeaders(),
        },
      );
      return response.data;
    } catch (error: any) {
      throw new Error(
        error.response?.data?.detail || "Failed to chat with agent",
      );
    }
  }

  // Get agent conversations
  async getAgentConversations(
    agentId: number,
    skip: number = 0,
    limit: number = 50,
  ): Promise<ConversationLog[]> {
    try {
      const response = await axios.get(
        `${this.baseURL}/${agentId}/conversations?skip=${skip}&limit=${limit}`,
        {
          headers: this.getAuthHeaders(),
        },
      );
      return response.data;
    } catch (error: any) {
      throw new Error(
        error.response?.data?.detail || "Failed to fetch conversations",
      );
    }
  }

  // Toggle deep research for an agent
  async toggleDeepResearch(
    agentId: number,
    enabled: boolean,
    threshold: number = 0.3,
    maxChunks: number = 5,
  ): Promise<void> {
    try {
      const formData = new FormData();
      formData.append("enabled", enabled.toString());
      formData.append("threshold", threshold.toString());
      formData.append("max_chunks", maxChunks.toString());

      await axios.patch(`${this.baseURL}/${agentId}/deep_research`, formData, {
        headers: {
          ...this.getAuthHeaders(),
          "Content-Type": "multipart/form-data",
        },
      });
    } catch (error: any) {
      throw new Error(
        error.response?.data?.detail || "Failed to toggle deep research",
      );
    }
  }

  // Get voice capabilities
  async getVoiceCapabilities(): Promise<any> {
    try {
      const response = await axios.get(`${this.baseURL}/voice/capabilities`, {
        headers: this.getAuthHeaders(),
      });
      return response.data;
    } catch (error: any) {
      throw new Error(
        error.response?.data?.detail || "Failed to fetch voice capabilities",
      );
    }
  }

  // Transform backend agent response to frontend agent format
  transformAgentResponse(agent: AgentResponse): any {
    return {
      id: agent.id.toString(),
      name: agent.prompt,
      description: agent.description,
      avatar: "🤖", // Default avatar
      status: "active" as const,
      capabilities: this.getCapabilitiesFromAgent(agent),
      config: {
        memory: {
          level:
            agent.max_memory_length && agent.max_memory_length > 20
              ? "advanced"
              : "standard",
          size: `${agent.max_memory_length || 10}GB`,
          retention: 60,
        },
        voice: {
          enabled: false, // Will be updated based on voice capabilities
          voice: "alloy",
          speechRate: 1.0,
          language: "en",
        },
        collaboration: {
          enabled: agent.tools_enabled || false,
          modes: ["task_chain"],
          maxTeamSize: 3,
        },
        analytics: {
          enabled: true,
          trackInteractions: true,
          generateReports: true,
        },
      },
      personality: {
        tone: "professional",
        expertiseAreas: ["AI", "Automation"],
        responseLength: "detailed",
        creativity: Math.round((agent.temperature || 0.7) * 100),
        formality: 80,
        empathy: 60,
      },
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
      createdAt: agent.created_at,
      updatedAt: agent.last_used || agent.created_at,
      createdBy: agent.creator_id.toString(),
      version: "1.0.0",
      analytics: {
        totalInteractions: agent.usage_count || 0,
        averageResponseTime: 850,
        userSatisfactionScore: agent.rating
          ? Math.round(agent.rating * 20)
          : 85,
        successRate: 88,
        lastActivity: agent.last_used || agent.created_at,
        dailyInteractions: [],
        topQueries: [],
      },
      isTemplate: agent.is_template || false,
      trainingData: {
        documents: 0,
        lastTraining: agent.created_at,
        accuracy: 90,
      },
    };
  }

  private getCapabilitiesFromAgent(agent: AgentResponse): string[] {
    const capabilities: string[] = [];

    if (agent.tools_enabled) {
      capabilities.push("memory");
    }

    if (agent.deep_research_enabled) {
      capabilities.push("research");
    }

    // Add default capabilities
    capabilities.push("analytics");

    return capabilities;
  }
}

export const agentService = new AgentService();
