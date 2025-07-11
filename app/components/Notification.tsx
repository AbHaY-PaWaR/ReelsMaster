"use client";

import React, {
  createContext,
  useContext,
  useState,
  useCallback,
  useEffect,
  ReactNode,
} from "react";

type NotificationType = "success" | "error" | "warning" | "info";

interface Notification {
  id: string;
  message: string;
  type: NotificationType;
}

interface NotificationContextType {
  showNotification: (message: string, type: NotificationType) => void;
}

const NotificationContext = createContext<NotificationContextType | undefined>(undefined);

export const NotificationProvider = ({ children }: { children: ReactNode }) => {
  const [notifications, setNotifications] = useState<Notification[]>([]);

  const showNotification = useCallback((message: string, type: NotificationType) => {
    const id = crypto.randomUUID(); // generate unique ID
    const newNotification: Notification = { id, message, type };
    setNotifications((prev) => [...prev, newNotification]);

    // Remove notification after 3 seconds
    setTimeout(() => {
      setNotifications((prev) => prev.filter((n) => n.id !== id));
    }, 3000);
  }, []);

  return (
    <NotificationContext.Provider value={{ showNotification }}>
      {children}
      {/* Notification UI */}
      <div className="fixed top-5 right-5 space-y-2 z-50">
        {notifications.map(({ id, message, type }) => (
          <div
            key={id}
            className={`px-4 py-3 rounded-lg shadow-lg text-white transition-all duration-300
              ${type === "success" && "bg-green-500"}
              ${type === "error" && "bg-red-500"}
              ${type === "warning" && "bg-yellow-500 text-black"}
              ${type === "info" && "bg-blue-500"}
            `}
          >
            {message}
          </div>
        ))}
      </div>
    </NotificationContext.Provider>
  );
};

// Hook to use in any component
export const useNotification = () => {
  const context = useContext(NotificationContext);
  if (!context) {
    throw new Error("useNotification must be used within a NotificationProvider");
  }
  return context;
};
