import React from "react";
import { screen, waitFor } from "@testing-library/react";
import { renderWithProviders } from "../utils/test-utils";
import { useAuth } from "@/contexts/AuthContext";
import axios from "axios";
import MockAdapter from "axios-mock-adapter";

const TestConsumer = () => {
  const { user, isAuthenticated, login } = useAuth();
  React.useEffect(() => {
    // No-op
  }, []);
  return (
    <div>
      <div data-testid="isAuth">{String(isAuthenticated)}</div>
      <div data-testid="username">{user?.username || ""}</div>
      <button onClick={() => login("testuser", "password")}>login</button>
    </div>
  );
};

describe("AuthContext", () => {
  const mock = new MockAdapter(axios);
  beforeEach(() => {
    sessionStorage.clear();
    mock.reset();
  });

  it("logs in and sets user from profile", async () => {
    mock.onPost("/api/auth/login").reply(200, {
      access_token:
        "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJleHAiIjoxOTk5OTk5OTk5fQ.fake",
      refresh_token: "refresh",
    });
    mock.onGet("/api/users/profile").reply(200, {
      id: 1,
      username: "testuser",
      email: "test@example.com",
    });

    renderWithProviders(<TestConsumer />);
    screen.getByText("login").click();

    await waitFor(() => {
      expect(screen.getByTestId("isAuth").textContent).toBe("true");
      expect(screen.getByTestId("username").textContent).toBe("testuser");
    });
  });
});
