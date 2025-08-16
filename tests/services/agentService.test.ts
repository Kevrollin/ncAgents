import axios from "axios";
import MockAdapter from "axios-mock-adapter";
import { agentService } from "@/services/agentService";

describe("agentService", () => {
  const mock = new MockAdapter(axios);
  beforeEach(() => {
    sessionStorage.setItem("access_token", "token");
    mock.reset();
  });

  it("fetches agents with auth header", async () => {
    mock.onGet(/\/api\/agents\/\?skip=0&limit=100/).reply((config) => {
      expect(config.headers?.Authorization).toContain("Bearer ");
      return [200, []];
    });

    const res = await agentService.getAgents();
    expect(res).toEqual([]);
  });
});
