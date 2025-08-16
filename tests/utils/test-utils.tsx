import React, { PropsWithChildren } from "react";
import { render } from "@testing-library/react";
import { BrowserRouter } from "react-router-dom";
import { AuthProvider } from "@/contexts/AuthContext";

const Providers = ({ children }: PropsWithChildren) => {
  return (
    <BrowserRouter>
      <AuthProvider>{children}</AuthProvider>
    </BrowserRouter>
  );
};

export const renderWithProviders = (ui: React.ReactElement, options?: any) =>
  render(ui, { wrapper: Providers, ...options });
