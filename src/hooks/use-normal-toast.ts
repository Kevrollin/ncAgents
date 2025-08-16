import { toast } from "sonner";

export const useNormalToast = (message: string) => {
  toast(message, {
    closeButton: true,
    duration: 3000,
  });
};
