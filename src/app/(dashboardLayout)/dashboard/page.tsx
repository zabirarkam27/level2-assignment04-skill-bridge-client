"use client";

import { useSessionContext } from "@/context/SessionContext";
import { useRouter } from "next/navigation";
import { useEffect } from "react";

export default function DashboardRedirect() {
  const { user, loading } = useSessionContext();
  const router = useRouter();

  useEffect(() => {
    if (loading) return;
    if (!user) {
      router.replace("/login");
      return;
    }
    if (user.role === "ADMIN") router.replace("/admin");
    else if (user.role === "TUTOR") router.replace("/tutor/dashboard");
    else router.replace("/dashboard/bookings");
  }, [user, loading, router]);

  return (
    <div className="flex items-center justify-center h-60">
      <div className="w-8 h-8 border-4 border-[#611f69] border-t-transparent rounded-full animate-spin" />
    </div>
  );
}
