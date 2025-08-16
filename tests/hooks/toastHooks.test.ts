import { useNormalToast } from "@/hooks/use-normal-toast";
import { useDestructiveToast } from "@/hooks/use-destructive-toast";

jest.mock("sonner", () => ({
  toast: Object.assign(jest.fn(), {
    error: jest.fn(),
  }),
}));

describe("toast hooks", () => {
  afterEach(() => {
    jest.clearAllMocks();
  });

  it("useNormalToast calls toast with message and options", () => {
    const { toast } = require("sonner");
    useNormalToast("hello");
    expect(toast).toHaveBeenCalledWith(
      "hello",
      expect.objectContaining({ closeButton: true, duration: 3000 }),
    );
  });

  it("useDestructiveToast calls toast.error with message and styles", () => {
    const { toast } = require("sonner");
    useDestructiveToast("bad");
    expect(toast.error).toHaveBeenCalled();
    const callArg = (toast.error as jest.Mock).mock.calls[0][1];
    expect(callArg).toEqual(
      expect.objectContaining({
        closeButton: true,
        duration: 3000,
      }),
    );
  });
});
