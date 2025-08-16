import { setupServer } from "msw/node";
import { http, HttpResponse } from "msw";

export const server = setupServer(
  // Default handlers can go here; individual tests can override with server.use
  http.get("/api/users/profile", () => {
    return HttpResponse.json({
      id: 1,
      username: "testuser",
      email: "test@example.com",
    });
  }),
);
