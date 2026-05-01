"use client";

import { useEffect, useState } from "react";
import { AppUser } from "@/types/routes.type";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { toast } from "sonner";
import { UserCheck, UserX, Clock, BookOpen, DollarSign } from "lucide-react";
import { motion } from "framer-motion";

export default function AdminTutorRequestsPage() {
  const [tutors, setTutors] = useState<AppUser[]>([]);
  const [loading, setLoading] = useState(true);
  const [updating, setUpdating] = useState<string | null>(null);

  const fetchPending = async () => {
    try {
      const res = await fetch(
        `${process.env.NEXT_PUBLIC_API_URL}/admin/tutors/pending`,
        { credentials: "include" },
      );
      const data = await res.json();
      setTutors(Array.isArray(data.data) ? data.data : []);
    } catch {
      setTutors([]);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => { fetchPending(); }, []);

  const handleApprove = async (userId: string) => {
    setUpdating(userId);
    try {
      const res = await fetch(
        `${process.env.NEXT_PUBLIC_API_URL}/admin/tutors/${userId}/approve`,
        { method: "PATCH", credentials: "include" },
      );
      if (!res.ok) throw new Error();
      setTutors((prev) => prev.filter((t) => t.id !== userId));
      toast.success("Tutor approved successfully");
    } catch {
      toast.error("Failed to approve tutor");
    } finally {
      setUpdating(null);
    }
  };

  const handleReject = async (userId: string) => {
    setUpdating(userId);
    try {
      const res = await fetch(
        `${process.env.NEXT_PUBLIC_API_URL}/admin/tutors/${userId}/reject`,
        { method: "PATCH", credentials: "include" },
      );
      if (!res.ok) throw new Error();
      setTutors((prev) => prev.filter((t) => t.id !== userId));
      toast.success("Tutor application rejected");
    } catch {
      toast.error("Failed to reject application");
    } finally {
      setUpdating(null);
    }
  };

  return (
    <>
      <div className="mb-6">
        <h1 className="text-2xl font-bold text-gray-900 dark:text-white flex items-center gap-2">
          <Clock className="w-6 h-6 text-[#611f69] dark:text-[#c084fc]" />
          Tutor Requests
        </h1>
        <p className="text-sm text-gray-500 dark:text-gray-400 mt-1">
          {loading ? "Loading…" : `${tutors.length} pending application${tutors.length !== 1 ? "s" : ""}`}
        </p>
      </div>

      <div className="bg-white dark:bg-gray-800 rounded-xl border border-gray-100 dark:border-gray-700 shadow-sm overflow-hidden">
        {loading ? (
          <div className="p-6 space-y-4">
            {[1, 2, 3].map((i) => (
              <div key={i} className="flex items-start gap-4 animate-pulse">
                <div className="w-10 h-10 rounded-full bg-gray-200 dark:bg-gray-700 shrink-0" />
                <div className="flex-1 space-y-2">
                  <div className="h-4 w-40 bg-gray-200 dark:bg-gray-700 rounded" />
                  <div className="h-3 w-56 bg-gray-100 dark:bg-gray-600 rounded" />
                  <div className="h-3 w-72 bg-gray-100 dark:bg-gray-600 rounded" />
                </div>
              </div>
            ))}
          </div>
        ) : tutors.length === 0 ? (
          <div className="text-center py-20 text-gray-400">
            <UserCheck className="w-12 h-12 mx-auto mb-3 opacity-30" />
            <p className="text-sm font-medium">No pending tutor applications</p>
            <p className="text-xs mt-1 opacity-70">New requests will appear here</p>
          </div>
        ) : (
          <div className="divide-y divide-gray-100 dark:divide-gray-700">
            {tutors.map((tutor, i) => (
              <motion.div
                key={tutor.id}
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: i * 0.05 }}
                className="flex items-start gap-4 px-5 py-5 hover:bg-gray-50 dark:hover:bg-gray-700/50 transition-colors"
              >
                {/* Avatar */}
                <div className="w-10 h-10 rounded-full bg-[#611f69]/10 flex items-center justify-center shrink-0 mt-0.5">
                  <span className="text-sm font-bold text-[#611f69] dark:text-[#c084fc]">
                    {tutor.name[0].toUpperCase()}
                  </span>
                </div>

                {/* Info */}
                <div className="flex-1 min-w-0">
                  <div className="flex items-center gap-2 flex-wrap">
                    <p className="text-sm font-semibold text-gray-900 dark:text-white">
                      {tutor.name}
                    </p>
                    <Badge variant="outline" className="text-yellow-600 border-yellow-400 bg-yellow-50 dark:bg-yellow-900/20">
                      PENDING
                    </Badge>
                  </div>
                  <p className="text-xs text-gray-500 dark:text-gray-400 mt-0.5">{tutor.email}</p>

                  {tutor.tutorProfile && (
                    <div className="mt-2 space-y-1">
                      {tutor.tutorProfile.bio && (
                        <p className="text-xs text-gray-600 dark:text-gray-300 line-clamp-2">
                          {tutor.tutorProfile.bio}
                        </p>
                      )}
                      <div className="flex items-center gap-4 text-xs text-gray-500 dark:text-gray-400">
                        {tutor.tutorProfile.subjects?.length > 0 && (
                          <span className="flex items-center gap-1">
                            <BookOpen className="w-3 h-3" />
                            {tutor.tutorProfile.subjects.slice(0, 3).join(", ")}
                            {tutor.tutorProfile.subjects.length > 3 && ` +${tutor.tutorProfile.subjects.length - 3}`}
                          </span>
                        )}
                        {tutor.tutorProfile.price != null && (
                          <span className="flex items-center gap-1">
                            <DollarSign className="w-3 h-3" />
                            ${tutor.tutorProfile.price}/hr
                          </span>
                        )}
                      </div>
                    </div>
                  )}

                  {tutor.createdAt && (
                    <p className="text-xs text-gray-400 dark:text-gray-500 mt-1.5">
                      Applied {new Date(tutor.createdAt).toLocaleDateString("en-US", { month: "short", day: "numeric", year: "numeric" })}
                    </p>
                  )}
                </div>

                {/* Actions */}
                <div className="flex items-center gap-2 shrink-0">
                  <Button
                    size="sm"
                    disabled={updating === tutor.id}
                    onClick={() => handleApprove(tutor.id)}
                    className="h-8 text-xs bg-green-600 hover:bg-green-700 text-white"
                  >
                    {updating === tutor.id ? "…" : (
                      <><UserCheck className="w-3.5 h-3.5 mr-1" /> Approve</>
                    )}
                  </Button>
                  <Button
                    size="sm"
                    variant="outline"
                    disabled={updating === tutor.id}
                    onClick={() => handleReject(tutor.id)}
                    className="h-8 text-xs border-red-400 text-red-500 hover:bg-red-50 dark:hover:bg-red-900/20"
                  >
                    {updating === tutor.id ? "…" : (
                      <><UserX className="w-3.5 h-3.5 mr-1" /> Reject</>
                    )}
                  </Button>
                </div>
              </motion.div>
            ))}
          </div>
        )}
      </div>
    </>
  );
}
