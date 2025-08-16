import axios from "axios";

export interface TemplateResponse {
  id: string;
  name: string;
  description: string;
  category: string;
  tags: string[];
  is_premium: boolean;
  tools_enabled: boolean;
  temperature: number;
  model_name: string;
  voice_enabled: boolean;
  voice_type: string;
}

export interface CategoryResponse {
  name: string;
  description: string;
  template_count: number;
  icon?: string;
}

export interface CreateFromTemplateRequest {
  custom_prompt?: string;
  custom_description?: string;
  category?: string;
  tags?: string[];
  tools_enabled?: boolean;
  temperature?: number;
  model_name?: string;
  voice_enabled?: boolean;
  voice_type?: string;
}

export interface CreateFromTemplateResponse {
  success: boolean;
  agent_id: number;
  message: string;
  agent: {
    id: number;
    prompt: string;
    description: string;
    category?: string;
    created_at: string;
  };
}

export interface TemplatePreviewResponse {
  template: {
    id: string;
    name: string;
    description: string;
    category: string;
    tags: string[];
    system_prompt?: string;
    personality_traits?: string[];
    knowledge_base?: string[];
    response_style?: string;
  };
  sample_conversation: { role: "user" | "assistant"; content: string }[];
  features: {
    tools_enabled: boolean;
    voice_enabled: boolean;
    temperature: number;
    model_name: string;
  };
}

class TemplateService {
  private getAuthHeaders() {
    const token = sessionStorage.getItem("access_token");
    const headers: Record<string, string> = {
      "Content-Type": "application/json",
    };
    if (token) headers["Authorization"] = `Bearer ${token}`;
    return headers;
  }

  async listTemplates(params?: {
    category?: string;
    search?: string;
    premium_only?: boolean;
  }): Promise<TemplateResponse[]> {
    const { data } = await axios.get("/api/templates/", {
      headers: this.getAuthHeaders(),
      params,
    });
    return data;
  }

  async listFeatured(): Promise<TemplateResponse[]> {
    const { data } = await axios.get("/api/templates/featured/templates", {
      headers: this.getAuthHeaders(),
    });
    return data;
  }

  async listCategories(): Promise<CategoryResponse[]> {
    const { data } = await axios.get("/api/templates/categories", {
      headers: this.getAuthHeaders(),
    });
    return data;
  }

  async getTemplate(templateId: string): Promise<TemplateResponse> {
    const { data } = await axios.get(`/api/templates/${templateId}`, {
      headers: this.getAuthHeaders(),
    });
    return data;
  }

  async getTemplatePreview(
    templateId: string,
  ): Promise<TemplatePreviewResponse> {
    const { data } = await axios.get(`/api/templates/${templateId}/preview`, {
      headers: this.getAuthHeaders(),
    });
    return data;
  }

  async createFromTemplate(
    templateId: string,
    body: CreateFromTemplateRequest,
  ): Promise<CreateFromTemplateResponse> {
    const { data } = await axios.post(
      `/api/templates/${templateId}/create`,
      body,
      { headers: this.getAuthHeaders() },
    );
    return data;
  }
}

export const templateService = new TemplateService();
