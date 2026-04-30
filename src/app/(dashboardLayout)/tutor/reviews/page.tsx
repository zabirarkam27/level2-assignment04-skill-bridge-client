"use client";

import { useEffect, useState } from "react";
import { Review } from "@/types/routes.type";
import { Star, MessageSquare, User } from "lucide-react";
import { motion } from "framer-motion";
import Image from "next/image";

function ReviewCard({ review, index }: { review: Review; index: number }) {
  const student = review.booking?.student;
  const studentName = student?.name ?? "Student";
  return (
    <motion.div
      initial={{ opacity: 0, y: 15 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: index * 0.07 }}
      className="bg-white dark:bg-gray-800 rounded-xl border border-gray-100 dark:border-gray-700 p-5 shadow-sm"
    >
      <div className="flex items-center gap-3 mb-3">
        <div className="w-10 h-10 rounded-full bg-[#611f69]/10 flex items-center justify-center overflow-hidden shrink-0">
          {student?.image ? (
            <Image src={student.image} alt={studentName} width={40} height={40} className="object-cover w-full h-full" />
          ) : (
            <User className="w-5 h-5 text-[#611f69]" />
          )}
        </div>
        <div className="flex-1">
          <p className="font-semibold text-sm text-gray-900 dark:text-white">{studentName}</p>
          <div className="flex gap-0.5 mt-0.5">
            {[1, 2, 3, 4, 5].map((s) => (
              <Star
                key={s}
                className={`w-3.5 h-3.5 ${s <= review.rating ? "fill-yellow-400 text-yellow-400" : "text-gray-300"}`}
              />
            ))}
          </div>
        </div>
        <span className="text-xs text-gray-400 shrink-0">
          {new Date(review.createdAt).toLocaleDateString()}
        </span>
      </div>
      <p className="text-sm text-gray-600 dark:text-gray-300">{review.comment}</p>
    </motion.div>
  );
}

export default function TutorReviewsPage() {
  const [reviews, setReviews] = useState<Review[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetch(`${process.env.NEXT_PUBLIC_API_URL}/reviews/tutor-me`, {
      credentials: "include",
    })
      .then((r) => r.json())
      .then((d) => setReviews(Array.isArray(d.data) ? d.data : []))
      .catch(() => setReviews([]))
      .finally(() => setLoading(false));
  }, []);

  const avgRating =
    reviews.length > 0
      ? (reviews.reduce((sum, r) => sum + r.rating, 0) / reviews.length).toFixed(1)
      : null;

  return (
    <div className="max-w-2xl">
      <div className="mb-6 flex items-start justify-between">
        <div>
          <h1 className="text-2xl font-bold text-gray-900 dark:text-white flex items-center gap-2">
            <MessageSquare className="w-6 h-6 text-[#611f69] dark:text-[#c084fc]" />
            My Reviews
          </h1>
          <p className="text-sm text-gray-500 dark:text-gray-400 mt-1">
            Reviews left by your students
          </p>
        </div>
        {avgRating && (
          <div className="flex items-center gap-1.5 bg-yellow-50 dark:bg-yellow-900/20 border border-yellow-100 dark:border-yellow-800 rounded-xl px-4 py-2">
            <Star className="w-5 h-5 fill-yellow-400 text-yellow-400" />
            <span className="text-lg font-bold text-gray-900 dark:text-white">{avgRating}</span>
            <span className="text-xs text-gray-400">/ {reviews.length} reviews</span>
          </div>
        )}
      </div>

      {loading ? (
        <div className="space-y-3">
          {[1, 2, 3].map((i) => (
            <div key={i} className="h-28 bg-white dark:bg-gray-800 rounded-xl border border-gray-100 dark:border-gray-700 animate-pulse" />
          ))}
        </div>
      ) : reviews.length === 0 ? (
        <div className="text-center py-20 text-gray-400">
          <MessageSquare className="w-12 h-12 mx-auto mb-3 opacity-40" />
          <p className="text-sm">No reviews yet. Complete sessions to receive reviews!</p>
        </div>
      ) : (
        <div className="space-y-3">
          {reviews.map((r, i) => (
            <ReviewCard key={r.id} review={r} index={i} />
          ))}
        </div>
      )}
    </div>
  );
}
