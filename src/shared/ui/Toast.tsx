import { useEffect, useState } from "react";

type ToastProps = {
  message: string;
  duration?: number;
  onClose?: () => void;
};

function Toast({ message, duration = 4000, onClose }: ToastProps) {
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const showTimer = requestAnimationFrame(() => {
      requestAnimationFrame(() => setVisible(true));
    });

    const hideTimer = duration > 0
      ? setTimeout(() => {
          setVisible(false);
          setTimeout(() => onClose?.(), 300);
        }, duration)
      : undefined;

    return () => {
      cancelAnimationFrame(showTimer);
      if (hideTimer) clearTimeout(hideTimer);
    };
  }, [duration, onClose]);

  return (
    <div
      role="status"
      aria-live="polite"
      style={{
        position: "fixed",
        top: "var(--spacing-xl)",
        left: "50%",
        transform: `translateX(-50%) translateY(${visible ? 0 : "-120%"})`,
        padding: "var(--spacing-sm) var(--spacing-xl)",
        backgroundColor: "transparent",
        color: "var(--color-accent-warm)",
        border: "2px solid var(--color-accent-warm)",
        borderRadius: "var(--radius-full)",
        boxShadow: "0 4px 20px rgba(0, 0, 0, 0.12)",
        fontSize: "var(--font-size-sm)",
        fontWeight: 600,
        letterSpacing: "0.02em",
        zIndex: 10000,
        transition: "transform 0.35s cubic-bezier(0.34, 1.56, 0.64, 1)",
      }}
    >
      {message}
    </div>
  );
}

export default Toast;
