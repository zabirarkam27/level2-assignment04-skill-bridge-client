"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useSessionContext } from "@/context/SessionContext";
import {
  LayoutDashboard,
  CalendarDays,
  User,
  Users,
  BookOpen,
  FolderOpen,
  Clock,
  Star,
  LogOut,
  ChevronRight,
} from "lucide-react";
import { cn } from "@/lib/utils";
import { useLogout } from "@/lib/logout";

interface NavItem {
  title: string;
  href: string;
  icon: React.ReactNode;
}

function getNavItems(role?: string): NavItem[] {
  if (role === "TUTOR") {
    return [
      { title: "Dashboard", href: "/tutor/dashboard", icon: <LayoutDashboard className="w-4 h-4" /> },
      { title: "My Sessions", href: "/tutor/sessions", icon: <CalendarDays className="w-4 h-4" /> },
      { title: "Availability", href: "/tutor/availability", icon: <Clock className="w-4 h-4" /> },
      { title: "Reviews", href: "/tutor/reviews", icon: <Star className="w-4 h-4" /> },
      { title: "Profile", href: "/tutor/profile", icon: <User className="w-4 h-4" /> },
    ];
  }
  if (role === "ADMIN") {
    return [
      { title: "Dashboard", href: "/admin", icon: <LayoutDashboard className="w-4 h-4" /> },
      { title: "Users", href: "/admin/users", icon: <Users className="w-4 h-4" /> },
      { title: "Bookings", href: "/admin/bookings", icon: <BookOpen className="w-4 h-4" /> },
      { title: "Categories", href: "/admin/categories", icon: <FolderOpen className="w-4 h-4" /> },
    ];
  }
  // STUDENT default
  return [
    { title: "Dashboard", href: "/dashboard", icon: <LayoutDashboard className="w-4 h-4" /> },
    { title: "My Bookings", href: "/dashboard/bookings", icon: <CalendarDays className="w-4 h-4" /> },
    { title: "Reviews", href: "/dashboard/reviews", icon: <Star className="w-4 h-4" /> },
    { title: "Profile", href: "/dashboard/profile", icon: <User className="w-4 h-4" /> },
  ];
}

export function DashboardSidebar() {
  const pathname = usePathname();
  const { user, refetch } = useSessionContext();
  const logout = useLogout();
  const navItems = getNavItems(user?.role);

  return (
    <aside className="w-64 min-h-screen bg-white dark:bg-gray-900 border-r border-gray-200 dark:border-gray-700 flex flex-col">
      {/* User info */}
      <div className="p-6 border-b border-gray-200 dark:border-gray-700">
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 rounded-full bg-[#611f69]/10 dark:bg-[#c084fc]/20 flex items-center justify-center overflow-hidden">
            {user?.image ? (
              <img src={user.image} alt={user.name} className="w-full h-full object-cover" />
            ) : (
              <User className="w-5 h-5 text-[#611f69] dark:text-[#c084fc]" />
            )}
          </div>
          <div className="overflow-hidden">
            <p className="font-semibold text-sm text-gray-900 dark:text-white truncate">{user?.name}</p>
            <span className="text-xs px-1.5 py-0.5 rounded bg-[#611f69]/10 text-[#611f69] dark:bg-[#c084fc]/20 dark:text-[#c084fc] capitalize">
              {user?.role?.toLowerCase() || "user"}
            </span>
          </div>
        </div>
      </div>

      {/* Nav links */}
      <nav className="flex-1 p-4 space-y-1">
        {navItems.map((item) => {
          const isActive = pathname === item.href || pathname.startsWith(item.href + "/");
          return (
            <Link
              key={item.href}
              href={item.href}
              className={cn(
                "flex items-center gap-3 px-3 py-2.5 rounded-lg text-sm font-medium transition-all duration-200 group",
                isActive
                  ? "bg-[#611f69] text-white dark:bg-[#c084fc] dark:text-black"
                  : "text-gray-600 dark:text-gray-400 hover:bg-[#611f69]/10 hover:text-[#611f69] dark:hover:bg-[#c084fc]/10 dark:hover:text-[#c084fc]",
              )}
            >
              {item.icon}
              <span className="flex-1">{item.title}</span>
              <ChevronRight className={cn("w-3 h-3 opacity-0 -translate-x-1 transition-all", "group-hover:opacity-100 group-hover:translate-x-0", isActive && "opacity-100 translate-x-0")} />
            </Link>
          );
        })}
      </nav>

      {/* Logout */}
      <div className="p-4 border-t border-gray-200 dark:border-gray-700">
        <button
          onClick={() => logout(refetch)}
          className="flex items-center gap-3 px-3 py-2.5 rounded-lg text-sm font-medium text-red-500 hover:bg-red-50 dark:hover:bg-red-900/20 w-full transition-colors"
        >
          <LogOut className="w-4 h-4" />
          Logout
        </button>
      </div>
    </aside>
  );
}
