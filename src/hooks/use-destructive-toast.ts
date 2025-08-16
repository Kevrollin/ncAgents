import { toast } from "sonner";

export const useDestructiveToast = (message: string) => {
  toast.error(message, {
    style: {
      "--normal-bg": "var(--background)",
      "--normal-text": "var(--destructive)",
      "--normal-border": "var(--destructive)",
    } as React.CSSProperties,
    closeButton: true,
    duration: 3000,
  });
};
