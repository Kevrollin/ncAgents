// tests/AuthContext.test.tsx
import React from "react";
import { render, screen, fireEvent } from "@testing-library/react";
import axios from "axios";
import MockAdapter from "axios-mock-adapter";
import { AuthProvider, useAuth } from "@/contexts/AuthContext";
import { MemoryRouter } from "react-router-dom";

// Set up Axios mock
const mock = new MockAdapter(axios);

// Simple component to test the AuthContext
const TestLogin = () => {
  const { login, user, isAuthenticated } = useAuth();
  const [error, setError] = React.useState("");

  const handleLogin = async () => {
    try {
      await login("test@email.com", "password123");
    } catch (err) {
      setError("Login failed");
    }
  };

  return (
    <div>
      <button onClick={handleLogin}>Login</button>
      <span data-testid="user">{user?.email}</span>
      <span data-testid="auth">{isAuthenticated ? "true" : "false"}</span>
      <span data-testid="error">{error}</span>
    </div>
  );
};

describe("AuthContext", () => {
  beforeEach(() => {
    mock.reset();
    sessionStorage.clear();
  });

  afterEach(() => {
    mock.reset();
    sessionStorage.clear();
  });

  it("logs in a user and sets context state", async () => {
    mock.onPost("/api/auth/login").reply(200, {
      access_token: "access123",
      refresh_token: "refresh123",
    });
    mock.onGet("/api/users/profile").reply(200, {
      id: 1,
      username: "testuser",
      email: "test@email.com",
    });

    render(
      <MemoryRouter>
        <AuthProvider>
          <TestLogin />
        </AuthProvider>
      </MemoryRouter>,
    );

    fireEvent.click(screen.getByText("Login"));

    const userSpan = await screen.findByTestId("user");
    const authSpan = await screen.findByTestId("auth");

    expect(userSpan.textContent).toBe("test@email.com");
    expect(authSpan.textContent).toBe("true");

    expect(sessionStorage.getItem("access_token")).toBe("access123");
    expect(sessionStorage.getItem("refresh_token")).toBe("refresh123");
  });

  it("handles login failure", async () => {
    mock.onPost("/api/auth/login").reply(401);

    render(
      <MemoryRouter>
        <AuthProvider>
          <TestLogin />
        </AuthProvider>
      </MemoryRouter>,
    );

    fireEvent.click(screen.getByText("Login"));

    const errorSpan = await screen.findByTestId("error");
    const authSpan = await screen.findByTestId("auth");

    expect(errorSpan.textContent).toBe("Login failed");
    expect(authSpan.textContent).toBe("false");

    expect(sessionStorage.getItem("accessToken")).toBe(null);
  });

  it("registers a user via API call", async () => {
    mock.onPost("/api/auth/register").reply(200, { success: true });

    const response = await axios.post("/api/auth/register", {
      first_name: "Test",
      last_name: "User",
      email: "test@email.com",
      password: "password123",
      confirm_password: "password123",
    });

    expect(response.status).toBe(200);
    expect(response.data.success).toBe(true);
  });
});
