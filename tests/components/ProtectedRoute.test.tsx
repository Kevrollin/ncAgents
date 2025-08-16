import React from "react";
import { render } from "@testing-library/react";
import { MemoryRouter, Route, Routes } from "react-router-dom";
import ProtectedRoute from "@/components/ProtectedRoute";

const Secret = () => <div>Secret</div>;
const SignIn = () => <div>SignIn</div>;

describe("ProtectedRoute", () => {
  beforeEach(() => sessionStorage.clear());

  it("redirects to signin when no token", () => {
    const { getByText } = render(
      <MemoryRouter initialEntries={["/secret"]}>
        <Routes>
          <Route element={<ProtectedRoute />}>
            <Route path="/secret" element={<Secret />} />
          </Route>
          <Route path="/signin" element={<SignIn />} />
        </Routes>
      </MemoryRouter>,
    );
    getByText("SignIn");
  });

  it("renders outlet when token exists (no expiry check for brevity)", () => {
    // Payload: { exp: 9999999999 } base64url
    sessionStorage.setItem(
      "access_token",
      `header.eyJleHAiOjk5OTk5OTk5OTl9.sig`,
    );
    const { getByText } = render(
      <MemoryRouter initialEntries={["/secret"]}>
        <Routes>
          <Route element={<ProtectedRoute />}>
            <Route path="/secret" element={<Secret />} />
          </Route>
          <Route path="/signin" element={<SignIn />} />
        </Routes>
      </MemoryRouter>,
    );
    getByText("Secret");
  });
});
