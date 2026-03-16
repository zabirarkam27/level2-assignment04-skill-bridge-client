"use client";

import { useRouter } from "next/navigation";

export function useLogout() {
  const router = useRouter();

  const logout = async (refetch?: () => void) => {
    try {
      const res = await fetch(
        `${process.env.NEXT_PUBLIC_API_URL}/api/auth/sign-out`,
        {
          method: "POST",
          credentials: "include",
        }
      );

      console.log("Logout response:", res.status);

      if (res.ok) {
        refetch?.();
        router.push("/login"); // ✅ redirect
        router.refresh();      // optional
      } else {
        console.error("Logout failed");
      }
    } catch (err) {
      console.error("Logout error:", err);
    }
  };

  return logout;
}