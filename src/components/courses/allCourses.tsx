"use client";

import Image from "next/image";
import { motion } from "framer-motion";
import { useEffect, useState } from "react";
import { Category } from "@/types/routes.type";

interface PopularCoursesProps {
  limit?: number;
}

export default function AllCourses({ limit }: PopularCoursesProps) {
  const [courses, setCourses] = useState<Category[]>([]);
  const [loading, setLoading] = useState(true);
  const displayCourses = limit ? courses.slice(0, limit) : courses;

  useEffect(() => {
    const fetchCategories = async () => {
      try {
        const res = await fetch(
          `${process.env.NEXT_PUBLIC_API_URL}/categories`,
        );
        const data = await res.json();

        setCourses(Array.isArray(data.data) ? data.data : []);
      } catch (error) {
        console.error("Failed to load categories", error);
      } finally {
        setLoading(false);
      }
    };
    fetchCategories();
  }, []);

  return (
    <section className="bg-white dark:bg-gray-900 px-6 transition-colors duration-300">
      <div className="mx-auto max-w-7xl text-center">
        {loading && (
          <p className="mt-10 text-gray-500 dark:text-gray-300">
            Loading categories ...
          </p>
        )}

        {!loading && (
          <div className="mt-10 py-6 grid gap-8 sm:grid-cols-1 md:grid-cols-2 lg:grid-cols-3">
            {displayCourses.map((course) => (
              <motion.div
                key={course.id}
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6 }}
                className="group relative flex flex-col overflow-hidden rounded-2xl border border-gray-200 dark:border-gray-700 bg-white dark:bg-gray-800 shadow-lg transition-colors duration-300"
              >
                <div className="relative h-48 w-full">
                  <Image
                    src={course.image || "/placeholder.jpg"}
                    alt={course.name}
                    fill
                    className="object-cover"
                  />
                  <div className="absolute inset-0 dark:bg-black/30 transition-colors duration-300" />
                </div>

                <div className="p-6 grow">
                  <h3 className="text-xl font-semibold text-gray-800 dark:text-white">
                    {course.name}
                  </h3>
                  <p className="mt-2 text-gray-600 dark:text-gray-300">
                    {course.description || "No description available"}
                  </p>
                </div>

                <div className="flex items-center justify-between border-t border-gray-200 dark:border-gray-700 px-6 py-4">
                  {/* <div className="text-sm text-gray-600">
                  ⭐ {course.rating} • {course.students} students
                </div> */}
                  <button className="px-6 py-2 rounded-md border-2 border-transparent bg-[#611f69] text-white font-medium transition-colors duration-200 hover:bg-[#4a174f] dark:bg-[#c084fc] dark:text-black dark:hover:bg-[#d8b4fe] cursor-pointer">
                    View
                  </button>
                </div>
              </motion.div>
            ))}
          </div>
        )}
      </div>
    </section>
  );
}
