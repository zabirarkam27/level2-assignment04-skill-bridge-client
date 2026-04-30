"use client";

import { motion } from "framer-motion";
import { useRouter } from "next/navigation";
import AllMentors from "../mentors/allMentors";

export default function MentorsSection() {
  const router = useRouter();

  return (
    <div className="mx-auto max-w-7xl py-20 px-4 sm:px-6 lg:px-8">
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-6">
        <div>
          <motion.h2
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="text-3xl font-bold text-gray-900 dark:text-white"
          >
            Meet Our Mentors
          </motion.h2>
          <p className="mt-3 text-lg text-gray-600 dark:text-gray-300">
            Learn from the best — experienced tutors ready to guide you
          </p>
        </div>
        <div className="mt-10">
          <button
            className="px-6 py-2 rounded-md border-2 border-[#611f69] text-[#611f69] font-medium hover:bg-[#611f69] hover:text-white transition-colors duration-200 dark:border-[#c084fc] dark:text-[#e9d5ff] dark:hover:bg-[#c084fc] dark:hover:text-black cursor-pointer"
            onClick={() => router.push("/mentors")}
          >
            View All Mentors
          </button>
        </div>
      </div>
      <AllMentors limit={6} />
    </div>
  );
}
