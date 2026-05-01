"use client";

import { useState, useEffect } from "react";
import { UserRole, UserStatus } from "@/types/routes.type";

export type SessionUser = {
  id: string;
  name: string;
  email: string;
  image?: string;
  role: UserRole;
  status: UserStatus;
};

export function useSession() {
  const [user, setUser] = useState<SessionUser | null>(null);
  const [loading, setLoading] = useState(true);

  const getSession = async () => {
    setLoading(true);
    try {
      const res = await fetch(
        `${process.env.NEXT_PUBLIC_API_URL}/api/auth/get-session`,
        {
          credentials: "include",
          cache: "no-store",
        },
      );
      if (!res.ok) {
        setUser(null);
        return;
      }
      const data = await res.json();
      setUser(data?.user || null);
    } catch {
      setUser(null);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    getSession();
  }, []);

  return { user, loading, refetch: getSession };
}
