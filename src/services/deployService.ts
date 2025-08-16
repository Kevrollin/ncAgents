import axios from "axios";

export interface TelegramDeployRequest {
  agent_id: number;
  bot_token: string;
  bot_name: string;
  webhook_url?: string;
  command_prefix?: string;
  mention_enabled?: boolean;
  slash_commands_enabled?: boolean;
  auto_response?: boolean;
  group_chat_enabled?: boolean;
  private_chat_enabled?: boolean;
  deployment_notes?: string;
}

export interface TelegramDeployment {
  deployment_id: number;
  bot_id: string;
  bot_username: string;
  bot_name: string;
  status: string;
  webhook_url?: string;
  created_at: string;
  deployed_at?: string;
}

export interface TelegramDeploymentStatus {
  deployment_id: number;
  agent_id: number;
  status: string;
  total_messages_processed: number;
  total_responses_sent: number;
  error_count: number;
  last_activity?: string;
  last_error?: string;
  is_running: boolean;
}

export interface DiscordDeployRequest {
  agent_id: number;
  bot_token: string;
  bot_name: string;
  guild_id?: string;
  channel_id?: string;
  command_prefix?: string;
  mention_enabled?: boolean;
  slash_commands_enabled?: boolean;
  auto_response?: boolean;
  deployment_notes?: string;
}

export interface DiscordDeployment {
  deployment_id: number;
  bot_id: string;
  bot_name: string;
  status: string;
  created_at: string;
  deployed_at?: string;
}

export interface DiscordDeploymentStatus {
  deployment_id: number;
  agent_id: number;
  status: string;
  total_messages_processed: number;
  total_responses_sent: number;
  error_count: number;
  last_activity?: string;
  last_error?: string;
  is_running: boolean;
}

// Web App
export interface WebAppDeployRequest {
  agent_id: number;
  app_name: string;
  app_description?: string;
  theme?: string; // default | soft | dark | glass
  allow_file_upload?: boolean;
  allow_voice?: boolean;
}

export interface WebAppDeployment {
  deployment_id: number;
  app_name: string;
  status: string;
  port: number;
  url?: string;
  created_at: string;
  deployed_at?: string;
  error_message?: string;
}

export interface WebAppDeploymentStatus {
  deployment_id: number;
  app_name: string;
  status: string;
  port: number;
  url?: string;
  created_at: string;
  deployed_at?: string;
  error_message?: string;
}

class DeployService {
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

  // Telegram
  async deployTelegram(
    req: TelegramDeployRequest,
  ): Promise<TelegramDeployment> {
    const { data } = await axios.post("/api/telegram/deploy", req, {
      headers: this.getAuthHeaders(),
    });
    return data;
  }

  async listTelegramDeployments(): Promise<TelegramDeployment[]> {
    const { data } = await axios.get("/api/telegram/deployments", {
      headers: this.getAuthHeaders(),
    });
    return data;
  }

  async telegramStatus(
    deploymentId: number,
  ): Promise<TelegramDeploymentStatus> {
    const { data } = await axios.get(
      `/api/telegram/deployments/${deploymentId}/status`,
      {
        headers: this.getAuthHeaders(),
      },
    );
    return data;
  }

  async stopTelegram(deploymentId: number): Promise<void> {
    await axios.delete(`/api/telegram/deployments/${deploymentId}`, {
      headers: this.getAuthHeaders(),
    });
  }

  async restartTelegram(deploymentId: number): Promise<void> {
    await axios.post(
      `/api/telegram/deployments/${deploymentId}/restart`,
      {},
      {
        headers: this.getAuthHeaders(),
      },
    );
  }

  // Discord
  async deployDiscord(req: DiscordDeployRequest): Promise<DiscordDeployment> {
    const { data } = await axios.post("/api/discord/deploy", req, {
      headers: this.getAuthHeaders(),
    });
    return data;
  }

  async listDiscordDeployments(): Promise<DiscordDeployment[]> {
    const { data } = await axios.get("/api/discord/deployments", {
      headers: this.getAuthHeaders(),
    });
    return data;
  }

  async discordStatus(deploymentId: number): Promise<DiscordDeploymentStatus> {
    const { data } = await axios.get(
      `/api/discord/deployments/${deploymentId}/status`,
      {
        headers: this.getAuthHeaders(),
      },
    );
    return data;
  }

  async stopDiscord(deploymentId: number): Promise<void> {
    await axios.delete(`/api/discord/deployments/${deploymentId}`, {
      headers: this.getAuthHeaders(),
    });
  }

  async restartDiscord(deploymentId: number): Promise<void> {
    await axios.post(
      `/api/discord/deployments/${deploymentId}/restart`,
      {},
      {
        headers: this.getAuthHeaders(),
      },
    );
  }

  // Web App
  async deployWebApp(req: WebAppDeployRequest): Promise<WebAppDeployment> {
    const { data } = await axios.post("/api/web-app/deploy", req, {
      headers: this.getAuthHeaders(),
    });
    return data;
  }

  async listWebAppDeployments(): Promise<WebAppDeployment[]> {
    const { data } = await axios.get("/api/web-app/deployments", {
      headers: this.getAuthHeaders(),
    });
    return data;
  }

  async webAppStatus(deploymentId: number): Promise<WebAppDeploymentStatus> {
    const { data } = await axios.get(
      `/api/web-app/deployments/${deploymentId}`,
      {
        headers: this.getAuthHeaders(),
      },
    );
    return data;
  }

  async stopWebApp(deploymentId: number): Promise<void> {
    await axios.delete(`/api/web-app/deployments/${deploymentId}`, {
      headers: this.getAuthHeaders(),
    });
  }

  async restartWebApp(deploymentId: number): Promise<void> {
    await axios.post(
      `/api/web-app/deployments/${deploymentId}/restart`,
      {},
      {
        headers: this.getAuthHeaders(),
      },
    );
  }
}

export const deployService = new DeployService();
