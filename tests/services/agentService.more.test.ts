import axios from "axios";
import MockAdapter from "axios-mock-adapter";
import {
  agentService,
  type AgentCreateRequest,
  type AgentUpdateRequest,
} from "@/services/agentService";

describe("agentService (more)", () => {
  const mock = new MockAdapter(axios);

  beforeEach(() => {
    sessionStorage.setItem("access_token", "token123");
    mock.reset();
  });

  it("creates an agent and returns response", async () => {
    const body: AgentCreateRequest = { prompt: "p", description: "d" };
    const result = {
      id: 1,
      creator_id: 2,
      prompt: "p",
      description: "d",
      created_at: "now",
    } as any;
    mock.onPost(/\/api\/agents\/?$/).reply((config) => {
      expect(config.headers?.Authorization).toContain("Bearer token123");
      expect(JSON.parse(config.data).prompt).toBe("p");
      return [200, result];
    });
    const res = await agentService.createAgent(body);
    expect(res).toEqual(result);
  });

  it("updates an agent and returns updated object", async () => {
    const body: AgentUpdateRequest = { description: "new" };
    const result = {
      id: 1,
      creator_id: 2,
      prompt: "p",
      description: "new",
      created_at: "now",
    } as any;
    mock.onPut("/api/agents/1").reply((config) => {
      expect(config.headers?.Authorization).toContain("Bearer token123");
      expect(JSON.parse(config.data).description).toBe("new");
      return [200, result];
    });
    const res = await agentService.updateAgent(1, body);
    expect(res.description).toBe("new");
  });

  it("gets a single agent by id", async () => {
    const result = {
      id: 5,
      creator_id: 2,
      prompt: "q",
      description: "x",
      created_at: "now",
    } as any;
    mock.onGet("/api/agents/5").reply(200, result);
    const res = await agentService.getAgent(5);
    expect(res.id).toBe(5);
  });

  it("deletes an agent", async () => {
    mock.onDelete("/api/agents/7").reply((config) => {
      expect(config.headers?.Authorization).toContain("Bearer token123");
      return [200];
    });
    await expect(agentService.deleteAgent(7)).resolves.toBeUndefined();
  });

  it("fetches conversations list", async () => {
    mock
      .onGet(/\/api\/agents\/3\/conversations\?skip=10&limit=20/)
      .reply(200, []);
    const res = await agentService.getAgentConversations(3, 10, 20);
    expect(Array.isArray(res)).toBe(true);
  });

  it("toggles deep research with multipart form-data", async () => {
    mock.onPatch("/api/agents/9/deep_research").reply((config) => {
      expect(config.headers?.Authorization).toContain("Bearer token123");
      expect(
        String(config.headers?.["Content-Type"]).includes(
          "multipart/form-data",
        ),
      ).toBe(true);
      return [200];
    });
    await expect(
      agentService.toggleDeepResearch(9, true, 0.5, 10),
    ).resolves.toBeUndefined();
  });

  it("gets voice capabilities", async () => {
    const capabilities = { voices: ["alloy", "verse"] };
    mock.onGet("/api/agents/voice/capabilities").reply(200, capabilities);
    const res = await agentService.getVoiceCapabilities();
    expect(res.voices).toContain("alloy");
  });

  it("transforms agent response into frontend shape", () => {
    const agent = {
      id: 1,
      creator_id: 2,
      prompt: "Agent P",
      description: "desc",
      created_at: "2024-01-01",
      tools_enabled: true,
      deep_research_enabled: true,
      temperature: 0.8,
      usage_count: 42,
      last_used: "2024-02-01",
    } as any;

    const transformed = agentService.transformAgentResponse(agent);
    expect(transformed.id).toBe("1");
    expect(transformed.capabilities).toEqual(
      expect.arrayContaining(["memory", "research", "analytics"]),
    );
    expect(transformed.analytics.totalInteractions).toBe(42);
  });
});
