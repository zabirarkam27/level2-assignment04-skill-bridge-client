"use client";

import Image from "next/image";
import Link from "next/link";
import { motion } from "framer-motion";
import { useEffect, useState } from "react";
import { Mentor } from "@/types/routes.type";
import { Star, BookOpen } from "lucide-react";

// ─── MentorCard ──────────────────────────────────────────────────────────────

interface MentorCardProps {
  tutor: Mentor;
  index: number;
}

export function MentorCard({ tutor, index }: MentorCardProps) {
  return (
    <Link href={`/mentors/${tutor.id}`} className="block group">
    <motion.div
      initial={{ opacity: 0, y: 30 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5, delay: index * 0.08 }}
      className="relative bg-white dark:bg-gray-800 rounded-2xl shadow-md hover:shadow-2xl transition-all duration-300 overflow-hidden border border-gray-100 dark:border-gray-700"
    >
      {/* top accent bar */}
      <div className="h-1 w-full bg-gradient-to-r from-[#7b2a85] via-[#611f69] to-[#a855f7]" />

      <div className="p-6 flex flex-col items-center text-center">
        {/* Avatar */}
        <div className="relative mb-4">
          <div className="w-24 h-24 rounded-full ring-4 ring-[#611f69]/30 group-hover:ring-[#611f69] transition-all duration-300 overflow-hidden">
            <Image
              src={tutor.user.image || "/avatar.png"}
              alt={tutor.user.name}
              width={96}
              height={96}
              className="object-cover w-full h-full group-hover:scale-110 transition-transform duration-500"
            />
          </div>
          {/* online badge */}
          <span className="absolute bottom-1 right-1 w-4 h-4 bg-green-400 border-2 border-white dark:border-gray-800 rounded-full" />
        </div>

        {/* Name */}
        <h3 className="text-lg font-bold text-gray-900 dark:text-white leading-tight">
          {tutor.user.name}
        </h3>

        {/* Subjects */}
        <div className="flex flex-wrap justify-center gap-1 mt-2">
          {tutor.subjects.slice(0, 3).map((subject) => (
            <span
              key={subject}
              className="text-xs px-2 py-0.5 rounded-full bg-[#611f69]/10 text-[#611f69] dark:bg-[#c084fc]/20 dark:text-[#e9d5ff] font-medium"
            >
              {subject}
            </span>
          ))}
          {tutor.subjects.length > 3 && (
            <span className="text-xs px-2 py-0.5 rounded-full bg-gray-100 dark:bg-gray-700 text-gray-500 dark:text-gray-400">
              +{tutor.subjects.length - 3} more
            </span>
          )}
        </div>

        {/* Bio */}
        <p className="text-sm text-gray-500 dark:text-gray-400 mt-3 line-clamp-2 leading-relaxed">
          {tutor.bio || "Passionate educator helping students excel."}
        </p>

        {/* Stats row */}
        <div className="mt-4 flex items-center justify-center gap-4 text-xs text-gray-500 dark:text-gray-400">
          <span className="flex items-center gap-1">
            <Star className="w-3.5 h-3.5 text-yellow-400 fill-yellow-400" />
            4.9
          </span>
          <span className="flex items-center gap-1">
            <BookOpen className="w-3.5 h-3.5 text-[#611f69] dark:text-[#c084fc]" />
            {tutor.subjects.length} subjects
          </span>
        </div>

        {/* Price + CTA */}
        <div className="mt-5 w-full flex items-center justify-between pt-4 border-t border-gray-100 dark:border-gray-700">
          <div>
            <p className="text-xs text-gray-400 dark:text-gray-500">Rate</p>
            <p className="text-base font-bold text-[#611f69] dark:text-[#c084fc]">
              ৳ {tutor.price}
              <span className="text-xs font-normal text-gray-400">/hr</span>
            </p>
          </div>
          <button className="px-4 py-1.5 rounded-lg bg-[#611f69] text-white text-sm font-medium hover:bg-[#4a174f] dark:bg-[#c084fc] dark:text-black dark:hover:bg-[#d8b4fe] transition-colors duration-200 cursor-pointer">
            Book Now
          </button>
        </div>
      </div>
    </motion.div>
    </Link>
  );
}

// ─── Skeleton ─────────────────────────────────────────────────────────────────

function MentorSkeleton() {
  return (
    <div className="bg-white dark:bg-gray-800 rounded-2xl shadow-md border border-gray-100 dark:border-gray-700 overflow-hidden animate-pulse">
      <div className="h-1 w-full bg-gray-200 dark:bg-gray-700" />
      <div className="p-6 flex flex-col items-center">
        <div className="w-24 h-24 rounded-full bg-gray-200 dark:bg-gray-700 mb-4" />
        <div className="h-4 w-32 bg-gray-200 dark:bg-gray-700 rounded mb-2" />
        <div className="h-3 w-48 bg-gray-100 dark:bg-gray-600 rounded mb-3" />
        <div className="h-3 w-full bg-gray-100 dark:bg-gray-600 rounded mb-1" />
        <div className="h-3 w-4/5 bg-gray-100 dark:bg-gray-600 rounded" />
      </div>
    </div>
  );
}

// ─── AllMentors ───────────────────────────────────────────────────────────────

interface AllMentorsProps {
  limit?: number;
}

export default function AllMentors({ limit }: AllMentorsProps) {
  const [mentors, setMentors] = useState<Mentor[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(false);

  const displayMentors = limit ? mentors.slice(0, limit) : mentors;

  useEffect(() => {
    const fetchMentors = async () => {
      try {
        const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/mentors`);
        if (!res.ok) throw new Error("Failed");
        const data = await res.json();
        setMentors(Array.isArray(data.data) ? data.data : []);
      } catch (err) {
        console.error("Failed to load mentors", err);
        setError(true);
      } finally {
        setLoading(false);
      }
    };
    fetchMentors();
  }, []);

  return (
    <section className="bg-white dark:bg-gray-900 px-6 transition-colors duration-300">
      <div className="mx-auto max-w-7xl">
        {/* Loading skeletons */}
        {loading && (
          <div className="mt-10 py-6 grid gap-6 sm:grid-cols-1 md:grid-cols-2 lg:grid-cols-3">
            {Array.from({ length: limit || 6 }).map((_, i) => (
              <MentorSkeleton key={i} />
            ))}
          </div>
        )}

        {/* Error state */}
        {!loading && error && (
          <div className="mt-10 text-center py-20 text-gray-500 dark:text-gray-400">
            <p className="text-lg">Failed to load mentors. Please try again.</p>
          </div>
        )}

        {/* Empty state */}
        {!loading && !error && displayMentors.length === 0 && (
          <div className="mt-10 text-center py-20 text-gray-500 dark:text-gray-400">
            <p className="text-lg">No mentors found.</p>
          </div>
        )}

        {/* Grid */}
        {!loading && !error && displayMentors.length > 0 && (
          <div className="mt-10 py-6 grid gap-6 sm:grid-cols-1 md:grid-cols-2 lg:grid-cols-3">
            {displayMentors.map((tutor, i) => (
              <MentorCard key={tutor.id} tutor={tutor} index={i} />
            ))}
          </div>
        )}
      </div>
    </section>
  );
}