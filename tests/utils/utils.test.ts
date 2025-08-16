import { cn, isTokenValid, getTokenPayload } from "@/lib/utils";

// Helper to build a fake JWT string with a given payload object
const buildToken = (payload: object) => {
  const header = "header";
  const json = JSON.stringify(payload);
  const base64url = Buffer.from(json)
    .toString("base64")
    .replace(/=/g, "")
    .replace(/\+/g, "-")
    .replace(/\//g, "_");
  const signature = "sig";
  return `${header}.${base64url}.${signature}`;
};

describe("utils", () => {
  beforeEach(() => sessionStorage.clear());

  it("cn merges class names and resolves conflicts", () => {
    expect(cn("p-2", "p-4")).toBe("p-4");
    expect(cn("text-sm", false && "text-lg", undefined, "font-bold")).toBe(
      "text-sm font-bold",
    );
    expect(cn("bg-white", "bg-black", "text-red-500")).toBe(
      "bg-black text-red-500",
    );
  });

  it("isTokenValid returns false when token is missing or invalid", () => {
    expect(isTokenValid()).toBe(false);
    sessionStorage.setItem("access_token", "not-a-jwt");
    expect(isTokenValid()).toBe(false);
  });

  it("isTokenValid returns true for future exp and false for past exp", () => {
    const future = buildToken({ exp: 9999999999 });
    sessionStorage.setItem("access_token", future);
    expect(isTokenValid()).toBe(true);

    const past = buildToken({ exp: 1 });
    sessionStorage.setItem("access_token", past);
    expect(isTokenValid()).toBe(false);
  });

  it("getTokenPayload returns parsed payload or null", () => {
    expect(getTokenPayload()).toBeNull();
    const payload = { exp: 1234, sub: "user-1", role: "admin" };
    sessionStorage.setItem("access_token", buildToken(payload));
    expect(getTokenPayload()).toEqual(payload);
  });
});
