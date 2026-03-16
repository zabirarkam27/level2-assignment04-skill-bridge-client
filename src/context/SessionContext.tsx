"use client";

import React, { createContext, useContext} from "react";
import { SessionUser, useSession as useSessionHook } from "@/hooks/useSession";

interface SessionContextType {
  user: SessionUser | null;
  loading: boolean;
  refetch: () => Promise<void>;
}

const SessionContext = createContext<SessionContextType>({
  user: null,
  loading: true,
  refetch: async () => {},
});

export const SessionProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const { user, loading, refetch } = useSessionHook();

  return (
    <SessionContext.Provider value={{ user, loading, refetch }}>
      {children}
    </SessionContext.Provider>
  );
};

export const useSessionContext = () => useContext(SessionContext);
