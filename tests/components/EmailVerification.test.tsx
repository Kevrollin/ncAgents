import React from "react";
import { render, screen, waitFor } from "@testing-library/react";
import EmailVerification from "@/pages/EmailVerification";
import axios from "axios";
import MockAdapter from "axios-mock-adapter";
import { MemoryRouter, Route, Routes } from "react-router-dom";

describe("EmailVerification", () => {
  const mock = new MockAdapter(axios);
  beforeEach(() => {
    mock.reset();
  });

  it("auto-posts token and shows success", async () => {
    mock.onPost("/api/auth/verify-email").reply(200, { message: "ok" });

    render(
      <MemoryRouter initialEntries={["/verify-email?token=abc123"]}>
        <Routes>
          <Route path="/verify-email" element={<EmailVerification />} />
        </Routes>
      </MemoryRouter>,
    );

    await waitFor(() => {
      expect(
        screen.getAllByText(/Email verified successfully!/i).length,
      ).toBeGreaterThan(0);
    });
  });
});
