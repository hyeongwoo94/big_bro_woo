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
      className={`toast${visible ? " toast--visible" : ""}`}
    >
      {message}
    </div>
  );
}

export default Toast;
